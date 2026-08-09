# RAG 系统的 Query 改写与扩展：检索效果差，很多时候不是向量库的问题

> 用户输入一个短 query 就直接去检索，是 RAG 系统中最常见的性能杀手。很多时候检索效果差，不是 embedding 模型不够强，也不是向量库参数没调好，而是**用户的 query 本身就不适合直接检索**。

---

## 一、问题的根源：Query 与文档的"语义鸿沟"

用户输入和文档内容之间存在三种典型的鸿沟：

| 鸿沟类型 | 示例 | 问题 |
|---------|------|------|
| **信息不足** | 用户输入"报销流程"，但文档里写的是"费用报销管理办法" | 字面不匹配，BM25 漏召 |
| **意图模糊** | 用户输入"这个功能怎么用"，但没说是哪个功能 | 语义太宽，召回一堆无关内容 |
| **表达差异** | 用户输入"咋退钱"，文档里写的是"退款申请流程" | 口语与书面语不对齐 |

**核心矛盾**：用户的 query 通常又短又模糊，而文档库里的内容又长又精确。直接拿短 query 去匹配长文档，embedding 的语义平均效应会把关键信息稀释掉。

---

## 二、四类主流 Query 改写策略

### 1. HyDE（假设文档嵌入）

**思想**：先让 LLM 根据 query 生成一个"假设文档"（即假设的答案），然后用这个假设文档去检索。

**流程**：

```
用户 query → LLM 生成假设答案 → 对假设答案做 embedding → 向量检索
```

**为什么有效**：假设答案的文本长度和语义结构与真实文档更接近，embedding 后的向量空间距离更近。

**适用场景**：
- 事实性问答（如"公司的年假政策是什么"）
- 用户 query 过短（< 5 个字）

**注意事项**：
- 如果 LLM 生成的假设答案偏离事实，检索方向会跑偏
- 一次额外的 LLM 调用，增加延迟（约 300-800ms）
- 不适合"你帮我写个方案"这类开放式生成任务

**工程实现要点**：

```python
def hyde_retrieve(query: str, llm, embedder, vector_store, top_k: int = 5):
    # 1. 生成假设文档
    prompt = f"""请根据以下问题，生成一段可能包含答案的详细文档片段。
要求：内容具体、信息丰富，不要出现"根据...""如上所述"等引用性表述。

问题：{query}

假设文档："""
    hypothetical_doc = llm.generate(prompt)
    
    # 2. 用假设文档做检索
    query_vector = embedder.embed(hypothetical_doc)
    results = vector_store.search(query_vector, top_k=top_k)
    return results
```

### 2. Multi-Query（多查询扩展）

**思想**：用一个 query 生成多个不同角度的变体，分别检索后合并结果。

**流程**：

```
用户 query → LLM 生成 3-5 个变体 query → 分别检索 → 合并去重 → 重排序
```

**适用场景**：
- query 有多义性（如"苹果"指水果还是公司）
- 需要覆盖多个知识维度（如"React 性能优化"可以拆成"React 渲染优化"、"React 内存管理"、"React 代码分割"）

**注意事项**：
- 多次检索增加延迟（N 倍向量检索时间）
- 如果 LLM 生成的变体质量不高，反而引入噪声
- 需要一个好的去重和合并策略

**关键参数**：

```python
def multi_query_retrieve(query: str, llm, embedder, vector_store, 
                         num_queries: int = 3, top_k_per_query: int = 5):
    # 1. 生成多个 query 变体
    prompt = f"""你是一个检索专家。用户的问题是：{query}

请从 {num_queries} 个不同角度改写这个问题，使检索更全面。
每个变体用一行表示，不要编号。

要求：改写后的问题应该语义完整、信息丰富，比原问题更具体。"""
    variants = llm.generate(prompt).strip().split("\n")[:num_queries]
    variants.append(query)  # 保留原始 query
    
    # 2. 分别检索
    all_results = []
    seen_docs = set()
    for q in variants:
        vector = embedder.embed(q)
        results = vector_store.search(vector, top_k=top_k_per_query)
        for doc in results:
            if doc.id not in seen_docs:
                all_results.append(doc)
                seen_docs.add(doc.id)
    
    # 3. 合并后重排序（RRF 或 Reranker）
    return rerank(all_results, query)
```

### 3. Query Decomposition（查询分解）

**思想**：把复杂 query 拆成多个子问题，分别检索后再组合。

**适用场景**：
- 多跳问题（如"去年销售额最高的产品是什么，它的竞争对手是谁"）
- 需要跨多个知识库检索（如"对比 A 和 B 两款产品的价格和配置"）

**注意事项**：
- 子问题之间可能有依赖关系（如上一步结果作为下一步的输入）
- 结果合并的策略很重要：是简单拼接，还是逐步推理

**实现示例**：

```python
def decompose_query(query: str, llm) -> list[str]:
    prompt = f"""请将以下复杂问题拆解为 2-4 个独立的子问题。
每个子问题应该能够独立检索答案。
用 JSON 数组格式输出，每个元素包含 "question" 和 "depends_on" 字段。

问题：{query}

输出格式：
[
  {{"question": "子问题1", "depends_on": []}},
  {{"question": "子问题2", "depends_on": [0]}}
]"""
    response = llm.generate(prompt)
    sub_questions = json.loads(response)
    return sub_questions
```

### 4. 查询补全（Contextual Query Expansion）

**思想**：利用对话历史或用户画像，给短 query 补充上下文。

**适用场景**：
- 多轮对话中的指代消解（"它"、"这个"、"刚才说的那个"）
- 同一用户在同一 session 内的连续查询

**注意事项**：
- 过度补全可能引入无关信息
- 需要维护对话上下文（session 管理）

**实现示例**：

```python
def expand_query_with_context(query: str, chat_history: list[dict], llm) -> str:
    prompt = f"""对话历史：
{format_history(chat_history)}

用户最新问题：{query}

请结合对话历史，将用户的最新问题改写为一个独立的、完整的查询。
只输出改写后的查询，不要额外解释。"""
    expanded_query = llm.generate(prompt)
    return expanded_query
```

---

## 三、如何选择改写策略：一张决策表

| 场景 | 推荐策略 | 延迟增加 | 效果提升期望 |
|------|---------|---------|------------|
| Query 过短（< 5 字） | HyDE | 中（+1 LLM 调用） | 高 |
| Query 有歧义 | Multi-Query | 高（+N 次检索） | 中高 |
| 复杂多跳问题 | Query Decomposition | 高 | 高 |
| 多轮对话 | 查询补全 | 低（+1 LLM 调用） | 高 |
| Query 已经很长且明确 | 不需要改写 | 0 | - |

**一个重要原则**：不要对所有 query 都做改写。改写是有代价的——额外的 LLM 调用和延迟。一个实用的做法是**按需改写**：

```python
def should_rewrite(query: str) -> bool:
    """判断是否需要改写 query"""
    # 1. query 太短
    if len(query) < 10:
        return True
    # 2. 包含指代性词汇
    if any(w in query for w in ["它", "这个", "那个", "刚才", "它", "they", "it", "this", "that"]):
        return True
    # 3. query 是疑问词开头但信息不足
    if any(w in query for w in ["怎么", "如何", "what", "how"]) and len(query) < 20:
        return True
    return False
```

---

## 四、生产环境中的工程考量

### 4.1 延迟预算

不同的改写策略对延迟的影响差异很大，需要根据业务场景做取舍：

- **实时搜索（< 1s 预算）**：只做查询补全，不做 HyDE 或 Multi-Query
- **准实时搜索（1-3s 预算）**：HyDE 或轻量级 Multi-Query（2 个变体）
- **离线/异步搜索（> 3s 预算）**：全量改写 + 深度重排序

### 4.2 改写质量监控

Query 改写引入了一个新的故障点——LLM 改写质量。需要建立监控：

```python
# 改写质量的离线评估指标
def evaluate_rewrite_quality(original_query, rewritten_query, retrieved_docs, ground_truth_docs):
    score = 0
    # 1. 改写后的 recall 是否提升
    recall_original = recall_at_k(retrieved_docs.original, ground_truth_docs, k=5)
    recall_rewritten = recall_at_k(retrieved_docs.rewritten, ground_truth_docs, k=5)
    score += (recall_rewritten - recall_original) * 0.5
    
    # 2. 改写后的 precision 是否下降（防止引入噪声）
    precision_original = precision_at_k(retrieved_docs.original, ground_truth_docs, k=5)
    precision_rewritten = precision_at_k(retrieved_docs.rewritten, ground_truth_docs, k=5)
    score += (precision_rewritten - precision_original) * 0.3
    
    # 3. 改写前后的语义相似度（防止改写偏离）
    similarity = cosine_similarity(embed(original_query), embed(rewritten_query))
    score += similarity * 0.2
    
    return score
```

### 4.3 灰度发布

不要一次性全量上线改写策略。推荐的灰度策略：

```
Day 1-3: 5% 流量，只监控不改结果
Day 4-7: 20% 流量，A/B 对比改写 vs 不改写
Day 8-14: 50% 流量，逐步放开
Day 15+: 全量，持续监控
```

---

## 五、什么时候不该用 Query 改写？

最后，说一个反直觉的结论：**在某些场景下，Query 改写反而会降低检索效果**。

1. **query 本身就是精确的关键词**：如产品型号 "iPhone 15 Pro Max A3101"，改写反而会稀释精确匹配
2. **query 是代码或 SQL 片段**：改写会破坏语法结构
3. **query 足够长且语义明确**：如 "2024 年第三季度华东区销售业绩报告"，直接检索效果最好
4. **实时性要求极高**：改写引入的延迟不可接受

在这些场景下，可以做一个**路由层**，将精确查询直接走 BM25 或倒排索引，模糊查询走改写 + 向量检索。

---

## 总结

Query 改写不是万能的，但它是在不升级 embedding 模型、不增加向量库规模的前提下，**性价比最高的检索优化手段之一**。关键在于：

1. **按需改写**，不要对所有 query 一刀切
2. **策略匹配场景**，HyDE 适合短 query，Multi-Query 适合歧义 query
3. **监控改写质量**，防止 LLM 改写引入噪声
4. **灰度发布**，用数据证明改写确实提升了效果
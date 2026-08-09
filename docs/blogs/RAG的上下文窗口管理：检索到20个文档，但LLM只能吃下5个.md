# RAG 的上下文窗口管理：检索到 20 个文档，但 LLM 只能吃下 5 个

> Top-K 设得越大，召回率越高，但 LLM 的上下文窗口是有限的。当检索回来的文档总长度超过 LLM 的上下文窗口时，**不是"能塞多少塞多少"，而是"谁该进、谁该等、谁该丢"**。

---

## 一、问题的本质：检索的"贪心"与生成的"吝啬"

RAG 系统有一个天然矛盾：

- **检索阶段**：Top-K 设得越大，召回率越高。为了覆盖用户可能需要的所有信息，我们会把 K 设为 10、20 甚至 50
- **生成阶段**：LLM 的上下文窗口有限。即使 GPT-4 有 128K 窗口，把 20 个 chunk 原封不动塞进去，也会导致：
  - **注意力稀释**：相关信息被淹没在大量无关文本中
  - **位置偏差**：LLM 对中间位置的文档关注度远低于开头和结尾
  - **Token 浪费**：花了几百 token 读无关内容，关键信息反而没空间了

**真实案例**：一个企业知识库 RAG 系统，Top-K=20，每个 chunk 约 512 token，总输入约 10K token。分析发现，实际回答用到的信息只来自其中 2-3 个 chunk，其余 85% 的 token 被浪费了。这不仅增加了成本，还降低了回答质量。

---

## 二、策略一：排序压缩——先排序，再截断

这是最直接的方法：在检索和生成之间插入一个**重排序（Re-Ranking）** 步骤。

### 2.1 为什么需要重排序

向量检索的排序是基于 embedding 相似度的，但 embedding 相似度高 ≠ 对当前问题有用。例如：

- 用户问"Python 怎么处理 Excel 文件"，向量检索可能返回"Python 基础语法"（语义相似但无用）
- 或者返回了 5 个高度相似的 chunk，但都是同一段内容的不同切分

**重排序模型（Cross-Encoder）** 能直接计算 query 和每个文档的相关性，给出更精确的排序。

### 2.2 工程实现：两阶段检索

```python
def two_stage_retrieve(query: str, vector_store, embedder, reranker,
                       top_k_initial: int = 20, top_k_final: int = 5):
    # Stage 1: 向量检索（粗筛）
    query_vector = embedder.embed(query)
    candidates = vector_store.search(query_vector, top_k=top_k_initial)
    
    # Stage 2: 重排序（精排）
    pairs = [(query, doc.text) for doc in candidates]
    scores = reranker.score(pairs)
    
    # 按重排序得分取前 N 个
    ranked = sorted(zip(candidates, scores), key=lambda x: x[1], reverse=True)
    return [doc for doc, score in ranked[:top_k_final]]
```

### 2.3 重排序的代价与取舍

| 方案 | 延迟 | 精度 | 成本 |
|-----|------|------|------|
| 不重排序，直接取 Top-5 | 最低 | 基准 | 最低 |
| 向量检索 Top-20 → 重排序取 Top-5 | 中（+N 次 Cross-Encoder 推理） | 显著提升 | 中 |
| 向量检索 Top-50 → 重排序取 Top-5 | 高 | 边际收益递减 | 高 |

**经验值**：重排序模型对 Top-20 的排序效果提升最明显，超过 Top-50 后边际收益急剧下降。推荐初始 Top-K 设为 20-30，重排序后保留 Top-3 到 Top-5。

---

## 三、策略二：结构化过滤——不是所有 chunk 都该进上下文

重排序解决了"哪个更相关"的问题，但没解决"多个 chunk 内容重复"的问题。更精细的做法是**对 chunk 做结构化过滤**。

### 3.1 去重与多样性保证

多个 chunk 可能包含高度重复的信息（尤其是 overlap 较大的情况下）。需要做去重：

```python
def deduplicate_chunks(chunks: list[Chunk], similarity_threshold: float = 0.85) -> list[Chunk]:
    """去除语义高度重复的 chunk，保留最相关的一个"""
    selected = []
    for chunk in sorted(chunks, key=lambda c: c.relevance_score, reverse=True):
        is_duplicate = False
        for selected_chunk in selected:
            sim = cosine_similarity(chunk.embedding, selected_chunk.embedding)
            if sim > similarity_threshold:
                is_duplicate = True
                break
        if not is_duplicate:
            selected.append(chunk)
    return selected
```

### 3.2 信息密度过滤

有些 chunk 虽然相关，但信息密度极低——比如大段的表格、空行、重复的模板文本。这些 chunk 应该被过滤掉：

```python
def filter_low_density_chunks(chunks: list[Chunk], min_info_density: float = 0.3) -> list[Chunk]:
    """过滤信息密度低的 chunk"""
    def info_density(text: str) -> float:
        # 简单指标：去重后的有效信息占比
        words = text.split()
        unique_words = set(words)
        if len(words) == 0:
            return 0
        # 信息密度 = 唯一词比例 × 内容长度（归一化）
        uniqueness = len(unique_words) / len(words)
        # 太短的 chunk 大概率信息密度低
        length_factor = min(len(words) / 50, 1.0)
        return uniqueness * length_factor
    
    return [c for c in chunks if info_density(c.text) >= min_info_density]
```

### 3.3 元数据驱动的选择

如果 chunk 带有元数据（如标题层级、文档来源、时间戳），可以根据元数据做更智能的选择：

```python
def select_by_metadata(chunks: list[Chunk], max_chunks: int = 5) -> list[Chunk]:
    """
    基于元数据选择 chunk，保证：
    1. 优先选择高相关性（重排序得分）
    2. 同一文档来源不超过 2 个
    3. 优先选择更高层级的标题（如 h1 > h2 > h3）
    """
    # 按文档来源分组
    from collections import defaultdict
    source_groups = defaultdict(list)
    for chunk in chunks:
        source_groups[chunk.metadata.source].append(chunk)
    
    # 每个来源最多选 2 个
    selected = []
    for source, group in source_groups.items():
        group.sort(key=lambda c: c.relevance_score, reverse=True)
        selected.extend(group[:2])
    
    # 按相关性排序，取前 max_chunks
    selected.sort(key=lambda c: c.relevance_score, reverse=True)
    return selected[:max_chunks]
```

---

## 四、策略三：渐进式阅读——不一次性喂给 LLM

把检索结果分批喂给 LLM，每次只给一部分，让 LLM 判断是否需要更多信息。

### 4.1 实现思路

```
Round 1: 给 LLM 最相关的 Top-3 chunk + 问题 → 生成答案
如果 LLM 认为信息不足，标记缺失内容
Round 2: 根据缺失内容，从剩余 chunk 中补充 Top-2 → 再次生成
最多 N 轮
```

### 4.2 伪代码实现

```python
def progressive_reading(query: str, ranked_chunks: list[Chunk], 
                        llm, max_rounds: int = 3, chunk_per_round: int = 3):
    """渐进式阅读：分批给 LLM 提供信息"""
    context = []
    pointer = 0
    full_answer = ""
    
    for round in range(max_rounds):
        # 取下一批 chunk
        batch = ranked_chunks[pointer:pointer + chunk_per_round]
        if not batch:
            break
        pointer += chunk_per_round
        context.extend(batch)
        
        # 构建 prompt
        prompt = f"""你正在基于以下文档片段回答问题。

已有文档片段：
{format_chunks(context)}

问题：{query}

请回答以上问题。如果你认为当前文档片段中的信息不足以给出完整准确的回答，
请明确说明"信息不足"以及缺少哪些信息。
否则，请直接给出完整回答。"""
        
        answer = llm.generate(prompt)
        
        # 判断 LLM 是否认为信息足够
        if "信息不足" not in answer:
            return answer
        
        # 记录部分答案和缺失信息，继续下一轮
        full_answer = answer
    
    # 如果达到最大轮次仍有信息不足，返回当前最佳答案
    return full_answer
```

### 4.3 适用场景与限制

**适用场景**：
- 长文档问答（如论文、报告、手册）
- 需要多步推理的复杂问题
- 对答案完整性要求高的场景

**限制**：
- 多轮 LLM 调用，延迟线性增长
- 实现复杂，需要状态管理
- 可能出现"来回拉扯"——LLM 总说信息不足

---

## 五、策略四：上下文压缩——让每个 token 都更有价值

在把 chunk 塞进 LLM 之前，先对它们做**压缩**。

### 5.1 提取式压缩

从 chunk 中提取最相关的句子，丢弃无关部分：

```python
def extractive_compress(chunks: list[Chunk], query: str, llm, 
                        max_tokens: int = 2000) -> str:
    """从多个 chunk 中提取与 query 最相关的句子，控制在 max_tokens 内"""
    combined_text = "\n".join(c.text for c in chunks)
    
    prompt = f"""请从以下文档中提取与问题最相关的句子，去除无关内容。
要求：
1. 只保留与问题直接相关的句子
2. 保持原文的表述方式，不要改写
3. 提取的内容长度不超过 {max_tokens} token

问题：{query}

文档：
{combined_text}

提取的内容："""
    
    compressed = llm.generate(prompt)
    return compressed
```

### 5.2 摘要式压缩

对 chunk 内容做摘要，特别适合长 chunk：

```python
def summarize_chunks(chunks: list[Chunk], query: str, llm) -> str:
    """对每个 chunk 做面向 query 的摘要"""
    summaries = []
    for chunk in chunks:
        prompt = f"""请为以下文档片段生成一个面向问题"{query}"的摘要。
要求：保留关键事实和数据，去除无关细节，控制在 100 字以内。

文档片段：{chunk.text}

面向问题的摘要："""
        summary = llm.generate(prompt)
        summaries.append(summary)
    
    return "\n".join(summaries)
```

### 5.3 压缩方法的对比

| 方法 | 压缩比 | 信息损失 | 延迟 | 适用场景 |
|------|-------|---------|------|---------|
| 提取式 | 高（50-80%） | 中 | 中（+1 LLM 调用） | chunk 长但信息稀疏 |
| 摘要式 | 很高（70-90%） | 高 | 高（+N 次 LLM 调用） | 需大幅压缩且不要求细节 |
| 关键词提取 | 极高（90%+） | 很高 | 低 | 仅需事实性信息的场景 |
| 分块选择 | 中（30-50%） | 低 | 低 | 默认推荐 |

**工程建议**：优先尝试**分块选择 + 提取式压缩**的组合。先通过重排序选出最相关的 Top-3 到 Top-5，再对每个 chunk 做提取式压缩，这样信息损失最小。

---

## 六、四种策略的联合使用：一个完整的上下文管理器

在实际工程中，这四种策略不是互斥的，而是**组合使用**的：

```python
class ContextManager:
    """RAG 上下文管理器"""
    
    def build_context(self, query: str, raw_chunks: list[Chunk], 
                      max_context_tokens: int = 4000) -> str:
        # Step 1: 重排序（策略一）
        ranked = self.reranker.rerank(query, raw_chunks)
        
        # Step 2: 去重与过滤（策略二）
        deduped = self.deduplicate(ranked)
        filtered = self.filter_low_density(deduped)
        
        # Step 3: 渐进式选择（策略三）
        if self.use_progressive:
            return self.progressive_read(query, filtered, max_context_tokens)
        
        # Step 4: 截断 + 压缩（策略四）
        truncated = filtered[:self.top_k_final]
        compressed = self.compress(truncated, query, max_context_tokens)
        
        return compressed
```

### 实际效果数据

某企业知识库 RAG 系统应用上述策略后：

| 指标 | 优化前 | 优化后 | 提升 |
|------|-------|-------|------|
| 平均上下文大小 | 8,200 token | 3,100 token | 62% 减少 |
| 回答准确率 | 73% | 86% | +13% |
| 平均生成延迟 | 2.8s | 1.4s | 50% 减少 |
| Token 成本 | 基准 | 58% 降低 | 42% 节省 |

---

## 总结

上下文窗口管理不是把检索结果"硬塞"进 LLM 的窗口，而是**在有限的信息通道中，让最有价值的信息优先通过**。核心原则：

1. **先精排再喂入**：用重排序替代简单截断，准确率提升 10%+
2. **去重过滤**：消除冗余和低质量 chunk，为真正有用的信息腾出空间
3. **渐进式读取**：分批喂给 LLM，避免一次性淹没在海量信息中
4. **压缩提效**：让每个 token 都承载更多有效信息

记住：**给 LLM 喂 20 个 chunk 而不做排序和压缩，不如精心挑选 5 个最相关的 chunk 并做压缩后的效果好**。质量永远优于数量。
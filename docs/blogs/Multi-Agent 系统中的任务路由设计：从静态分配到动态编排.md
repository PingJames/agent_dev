# Multi-Agent 系统中的任务路由设计：从静态分配到动态编排

> **核心观点**：Multi-Agent 系统能否在生产环境稳定运行，不取决于单个 Agent 的能力上限，而取决于**任务路由层**的设计质量。本文面向正在搭建 Multi-Agent 系统的工程师，从工程视角拆解路由设计的核心模式与落地陷阱。

---

## 一、为什么任务路由是架构的"咽喉要道"

当你从单个 LLM Agent 扩展到 Multi-Agent 系统时，第一个出现的架构难题往往不是"Agent 怎么写"，而是**"任务来了，交给谁"**。

想象一个智能客服系统：
- **意图识别 Agent**：负责理解用户诉求
- **订单查询 Agent**：对接订单数据库
- **售后处理 Agent**：处理退换货逻辑
- **情感安抚 Agent**：处理投诉和情绪

用户说一句"我上周买的手机坏了，很生气，想退货"，这句话需要拆成至少三个子任务，涉及多个 Agent 的协作。谁来拆？按什么顺序执行？如果订单查询超时怎么办？如果售后 Agent 返回的结果不完整，谁来补全？

这就是**任务路由（Task Routing）**要解决的问题。它处于系统的"调度中枢"位置，直接决定了：
1. **响应延迟**：路由决策本身不能成为瓶颈
2. **资源利用率**：Agent 是否被均匀调用，避免热点
3. **容错能力**：某个 Agent 失败时，系统能否优雅降级
4. **扩展性**：新增 Agent 时，路由逻辑是否需要重写

---

## 二、静态分配：简单直接，但很快遇到天花板

### 2.1 预定义路由表（Hard-coded Routing）

最直观的做法是维护一张路由映射表：

```python
ROUTER = {
    "order_query": ["intent_agent", "order_agent"],
    "refund": ["intent_agent", "order_agent", "aftersales_agent"],
    "complaint": ["intent_agent", "emotion_agent", "aftersales_agent"]
}
```

**适用场景**：任务类型有限、流程固定、对延迟极度敏感（如嵌入式设备）。

**致命缺陷**：
- 无法处理**边界情况**：用户说"我想查查订单，顺便问问怎么退货"——这属于哪一类？
- 新增 Agent 时，路由表需要人工维护，容易遗漏组合路径
- 没有负载感知，某个 Agent 被频繁调用导致排队，路由层浑然不觉

### 2.2 规则引擎路由（Rule-based Routing）

用 DSL 或配置文件描述路由规则：

```yaml
routing_rules:
  - condition: "intent == 'order' AND sentiment < 0.3"
    agents: ["emotion_agent", "order_agent"]
    order: sequential
    
  - condition: "intent == 'refund' AND order_value > 1000"
    agents: ["order_agent", "senior_aftersales_agent"]
    order: sequential
```

这比硬编码稍好，但本质上仍是**"人写规则，机器执行"**。当业务复杂度上升，规则之间会相互冲突，维护成本指数级增长。

**静态分配的核心问题**：它假设任务类型是**可穷举、可预分类**的。但在真实场景中，用户输入是开放域的，Agent 能力也在不断演进。静态路由就像一个没有导航系统的城市——路修好了，但车不知道怎么走最顺畅。

---

## 三、动态编排：让系统自己决定"谁来干"

动态路由的核心思想是：**路由决策本身也是一个任务，应该由具备推理能力的组件来完成**。这个组件可以是一个轻量级的 LLM，也可以是一套基于向量的匹配系统。

### 3.1 ReAct 模式：边想边干

ReAct（Reasoning + Acting）将路由决策嵌入到 Agent 的每一步执行中：

```
Thought: 用户想退货，我需要先查订单状态。
Action: 调用 order_agent(query="订单状态")
Observation: 订单已发货，在途。
Thought: 在途订单退货需要先拦截物流，我应该调用 logistics_agent。
Action: 调用 logistics_agent(action="拦截", order_id="12345")
...
```

**在 Multi-Agent 场景下的路由实现**：

ReAct 天然适合**链式路由（Chain Routing）**。每个 Agent 执行完自己的任务后，通过 Thought 推理下一步该调用哪个 Agent。系统不需要集中式的路由器，路由逻辑分散在每个 Agent 的 Prompt 中。

**优点**：
- 极强的灵活性，能处理复杂的多跳推理
- 不需要预先定义完整的执行图

**缺点与工程陷阱**：
- **级联延迟**：每一步都要走一次 LLM 推理，10 步链路就是 10 次 LLM 调用，延迟不可接受
- **级联错误**：第二步推理错了，后面全错，且没有全局回滚机制
- **Prompt 膨胀**：每个 Agent 的 Prompt 都要包含"其他 Agent 的能力描述"，新增 Agent 时要改 N 个 Prompt

**工程建议**：ReAct 适合**短链路（≤3 步）、高不确定性**的场景。对于长链路，需要在 ReAct 之上加一层"预规划"来减少实时推理次数。

### 3.2 Plan-and-Solve：先规划，后执行

与 ReAct 的"边走边看"不同，Plan-and-Solve 采用**两阶段架构**：

```
Phase 1 - 规划（Planner）：
  输入：用户原始请求 + 所有 Agent 的能力描述
  输出：执行计划（DAG 或线性序列）
  
  示例输出：
  1. intent_agent: 解析用户意图 → 输出: intent_json
  2. order_agent: 查询订单（依赖 intent_json.order_id）→ 输出: order_info
  3. parallel:
     - aftersales_agent: 判断退货资格（依赖 order_info）
     - emotion_agent: 生成安抚话术（依赖 intent_json.sentiment）
  4. merge_agent: 合并结果，生成最终回复
```

```
Phase 2 - 执行（Executor）：
  按 DAG 拓扑序调度 Agent，处理依赖和并行
```

**路由层在此架构中的角色**：

Planner 就是**动态路由器**。它通常由一个专门的 LLM（或更小的规划模型）担任，每次收到任务时实时生成执行计划。

**优点**：
- **全局最优**：一次规划能看到完整链路，避免 ReAct 的局部贪婪问题
- **可并行化**：DAG 结构让执行器能自动识别可并行步骤
- **可验证**：计划生成后可以人工审查或做静态检查（如循环检测）

**缺点**：
- **规划质量依赖 Planner 的能力**：如果 Planner 对某个 Agent 的能力理解有误，会生成不可执行的计划
- **规划开销**：复杂任务可能需要多次规划迭代

**工程建议**：
- Planner 的 Prompt 要包含所有 Agent 的**结构化能力描述**（名称、输入 Schema、输出 Schema、适用场景），而非自然语言描述
- 对生成的计划做**Schema 校验**：检查输入输出依赖是否匹配，防止运行时类型错误
- 引入**计划缓存**：相似请求的计划可以复用，减少重复规划开销

### 3.3 基于 LLM 的路由决策：从"黑盒调用"到"语义匹配"

Plan-and-Solve 的 Planner 是一个粗粒度路由器——它决定"用哪些 Agent 以及顺序"。更细粒度的路由是**单步路由（Single-step Routing）**：给定一个子任务，从候选 Agent 中选择最合适的一个。

#### 方案 A：描述匹配路由

将每个 Agent 的能力描述嵌入为向量，子任务也嵌入为向量，通过语义相似度选择最匹配的 Agent。

```python
# 伪代码
task_embedding = embed("查询用户最近一笔订单的状态")
agent_embeddings = {
    "order_agent": embed("处理订单查询、订单状态跟踪"),
    "payment_agent": embed("处理支付问题、退款查询"),
    "logistics_agent": embed("处理物流跟踪、配送问题")
}

# 选择余弦相似度最高的 Agent
selected_agent = argmax(cosine_similarity(task_embedding, agent_embeddings))
```

**适用场景**：Agent 数量较多（>10），且能力边界相对清晰。

**局限**：无法处理**多 Agent 协作**场景（一个子任务可能需要多个 Agent 共同完成）。

#### 方案 B：LLM-as-Router

直接用 LLM 做路由决策，Prompt 设计如下：

```
你是一个任务路由器。请将以下子任务分配给最合适的 Agent。

可用 Agent：
1. order_agent: 查询订单信息，输入 {order_id}, 输出 {order_status, items}
2. payment_agent: 查询支付记录，输入 {order_id}, 输出 {payment_status, amount}
3. aftersales_agent: 处理售后申请，输入 {order_id, reason}, 输出 {refund_eligible, process}

子任务：用户说"我上周买的手机想退，订单号是 12345"

请输出 JSON：
{
  "selected_agents": ["order_agent", "aftersales_agent"],
  "reasoning": "需要先查询订单确认存在，再判断退货资格",
  "execution_order": "sequential",
  "fallback_agent": "customer_service_agent"
}
```

**关键设计点**：
- **强制输出 Schema**：用 JSON Schema 约束输出，避免 LLM 胡言乱语导致解析失败
- **置信度阈值**：如果 LLM 对选择不确定（如 top-2 概率接近），可以触发**人工审核**或**降级到通用 Agent**
- **Few-shot 示例**：在 Prompt 中给 3-5 个路由决策的示例，显著提升准确率

**延迟优化**：路由决策本身应该快。不要用 GPT-4 做路由，用 GPT-3.5-turbo 或更小的模型（如 Llama-3-8B）即可。路由是**高频、低复杂度**的决策，不需要最强的推理能力。

---

## 四、工程落地：路由层必须考虑的四个硬问题

### 4.1 负载均衡：别让一个 Agent 累垮

即使路由决策正确，如果所有查询类请求都打到 `order_agent`，它也会成为瓶颈。

**策略 1：Agent 水平扩展 + 路由层负载感知**

```python
class LoadAwareRouter:
    def route(self, task, candidate_agents):
        # 过滤掉当前负载过高的 Agent
        available = [a for a in candidate_agents if a.queue_depth < threshold]
        if not available:
            # 触发降级或排队
            return self.fallback_or_queue(task)
        
        # 在可用 Agent 中选择语义最匹配的
        return self.semantic_select(task, available)
```

**策略 2：任务分片**

对于可以并行化的任务（如"总结这 100 篇用户反馈"），路由层将任务拆分为 10 个子任务，分发给 10 个相同的 `summarizer_agent` 实例，最后合并结果。

### 4.2 失败回退：优雅降级比完美执行更重要

Agent 调用失败是常态，不是异常。路由层必须设计**多层级回退**：

```
Level 1: 同 Agent 重试（指数退避）
  ↓ 失败
Level 2: 切换到备用 Agent（如主模型挂了切到备用模型）
  ↓ 失败
Level 3: 简化任务重新路由（如复杂分析降级为简单检索）
  ↓ 失败
Level 4: 返回预设的兜底回复 + 人工介入标记
```

**关键实现**：

```python
@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=4, max=10))
def invoke_agent(agent, task):
    return agent.execute(task)

def route_with_fallback(task, primary_agent, fallback_chain):
    try:
        return invoke_agent(primary_agent, task)
    except AgentUnavailable:
        for fallback_agent in fallback_chain:
            try:
                # 可能需要对任务做简化转换
                simplified_task = simplify_for_agent(task, fallback_agent)
                return invoke_agent(fallback_agent, simplified_task)
            except AgentUnavailable:
                continue
    return default_response(task)
```

**特别注意**：回退不是简单的"换个人再试一次"。不同 Agent 的输入输出 Schema 可能不同，路由层需要负责**任务转换（Task Adaptation）**。

### 4.3 超时与熔断：防止级联故障

在 Multi-Agent 链路中，一个 Agent 的延迟会传导到整个链路。

**熔断器模式（Circuit Breaker）**：

```python
class CircuitBreaker:
    def __init__(self, failure_threshold=5, recovery_timeout=30):
        self.failures = 0
        self.state = "CLOSED"  # CLOSED, OPEN, HALF_OPEN
    
    def call(self, agent, task):
        if self.state == "OPEN":
            if time_since_last_failure > self.recovery_timeout:
                self.state = "HALF_OPEN"
            else:
                raise CircuitOpen("Agent temporarily unavailable")
        
        try:
            result = agent.execute(task)
            if self.state == "HALF_OPEN":
                self.state = "CLOSED"
                self.failures = 0
            return result
        except Exception:
            self.failures += 1
            if self.failures >= self.failure_threshold:
                self.state = "OPEN"
            raise
```

**超时设计**：
- 每个 Agent 调用设置**独立超时**（如 5s）
- 整个链路设置**全局超时**（如 30s）
- 超时后触发快速失败，不要阻塞等待

### 4.4 可观测性：路由决策必须可审计

Multi-Agent 系统的调试难度远高于单 Agent，因为错误可能出在任何一个环节。路由层必须输出详细的**路由轨迹（Routing Trace）**：

```json
{
  "trace_id": "trace_abc123",
  "routing_decisions": [
    {
      "step": 1,
      "task": "解析用户意图",
      "selected_agent": "intent_agent",
      "confidence": 0.95,
      "latency_ms": 1200,
      "status": "success",
      "output_summary": "intent: refund, sentiment: negative"
    },
    {
      "step": 2,
      "task": "查询订单 12345",
      "selected_agent": "order_agent",
      "confidence": 0.92,
      "latency_ms": 800,
      "status": "success"
    },
    {
      "step": 3,
      "task": "判断退货资格",
      "selected_agent": "aftersales_agent",
      "confidence": 0.78,
      "latency_ms": 5000,
      "status": "timeout",
      "fallback_triggered": "simplified_rule_agent",
      "fallback_latency_ms": 300
    }
  ]
}
```

这套轨迹数据是后续**路由策略优化**的基础。例如，你可以定期分析：
- 哪些 Agent 经常被选为 fallback？说明它的能力描述可能过于宽泛
- 哪些路由决策的置信度长期偏低？说明 Planner 对该类任务理解不足
- 哪些链路延迟最高？考虑增加并行或优化 Agent 实现

---

## 五、选型建议：没有银弹，只有 trade-off

| 维度 | 静态路由 | ReAct 动态路由 | Plan-and-Solve | LLM-as-Router |
|------|---------|---------------|----------------|---------------|
| **实现复杂度** | 低 | 中 | 中高 | 中 |
| **灵活性** | 低 | 高 | 高 | 高 |
| **延迟** | 极低 | 高（级联） | 中（规划+执行） | 低（单步） |
| **可解释性** | 高 | 中 | 高 | 中 |
| **容错性** | 低 | 中 | 高（全局视角） | 高 |
| **适用任务长度** | 任意 | 短链路（≤3步） | 长链路/复杂 DAG | 单步决策 |
| **最佳场景** | 固定流程 | 探索性任务 | 复杂多步任务 | Agent 数量多 |

**我的建议**：

1. **起步期**（2-5 个 Agent，流程相对固定）：用 **Plan-and-Solve + 规则兜底**。Planner 做主要决策，对常见路径用规则缓存，保证稳定性。

2. **成长期**（5-20 个 Agent，流程多变）：引入 **LLM-as-Router 做单步路由**，配合 **负载均衡和熔断器**。Plan-and-Solve 负责粗粒度规划，LLM Router 负责细粒度选择。

3. **成熟期**（20+ Agent，高并发）：路由层需要**混合架构**——向量检索做快速初筛，小模型 LLM 做精确选择，规则引擎做兜底。同时建立**路由决策的反馈闭环**：根据执行结果自动优化 Planner 的 Prompt。

---

## 六、写在最后

Multi-Agent 系统的任务路由，本质上是在**灵活性**与**可控性**之间寻找平衡。静态路由太死板，纯动态路由太不可控。工程上的最佳实践往往是**分层路由**：外层用动态规划确定"走哪条路"，内层用静态规则或轻量模型确定"每一步踩哪个脚印"。

路由层的设计质量，直接决定了你的 Multi-Agent 系统是"能跑的 Demo"还是"能扛的生产系统"。投入时间设计好这一层，比优化单个 Agent 的 Prompt 更有长期价值。

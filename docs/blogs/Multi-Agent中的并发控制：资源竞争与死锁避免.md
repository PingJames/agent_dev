# Multi-Agent 中的并发控制：资源竞争与死锁避免

> 当多个 Agent 同时争抢一个数据库连接池，或者 A 等 B、B 等 C、C 又等 A 时，你的系统不是"智能"了，而是"僵死"了。

---

## 一、为什么 Multi-Agent 系统必须正视并发问题？

在后端开发中，并发控制是必修课。但当我们把单体服务拆成多个自治 Agent（每个都能自主决策、调用工具、读写状态）时，问题从**"线程安全"**升级成了**"分布式资源协调"**。

想象这样一个场景：

- **Agent-A** 正在执行 `update_inventory`，需要锁定商品库存表；
- **Agent-B** 同时执行 `create_order`，也需要读同一张表做库存校验；
- **Agent-C** 的 `generate_report` 任务触发了全表扫描；
- 三个 Agent 共享同一个数据库连接池，池大小只有 10。

没有并发控制，结果不是"偶尔慢一点"，而是**连接池耗尽 → 所有 Agent 阻塞 → 心跳超时 → 编排器误判 Agent 死亡 → 重启 Agent → 进一步争抢资源**的死亡螺旋。

Multi-Agent 系统的并发问题，本质上是**多租户 + 分布式事务 + 异步执行**的三重叠加。

---

## 二、核心问题域：从资源竞争到死锁

### 2.1 资源竞争（Race Condition）

最常见的三类资源竞争：

| 资源类型 | 典型冲突场景 | 后果 |
|---------|-----------|------|
| **数据库连接** | 高并发工具调用耗尽连接池 | 全系统阻塞 |
| **文件/对象存储** | 多个 Agent 同时写同一文件 | 数据覆盖或损坏 |
| **外部 API 配额** | 超出第三方速率限制 | 触发限流，任务失败 |
| **共享状态/缓存** | Agent-A 读、Agent-B 写同一 Key | 脏读、幻读 |

### 2.2 死锁（Deadlock）

死锁在 Multi-Agent 系统中往往以**循环依赖**的形式出现：

```
Agent-A 持有 Lock-X，等待 Agent-B 释放 Lock-Y
Agent-B 持有 Lock-Y，等待 Agent-C 释放 Lock-Z  
Agent-C 持有 Lock-Z，等待 Agent-A 释放 Lock-X
```

更隐蔽的是**消息循环等待**：Agent-A 向 Agent-B 发送请求并同步等待响应，同时 Agent-B 也向 Agent-A 发送了另一个请求并同步等待响应。两者互相等待，形成分布式死锁。

---

## 三、Agent 级别的锁机制

### 3.1 分布式锁：Agent 互斥的基石

当多个 Agent 需要互斥访问共享资源时，分布式锁是第一道防线。

**基于 Redis Redlock 的实现思路：**

```python
import redis
import uuid
import time
from contextlib import contextmanager

class AgentDistributedLock:
    def __init__(self, redis_client: redis.Redis, lock_key: str, 
                 ttl_seconds: int = 30, agent_id: str = None):
        self.redis = redis_client
        self.lock_key = f"agent_lock:{lock_key}"
        self.ttl = ttl_seconds
        self.agent_id = agent_id or str(uuid.uuid4())
        self._token = None
    
    def acquire(self, blocking: bool = True, timeout: float = None) -> bool:
        """获取锁，支持阻塞与非阻塞模式"""
        end_time = time.time() + timeout if timeout else None
        
        while True:
            # NX: 仅当 key 不存在时才设置；EX: 设置过期时间
            acquired = self.redis.set(
                self.lock_key, 
                self.agent_id, 
                nx=True, 
                ex=self.ttl
            )
            if acquired:
                self._token = self.agent_id
                return True
            
            if not blocking:
                return False
            
            if end_time and time.time() > end_time:
                return False
            
            time.sleep(0.1)  # 自旋等待，避免 Redis 压力
    
    def release(self):
        """释放锁 —— 必须校验 token，防止误删"""
        if not self._token:
            return
        
        # 使用 Lua 脚本保证原子性：检查值是否匹配，匹配才删除
        lua_script = """
        if redis.call("get", KEYS[1]) == ARGV[1] then
            return redis.call("del", KEYS[1])
        else
            return 0
        end
        """
        self.redis.eval(lua_script, 1, self.lock_key, self._token)
        self._token = None
    
    @contextmanager
    def __call__(self, *args, **kwargs):
        """支持 with 语句"""
        if not self.acquire(*args, **kwargs):
            raise TimeoutError(f"无法获取锁: {self.lock_key}")
        try:
            yield self
        finally:
            self.release()
```

**关键设计点：**

1. **锁粒度**：按资源维度加锁（如 `agent_lock:inventory:sku_12345`），而非全局锁。粗粒度锁会严重降低并发度。
2. **锁续期（Watchdog）**：如果 Agent 执行任务超过 TTL，需要后台线程自动续期，防止任务执行到一半锁被释放。
3. **谁加谁解**：通过 `agent_id` 作为 token，确保只有持有锁的 Agent 能释放。

### 3.2 乐观锁：减少锁持有时间

对于读多写少的场景（如配置读取、缓存查询），乐观锁比分布式锁更高效。

```python
class OptimisticLock:
    """基于版本号的乐观锁"""
    
    def update_with_version(self, resource_key: str, update_fn):
        max_retries = 3
        
        for attempt in range(max_retries):
            # 读取当前版本
            current = self.store.get(resource_key)
            version = current.get("_version", 0)
            
            # 执行业务逻辑
            new_data = update_fn(current)
            new_data["_version"] = version + 1
            
            # CAS（Compare-And-Swap）写入
            success = self.store.compare_and_swap(
                resource_key, 
                expected_version=version,
                new_value=new_data
            )
            
            if success:
                return new_data
            
            # 版本冲突，重试
            time.sleep(0.05 * (2 ** attempt))  # 指数退避
        
        raise ConcurrentUpdateError(f"资源 {resource_key} 并发更新冲突")
```

**适用场景**：Agent 批量更新任务状态、累加统计指标等。

### 3.3 锁的层级与死锁预防

当 Agent 需要同时获取多把锁时，必须遵循**全局顺序加锁**原则：

```python
class MultiResourceLock:
    def acquire_all(self, resource_keys: list[str]):
        """按字典序排序后依次加锁，避免循环等待"""
        sorted_keys = sorted(set(resource_keys))
        
        acquired = []
        try:
            for key in sorted_keys:
                lock = AgentDistributedLock(self.redis, key)
                if not lock.acquire(blocking=True, timeout=10):
                    raise TimeoutError(f"获取锁 {key} 超时")
                acquired.append(lock)
            return acquired
        except Exception:
            # 发生异常时，按逆序释放已获取的锁
            for lock in reversed(acquired):
                lock.release()
            raise
```

这是预防死锁的**最实用策略**：所有 Agent 对同一组资源按固定顺序加锁，循环等待条件自然被打破。

---

## 四、工具调用的排队策略

Agent 调用外部工具（数据库、API、文件系统）时，如果不加控制，瞬间的并发峰值会直接压垮下游服务。

### 4.1 令牌桶限流（Token Bucket）

为每个工具或工具类型配置独立的速率限制：

```python
import time
from threading import Lock

class ToolRateLimiter:
    def __init__(self, capacity: int, refill_rate: float):
        """
        capacity: 桶容量（最大突发请求数）
        refill_rate: 每秒填充的令牌数
        """
        self.capacity = capacity
        self.tokens = float(capacity)
        self.refill_rate = refill_rate
        self.last_refill = time.time()
        self._lock = Lock()
    
    def acquire(self, tokens: int = 1, blocking: bool = True, 
                timeout: float = None) -> bool:
        deadline = time.time() + timeout if timeout else None
        
        while True:
            with self._lock:
                now = time.time()
                # 补充令牌
                elapsed = now - self.last_refill
                self.tokens = min(
                    self.capacity, 
                    self.tokens + elapsed * self.refill_rate
                )
                self.last_refill = now
                
                if self.tokens >= tokens:
                    self.tokens -= tokens
                    return True
            
            if not blocking:
                return False
            
            if deadline and time.time() > deadline:
                return False
            
            time.sleep(0.01)
```

**配置示例**：

```python
# 为不同工具设置不同的限流策略
TOOL_LIMITERS = {
    "search_database": ToolRateLimiter(capacity=5, refill_rate=2),    # 数据库：保守
    "call_openai_api": ToolRateLimiter(capacity=20, refill_rate=10), # LLM API：中等
    "read_local_file": ToolRateLimiter(capacity=100, refill_rate=50), # 本地文件：宽松
}
```

### 4.2 优先级队列：区分紧急与后台任务

不是所有 Agent 任务都同等重要。引入优先级队列，确保关键路径优先执行：

```python
import heapq
from dataclasses import dataclass, field
from typing import Any
import threading

@dataclass(order=True)
class PrioritizedTask:
    priority: int  # 数值越小优先级越高
    seq: int       # 同优先级时按 FIFO
    task: Any = field(compare=False)

class ToolCallQueue:
    def __init__(self, max_concurrent: int = 3):
        self.queue = []
        self.seq_counter = 0
        self.lock = threading.Lock()
        self.sem = threading.Semaphore(max_concurrent)  # 并发度控制
    
    def submit(self, task_fn, priority: int = 5) -> Any:
        """
        priority: 
          1 = 关键路径（如用户实时请求）
          3 = 普通业务
          5 = 后台任务（如日志归档）
        """
        with self.lock:
            self.seq_counter += 1
            item = PrioritizedTask(priority, self.seq_counter, task_fn)
            heapq.heappush(self.queue, item)
        
        # 等待执行许可
        self.sem.acquire()
        try:
            with self.lock:
                current = heapq.heappop(self.queue)
            return current.task()
        finally:
            self.sem.release()
```

**实战建议**：

- **用户交互类 Agent**（如对话 Agent）设为最高优先级；
- **数据分析类 Agent**（如报表生成）设为低优先级，允许延迟；
- **同优先级内严格 FIFO**，防止低优先级任务饿死。

### 4.3 背压（Backpressure）：向上游反馈压力

当工具队列堆积超过阈值时，不要默默排队，而是**主动拒绝或减速**：

```python
class ToolCallQueue:
    def submit(self, task_fn, priority: int = 5):
        if len(self.queue) > self.max_queue_size:
            # 根据优先级决策：低优先级直接拒绝，高优先级等待
            if priority >= 3:
                raise QueueFullError("工具调用队列已满，请稍后重试")
            # 高优先级任务允许短暂等待
            time.sleep(0.5)
        
        # ... 正常入队逻辑
```

---

## 五、循环依赖检测

死锁的四个必要条件（互斥、占有且等待、不可抢占、循环等待）中，前三个在 Multi-Agent 系统中往往难以消除，因此**打破循环等待**是最可行的策略。

### 5.1 构建 Agent 依赖图

每次 Agent 间发生同步调用（请求-等待响应）时，记录依赖边：

```python
class DependencyTracker:
    def __init__(self):
        self.graph = {}  # caller_id -> set(callee_ids)
        self.lock = threading.RLock()
    
    def record_call(self, caller: str, callee: str):
        """记录一次同步调用关系"""
        with self.lock:
            if caller not in self.graph:
                self.graph[caller] = set()
            self.graph[caller].add(callee)
            
            # 每次新增边后立即检测环
            if self._has_cycle():
                self.graph[caller].remove(callee)
                raise CircularDependencyError(
                    f"检测到循环依赖: {caller} -> {callee}"
                )
    
    def _has_cycle(self) -> bool:
        """DFS 检测有向图中的环"""
        WHITE, GRAY, BLACK = 0, 1, 2
        color = {node: WHITE for node in self.graph}
        
        def dfs(node):
            color[node] = GRAY
            for neighbor in self.graph.get(node, []):
                if color.get(neighbor, WHITE) == GRAY:
                    return True  # 发现回边，存在环
                if color.get(neighbor, WHITE) == WHITE and dfs(neighbor):
                    return True
            color[node] = BLACK
            return False
        
        for node in self.graph:
            if color[node] == WHITE:
                if dfs(node):
                    return True
        return False
```

### 5.2 调用超时：给死锁设一个"保质期"

即使依赖图没有环，网络延迟或 Agent 崩溃也会导致无限等待。**所有同步调用必须设置超时**：

```python
import concurrent.futures

def call_agent_with_timeout(agent, message, timeout_seconds: float = 5.0):
    with concurrent.futures.ThreadPoolExecutor() as executor:
        future = executor.submit(agent.process, message)
        try:
            return future.result(timeout=timeout_seconds)
        except concurrent.futures.TimeoutError:
            # 超时后取消任务，释放等待资源
            future.cancel()
            raise AgentTimeoutError(f"Agent {agent.id} 响应超时")
```

### 5.3 异步消息 vs 同步 RPC

从根本上减少死锁风险，应**优先使用异步消息**替代同步调用：

```python
# ❌ 高风险：同步阻塞调用
result = agent_b.handle(request)  # 当前线程阻塞等待

# ✅ 推荐：异步消息 + 回调/Correlation ID
message_bus.send(
    to="agent_b",
    payload=request,
    reply_to="agent_a",
    correlation_id=req_id
)
# 当前线程立即返回，不持有任何等待资源
```

只有当确实需要即时结果且超时可控时，才使用同步模式。

---

## 六、超时与熔断：防止级联故障

### 6.1 分层超时策略

Multi-Agent 系统中，超时不能只有一个全局值，而应**分层设置**：

```
用户请求总超时: 30s
  └── 编排层超时: 25s
        └── Agent 任务超时: 20s
              └── 单次工具调用超时: 5s
                    └── 网络连接超时: 3s
```

每一层都保留缓冲，确保上层能在下层超时后有机会做降级处理。

```python
@dataclass
class TimeoutConfig:
    connect: float = 3.0      # TCP 连接建立
    read: float = 5.0       # 单次请求响应
    tool_call: float = 10.0  # 工具完整执行（含重试）
    agent_task: float = 20.0 # Agent 单任务
    workflow: float = 25.0  # 整个工作流

def call_tool_with_timeouts(tool, config: TimeoutConfig):
    start = time.time()
    
    try:
        with socket.create_connection(
            (tool.host, tool.port), 
            timeout=config.connect
        ) as sock:
            sock.settimeout(config.read)
            return tool.execute(sock)
    except socket.timeout:
        elapsed = time.time() - start
        if elapsed > config.tool_call:
            raise ToolTimeoutError("工具调用总超时")
        # 允许有限重试
        return retry_with_backoff(tool, max_time=config.tool_call - elapsed)
```

### 6.2 熔断器（Circuit Breaker）

当某个工具连续失败时，继续重试只会浪费资源并拖垮系统。熔断器在失败率达到阈值时**快速失败**：

```python
from enum import Enum, auto

class CircuitState(Enum):
    CLOSED = auto()      # 正常通过
    OPEN = auto()        # 熔断，快速失败
    HALF_OPEN = auto()   # 试探性放行

class CircuitBreaker:
    def __init__(self, failure_threshold: int = 5, 
                 recovery_timeout: float = 30.0,
                 half_open_max_calls: int = 3):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.half_open_max = half_open_max_calls
        
        self.state = CircuitState.CLOSED
        self.failures = 0
        self.last_failure_time = None
        self.half_open_calls = 0
        self.lock = threading.Lock()
    
    def call(self, fn, *args, **kwargs):
        with self.lock:
            if self.state == CircuitState.OPEN:
                if time.time() - self.last_failure_time > self.recovery_timeout:
                    self.state = CircuitState.HALF_OPEN
                    self.half_open_calls = 0
                else:
                    raise CircuitOpenError("熔断器开启，服务暂时不可用")
            
            if self.state == CircuitState.HALF_OPEN:
                if self.half_open_calls >= self.half_open_max:
                    raise CircuitOpenError("半开状态配额已满")
                self.half_open_calls += 1
        
        try:
            result = fn(*args, **kwargs)
            self._on_success()
            return result
        except Exception as e:
            self._on_failure()
            raise
    
    def _on_success(self):
        with self.lock:
            if self.state == CircuitState.HALF_OPEN:
                self.state = CircuitState.CLOSED
                self.failures = 0
            else:
                self.failures = max(0, self.failures - 1)
    
    def _on_failure(self):
        with self.lock:
            self.failures += 1
            self.last_failure_time = time.time()
            
            if self.failures >= self.failure_threshold:
                self.state = CircuitState.OPEN
                print(f"[CircuitBreaker] 熔断开启，连续失败 {self.failures} 次")
```

**熔断后的降级策略**：

- **数据库查询熔断**：返回缓存数据或默认值；
- **LLM API 熔断**：切换备用模型或返回模板回复；
- **文件写入熔断**：暂存到本地队列，稍后重试。

---

## 七、实战架构建议

将上述机制整合到一个 Agent 执行框架中：

```
┌─────────────────────────────────────────────┐
│              Agent Orchestrator             │
│         (工作流调度 / 依赖检测)                │
└──────────────┬──────────────────────────────┘
               │
    ┌──────────┴──────────┐
    ▼                     ▼
┌─────────┐         ┌─────────────┐
│ Agent-A │         │   Agent-B   │
│(任务执行)│         │  (任务执行)  │
└────┬────┘         └──────┬──────┘
     │                     │
     ▼                     ▼
┌─────────────────────────────────────────────┐
│          Tool Call Gateway                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ 限流器   │  │ 优先级队列│  │ 熔断器   │  │
│  │(Token   │  │(Priority │  │(Circuit │  │
│  │ Bucket) │  │ Queue)  │  │ Breaker)│  │
│  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────┘
     │                     │
     ▼                     ▼
┌─────────┐         ┌─────────────┐
│Database │         │ External API│
│(分布式锁)│         │  (配额控制)  │
└─────────┘         └─────────────┘
```

**关键原则**：

1. **防御性编程**：假设任何 Agent 都可能崩溃、任何工具都可能超时；
2. **快速失败**：不要无限重试，设置明确的超时和重试上限；
3. **可观测性**：记录每一次锁获取、队列等待、熔断触发，便于事后分析；
4. **优雅降级**：核心路径必须能在依赖故障时继续提供有限服务。

---

## 八、总结

Multi-Agent 系统的并发控制，不是"加个锁"就能解决的简单问题，而是一套**从资源隔离、调度策略到故障容错的系统工程**。

| 问题 | 核心策略 | 关键实现 |
|-----|---------|---------|
| 资源竞争 | 分布式锁 + 乐观锁 | Redis Redlock、版本号 CAS |
| 并发峰值 | 排队 + 限流 | 优先级队列、令牌桶 |
| 死锁 | 打破循环等待 | 全局顺序加锁、依赖图检测、异步消息 |
| 级联故障 | 超时 + 熔断 | 分层超时、Circuit Breaker |

对于从后端转型 Multi-Agent 开发的工程师来说，好消息是**分布式系统的经典理论依然适用**；坏消息是**Agent 的自治性让问题更难预测**。把并发控制做扎实，你的 Multi-Agent 系统才能在"智能"的同时保持"稳定"。

---

> **写在最后**：Agent 越智能，越需要枷锁。这不是限制，而是为了让它们在正确的轨道上跑得更快。
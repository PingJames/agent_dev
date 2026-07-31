import type { InterviewQuestionItem } from "@/lib/types";

// ============================================================
// 四、Agent开发与工具调用 Q41-Q55
// ============================================================
export const agentQuestions: InterviewQuestionItem[] = [
  {
    slug: "q41-agent-framework",
    qNumber: 41,
    title: "什么是AI Agent？LLM Agent的核心架构包括哪些组件？",
    question: "什么是AI Agent？LLM Agent的核心架构包括哪些组件？",
    answer: `AI Agent是能自主感知环境、制定计划、调用工具、执行行动并基于反馈迭代优化的智能实体

**核心组件**：

- **LLM大脑**：核心推理引擎，理解输入、分解任务、决定下一步行动
- **规划模块 (Planning)**：将复杂目标分解为子任务序列（Task Decomposition）；执行时动态反思和调整
- **记忆系统 (Memory)**：
  - 短期记忆（上下文窗口中的对话历史）
  - 长期记忆（向量数据库中的历史经验、知识）
- **工具使用 (Tool Use)**：调用外部工具（搜索引擎、计算器、数据库、API）获取信息或执行操作
- **执行模块 (Action)**：将LLM的决策转为实际调用，管理工具执行结果

**代表性框架**：LangChain Agent、AutoGPT（早期）、MetaGPT、CrewAI`,
    category: "Agent开发与工具调用",
    tags: ["Agent", "LLM", "架构"],
    difficulty: "easy",
    dimension: "engineering",
  },
  {
    slug: "q42-agent-planning",
    qNumber: 42,
    title: "Agent的规划（Planning）有哪些主流方法？ReAct模式是什么？",
    question: "Agent的规划（Planning）有哪些主流方法？ReAct模式是什么？",
    answer: `**ReAct (Reasoning + Acting)**：

- 核心循环：Thought（思考下一步做什么） -> Action（执行工具调用） -> Observation（观察工具返回） -> 循环
- 模型交替进行推理和行动，推理指导行动，行动结果反馈推理
- 优势：过程可解释（每步有Thought），错误可追踪，行动有依据

**其他规划方法**：

- **Plan-and-Execute**：先一次性生成完整计划，再逐步执行
- **Tree-of-Thought (ToT)**：多路径探索，树搜索最优解
- **Reflexion**：每步行动后自我反思和评价，根据反思调整下一步
- **HuggingGPT**：用ChatGPT作为调度器，管理多个HuggingFace专家模型

**工程选择**：

- 简单的2-3步任务 -> ReAct够用
- 复杂的多步任务 -> Plan-and-Execute+ReAct混合
- 需要高质量的 -> ToT但成本高，只在关键决策场景使用`,
    category: "Agent开发与工具调用",
    tags: ["ReAct", "规划", "Agent"],
    difficulty: "medium",
    dimension: "engineering",
  },
  {
    slug: "q43-tool-definition",
    qNumber: 43,
    title: "如何为Agent设计工具（Tool）？一个好的Tool Definition包含哪些要素？",
    question: "如何为Agent设计工具（Tool）？一个好的Tool Definition包含哪些要素？",
    answer: `**Tool Definition要素**：

- **名称**：简洁明了（如「search_web」、「query_database」、「send_email」）
- **描述**：用自然语言说明工具的功能、使用场景和限制
- **参数Schema**：每个参数的名称、类型、描述、是否必选（JSON Schema格式）
- **返回值说明**：返回什么类型的数据，格式是什么样的

**设计原则**：

- **原子化**：一个工具只做一件事（单一职责原则）
- **好描述 > 多参数**：让LLM通过描述理解何时用、怎么用
- **描述应详细**：在描述中提供工具的使用场景和示例
- **错误处理**：工具返回标准化错误信息（LLM据此决定重试还是放弃）
- **幂等性**：能安全重试的工具（查询类天然幂等，写操作需要去重保护）

**示例Tool Definition**（Function Calling格式）：
\`\`\`json
{
  "name": "get_weather",
  "description": "获取指定城市的天气信息。使用场景：用户询问天气时使用。",
  "parameters": {
    "type": "object",
    "properties": {
      "city": {"type": "string", "description": "城市名称，如北京、上海"}
    },
    "required": ["city"]
  }
}
\`\`\``,
    category: "Agent开发与工具调用",
    tags: ["Tool", "Function Calling", "Schema"],
    difficulty: "medium",
    dimension: "engineering",
  },
  {
    slug: "q44-agent-memory",
    qNumber: 44,
    title: "Agent的记忆系统（Memory）如何设计？短期记忆和长期记忆的区别？",
    question: "Agent的记忆系统（Memory）如何设计？短期记忆和长期记忆的区别？",
    answer: `**短期记忆**：

- 对话历史（上下文窗口中的消息序列），受token数限制
- 管理策略：滑动窗口保留最近N轮对话；用LLM自动总结历史对话为摘要，释放窗口空间

**长期记忆**：

- 存储方式：向量数据库存储历史交互的Embedding
- 工作流程：新用户Query -> Embedding -> 检索长期记忆中最相关的历史经验 -> 与当前Query拼接 -> LLM推理
- 信息类型：用户偏好（「每次都问Python」）、历史成功行动（「上次用这个工具解决了」）、事实知识（「用户的数据库是MySQL」）

**设计考量**：

- **记忆衰减**：越久远的记忆权重越低
- **多会话持久化**：用户ID作为记忆Key，跨会话保留
- **隐私**：记忆内容加密存储，支持用户删除
- **成本**：每条记忆需要Embedding和检索，大规模时需优化`,
    category: "Agent开发与工具调用",
    tags: ["记忆系统", "向量数据库", "上下文"],
    difficulty: "medium",
    dimension: "engineering",
  },
  {
    slug: "q45-agent-debugging",
    qNumber: 45,
    title: "Agent在实际运行中常见的问题有哪些？如何调试和优化？",
    question: "Agent在实际运行中常见的问题有哪些？如何调试和优化？",
    answer: `**常见问题**：

- **行动循环**：Agent反复调用同一个工具但结果不变，陷入死循环
- **幻觉工具调用**：调用不存在的工具，或传递幻觉参数
- **提前终止**：任务未完成但Agent误认为已完成，提前结束
- **工具调用灾难**：一连串错误调用导致不可逆后果（如错误删除了数据）
- **过度思考**：简单问题做大量不必要的工具调用和推理步骤

**调试方案**：

- **日志追踪**：记录每一步(Thought, Action, Input, Observation)，全链路可回溯
- **调用限制**：设置最大工具调用次数（如5-10次），防止无限循环
- **沙箱环境**：高风险操作（删除、发送）先在人造沙箱环境验证
- **Timeout + Fallback**：每一步设置超时，失败后降级到简单回答
- **监控看板**：统计Agent调用成功率、平均步骤数、常见错误类型

**优化方案**：

- **更好的Tool Description**：如果Agent反复选错工具，优化工具的描述会更有效
- **Few-shot路径**：在System Prompt中给出常见任务的完整Action序列示例`,
    category: "Agent开发与工具调用",
    tags: ["Agent调试", "优化", "监控"],
    difficulty: "medium",
    dimension: "engineering",
  },
  {
    slug: "q46-multi-agent",
    qNumber: 46,
    title: "什么是多Agent协作（Multi-Agent）？有哪些主流框架？",
    question: "什么是多Agent协作（Multi-Agent）？有哪些主流框架？",
    answer: `多Agent系统由多个专业Agent（各自有不同的角色、工具、目标）协作完成复杂任务

**协作模式**：

- **顺序协作**：Agent A的输出 -> Agent B的输入（代码编写 -> 代码审查）
- **辩论/讨论**：多个Agent讨论同一问题，交换意见，达成共识
- **层级结构**：一个Planer Agent分配子任务给多个Worker Agent，汇总结果

**主流框架**：

- **MetaGPT**：用软件公司SOP编排多Agent（产品经理 -> 架构师 -> 工程师 -> QA），模拟完整开发流程
- **AutoGen（微软）**：灵活定义Agent角色和交互模式（对话、群聊）
- **CrewAI**：Role-based Agent协作，每个Agent有Role+Goal+Toolkit
- **ChatDev**：模拟3-5人小型软件开发团队

**适用场景**：

- 需要多种技能组合的复杂任务（软件开发 = 需求分析+编码+测试）
- 需要多方视角的决策（投资分析 = 基本面+技术面+风险评估）`,
    category: "Agent开发与工具调用",
    tags: ["Multi-Agent", "MetaGPT", "AutoGen"],
    difficulty: "hard",
    dimension: "engineering",
  },
  {
    slug: "q47-agent-safety",
    qNumber: 47,
    title: "Agent安全面临哪些新挑战？如何设计安全可控的Agent？",
    question: "Agent安全面临哪些新挑战？如何设计安全可控的Agent？",
    answer: `**Agent特有的安全风险**：

- **权限扩大**：Agent有工具调用能力，风险远超纯文本LLM（可能删除文件、发送邮件、转账）
- **间接Prompt注入**：用户上传文件内容包含恶意指令，Agent读取后执行
- **过度信任模型决策**：对LLM的决策不加验证直接执行
- **连锁效应**：一个错误工具调用引发连锁错误

**安全设计原则**：

- **最小权限原则**：Agent只获得完成任务所需的最小工具权限，每个工具调用设置白名单
- **人工确认**：高风险操作（删除、发送、发布、扣费） -> 需要人工审批
- **沙箱隔离**：Agent执行环境与生产环境隔离，无法直接操作真实数据
- **操作审计**：所有工具调用完整记录（时间、参数、结果），可追溯审计
- **调用预算**：每个Agent每天可调用工具的次数/金额上限，防止无限消耗
- **输入过滤+输出验证**：对Agent拿到的数据和生成的指令做安全审查`,
    category: "Agent开发与工具调用",
    tags: ["安全", "权限控制", "审计"],
    difficulty: "hard",
    dimension: "engineering",
  },
  {
    slug: "q48-agent-evaluation",
    qNumber: 48,
    title: "如何评估一个Agent系统的好坏？有哪些评估指标和方法？",
    question: "如何评估一个Agent系统的好坏？有哪些评估指标和方法？",
    answer: `**多维度评估指标**：

- **任务成功率**：成功完成指定目标的比率
- **效率指标**：完成任务的步数、时间、API调用次数
- **工具使用准确率**：正确选择工具的比率、正确传参的比率
- **鲁棒性**：对异常输入、工具报错的容忍和恢复能力
- **安全性**：无危险操作、无信息泄露、无越狱
- **成本**：完成任务的平均token消耗、API调费、时间成本

**评估方法**：

- **Benchmark数据集**：WebArena（网页操作Agent）、ToolBench（工具使用）、GAIA（通用Agent能力）
- **自定义场景测试**：构造10-20个典型端到端任务Case，覆盖不同难度和类型
- **对比实验**：A/B测试不同的Planning策略（ReAct vs Plan-Execute）
- **故障注入**：人为制造工具返回错误、超时、空结果，观察Agent的恢复能力`,
    category: "Agent开发与工具调用",
    tags: ["评估", "Agent", "Benchmark"],
    difficulty: "medium",
    dimension: "engineering",
  },
  {
    slug: "q49-langchain-agents",
    qNumber: 49,
    title: "LangChain中Agent的工作原理是什么？有哪些内置Agent类型？",
    question: "LangChain中Agent的工作原理是什么？有哪些内置Agent类型？",
    answer: `LangChain Agent将LLM、工具集、Prompt模板、输出解析器组合为一个循环决策引擎

**核心循环**：

1. Agent接收用户输入和历史上下文
2. LLM推理当前状态，决定下一步Action（工具名+参数）或Final Answer
3. 输出解析器从LLM输出中提取Action
4. Tool Executor执行工具调用
5. 工具返回Observation -> 返回步骤2（循环至给出Final Answer）

**内置Agent类型**：

- **Zero-shot ReAct Agent**：仅靠工具描述进行推理和行动（不依赖示例）
- **Structured Chat Agent**：支持多参数工具的结构化对话
- **OpenAI Functions Agent**：利用OpenAI原生Function Calling模型
- **Conversational Agent**：包含记忆功能，支持多轮对话
- **Self-Ask with Search Agent**：逐层追问+搜索的特定模式

**选择建议**：用OpenAI Functions Agent（如果模型支持Function Calling）；否则用ReAct Agent`,
    category: "Agent开发与工具调用",
    tags: ["LangChain", "Agent类型", "框架"],
    difficulty: "medium",
    dimension: "engineering",
  },
  {
    slug: "q50-agent-vs-chain",
    qNumber: 50,
    title: "Agent与传统流程编排（Chain/DAG）相比，什么时候该用哪个？",
    question: "Agent与传统流程编排（Chain/DAG）相比，什么时候该用哪个？",
    answer: `**传统流程编排（Chain/DAG）**：

- 步骤固定、顺序确定、决策规则预设
- 优点：确定性高、延迟预测、易调试、成本可控
- 缺点：灵活性差，无法处理未预见的情况

**Agent**：

- LLM根据当前状态动态决定下一步
- 优点：灵活、能处理边界情况、自适应
- 缺点：不确定性高、可能过度调用、成本难预测

**选择指南**：

- 流程确定不变 -> Chain/DAG
- 需动态判断、分情况处理 -> Agent
- 混合策略（最佳实践）：确定性流程主体用DAG，需要决策的分支点用Agent
- LangGraph支持设计DAG+动态分支，是LangChain向混合编排的进化

**实例**：客服系统 -> 意图识别和FAQ匹配用DAG；未匹配到FAQ时的信息搜集和问题澄清用Agent`,
    category: "Agent开发与工具调用",
    tags: ["Chain", "DAG", "编排"],
    difficulty: "medium",
    dimension: "engineering",
  },
  {
    slug: "q51-agent-code-generation",
    qNumber: 51,
    title: "用代码生成Agent如何处理代码执行、测试、修复全流程？",
    question: "用代码生成Agent如何处理代码执行、测试、修复全流程？",
    answer: `**自动代码生成Agent流程**（如SWE-Agent、Devin的做法）：

**编写**：根据需求和项目结构，Agent用RAG检索相关代码文件 -> LLM理解上下文 -> 生成Patch代码
**执行**：在隔离环境执行生成的代码 -> 捕获stdout、stderr、退出码
**测试**：自动生成并执行单元测试和集成测试
**修复**：如果执行/测试失败 -> 将错误信息反馈LLM -> 分析失败原因 -> 重新生成修复Patch -> 再次执行验证（循环迭代至所有测试通过）

**关键技术**：

- **代码执行沙箱**：Docker容器隔离运行，防止恶意代码影响宿主机
- **Linter + Formatter**：每步代码生成后用Linter和Type Checker检查
- **AST/语法分析**：生成AST Patch而非raw text，保证补丁可干净应用

**代表系统**：SWE-Agent（普林斯顿）、Devin（Cognition AI）`,
    category: "Agent开发与工具调用",
    tags: ["代码生成", "SWE-Agent", "DevOps"],
    difficulty: "hard",
    dimension: "engineering",
  },
  {
    slug: "q52-agent-observation",
    qNumber: 52,
    title: "Agent的Observation（观测/反馈）机制如何设计？如何给Agent有效的Feedback？",
    question: "Agent的Observation（观测/反馈）机制如何设计？如何给Agent有效的Feedback？",
    answer: `Observation是工具执行后返回给Agent的信息，直接决定Agent的下一步决策质量

**有效Observation设计原则**：

- **结构化**：用JSON/Markdown等格式化输出，而非散乱文本
- **信息密度**：简洁但完整，避免过长（消耗Agent上下文窗口）
- **错误信号明确**：工具执行失败时返回明确的错误码、失败原因和可能的重试建议
- **相关性提示**：返回的信息中包含与原始任务相关的标记（如相关度分数）

**Feedback类型**：

- **工具执行结果**：API返回值、数据库查询结果、文件内容等
- **环境反馈**：代码运行的stdout/stderr、UI操作的截图变化
- **自我反思**：Agent观察自己的执行历史后做自我评价（Reflexion模式）

**最佳实践**：

- 对Observation做摘要压缩（LLM生成摘要）再放回上下文窗口
- Observation中仅放入任务相关的信息，过滤噪声和冗余
- 对工具返回做错误包装，统一格式（status_code, message, data）`,
    category: "Agent开发与工具调用",
    tags: ["Observation", "Feedback", "工具调用"],
    difficulty: "medium",
    dimension: "engineering",
  },
  {
    slug: "q53-agent-state-machine",
    qNumber: 53,
    title: "如何用状态机 (State Machine) 或LangGraph设计可控Agent？",
    question: "如何用状态机 (State Machine) 或LangGraph设计可控Agent？",
    answer: `LangGraph将Agent视为状态机，定义了State（状态）、Node（处理节点）和Edge（节点间转换规则），让Agent更可控和可调试

**核心概念**：

- **State**：对话/任务的完整状态（消息序列、工具调用历史、用户信息等）
- **Node**：执行特定逻辑的函数（LLM推理节点、Tool调用节点、条件判断节点）
- **Edge**：状态转换规则，支持条件分支

**优势**：

- 显式状态管理，Agent行为完全可预测和可回溯
- 支持循环、分支、中断、人工审批（Human-in-the-loop）
- 可独立测试每个Node，比自由Agent更易调试
- 支持持久化状态和中断恢复

**示例流程**：
开始 -> 推理节点 -> 需要工具? -> [是] -> 工具执行 -> 推理节点 -> [否] -> 结束

适用场景：需要严格流程控制和审计的企业级Agent`,
    category: "Agent开发与工具调用",
    tags: ["LangGraph", "状态机", "流程控制"],
    difficulty: "hard",
    dimension: "engineering",
  },
  {
    slug: "q54-agent-loop-detection",
    qNumber: 54,
    title: "Agent的无限循环和错误传播如何防止？",
    question: "Agent的无限循环和错误传播如何防止？",
    answer: `**无限循环防止**：

- **最大步数限制**：硬性限制Agent调用工具的总次数（如最多10次），超出强制终止
- **重复检测**：连续进行相同的(thought, action, parameter) -> 强制终止或切换到备用策略
- **相似性检测**：对连续Observation的内容做Embedding相似度计算，如果重复率超阈值 -> 终止
- **时间限制**：单任务总时长限制（如2分钟），通过定时器自动终止

**错误传播防止**：

- **Fail-Fast**：工具调用失败直接终止（而非尝试「修复」可能引发连锁失败）
- **错误降级**：工具失败时用Fallback策略（查询缓存结果、用更简单的工具替代）
- **隔离执行**：每个Agent任务在独立的状态空间中运行，失败不影响其他任务
- **人工兜底**：遭遇连续失败时抛出异常+保存状态 -> 人工介入 -> 从断点处恢复

**工程实践**：在所有Agent执行器外层包装Try-catch和重试策略（指数退避）`,
    category: "Agent开发与工具调用",
    tags: ["循环检测", "错误处理", "鲁棒性"],
    difficulty: "medium",
    dimension: "engineering",
  },
  {
    slug: "q55-agent-future",
    qNumber: 55,
    title: "你认为Agent的未来发展方向是什么？",
    question: "你认为Agent的未来发展方向是什么？",
    answer: `- **Multi-Agent协作**走向生产标准（非Demo），实现端到端自动化流程
- **端侧Agent**：手机/PC本地Agent，直接操控屏幕UI和本地应用
- **MCP协议标准化**：Anthropic推动的Model Context Protocol统一工具接口标准，降低集成成本
- **Agent+Code Generation深化**：Agent直接生成并执行代码来完成任务（而非调用单一封闭工具），极大扩展其能力边界
- **Agent安全性标准化**：建立类似「沙箱+审计+权限管理」的生产级安全标准
- **强化学习**：Agent通过与环境交互的RL学习最优策略，而非仅靠Prompt模板
- **Human-in-the-loop常态化**：高风险Agent决策始终需人类审批（法律/金融/医疗场景）
- **成本下降**：MoE模型+推理优化让Agent调用大模型的成本大幅降低`,
    category: "Agent开发与工具调用",
    tags: ["未来趋势", "Agent", "MCP"],
    difficulty: "medium",
    dimension: "engineering",
  },
];
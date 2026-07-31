import type { InterviewQuestionItem } from "@/lib/types";

export const trendsQuestions: InterviewQuestionItem[] = [
  {
    slug: "q93-long-context",
    qNumber: 93,
    title: "什么是Long Context（长上下文）技术？目前主流方案有哪些？",
    question: "什么是Long Context（长上下文）技术？目前主流方案有哪些？",
    answer: `长上下文指模型能处理的token数从4K扩展到128K、1M甚至无限

**方案**：

- **位置编码外推**：NTK-aware、YaRN、Pi（位置插值）、RoPE微调
- **架构优化**：ALiBi（基于偏置的线性外推）、xPos
- **注意力优化**：Ring Attention（分布式计算注意力）、StreamingLLM（滑动窗口+Sink Tokens）
- **稀疏注意力**：Longformer（局部+全局注意力）、BigBird（随机+窗口+全局）

**代表模型**：Claude 3.5（200K）、Gemini 1.5 Pro（1M-2M）、Kimi（200K）`,
    category: "前沿技术与发展趋势",
    tags: ["长上下文", "RoPE", "注意力优化"],
    difficulty: "medium",
    dimension: "trends",
  },
  {
    slug: "q94-mllm",
    qNumber: 94,
    title: "什么是多模态大模型（MLLM）？主流架构有哪些？",
    question: "什么是多模态大模型（MLLM）？主流架构有哪些？",
    answer: `MLLM能同时理解和生成文本、图像、音频、视频等多种模态

**主流架构**：

- **Encoder-Decoder型**：如Flamingo（冻结视觉编码器+冻结LLM，中间加Perceiver Resampler）
- **投影对齐型**：如LLaVA（CLIP视觉编码器 -> 线性投影 -> LLM）、Qwen-VL
- **统一架构**：如GPT-4o、Gemini（原生多模态，训练阶段就融合）

**关键技术**：视觉编码器（ViT/CLIP）、跨模态对齐（对比学习）、指令微调（多模态指令数据）`,
    category: "前沿技术与发展趋势",
    tags: ["多模态", "MLLM", "LLaVA"],
    difficulty: "medium",
    dimension: "trends",
  },
  {
    slug: "q95-world-model",
    qNumber: 95,
    title: "什么是世界模型（World Model）？与大模型有什么关系？",
    question: "什么是世界模型（World Model）？与大模型有什么关系？",
    answer: `世界模型指AI能构建对环境的内部表示，预测未来状态，并基于此做决策（类似人类心智模型）

**与大模型关系**：LLM是「语言世界模型」，通过文本学习世界知识；Sora等视频生成模型是「视觉世界模型」，学习物理规律

**代表工作**：JEPA（联合嵌入预测架构，Yann LeCun提出）、Sora（视频生成中的物理模拟）、GAIA-1（自动驾驶世界模型）

意义：从「预测下一个token」走向「预测世界状态」，是通往AGI的可能路径之一`,
    category: "前沿技术与发展趋势",
    tags: ["世界模型", "JEPA", "AGI"],
    difficulty: "hard",
    dimension: "trends",
  },
  {
    slug: "q96-test-time-compute",
    qNumber: 96,
    title: "什么是Test-Time Compute（推理时计算）？为什么最近受到关注？",
    question: "什么是Test-Time Compute（推理时计算）？为什么最近受到关注？",
    answer: `Test-Time Compute指在推理阶段投入更多计算资源（如生成更多候选、多步验证、蒙特卡洛树搜索）来提升输出质量

**代表**：OpenAI o1/o3系列、DeepSeek-R1，通过CoT和强化学习让模型在推理时「思考更久」

**与训练时计算的区别**：不增加模型参数，只增加推理时的token数/步骤

**意义**：可能突破模型大小的瓶颈，用「思考时间」换「智能」，改变「模型越大越好」的单一Scaling路径`,
    category: "前沿技术与发展趋势",
    tags: ["Test-Time Compute", "o1", "推理优化"],
    difficulty: "medium",
    dimension: "trends",
  },
  {
    slug: "q97-synthetic-data",
    qNumber: 97,
    title: "什么是合成数据（Synthetic Data）？在大模型训练中的作用？",
    question: "什么是合成数据（Synthetic Data）？在大模型训练中的作用？",
    answer: `合成数据是用AI（大模型、GAN、仿真环境）生成的训练数据，而非真实世界采集

**作用**：

- 解决真实数据稀缺问题（如医疗、法律领域）
- 保护隐私（不直接使用真实用户数据）
- 提升数据多样性（生成边缘Case、多语言数据）
- 自我改进（模型生成数据训练更强的模型，如Self-Instruct、Alpaca-GPT4数据）

**风险**：模型崩溃（Model Collapse）——用模型生成的数据训练会导致分布偏移、质量退化，需要与真实数据混合使用`,
    category: "前沿技术与发展趋势",
    tags: ["合成数据", "Model Collapse", "数据增广"],
    difficulty: "medium",
    dimension: "trends",
  },
  {
    slug: "q98-emergence-boundary",
    qNumber: 98,
    title: "如何看待大模型的「智能涌现」与「能力边界」？",
    question: "如何看待大模型的「智能涌现」与「能力边界」？",
    answer: `**涌现**：承认大模型在规模达到临界点时确实表现出小模型不具备的能力（ICL、CoT），但涌现可能是评估指标的离散性造成的假象，而非真正的相变

**能力边界**：当前LLM在逻辑推理、数学证明、长程规划、因果推断上仍有限；缺乏真正的世界模型和持续学习能力

**观点平衡**：既不神化大模型（认为即将AGI），也不贬低（认为只是统计模式匹配），理性看待其作为「通用推理引擎」的潜力和局限

**未来方向**：结合符号推理、世界模型、具身智能突破当前边界`,
    category: "前沿技术与发展趋势",
    tags: ["涌现", "能力边界", "AGI"],
    difficulty: "medium",
    dimension: "trends",
  },
  {
    slug: "q99-automated-decision-making",
    qNumber: 99,
    title: "如果业务方提出一个「用大模型做全自动决策」的需求，你认为存在什么问题？如何沟通？",
    question: "如果业务方提出一个「用大模型做全自动决策」的需求，你认为存在什么问题？如何沟通？",
    answer: `**风险识别**：大模型幻觉可能导致错误决策；缺乏可解释性难以审计；责任归属不清；可能违反合规要求

**沟通策略**：

- 不直接否定，先理解业务痛点和目标
- 用数据和案例说明风险（如幻觉率、错误决策的潜在损失）
- 提出折中方案：「AI辅助决策+人工确认」（Human-in-the-loop），先在小范围试点
- 设定明确的成功指标和退出机制
- 强调技术团队与业务方的共同目标（降本增效而非完全替代）`,
    category: "软技能与团队协作",
    tags: ["业务沟通", "风险管理", "Human-in-the-loop"],
    difficulty: "medium",
    dimension: "trends",
  },
  {
    slug: "q100-continuous-learning",
    qNumber: 100,
    title: "作为大模型应用开发工程师，你如何持续学习和技术跟进？",
    question: "作为大模型应用开发工程师，你如何持续学习和技术跟进？",
    answer: `- **论文跟踪**：关注arXiv（cs.CL、cs.LG）、顶会（NeurIPS、ICML、ACL、EMNLP）的关键论文，使用Paper Digest、Connected Papers工具
- **开源社区**：跟踪HuggingFace、LangChain、LlamaIndex、vLLM等项目的Release Note和最佳实践
- **产品体验**：亲自使用最新的模型和产品（ChatGPT、Claude、Gemini、Kimi），建立直观感受
- **实践验证**：有自己的实验环境，新论文/技术快速复现验证，不盲目相信论文结果
- **知识输出**：写技术博客、内部分享，教别人是最好的学习方式
- **领域深耕**：在通用能力基础上，深入1-2个垂直领域（如RAG、Agent、多模态），建立专业壁垒`,
    category: "软技能与团队协作",
    tags: ["持续学习", "职业发展", "软技能"],
    difficulty: "easy",
    dimension: "trends",
  },
];
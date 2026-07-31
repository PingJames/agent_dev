import type { InterviewQuestionItem } from "@/lib/types";

export const basicsQuestions: InterviewQuestionItem[] = [
  {
    slug: "q01-transformer-innovation",
    qNumber: 1,
    title: "请解释Transformer架构的核心创新，以及它相比RNN/LSTM的主要优势是什么？",
    question: "请解释Transformer架构的核心创新，以及它相比RNN/LSTM的主要优势是什么？",
    answer: `**核心创新**：

- **Self-Attention机制**：每个位置的编码能直接关注序列中所有其他位置，捕获任意距离的依赖关系（全局感受野）
- **位置编码**：通过正弦/余弦函数或可学习嵌入注入序列顺序信息，解决Attention本身不感知位置的问题
- **Multi-Head Attention**：允许模型在不同子空间学习不同类型的注意力模式，增强表示能力
- **Layer Normalization + Residual Connection**：稳定深层网络训练，解决梯度消失问题
- **Encoder-Decoder架构**：Encoder并行编码源序列，Decoder自回归生成目标序列

**相比RNN/LSTM的优势**：

- **并行计算**：RNN序列依赖导致无法并行，Transformer在训练时可完全并行化所有位置的Attention计算
- **长程依赖**：RNN受梯度消失/爆炸限制，LSTM可处理约100步，Transformer可处理数千token距离
- **训练效率**：不需要BPTT（时间反向传播），每层计算图独立
- **表示能力**：Multi-Head Attention能捕获多种关系（语法、语义、指代等）`,
    category: "大模型基础理论",
    tags: ["Transformer", "Self-Attention", "架构"],
    difficulty: "medium",
    dimension: "basics",
  },
  {
    slug: "q02-qkv-attention",
    qNumber: 2,
    title: "请解释Attention机制中的Q、K、V分别代表什么？为什么要这样设计？",
    question: "请解释Attention机制中的Q、K、V分别代表什么？为什么要这样设计？",
    answer: `- **Query (Q)**：当前token想要「查询」什么（「我需要关注谁？」），由当前token的输入线性变换得到
- **Key (K)**：每个token的「标签」，用于与Query计算匹配度（「我是什么？」）
- **Value (V)**：每个token的实际内容/信息，被加权聚合（「我的信息是什么？」）

**为何这样设计**：

- **检索类比**：类似数据库查询——Query是搜索请求，Key是索引键，Value是实际数据
- **内容-位置分离**：Key用于计算注意力权重，Value用于信息聚合，两者可以来自不同表示空间
- **可学习投影**：Q/K/V分别通过不同的权重矩阵\\(W^Q, W^K, W^V\\)投影，模型自动学习如何匹配和聚合

**注意力计算**：
\\(\\text{Attention}(Q, K, V) = \\text{softmax}(\\frac{QK^T}{\\sqrt{d_k}})V\\)

除以\\(\\sqrt{d_k}\\)是为了防止点积过大导致softmax梯度消失`,
    category: "大模型基础理论",
    tags: ["Attention", "QKV", "Self-Attention"],
    difficulty: "easy",
    dimension: "basics",
  },
  {
    slug: "q03-pretraining-finetuning",
    qNumber: 3,
    title: "什么是大模型的预训练（Pre-training）和微调（Fine-tuning）？两者的关系是什么？",
    question: "什么是大模型的预训练（Pre-training）和微调（Fine-tuning）？两者的关系是什么？",
    answer: `**预训练 (Pre-training)**：

- 在大规模无标注语料上训练模型学习通用语言知识（语法、事实、推理能力）
- 目标函数：GPT系列用Next Token Prediction（自回归）；BERT用Masked Language Modeling（MLM）
- 输出：General-purpose基础模型（如GPT-3、LLaMA）

**微调 (Fine-tuning)**：

- 在特定任务的标注数据上调整预训练模型参数
- 类型：全量微调（更新所有参数）、参数高效微调/PEFT（LoRA、Adapter等，更新少量参数）
- 目的：让通用模型适应特定领域或任务

**关系**：

- 预训练是基础，微调是适配；预训练提供「通用智能」，微调赋予「专业能力」
- 类比：预训练 = 大学通识教育，微调 = 研究生专业方向
- 趋势：Instruction Tuning（指令微调）和RLHF（对齐微调）让模型更擅长遵循指令、对齐人类偏好`,
    category: "大模型基础理论",
    tags: ["预训练", "微调", "Fine-tuning"],
    difficulty: "easy",
    dimension: "basics",
  },
  {
    slug: "q04-gpt-vs-bert",
    qNumber: 4,
    title: "GPT系列和BERT系列的根本区别是什么？各适用于什么场景？",
    question: "GPT系列和BERT系列的根本区别是什么？各适用于什么场景？",
    answer: `**根本区别**：

| 维度 | GPT (自回归) | BERT (自编码) |
|------|-------------|---------------|
| 预训练目标 | Next Token Prediction | Masked Language Model (MLM) |
| 注意力掩码 | Causal Mask（只看左边） | 双向（Full Attention） |
| 架构 | Decoder-only | Encoder-only |
| 方向性 | 单向（自回归） | 双向（上下文） |

**适用场景**：

- **GPT/Decoder-only**：文本生成、对话、代码补全、自回归任务（ChatGPT、GPT-4、LLaMA、Claude）
- **BERT/Encoder-only**：文本分类、NER、情感分析、句子对匹配（阅读理解、语义相似度）
- **Encoder-Decoder模型（T5/BART）**：翻译、摘要、改写——当前主流大模型发展方向是Decoder-only（训练效率更高、Scaling更友好）`,
    category: "大模型基础理论",
    tags: ["GPT", "BERT", "Decoder-only"],
    difficulty: "easy",
    dimension: "basics",
  },
  {
    slug: "q05-tokenization",
    qNumber: 5,
    title: "请解释Tokenization（分词）过程。BPE、WordPiece、SentencePiece的区别是什么？",
    question: "请解释Tokenization（分词）过程。BPE、WordPiece、SentencePiece的区别是什么？",
    answer: `**Tokenization过程**：将原始文本切分为模型能处理的token序列（子词/字符级）

**三种方法的区别**：

- **BPE (Byte Pair Encoding)**：从字符级别出发，统计并合并出现最频繁的字符对，迭代构建词表（GPT-2、RoBERTa使用）
- **WordPiece**：与BPE类似，但合并标准是互信息最大化（选择使训练数据似然增加最多的合并对），BERT使用。标记子词时用\`##\`前缀
- **SentencePiece**：直接在原始Unicode文本上操作，将BPE/Unigram应用于raw text而非pre-tokenized词。LLaMA、T5使用

**常见关键点**：

- **OOV处理**：子词分词天然处理OOV，任何未登录词都可拆解为已知子词
- **多语言**：SentencePiece对多语言友好（不依赖语言特定的分词器）
- **Special Tokens**：\`[CLS]\`、\`[SEP]\`、\`<|endoftext|>\`、\`<|im_start|>\`等控制token`,
    category: "大模型基础理论",
    tags: ["Tokenization", "BPE", "SentencePiece"],
    difficulty: "medium",
    dimension: "basics",
  },
  {
    slug: "q06-position-encoding",
    qNumber: 6,
    title: "请解释位置编码（Positional Encoding）的种类及其作用。RoPE是什么？",
    question: "请解释位置编码（Positional Encoding）的种类及其作用。RoPE是什么？",
    answer: `**作用**：Transformer自注意力本身不感知token顺序，位置编码注入序列位置信息

**种类**：

- **绝对位置编码**：Sinusoidal编码（正弦/余弦函数，无需学习）、Learnable Embedding（可学习位置向量，BERT/GPT）
- **相对位置编码**：建模token之间的相对距离，如T5的Relative Position Bias

**RoPE (Rotary Position Embedding)**：

- **原理**：通过旋转矩阵将位置信息编码到Q和K中，使注意力计算自动包含相对位置：
  \\(\\text{Attention}(Q, K) = \\text{softmax}(\\frac{(R_i Q)(R_j K)^T}{\\sqrt{d_k}})\\)
  其中\\(R_i\\)是位置i的旋转矩阵
- **优势**：具有外推能力（训练短序列，推理长序列），无需额外参数，LLaMA、Qwen、Mistral皆采用
- **扩展**：NTK-aware RoPE、YaRN进一步提升外推能力`,
    category: "大模型基础理论",
    tags: ["位置编码", "RoPE", "长上下文"],
    difficulty: "medium",
    dimension: "basics",
  },
  {
    slug: "q07-emergence",
    qNumber: 7,
    title: "什么是大模型的「涌现能力」（Emergent Abilities）？请举例说明。",
    question: "什么是大模型的「涌现能力」（Emergent Abilities）？请举例说明。",
    answer: `涌现能力指模型在规模达到临界点时「突然」表现出的、小模型不具备的能力，而非在更小规模时能从性能曲线上预测

**常见涌现能力**：

- **上下文学习(ICL)**：给定几个示例（Few-shot Prompt），模型无需参数更新即可在新任务上表现出色
- **思维链(CoT)**：在Prompt中加入「Let's think step by step」，模型自动分解推理步骤，大幅提升数学和逻辑推理准确率
- **指令跟随**：模型经过Instruction Tuning后能理解并执行复杂的自然语言指令

**学术争议**：

- 2023年一篇研究（Schaeffer等）指出涌现可能是评估指标的非线性导致的「假象」——如果用连续指标（如Perplexity的连续变化），「涌现」可能只是平滑的Scaling曲线的陡峭段
- 但实践中，超过一定规模后模型确实表现出质变行为，这仍是重要研究方向`,
    category: "大模型基础理论",
    tags: ["涌现", "Scaling Law", "ICL"],
    difficulty: "medium",
    dimension: "basics",
  },
  {
    slug: "q08-in-context-learning",
    qNumber: 8,
    title: "什么是上下文学习 (In-Context Learning, ICL)？其原理是什么？",
    question: "什么是上下文学习 (In-Context Learning, ICL)？其原理是什么？",
    answer: `ICL指给模型几个输入-输出示例作为Prompt前缀，模型无需参数更新就能在新的query上做出正确预测

**原理假说**：

- **贝叶斯推断视角**：模型通过Attention隐式地「推断」当前任务分布，Few-shot示例提供了隐式的任务描述
- **梯度下降视角**：ICL等价于在隐式空间中做一步梯度下降（「Transformer是Meta-Optimizer」），Attention层的计算可以模拟线性回归
- **先验匹配**：模型在预训练数据中见过类似的任务结构和in-context pattern，因此在足够大规模后学会了「模式识别」

**影响因素**：

- 示例质量 > 示例数量
- 示例顺序影响结果（Order Sensitivity）——标签分布尽量均衡
- 示例的真实输入-输出映射很关键，但标签本身不一定需要正确（说明模型更多从格式而非内容中学习）`,
    category: "大模型基础理论",
    tags: ["ICL", "Few-shot", "上下文学习"],
    difficulty: "medium",
    dimension: "basics",
  },
  {
    slug: "q09-hallucination",
    qNumber: 9,
    title: "什么是大模型的「幻觉」（Hallucination）问题？可能的原因是什么？",
    question: "什么是大模型的「幻觉」（Hallucination）问题？可能的原因是什么？",
    answer: `幻觉指模型生成的文本看起来合理通顺，但包含事实性错误、凭空编造、与给定上下文矛盾的内容

**幻觉类型**：

- **内在幻觉**：生成内容自相矛盾（同一段话中先说是A，后说是B）
- **外在幻觉**：生成内容与事实不符（编造不存在的论文/人物/事件）

**可能原因**：

- **训练数据偏差**：训练语料中存在错误、过时信息，模型学到了这些不准确的知识
- **最大似然训练限制**：基于概率采样，旨在生成「最可能的token序列」而非「最真实的token序列」
- **解码策略**：Top-p、Temperature等采样策略在创造性与准确性间存在权衡
- **知识边界不清**：模型不知道「自己不知道什么」，遇到不确定时倾向于「编造」而非「承认不知道」
- **长程推理的误差累积**：多步骤推理中早期步骤的微小错误在后续步骤中被放大

**缓解方案**：RAG（外部知识检索）、事实性校验、RLHF（人类反馈）、解码约束（DoLa、Grounded Decoding）`,
    category: "大模型基础理论",
    tags: ["幻觉", "Hallucination", "可靠性"],
    difficulty: "easy",
    dimension: "basics",
  },
  {
    slug: "q10-scaling-law",
    qNumber: 10,
    title: "什么是Scaling Law？对大模型开发有什么指导意义？",
    question: "什么是Scaling Law？对大模型开发有什么指导意义？",
    answer: `Scaling Law描述了模型性能（Loss）与模型参数量N、训练数据量D、计算量C之间的幂律关系：\\(L = L_0 + \\frac{A}{N^\\alpha} + \\frac{B}{D^\\beta} + \\frac{C}{C_{min}^\\gamma}\\)

**核心发现**（Kaplan et al. / Chinchilla Scaling Law）：

- **Kaplan（OpenAI）**：模型性能随参数量、数据量、计算量幂律提升；大模型比小模型更计算高效
- **Chinchilla（DeepMind）**：给定计算预算，参数量和训练token数应等比增长（平均1参数对应20文本token）；此前很多模型「不够训」（参数很大但训练数据不够）

**指导意义**：

- **资源分配**：给定GPU预算，模型大小和数据量的最优配比
- **小模型策略**：在数据充足时，小模型+多数据 > 大模型+少数据（如LLaMA-3 8B超越LLaMA-2 70B）
- **预训练规划**：给定数据量，合理选择模型参数量，避免浪费计算
- **中国现状反思**：很多时候参数竞赛忽略了数据质量和训练的充分性`,
    category: "大模型基础理论",
    tags: ["Scaling Law", "Chinchilla", "预训练"],
    difficulty: "medium",
    dimension: "basics",
  },
  {
    slug: "q11-llama-innovations",
    qNumber: 11,
    title: "LLaMA系列相比GPT有哪些改进？为什么成为开源模型标杆？",
    question: "LLaMA系列相比GPT有哪些改进？为什么成为开源模型标杆？",
    answer: `**LLaMA系列的关键改进**：

- **架构优化**：
    - Pre-Normalization（RMSNorm） -> 训练稳定性优于GPT的Post-Norm
    - SwiGLU激活函数 -> 替代ReLU，提升模型质量
    - RoPE位置编码 -> 外推能力强，支持更长的上下文
- **数据驱动**：用更多高质量数据训练更小的模型，「小模型+多数据」策略

**LLaMA-2 -> LLaMA-3 的进化**：

- 训练tokens从2T -> 15T，Tokenizer词表提升性能，GQA（Grouped Query Attention）加速推理

**成为开源模型标杆的原因**：

- 性能接近闭源GPT-3.5，但完全开源（权重公开，支持商用）
- 社区生态繁荣（衍生众多微调版本如Vicuna、Alpaca、Yi、Qwen等）
- 推动了大模型民主化，让中小公司也能用上高质量的大模型`,
    category: "大模型基础理论",
    tags: ["LLaMA", "开源", "架构"],
    difficulty: "easy",
    dimension: "basics",
  },
  {
    slug: "q12-moe",
    qNumber: 12,
    title: "请解释MoE (Mixture of Experts) 架构及其优缺点。",
    question: "请解释MoE (Mixture of Experts) 架构及其优缺点。",
    answer: `MoE将FFN层替换为多个专家（Expert）子网络，每个token由一个门控网络（Router/Gate）动态选择Top-k个专家进行计算

**工作原理**：

- 输入token经过Router计算每个专家的得分：\\(g = \\text{softmax}(xW_g)\\)
- 选择Top-k专家，加权求和：\\(y = \\sum_{i \\in \\text{TopK}} g_i \\cdot E_i(x)\\)
- 不同token可能被路由到不同专家，实现「条件计算」（每个token只激活部分参数）

**优点**：

- **参数效率**：总参数量很大但每个token只激活少数专家（如Mixtral 8x7B总参数量47B，推理时只激活~13B）
- **训练效率**：可以分配到多张GPU
- **扩展性**：增加专家数量轻松扩展模型容量

**缺点**：

- **负载不均衡**：Router可能总是选择少数专家，导致部分专家「闲置」（需Load Balancing Loss）
- **显存占用大**：所有专家权重需全量加载到GPU显存
- **通信开销**：MoE在分布式训练中跨设备通信成本高
- **微调困难**：SFT时专家利用率可能不均衡

代表模型：Mixtral 8x7B、Qwen2-MoE、DeepSeek-V2`,
    category: "大模型基础理论",
    tags: ["MoE", "架构", "Mixtral"],
    difficulty: "hard",
    dimension: "basics",
  },
  {
    slug: "q13-kv-cache",
    qNumber: 13,
    title: "什么是KV Cache？为什么能显著提升推理速度？有什么局限性？",
    question: "什么是KV Cache？为什么能显著提升推理速度？有什么局限性？",
    answer: `KV Cache是在自回归生成时，缓存已生成的token对应的Key和Value向量，避免重复计算

**工作原理**：

- 生成第t个token时，只需要计算新token的Q/K/V，之前t-1个token的K和V直接从缓存读取
- 将计算复杂度从\\(O(n^2)\\)降为\\(O(n)\\)（每个生成步骤只需要一次向量-矩阵运算）

**为什么能快**：

- 避免了对历史token K/V的重复计算（每个解码步骤原需重新计算所有历史的Attention）
- 节省的计算量约等于 N x d_model x n_layers（N为总生成长度）

**局限性**：

- **显存占用大**：BatchSize x SeqLen x n_layers x d_model x 2 的连续显存占用，长文本下成为瓶颈
- **Prefill阶段仍全量计算**：首个token需要计算全部输入，无法利用KV Cache
- **动态Batching受限**：不同序列长度导致KV Cache形状不一，Continuous Batching需额外管理
- 优化方向：Multi-Query Attention(MQA)、Grouped-Query Attention(GQA)、PagedAttention(vLLM)、KV量化`,
    category: "大模型基础理论",
    tags: ["KV Cache", "推理优化", "Attention"],
    difficulty: "medium",
    dimension: "basics",
  },
  {
    slug: "q14-quantization",
    qNumber: 14,
    title: "什么是模型量化（Quantization）？PTQ和QAT的区别是什么？",
    question: "什么是模型量化（Quantization）？PTQ和QAT的区别是什么？",
    answer: `量化是将模型参数和激活值从高精度（FP32/FP16）转为低精度（INT8/INT4/NF4）的过程，以减少显存占用和加速推理

**PTQ (Post-Training Quantization，训练后量化)**：

- 模型训练完成后，对权重和/或激活值做量化，无需重新训练
- 优点：快速、简单、无需训练数据
- 缺点：低比特（4-bit以下）时精度损失较大
- 代表方法：GPTQ（逐层最优量化）、AWQ（激活感知权重量化）、GGUF/llama.cpp中的量化方法

**QAT (Quantization-Aware Training，量化感知训练)**：

- 训练时模拟量化效果（伪量化节点），让模型在训练过程中适应低精度
- 优点：精度高，低比特下效果更好
- 缺点：需要完整训练流程，成本高
- 适用场景：对精度要求极高的场景（边缘部署、私有化）

**当前实践**：

- 生产环境常用PTQ方法（GPTQ/AWQ + INT4）即可满足大部分需求
- BitsAndBytes NF4（4-bit NormalFloat量化）配合QLoRA实现消费级GPU微调`,
    category: "大模型基础理论",
    tags: ["量化", "PTQ", "QAT"],
    difficulty: "medium",
    dimension: "basics",
  },
  {
    slug: "q15-gqa-mqa",
    qNumber: 15,
    title: "请解释MHA (Multi-Head Attention)、MQA、GQA的区别，以及GQA为什么能平衡效果和效率。",
    question: "请解释MHA (Multi-Head Attention)、MQA、GQA的区别，以及GQA为什么能平衡效果和效率。",
    answer: `**三种注意力机制的区别**：

- **MHA (Multi-Head Attention)**：每个Head有独立的Q、K、V投影 —— 最灵活但KV Cache最大
- **MQA (Multi-Query Attention)**：所有Head共享同一组K、V，仅Q独立 —— KV Cache缩小为1/H，但效果略降
- **GQA (Grouped-Query Attention)**：将Head分组，同组内共享K、V（如LLaMA-2 70B用8组）—— 在MHA和MQA之间折中

**对KV Cache的影响**（以LLaMA-2 70B为例，80层、8192维、64个Head为例）：

| 方法 | K/V Head数 | KV Cache大小 | 相对MHA |
|------|-----------|-------------|--------|
| MHA | 64 | 最大 | 1x |
| GQA(=8) | 8 | 减少~8x | ~0.125x |
| MQA | 1 | 减少~64x | ~0.016x |

**GQA为何是最好的折中**：

- 效果接近MHA（组内共享K/V基本不影响注意力模式的质量）
- KV Cache大幅减少（8组时减少8倍），显著降低长文本生成时的显存压力
- 已经成为LLaMA-2、LLaMA-3、Mistral等主流模型的标准配置`,
    category: "大模型基础理论",
    tags: ["GQA", "MHA", "KV Cache"],
    difficulty: "medium",
    dimension: "basics",
  },
];
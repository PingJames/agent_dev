import type { InterviewQuestionItem } from "@/lib/types";

// ============================================================
// 五、模型微调与训练 Q56-Q65
// ============================================================
export const finetuningQuestions: InterviewQuestionItem[] = [
  {
    slug: "q56-full-vs-peft",
    qNumber: 56,
    title: "全量微调（Full Fine-tuning）和参数高效微调（PEFT）的区别？各在什么场景下使用？",
    question: "全量微调（Full Fine-tuning）和参数高效微调（PEFT）的区别？各在什么场景下使用？",
    answer: `**全量微调**：

- 更新模型全部参数
- 优点：效果最好，适合需要大规模改变模型行为
- 缺点：需要大量GPU显存（7B模型FP16约需56GB）、训练慢、灾难性遗忘风险高

**PEFT（Parameter-Efficient Fine-Tuning）**：

- 仅更新/添加少量参数（通常<1%），冻结原始权重
- 优点：显存占用小（7B+LoRA只需约16GB）、训练快、可快速切换多个Adapter
- 缺点：效果略逊于全量微调
- 适用：绝大多数生产场景和资源受限的情况

**主流PEFT方法**：

| 方法 | 原理 | 参数占比 | 特点 |
|------|------|----------|------|
| LoRA | 低秩矩阵分解更新Attention权重 | <1% | 最流行，可合并回原权重 |
| Adapter | 在层间插入小网络 | 3-8% | 结构简单 |
| Prefix Tuning | 在输入前加可学习prefix | <1% | 适合生成任务 |
| IA3 | 缩放Key/Value/FNN | <0.01% | 极少参数 |

**趋势**：生产环境几乎100%使用PEFT（尤其是LoRA）而非全量微调`,
    category: "模型微调与训练",
    tags: ["全量微调", "PEFT", "LoRA"],
    difficulty: "easy",
    dimension: "engineering",
  },
  {
    slug: "q57-lora-principle",
    qNumber: 57,
    title: "LoRA（Low-Rank Adaptation）的原理是什么？为什么有效？",
    question: "LoRA（Low-Rank Adaptation）的原理是什么？为什么有效？",
    answer: `LoRA基于「预训练大模型权重更新位于低秩子空间」的假设，将全量权重更新矩阵分解为两个小矩阵的乘积：B x A

**数学原理**：

- 原始更新：W_new = W + Delta_W（Delta_W是完整的大矩阵，参数量 = d x d）
- LoRA更新：W_new = W + B x A（B∈R^{d x r}, A∈R^{r x d}，r << d）
- 参数量从 d^2 降为 2dr（若r=16, d=4096，参数量降至原来的 0.8%）

**为什么有效**：

- AIDD（Adaptation Intrinsic Dimension）理论：任务自适应在低维度子空间就能完成
- 正则化效应：低秩约束相当于强正则化，防止对少量训练数据过拟合
- 可插拔：不同任务的LoRA权重可切换

**训练与推理**：

- 训练时：冻结W，只优化A和B
- 推理时：可将BxA合并回W中（W_new = W + BA），以不增加推理延迟（可merge-back）

**关键参数**：

- r（秩）：8-64，越大容量越强
- alpha：缩放因子，影响更新幅度
- target_modules：应用LoRA的层（通常选所有Attention层的Q、K、V、O投影）`,
    category: "模型微调与训练",
    tags: ["LoRA", "低秩分解", "微调"],
    difficulty: "medium",
    dimension: "engineering",
  },
  {
    slug: "q58-qlora",
    qNumber: 58,
    title: "什么是QLoRA？相比普通LoRA有什么优势？",
    question: "什么是QLoRA？相比普通LoRA有什么优势？",
    answer: `QLoRA = Quantized LoRA，将预训练权重从FP16量化为NF4（4-bit NormalFloat），在此量化基础模型上训练LoRA权重

**核心创新**：

- **NF4量化**：一种信息论最优的4-bit量化格式，比标准INT4更适合正态分布的大模型权重
- **双重量化**：不仅量化模型权重，还量化量化常数（进一步节省0.4 bit/参数）
- **分页优化器**：利用CPU做梯度检查点，避免GPU OOM

**相比LoRA的优势**：

- **显存更低**：LoRA（7B+FP16约16GB）-> QLoRA（7B+4-bit约6GB），即可在消费级GPU（RTX 3060 12GB）上微调70B的模型
- **效果接近全量**：QLoRA微调效果非常接近全参数微调（差距通常<1%），而显存节省了5-10倍

**局限**：

- 训练速度比普通LoRA慢30-50%（反量化开销）
- 推理时需要反量化，不适合直接做推理部署
- 对某些特定任务（如需要极高精度的数学推理），低bit微调仍有细微精度损失`,
    category: "模型微调与训练",
    tags: ["QLoRA", "量化", "消费级GPU"],
    difficulty: "medium",
    dimension: "engineering",
  },
  {
    slug: "q59-sft-vs-rlhf",
    qNumber: 59,
    title: "什么是SFT（监督微调）和RLHF（人类反馈强化学习）？两者在大模型训练中的作用？",
    question: "什么是SFT（监督微调）和RLHF（人类反馈强化学习）？两者在大模型训练中的作用？",
    answer: `**SFT (Supervised Fine-Tuning)**：

- 用高质量的人工标注的(Instruction, Response)数据对预训练模型做微调
- 目标：让模型学会「遵循指令」，适应问答、对话等任务格式
- 阶段：Pre-training -> SFT -> RLHF

**RLHF (Reinforcement Learning from Human Feedback)**：

- 三阶段：收集人类偏好数据（对比两个回答哪个更好）-> 训练Reward Model（模拟人类偏好打分）-> 用PPO强化学习微调模型，最大化Reward Model打分
- 目标：让模型的输出更符合人类偏好（有用、无害、诚实）
- RLHF是ChatGPT/Claude取得突破的核心技术

**两者的关系**：

| 维度 | SFT | RLHF |
|------|-----|------|
| 学习信号 | 行为克隆 | 人类偏好 |
| 目标 | 模仿正确回答 | 提升回答质量 |
| 训练成本 | 低 | 高 |
| 效果 | 学会格式和风格 | 学会对齐人类偏好 |

**趋势**：DPO (Direct Preference Optimization)正逐步替代RLHF——直接优化偏好而无需显式Reward Model，训练更简单`,
    category: "模型微调与训练",
    tags: ["SFT", "RLHF", "DPO"],
    difficulty: "medium",
    dimension: "engineering",
  },
  {
    slug: "q60-dpo",
    qNumber: 60,
    title: "什么是DPO（Direct Preference Optimization）？为什么说它比RLHF更简单？",
    question: "什么是DPO（Direct Preference Optimization）？为什么说它比RLHF更简单？",
    answer: `DPO直接将人类偏好数据作为监督信号优化模型，无需显式训练Reward Model和RL算法

**DPO vs RLHF**：

- **RLHF（三步）**：SFT -> 训练Reward Model -> PPO强化学习
  复杂、不稳定，Reward Model可能被LLM「攻击」（找到骗高分的输出）
- **DPO（一步）**：直接在偏好数据上用交叉熵损失微调模型
  简单、稳定，显式避免「骗分」问题（不需要隐式Reward Model）

**DPO的工作原理**：偏好数据：(Prompt, 优选回答, 被拒回答)。损失函数引导模型增加生成优选回答的概率、减少生成被拒回答的概率。相当于在SFT阶段直接加入了对齐信号

**优势**：

- 代码量骤减（无需PPO实现和Reward Model训练）
- 训练更稳定（分类交叉熵 vs 强化学习的不稳定奖励信号）
- 效果可比甚至超过RLHF

**代表模型**：Mistral-7B-Instruct、Zephyr-7B-beta、Qwen 2使用DPO`,
    category: "模型微调与训练",
    tags: ["DPO", "RLHF", "对齐"],
    difficulty: "medium",
    dimension: "engineering",
  },
  {
    slug: "q61-finetuning-data",
    qNumber: 61,
    title: "微调数据的质量和数量哪个更重要？如何构建高质量微调数据集？",
    question: "微调数据的质量和数量哪个更重要？如何构建高质量微调数据集？",
    answer: `**质量 >> 数量**

研究发现（如LLaMA-2 / LIMA论文）：1000条高质量、多样化的微调数据效果优于数万条低质量数据

**高质量微调数据的要求**：

- **指令多样性**：覆盖多种任务类型（问答、摘要、代码、翻译、推理、创意写作）
- **回答准确性**：每个回答经过专家验证，确保无事实错误
- **一致性**：同一类问题回答风格和格式保持一致
- **覆盖度**：覆盖目标场景的常见指令类型和边界情况
- **输出风格**：回答风格匹配期望的使用场景

**构建方法**：

- **人工标注**（500-2000条）：最贵但质量最好
- **LLM合成+人工筛选**：GPT-4生成候选回答 -> 人工筛选/评分
- **自动增强**：种子数据 + LLM改写生成多样化的变体问题（Self-Instruct、Evol-Instruct方法）
- **现实数据回写**：从生产环境收集真实用户Query -> 人工回答 -> 加入微调数据集

**成本参考**：1000条专家级标注约2000-4000美元`,
    category: "模型微调与训练",
    tags: ["微调数据", "数据质量", "Self-Instruct"],
    difficulty: "medium",
    dimension: "engineering",
  },
  {
    slug: "q62-catastrophic-forgetting",
    qNumber: 62,
    title: "什么是灾难性遗忘（Catastrophic Forgetting）？如何在微调中避免？",
    question: "什么是灾难性遗忘（Catastrophic Forgetting）？如何在微调中避免？",
    answer: `灾难性遗忘指微调使模型在新任务上变好的同时，在原有能力上显著退化

**为什么发生**：LLM在预训练阶段学会了通用的语言知识和推理能力。微调时参数被「推」向特定任务分布，远离了原始的通用分布。尤其当微调数据量过少、过拟合时最严重

**缓解策略**：

- **PEFT技术**（LoRA、Adapter）：只修改少量参数，最大限度地保留原始权重中的预训练知识
- **数据混合**：在微调数据中混入10-20%的通用数据（原始预训练数据），维持模型的通用能力
- **小学习率**：使用低学习率（<1e-5）减少每次更新的幅度
- **正则化**：L2正则化约束模型参数不要偏离原始值太远
- **多任务学习**：同时训练目标任务和其他辅助任务，让模型保持多维度能力

**评估方法**：微调前后在同一通用Benchmark（MMLU、HellaSwag）上测试，确保通用能力没有显著退化`,
    category: "模型微调与训练",
    tags: ["灾难性遗忘", "过拟合", "正则化"],
    difficulty: "medium",
    dimension: "engineering",
  },
  {
    slug: "q63-instruction-tuning",
    qNumber: 63,
    title: "指令微调（Instruction Tuning）和普通SFT有何不同？",
    question: "指令微调（Instruction Tuning）和普通SFT有何不同？",
    answer: `虽然两者都是SFT的子类，但目标和数据格式有根本区别

**普通SFT**（传统任务微调）：

- 格式：纯粹的任务数据（如分类任务：输入待分类文本 -> 输出类别标签）
- 数据来源：单一任务的标注数据
- 目标：模型在某一特定任务上表现好
- 特点：缺乏跨任务泛化能力

**Instruction Tuning**：

- 格式：指令式（(instruction, input, output)三元组）
- 数据来源：多种任务混合（翻译、问答、摘要、代码、推理、对话）
- 数据量：几千到几万条多样化的指令-回答对
- 目标：模型学会「理解并执行任意指令」，实现Zero-shot泛化

**关键区别**：

| 维度 | 普通SFT | Instruction Tuning |
|------|---------|-------------------|
| 任务数 | 单一 | 多样 |
| 泛化 | 任务特定 | 跨任务泛化 |
| 数据格式 | 输入->标签 | 指令->回答 |
| 应用 | 专有模型 | 通用助手 |

Instruction Tuning是现代对话助手（ChatGPT、Claude、Llama-Chat）的必备步骤`,
    category: "模型微调与训练",
    tags: ["Instruction Tuning", "SFT", "泛化"],
    difficulty: "medium",
    dimension: "engineering",
  },
  {
    slug: "q64-lora-rank-selection",
    qNumber: 64,
    title: "LoRA中r (秩/rank)和alpha参数如何选择？对效果和效率有什么影响？",
    question: "LoRA中r (秩/rank)和alpha参数如何选择？对效果和效率有什么影响？",
    answer: `**r（秩）**：

- 控制LoRA矩阵的容量/表示能力
- r越大 -> 可训练参数越多 -> 模型越灵活 -> 效果越好 -> 但显存和训练时间增加
- 经验选择：
  - 简单任务（情感分类、实体识别）：r=8~16
  - 中等任务（指令微调）：r=16~64
  - 复杂任务（代码生成、多任务学习）：r=64~128

**alpha**：

- 缩放因子，影响LoRA更新的幅度
- 实际更新 = (alpha/r) x BA
- 通常alpha=2r或alpha=r（如r=16时alpha=32或16）

**最新进展**：

- DoRA（Weight-Decomposed Low-Rank Adaptation）：解耦LoRA更新的方向和幅值，效果优于原始LoRA
- LoRA+：在不同层使用不同的学习率（深层>浅层），通常显著优化的效果`,
    category: "模型微调与训练",
    tags: ["LoRA参数", "秩选择", "DoRA"],
    difficulty: "medium",
    dimension: "engineering",
  },
  {
    slug: "q65-finetuning-toolchain",
    qNumber: 65,
    title: "你用过哪些微调工具和框架？LLaMA-Factory、Axolotl、HuggingFace TRL各有什么特点？",
    question: "你用过哪些微调工具和框架？LLaMA-Factory、Axolotl、HuggingFace TRL各有什么特点？",
    answer: `| 框架 | 定位 | 特点 | 适合 |
|------|------|------|------|
| LLaMA-Factory | 国产全能微调 | 界面友好+CLI双方式，支持100+模型；整合LoRA/QLoRA/DPO/RLHF | 新手+快速上手+企业使用 |
| Axolotl | 开源高效微调 | 纯YAML配置驱动；大规模分布式训练优化 | 有经验的TL/研究者 |
| HuggingFace TRL | 官方标准库 | SFTTrainer/DPOTrainer/PPOTrainer标准API；与HF Hub无缝集成 | HuggingFace用户 |
| Unsloth | 极致加速 | 原生CUDA kernel优化；24GB卡可微调Mixtral 8x7B | 资源受限、追求极致速度 |

**选型建议**：

- 快速验证 -> LLaMA-Factory（开箱即用）
- 生产级大规模微调 -> Axolotl + DeepSpeed ZeRO-3
- 定制化+标准化 -> HuggingFace TRL
- 消费级GPU -> Unsloth`,
    category: "模型微调与训练",
    tags: ["LLaMA-Factory", "Axolotl", "TRL"],
    difficulty: "medium",
    dimension: "engineering",
  },
];

// ============================================================
// 六、模型部署与推理优化 Q66-Q75
// ============================================================
export const deploymentQuestions: InterviewQuestionItem[] = [
  {
    slug: "q66-deployment-framework",
    qNumber: 66,
    title: "模型部署有哪些主流框架？vLLM、TensorRT-LLM、llama.cpp各有什么特点？",
    question: "模型部署有哪些主流框架？vLLM、TensorRT-LLM、llama.cpp各有什么特点？",
    answer: `| 框架 | 定位 | 核心技术 | 加速比 | 适用场景 |
|------|------|----------|--------|----------|
| vLLM | 高吞吐推理引擎 | PagedAttention + Continuous Batching | ~10-30x | LLM在线服务（API） |
| TensorRT-LLM | NVIDIA官方推理引擎 | PTQ量化+内联优化 | ~20-50x | NVIDIA GPU生产环境 |
| llama.cpp | CPU/边缘推理 | 纯C++实现+GGUF量化 | ~1-3x(CPU) | 本地部署、边缘设备 |
| TGI (HF) | HuggingFace部署 | Continuous Batching+量化 | ~5-15x | HF生态内集成服务 |

**核心技术解释**：

- **PagedAttention (vLLM)**：将KV Cache按页管理而非连续大矩阵，类似OS虚拟内存，减少显存碎片
- **Continuous Batching**：不等整个Batch完成，每个请求随时可加入/退出Batch
- **TensorRT-LLM**：NVIDIA原生效果最好，但需要一定量模型转换和图融合工作`,
    category: "模型部署与推理优化",
    tags: ["vLLM", "TensorRT-LLM", "部署"],
    difficulty: "medium",
    dimension: "engineering",
  },
  {
    slug: "q67-continuous-batching",
    qNumber: 67,
    title: "Continuous Batching（动态批处理）的原理和优势是什么？",
    question: "Continuous Batching（动态批处理）的原理和优势是什么？",
    answer: `传统Static Batching：一批请求同时开始处理，必须等同一批中所有请求的生成完成（最长的拖慢全班）-> GPU利用率低

**Continuous Batching原理**：

- 不等待整批完成，每个请求生成完随时退出Batch，新请求随时加入Batch
- 每个推理步骤（forward pass）动态决定当前Batch包含哪些请求
- vLLM/TGI/TensorRT-LLM实现了不同版本的Continuous Batching

**优势**：

- **GPU利用率大幅提升**：从30-50% -> 70-90%+（避免短请求被长请求阻塞）
- **延迟更可预测**：每个请求不等同批中的长请求完成
- **吞吐量提高**：同样GPU资源可服务的并发用户数显著增加

**实现复杂度**：需要精细管理KV Cache内存的分配和释放；vLLM通过PagedAttention解决了KV Cache的碎片化管理`,
    category: "模型部署与推理优化",
    tags: ["Continuous Batching", "vLLM", "GPU"],
    difficulty: "medium",
    dimension: "engineering",
  },
  {
    slug: "q68-paged-attention",
    qNumber: 68,
    title: "什么是PagedAttention (vLLM)？为什么能大幅提升推理效率？",
    question: "什么是PagedAttention (vLLM)？为什么能大幅提升推理效率？",
    answer: `PagedAttention借鉴操作系统的虚拟内存和分页机制，将KV Cache切分为固定大小的Block（页），按需分配

**问题背景**：

- 传统KV Cache：为每个请求预留最大序列长度（如8192）的连续显存，导致两个问题：
  1) 大量预留但未使用的显存被浪费（内部碎片率60-80%）
  2) 显存碎片化，无法分配新请求（虽然总空闲足够但碎片化）

**PagedAttention解决方案**：

- 将KV Cache切分为固定大小的Block（如16个token/page）
- 像虚拟内存一样，Block不需要在显存中连续存放
- 每个请求按需申请KV Cache内存
- 理论上可以达到接近100%的显存利用率

**效果**：

- 显存浪费从60-80%降至<5%
- 在相同GPU下支持2-3倍更大的Batch Size
- 吞吐量提升10-30倍（显存瓶颈 -> 计算瓶颈的转变）`,
    category: "模型部署与推理优化",
    tags: ["PagedAttention", "vLLM", "KV Cache"],
    difficulty: "hard",
    dimension: "engineering",
  },
  {
    slug: "q69-speculative-decoding",
    qNumber: 69,
    title: "什么是投机采样 (Speculative Decoding)？为什么能加速推理？",
    question: "什么是投机采样 (Speculative Decoding)？为什么能加速推理？",
    answer: `投机采样用一个小型「草稿模型」(Draft Model)推测多个token，再由目标大模型一次性验证（并行接受或拒绝），从而减少大模型的串行调用次数

**流程**：

1. Draft Model（小模型，如LLaMA 68M）快速生成K个推测token
2. Target Model（大模型，如LLaMA 70B）一次性计算这K个token上每个位置的概率
3. 验证：逐个位置比较Draft和Target的概率分布，接受或拒绝每个token
4. 如果某位置被拒绝，从该位置用Target Model重新采样

**加速原理**：

- 大模型每步串行生成1个token（原始）-> 改为一次性验证K个token（投机采样）
- 理论上加速比接近K（实践中2-3倍），前提是Draft Model足够准确

**关键难点**：选择合适的Draft Model（太小不准确、太大失去速度优势）；两个模型的KV Cache协同管理

**代表实现**：SpecInfer、Medusa（Draft思路）、Lookahead Decoding`,
    category: "模型部署与推理优化",
    tags: ["投机采样", "Speculative Decoding", "加速"],
    difficulty: "hard",
    dimension: "engineering",
  },
  {
    slug: "q70-deployment-pipeline",
    qNumber: 70,
    title: "设计一个大模型推理服务的完整部署流程，从模型获取到上线监控。",
    question: "设计一个大模型推理服务的完整部署流程，从模型获取到上线监控。",
    answer: `**完整部署流程**：

**1. 模型获取**：
- HuggingFace下载原始模型权重
- 验证SHA256完整性

**2. 模型转换**：
- 格式转换：SafeTensors -> 推理框架格式
- 量化：FP16 -> INT4（GPTQ/AWQ）或 FP8
- 框架适配：vLLM格式 或 TensorRT-LLM engine

**3. 部署配置**：
- GPU配置：规格（A100/H100/H20）、数量、显存分配
- 并发参数：max_num_seqs、max_model_len
- 量化参数：dtype、quantization_method

**4. 服务封装**：
- OpenAI兼容API（/v1/chat/completions）
- 认证+限流（API Key + Rate Limiter）
- 请求日志（保留用于后期分析）

**5. 负载均衡**：
- 多卡推理：模型分片到多GPU
- 多副本：同一模型多实例 + Nginx/HAProxy分发

**6. 监控与运维**：
- 指标采集：QPS、延迟(P50/P95/P99)、GPU利用率、显存使用率、错误率
- 告警：延迟超阈值 -> 自动扩容GPU；OOM -> 通知运维
- 日志：推理日志 + 原始请求/响应采样存储`,
    category: "模型部署与推理优化",
    tags: ["部署流程", "SRE", "监控"],
    difficulty: "medium",
    dimension: "engineering",
  },
  {
    slug: "q71-tensor-parallel",
    qNumber: 71,
    title: "什么是Tensor Parallelism和Pipeline Parallelism？在模型部署中如何使用？",
    question: "什么是Tensor Parallelism和Pipeline Parallelism？在模型部署中如何使用？",
    answer: `**Tensor Parallelism (TP，张量并行)**：

- 将单个Transformer层的参数矩阵在多个GPU间横向切分
- 每层计算涉及跨GPU通信（All-Reduce/All-Gather）
- 优点：加速效果好，减少单卡显存占用
- 缺点：通信开销大（需要高速NVLink/IB互联，单机多卡最佳）
- 适用：模型太大单卡装不下，需要多卡分摊

**Pipeline Parallelism (PP，流水线并行)**：

- 将整个模型纵向切分，不同层放在不同GPU上
- 类似工厂流水线：GPU 1处理Layers 1-20，传给GPU 2处理Layers 21-40...
- 优点：通信开销小（只在GPUs间传激活值），可跨节点
- 缺点：GPU利用率不均（Pipeline Bubble），复杂

**DeepSpeed策略**：ZeRO-1（优化器状态分片）、ZeRO-2（梯度+优化器状态）、ZeRO-3（参数+梯度+优化器全分片）

**实践选择**：单机多卡 -> Tensor Parallel (TP=2/4/8)；跨节点 -> TP + PP组合`,
    category: "模型部署与推理优化",
    tags: ["Tensor Parallelism", "Pipeline", "分布式"],
    difficulty: "medium",
    dimension: "engineering",
  },
  {
    slug: "q72-inference-latency-optimization",
    qNumber: 72,
    title: "大模型推理延迟（TTFT/TPOT）如何优化？列出能想到的所有层面。",
    question: "大模型推理延迟（TTFT/TPOT）如何优化？列出能想到的所有层面。",
    answer: `**两个核心延迟指标**：

- **TTFT (Time To First Token)**：用户提交请求到第一个token产生的时间
- **TPOT (Time Per Output Token)**：后续每个token的生成时间

**优化方法（全栈）**：

**硬件层**：
- 用最新GPU（H100 > A100）；用高带宽内存（HBM3）
- GPU互联：NVLink + NVSwitch

**模型层**：
- 量化：FP16 -> INT4（GPTQ/AWQ）
- 稀疏性：结构化/非结构化剪枝
- 架构简化：用GQA替代MHA（KV Cache缩小，更快计算）
- 模型蒸馏：用大模型蒸馏小模型

**推理引擎层**：
- 高效KV Cache管理（PagedAttention + vLLM）
- 算子融合（FlashAttention-2/3）
- 量化KV Cache（KV Cache也用INT8/INT4存储）
- CUDA Kernel优化（自定义算子 + Triton加速）

**服务层**：
- Prompt缓存（高频System Prompt/Prefix缓存）
- 并行策略（数据并行 = 多副本；模型并行 = 大模型分发）
- 请求调度（短请求优先）
- 流式输出（SSE/WebSocket发送token流）`,
    category: "模型部署与推理优化",
    tags: ["延迟优化", "TTFT", "TPOT"],
    difficulty: "hard",
    dimension: "engineering",
  },
  {
    slug: "q73-gguf-format",
    qNumber: 73,
    title: "GGUF格式是什么？适用于什么场景？",
    question: "GGUF格式是什么？适用于什么场景？",
    answer: `GGUF (GGML Universal Format) 是 llama.cpp 项目提出的模型分发格式，替代了之前的GGML格式

**特点**：

- **单文件分发**：模型权重、Tokenizer、配置全在一个文件中
- **灵活量化**：支持多种量化级别（Q2_K到Q8_0），在精度和大小间选择
- **无Python依赖**：纯C++实现，不依赖PyTorch/TensorFlow
- **跨平台**：Windows/Mac/Linux，支持CPU(C++加速)、Metal(GPU M系列)、CUDA(NVIDIA)

**适用场景**：

- **本地/边缘部署**：个人电脑、手机、嵌入式设备运行大模型
- **隐私优先**：所有推理数据不离开本地设备
- **快速原型**：用Ollama一键启动本地LLM服务（底层基于llama.cpp）
- **资源受限**：16GB内存+CPU就能运行70B量化模型

**局限**：QPS远低于GPU服务器部署；长Prompt的Prefill速度慢；不适合高并发在线服务`,
    category: "模型部署与推理优化",
    tags: ["GGUF", "llama.cpp", "边缘部署"],
    difficulty: "easy",
    dimension: "engineering",
  },
  {
    slug: "q74-model-monitoring",
    qNumber: 74,
    title: "大模型上线后如何进行效果监控和自动告警？",
    question: "大模型上线后如何进行效果监控和自动告警？",
    answer: `**监控维度**：

**服务指标**（实时）：
- QPS（每秒请求数）、延迟（TP50/TP95/TP99）、错误率（4xx/5xx）
- GPU利用率、显存使用率、排队深度
- 工具：Prometheus + Grafana + nvidia-smi Exporter

**业务指标**（离线/准实时）：
- 用户满意度（点赞/点踩/举报率）
- 会话深度（平均对话轮次）
- 转化/任务完成率

**模型质量指标**（离线）：
- 每日采样数据 + LLM-as-Judge自动化评分
- 监控输出多样性崩溃（所有回答趋于一致模板化）
- 监控安全和安全合规（不安全内容占比）

**自动告警策略**：

- 延迟>阈值（TP99 > 3秒）-> 告警 -> 检查负载/GPU/推理引擎
- 错误率>2% -> 告警 -> 检查模型/依赖/配置
- 满意度暴跌（日环比下降>10%）-> 告警 -> 检查最近部署/Prompt变更
- 哈希匹配检测恶意Prompt Injection`,
    category: "模型部署与推理优化",
    tags: ["监控", "告警", "运维"],
    difficulty: "medium",
    dimension: "engineering",
  },
  {
    slug: "q75-api-gateway",
    qNumber: 75,
    title: "如何设计一个大模型API网关（API Gateway）？需要哪些功能？",
    question: "如何设计一个大模型API网关（API Gateway）？需要哪些功能？",
    answer: `API Gateway入口负责管理所有模型调用请求，为上层应用提供统一、安全、高效的访问入口

**核心功能设计**：

**请求管理**：
- **统一API接口**：OpenAI-compatible /v1/chat/completions
- **智能路由**：根据请求复杂度路由到不同模型（简单->小模型，复杂->大模型）
- **负载均衡**：Round-robin/Least Connections/一致性哈希
- **流量整形**：Rate Limiting（QPS/用户/天）、排队溢出保护

**安全**：
- API Key认证/SSO用户鉴权
- Prompt注入检测（规则+ML模型）
- 内容安全过滤（敏感词/越狱检测）
- 审计日志（全量记录请求和响应摘要）

**降本**：
- Prompt/Answer缓存（语义相似度匹配+KV-Cache）
- 模型分层路由，越简单的问题用越便宜的模型

**可观测性**：
- 每请求可追踪全链路（请求ID/用户ID/模型/延迟/tokens/成本）
- 提供商业看板（按用户/模型/日期聚合）`,
    category: "模型部署与推理优化",
    tags: ["API Gateway", "网关", "架构"],
    difficulty: "hard",
    dimension: "engineering",
  },
];
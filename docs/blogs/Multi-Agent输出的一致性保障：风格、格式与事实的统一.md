# Multi-Agent 输出的一致性保障：风格、格式与事实的统一

> 当你用 5 个 Agent 分别写报告的五个章节，合并后却发现：第一章像学术论文，第三章像营销文案；第二节用 Markdown，第四节用 HTML；第五章的数据和第二章的统计口径根本对不上——这就是 Multi-Agent 内容生成的"最后一公里"难题。

---

## 一、为什么一致性是 Multi-Agent 的隐形瓶颈

在内容生成、报告撰写、多模态文档构建等场景中，Multi-Agent 架构的优势显而易见：**任务并行、能力专精、容错隔离**。但当你把多个 Agent 的输出拼接成最终产物时，往往会遇到三类冲突：

| 冲突维度 | 典型表现 | 影响 |
|---|---|---|
| **风格不一致** | Agent A 用正式书面语，Agent B 用口语化表达；语气、人称、修辞风格参差不齐 | 阅读体验割裂，专业感骤降 |
| **格式不统一** | 有的输出 JSON，有的输出 Markdown；字段命名、缩进、列表符号各成一派 | 下游解析失败，合并逻辑复杂 |
| **事实冲突** | 不同 Agent 引用的数据源版本不同，或各自"幻觉"出矛盾的事实 | 内容可信度崩塌，甚至引发业务风险 |

这些问题在单 Agent 时代几乎不存在，因为模型会自然保持上下文一致性。但在 Multi-Agent 架构中，**每个 Agent 是独立调用的，它们之间没有共享的生成状态**，一致性必须被显式设计。

---

## 二、输出规范协议：用 Schema 约束"出厂标准"

最前置的保障手段，是在 Agent 生成之前就约定好输出规则。不要依赖模型的"自觉"，而是给它一个**不可协商的契约**。

### 2.1 JSON Schema：结构化内容的"硬约束"

对于需要结构化输出的场景（如报告章节、数据卡片、配置项），为每个 Agent 绑定严格的 JSON Schema：

```json
{
  "type": "object",
  "required": ["section_id", "title", "content", "references"],
  "properties": {
    "section_id": { "type": "string", "pattern": "^SEC-\\d{3}$" },
    "title": { "type": "string", "maxLength": 60 },
    "content": { 
      "type": "string", 
      "minLength": 100,
      "description": "使用第三人称客观叙述，避免感叹句" 
    },
    "references": {
      "type": "array",
      "items": { "type": "string", "format": "uri" }
    }
  }
}
```

**关键实践：**
- **Schema 即 Prompt**：把风格要求写进字段的 `description`，让模型在填充每个字段时都被提醒
- **统一字段命名**：全系统使用同一套命名规范（如 `snake_case`），避免 `userName` 和 `user_name` 混用
- **枚举值锁定**：对于风格标签、分类值等，用 `enum` 限定可选范围，杜绝自由发挥

### 2.2 文本模板：非结构化内容的"软边界"

对于大段 prose（如文章段落、报告正文），Schema 不够灵活，可以改用**模板占位符**：

```markdown
## {{section_title}}

**背景**：{{background}}（限制：100-150字，客观陈述，不使用比喻）

**分析**：{{analysis}}（限制：基于{{data_source}}最新数据，使用"根据...显示"句式引用）

**结论**：{{conclusion}}（限制：与全文结论风格一致，使用"因此/综上所述"开头）
```

模板的优势在于：**既约束了格式骨架，又在每个占位符内嵌入了风格指令**，让 Agent 在微观层面保持统一。

---

## 三、后处理统一层：合并前的"整形外科"

即使有前置协议，Agent 输出仍可能有偏差。需要一个**后处理层（Post-Processing Layer）**在合并前做标准化清洗。

### 3.1 格式标准化流水线

```
Agent 原始输出
    ↓
[格式检测] → 识别当前格式（JSON/Markdown/HTML/纯文本）
    ↓
[结构归一] → 统一转换为系统标准格式（如内部 AST）
    ↓
[字段映射] → 按全局字段字典重命名/重组
    ↓
[风格标准化] → 统一标点、缩进、列表符号、日期格式
    ↓
[校验] → 对比 Schema，不通过则打回重试
    ↓
进入合并池
```

**代码示意（Python 伪代码）：**

```python
class NormalizationPipeline:
    def __init__(self):
        self.format_detector = FormatDetector()
        self.ast_converter = ASTConverter()
        self.style_normalizer = StyleNormalizer(style_guide="formal")
    
    def process(self, raw_output: str, agent_id: str) -> NormalizedOutput:
        fmt = self.format_detector.detect(raw_output)
        ast = self.ast_converter.convert(raw_output, from_fmt=fmt)
        ast = self.style_normalizer.normalize(ast)
        
        if not self.schema_validator.validate(ast, agent_id):
            raise ValidationError("Schema mismatch")
        
        return ast
```

### 3.2 风格迁移：用"润色 Agent"统一文笔

当多个 Agent 的写作风格差异较大时，可以引入一个专门的**风格迁移 Agent（Style Transfer Agent）**：

> **输入**：多个 Agent 的原始段落 + 目标风格说明书（如"技术白皮书风格：第三人称、无感叹号、数据驱动"）
> **输出**：重写后的统一风格文本

这个 Agent 本身不生成新内容，只做**语言层面的归一化**，保留事实和结构，统一语气和修辞。

---

## 四、一致性检查 Agent：合并后的"质检员"

后处理解决了格式和风格问题，但**事实一致性**需要更深层的校验。因为不同 Agent 可能基于不同的知识截止日期、不同的数据源，甚至各自产生幻觉。

### 4.1 交叉验证机制

引入一个**一致性检查 Agent（Consistency Checker）**，在内容合并后执行多维度校验：

```python
class ConsistencyChecker:
    def check(self, merged_document: Document) -> ConsistencyReport:
        return ConsistencyReport(
            factual_conflicts=self._detect_factual_conflicts(merged_document),
            temporal_conflicts=self._detect_temporal_conflicts(merged_document),
            statistical_conflicts=self._detect_statistical_conflicts(merged_document),
            cross_references=self._verify_cross_references(merged_document)
        )
```

**具体检查项：**

| 检查类型 | 方法 | 示例 |
|---|---|---|
| **实体一致性** | 提取全文命名实体，比对是否矛盾 | 第二章说"公司 A 成立于 2010"，第四章说"成立于 2012" |
| **数值一致性** | 对数字做交叉验证，允许合理误差范围 | 第一章总营收 100 亿，第三章却说各业务线之和为 120 亿 |
| **时态一致性** | 检查时间表述是否逻辑自洽 | "2024 年 Q3 的数据"出现在 2024 年 Q2 的报告中 |
| **引用闭环** | 验证文中引用是否能在参考文献中找到 | 正文引用 [3]，但参考文献列表只有 [1][2] |

### 4.2 冲突消解策略

当检查 Agent 发现冲突时，不是简单报错，而是按策略自动或半自动消解：

1. **权威源优先**：为每个事实类型设定优先级（如财务数据以财报 Agent 为准，行业数据以研究 Agent 为准）
2. **时效优先**：当同一事实有不同版本时，以更新时间更近的为准
3. **人工仲裁**：对于高置信度冲突，标记后推送给人工审核，而不是让模型"猜"哪个对

---

## 五、版本对齐：让 Agent 们站在同一条时间线上

事实冲突的一个常见根源是**知识版本不一致**。Agent A 调用的模型知识截止于 2024 年 6 月，Agent B 通过 RAG 检索了 2024 年 12 月的数据，两者对同一事件的描述自然可能矛盾。

### 5.1 统一知识基线

为所有 Agent 配置**统一的外部知识库**，而不是各自独立检索：

```
┌─────────────────────────────────────┐
│         统一知识库（Knowledge Base）   │
│  ┌─────────┐ ┌─────────┐ ┌────────┐ │
│  │ 文档 v3 │ │ 数据 v2 │ │ 规则 v1│ │
│  └─────────┘ └─────────┘ └────────┘ │
└────────────┬────────────────────────┘
             │ 统一检索接口
    ┌────────┼────────┐
    ↓        ↓        ↓
 Agent A  Agent B  Agent C
```

所有 Agent 通过同一接口检索，确保它们看到的"事实"版本一致。

### 5.2 显式版本标记

在 Agent 输出中强制要求标注**信息来源和版本**：

```json
{
  "content": "2024 年全球 AI 市场规模达到 3000 亿美元",
  "source": {
    "document": "global_ai_market_report_2024",
    "version": "v2.1",
    "retrieved_at": "2024-12-15T10:00:00Z"
  }
}
```

这样一致性检查 Agent 可以精确比对："Agent A 引用了 v2.1，Agent B 引用了 v1.8，这就是冲突原因"。

---

## 六、实战建议：从简单到复杂的演进路径

如果你正在构建一个 Multi-Agent 内容生成系统，不必一次性实现所有层。建议按以下路径迭代：

| 阶段 | 目标 | 投入 |
|---|---|---|
| **阶段 1：Schema 约束** | 先解决格式统一问题 | 为每个 Agent 定义 JSON Schema，用结构化输出模式 |
| **阶段 2：后处理归一** | 解决风格差异 | 增加格式转换和风格标准化流水线 |
| **阶段 3：一致性检查** | 解决事实冲突 | 引入检查 Agent，先做实体和数值校验 |
| **阶段 4：知识对齐** | 根治版本问题 | 建设统一知识库，所有 Agent 共享同一数据源 |

---

## 七、写在最后

Multi-Agent 架构的核心价值是**分解复杂度**，但如果分解后的产物无法优雅地重新组合，价值就会大打折扣。一致性保障不是"锦上添花"，而是**决定 Multi-Agent 系统能否从 Demo 走向生产的关键工程能力**。

记住一个原则：**不要期望 LLM 自动保持一致，要把一致性当作一个独立的工程问题来解决。** 用协议约束输入、用流水线清洗输出、用检查 Agent 验证结果、用知识库对齐版本——当这四层防线都就位时，你的 Multi-Agent 系统才能真正产出可信、统一、专业级的内容。

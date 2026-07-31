
# AI 应用工程师成长路线网站开发计划

## 一、项目目标

建设一个：

> 面向全球开发者的 AI Application Engineer Roadmap 学习平台。

核心能力：

```
学习路线
    |
    |
技术博客
    |
    |
项目实战
    |
    |
面试题库
    |
    |
开发者成长记录
```

第一阶段目标：

上线 MVP：

* SEO友好的学习路线
* MDX博客系统
* 分类体系
* 搜索
* 项目案例
* 面试题库

---

# 二、整体技术方案

## 前端

```
Next.js 14
(App Router)

+
TypeScript

+
TailwindCSS

+
MDX

+
Shadcn UI
```

原因：

* SEO优秀
* 静态生成速度快
* 适合技术博客
* 方便国际化

---

## 数据模式

第一阶段：

内容驱动：

```
MDX文件

↓

Next.js Static Generate

↓

HTML页面
```

不引入数据库。

---

## 第二阶段

增加：

```
Spring Boot

+

MySQL

+

Redis
```

支持：

* 用户系统
* 学习进度
* 收藏
* 评论

---

# 三、开发阶段规划

# Phase 0：Harness 工程规范建设（必须优先）

目标：

建立 AI 编程协作规范。

让 Cursor / Trae 等 AI 工具按照统一标准开发。

---

## 0.1 创建项目 Harness

目录：

```
ai-engineer-roadmap/

├── .harness/
│
├── docs/
│
├── rules/
│
├── prompts/
│
├── architecture/
│
├── decisions/
│
└── README.md
```

---

# 0.2 Harness 文档

## 1. 项目总规范

文件：

```
.harness/project-context.md
```

内容：

包括：

* 产品定位
* 用户画像
* 技术栈
* 开发原则

示例：

```md
项目名称：

AI 应用工程师成长路线


目标：

打造免费的大模型应用开发学习平台。


核心用户：

开发者。


技术方向：

Next.js + MDX + SEO。


开发原则：

1. SEO优先
2. 性能优先
3. 内容结构优先
4. 简洁设计
```

---

# 2. Coding Rules

文件：

```
rules/coding-rule.md
```

定义：

## TypeScript规范

例如：

* 禁止any
* 使用interface
* 函数必须类型声明

---

## React规范

要求：

* Server Component优先
* Client Component最小化

---

## Tailwind规范

要求：

* 不写大量重复class
* 使用组件封装

---

# 3. Architecture Document

文件：

```
architecture/system-design.md
```

定义：

系统：

```
Browser

↓

Next.js

↓

MDX Content

↓

Static Generate

↓

CDN
```

---

# 4. UI Design Rule

文件：

```
rules/ui-guideline.md
```

定义：

设计风格：

```
简洁
专业
开发者风格

类似：

GitHub
Linear
Vercel
```

颜色：

```
Primary:
深蓝

Background:
白色

Accent:
科技蓝
```

---

# 5. AI开发Prompt规范

文件：

```
prompts/development-prompt.md
```

规定：

AI生成代码必须：

1. 先分析
2. 给方案
3. 修改文件
4. 输出影响范围

禁止：

* 随意新增依赖
* 修改架构
* 删除代码

---

# 6. Feature Spec模板

文件：

```
docs/feature-template.md
```

以后每个功能：

必须先写：

```
功能目标

用户场景

页面设计

数据结构

技术方案

验收标准
```

---

# Phase 1：项目初始化（第1周）

## 目标

创建基础工程。

任务：

## 初始化 Next.js

```
npx create-next-app
```

配置：

* TypeScript
* ESLint
* Tailwind

---

## 安装依赖

核心：

```json
{
"dependencies":{

"next-mdx-remote":"",
"gray-matter":"",
"rehype":"",
"remark":""

}
}
```

---

## 建立目录

最终：

```
src

├── app
│
│── blog
│
│── roadmap
│
│── projects
│
│── interview
│
├── components
│
├── content
│
│── mdx
│
├── lib
│
└── config
```

---

# Phase 2：基础页面开发（第2周）

## 首页

实现：

```
Hero

学习路线介绍

能力体系

项目展示

最新文章
```

---

## 学习路线页面

路径：

```
/roadmap
```

内容：

8阶段路线。

组件：

```
RoadmapTimeline

StageCard

ProgressBar
```

---

# Phase 3：MDX博客系统（第3-4周）

核心。

## 功能

支持：

* Markdown
* FrontMatter
* 代码高亮
* TOC
* SEO Metadata

---

文章结构：

```
content/

blog/

├── llm

├── rag

├── agent

├── engineering
```

---

MDX示例：

```md
---
title:
RAG完整指南

category:
RAG

level:
advanced

---
```

---

实现页面：

```
/blog/[slug]
```

---

# Phase 4：内容体系建设（持续）

建立：

## 大模型基础

50篇

## LLM开发

50篇

## Prompt

30篇

## RAG

50篇

## Agent

50篇

## 企业工程

50篇

目标：

300+高质量文章。

---

# Phase 5：项目实战模块（第5-6周）

页面：

```
/projects
```

项目卡片：

展示：

```
项目名称

技术栈

难度

学习目标
```

---

详情：

```
/projects/[slug]
```

内容：

```
背景

需求

架构

代码

部署

面试
```

---

# Phase 6：面试题库（第7周）

页面：

```
/interview
```

分类：

```
LLM

RAG

Agent

System Design
```

---

题目结构：

MDX：

```md
question:

RAG为什么会产生幻觉？


answer:

xxx
```

---

# Phase 7：SEO优化（第8周）

## 基础SEO

实现：

* sitemap.xml
* robots.txt
* metadata
* OpenGraph
* JSON-LD

---

## 多语言准备

预留：

```
/zh

/en

/ja
```

---

# Phase 8：搜索功能

第一版：

本地搜索。

方案：

* Fuse.js

后期：

ElasticSearch。

---

# Phase 9：AI助手功能（后续）

利用自己的网站内容。

实现：

```
用户问题

↓

Embedding

↓

网站文章向量库

↓

LLM

↓

AI回答
```

成为：

> AI 应用工程师成长路线 AI导师

---

# 四、开发顺序总结

严格按照：

```
① Harness工程规范

        ↓

② Next.js工程初始化

        ↓

③ UI基础框架

        ↓

④ 首页

        ↓

⑤ 学习路线

        ↓

⑥ MDX博客系统

        ↓

⑦ 内容建设

        ↓

⑧ 项目实战

        ↓

⑨ 面试题库

        ↓

⑩ SEO优化

        ↓

⑪ AI助手
```

---

# 五、AI编程工具协作流程

以后每开发一个功能：

## Step 1

先创建：

```
docs/features/xxx.md
```

描述需求。

---

## Step 2

让 AI：

```
阅读：

.harness

architecture

coding-rule

feature spec
```

---

## Step 3

AI输出：

```
开发方案

文件修改列表

代码实现
```

---

## Step 4

人工确认。

---

## Step 5

执行开发。

---

# 六、MVP上线目标（3个月）

上线内容：

✅ 首页

✅ AI工程师学习路线

✅ 100篇技术博客

✅ 10个实战项目

✅ 200道面试题

✅ SEO完整配置

目标：

成为：

> Google 搜索「AI Application Engineer Roadmap」「RAG Tutorial」「AI Agent Tutorial」等关键词的长期内容资产。

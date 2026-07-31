
# AI 应用工程师成长路线网站 PRD（博客学习版）

# 1. 产品定位

## 产品名称

AI 应用工程师成长路线

英文：

AI Application Engineer Roadmap

---

## 产品一句话介绍

> 一个帮助开发者从零开始系统学习大模型应用开发，通过技术博客、代码实践、企业项目和面试题库，成长为企业级 AI 应用工程师的平台。

---

# 2. 产品目标

帮助用户完成：

```
普通开发者

↓

掌握LLM基础

↓

开发AI应用

↓

掌握RAG

↓

掌握Agent

↓

具备企业项目能力

↓

通过AI应用工程师面试

↓

成为AI应用架构师
```

---

# 3. 核心价值

## 对初学者

解决：

> 我应该从哪里开始学习AI开发？

提供：

* 清晰路线
* 学习顺序
* 每日学习任务
* 实战代码

---

## 对传统程序员

解决：

> 我已经会Java/Python，但是不会大模型开发。

提供：

* 技术迁移路线
* 企业开发经验
* 架构设计

---

## 对高级开发者

解决：

> 如何把AI应用做到生产级？

提供：

* 高级架构
* 性能优化
* 企业实践

---

# 4. 网站整体架构

```
首页

 |

学习路线

 |

知识博客

 |

实战项目

 |

代码仓库

 |

面试题库

 |

AI工具箱

 |

个人学习中心
```

---

# 5. 首页设计

## Hero区域

标题：

```
成为企业需要的 AI 应用工程师

从大模型基础
到企业级AI应用开发

系统学习成长路线
```

按钮：

```
开始学习

查看学习路线
```

---

# 6. 学习路线模块

核心页面：

```
/roadmap
```

这是整个网站最重要页面。

---

# 页面展示

## AI应用工程师成长路线

采用：

时间轴 + 阶段卡片

---

# Stage 0

# 编程基础准备

目标：

具备AI开发环境。

学习：

* Python基础
* Java AI开发基础
* HTTP API
* JSON
* Git
* Docker

文章：

例如：

```
Python开发环境搭建

AI开发为什么推荐Python？

Java开发者如何进入AI领域？
```

产出：

完成：

第一个LLM API调用。

---

# Stage 1

# 人工智能与大模型基础

目标：

理解LLM。

文章：

## AI基础

* 人工智能发展历史
* 机器学习基础
* 深度学习简介

## 大模型基础

* 什么是LLM
* GPT原理
* Transformer详解
* Token是什么
* Embedding是什么

面试：

```
Transformer为什么替代RNN？

GPT如何生成文本？
```

---

# Stage 2

# LLM应用开发

目标：

成为AI应用开发工程师。

学习：

## 模型调用

文章：

* OpenAI API使用
* Claude API
* Gemini API
* DeepSeek API
* 通义千问API

## 应用开发

学习：

* Chat API
* Streaming输出
* Function Calling
* Structured Output

项目：

## AI聊天机器人

---

# Stage 3

# Prompt Engineering

目标：

掌握人与模型沟通方法。

文章：

基础：

* Prompt结构
* Role设计
* Context设计

高级：

* Chain of Thought
* ReAct
* Self Consistency

项目：

AI代码助手

---

# Stage 4

# RAG企业知识库开发

重点模块。

目标：

掌握企业最常见AI应用。

学习：

## RAG基础

文章：

* 什么是RAG
* 为什么需要RAG
* RAG完整流程

## 文档处理

学习：

* PDF解析
* Word解析
* Markdown解析
* Chunk切分

## 向量数据库

学习：

* Embedding
* Vector Search
* Milvus
* Chroma
* Elasticsearch

项目：

企业知识库系统

---

# Stage 5

# AI Agent开发

目标：

开发智能体。

学习：

## Agent基础

文章：

* 什么是Agent
* Agent架构
* Memory
* Planning

## Framework

学习：

* LangChain
* LangGraph
* AutoGen

项目：

AI办公助手

---

# Stage 6

# 企业级AI工程

目标：

达到企业开发要求。

内容：

## 架构设计

文章：

* AI应用整体架构
* LLM Gateway设计
* 多模型管理

## 性能优化

学习：

* Token优化
* Prompt缓存
* 流式响应
* 异步任务

## 安全

学习：

* Prompt Injection
* 数据安全
* 权限控制

---

# Stage 7

# 企业项目实战

核心内容。

每个项目包含：

```
项目背景

需求分析

系统设计

技术选型

数据库设计

核心代码

部署方案

优化方案

面试讲解
```

---

项目：

## 项目1

企业知识库系统

技术：

```
Spring Boot

Vue/React

Redis

Milvus

LLM
```

---

## 项目2

AI智能客服

功能：

* 多轮对话
* 文档检索
* Agent调用

---

## 项目3

AI代码助手

功能：

* 代码分析
* 自动生成
* Bug修复

---

# 7. 博客系统设计

核心模块：

```
/blog
```

---

## 文章分类

一级分类：

```
大模型基础

LLM开发

Prompt工程

RAG

Agent

工程化

项目实战

面试
```

---

# 文章结构标准化

每篇文章固定模板：

```
标题

摘要

学习目标


一、是什么？

二、为什么需要？

三、核心原理

四、代码实现

五、企业应用

六、面试问题

七、相关阅读
```

---

例如：

文章：

《RAG系统完整原理解析》

结构：

```
什么是RAG？

↓

为什么企业需要RAG？

↓

RAG工作流程

↓

Embedding原理

↓

向量数据库

↓

代码实现

↓

企业架构

↓

面试题
```

---

# 8. 代码示例模块

每篇技术文章关联：

GitHub代码。

例如：

文章：

Spring Boot调用LLM API

包含：

```
src

├── controller

├── service

├── llm

└── config
```

---

# 9. AI实验模块

不是复杂在线IDE。

第一阶段：

提供：

## 在线Demo

例如：

Prompt测试

用户：

输入：

```
Prompt
```

查看：

模型结果。

---

# 10. 面试题库

路径：

```
/interview
```

分类：

## LLM基础

100题

例如：

* Token是什么？
* Transformer是什么？

---

## RAG

100题

例如：

* 如何优化召回？
* 如何降低幻觉？

---

## Agent

50题

---

## 系统设计

例如：

```
设计一个企业级AI客服系统
```

---

# 11. 用户学习中心

功能：

## 学习进度

记录：

```
已完成文章

学习时间

收藏文章

笔记
```

---

## 我的路线

例如：

```
当前阶段：

RAG开发


完成：

35/80篇文章
```

---

# 12. SEO设计

由于核心是博客，非常适合SEO。

URL设计：

```
/blog/what-is-llm

/blog/rag-tutorial

/blog/langchain-guide

/blog/ai-agent-development


/roadmap/ai-engineer
```

---

# 13. 技术方案

结合你的技术栈：

## 前端

推荐：

```
Next.js 14

TypeScript

TailwindCSS

MDX
```

优势：

* SEO好
* 博客友好
* 静态生成

---

## 后端

初期：

可以不需要复杂后台。

方案：

```
Next.js

+

MDX文章

+

Git管理内容
```

后期：

增加：

Spring Boot

MySQL

---

# 14. MVP版本

## 第一阶段（1个月）

上线：

✅ 首页

✅ 学习路线

✅ 博客系统

✅ 分类

✅ 搜索

目标：

先形成内容资产。

---

## 第二阶段（2-3个月）

增加：

✅ 项目实战

✅ 面试题库

✅ 用户登录

✅ 学习进度

---

## 第三阶段

增加：

✅ AI问答助手

用户可以：

> 问网站里的所有知识

实现：

网站内容RAG。

---

# 15. 商业模式

## 免费流量

开放：

* 学习路线
* 技术博客
* 基础项目

获取：

Google SEO流量

---

## 付费内容

高级会员：

```
企业项目源码

高级架构文章

面试资料

AI实验环境
```

---

# 最终产品定位

> **AI 应用工程师成长路线不是一个课程网站，而是一套面向开发者的 AI 工程能力成长体系。通过结构化博客、项目实践和面试体系，让开发者从普通程序员成长为企业级 AI 应用工程师。**

这个方向和你已有的 **Next.js + MDX + SEO 技术博客型网站经验**非常匹配，第一版甚至可以完全采用静态内容驱动，先快速积累 Google SEO 内容资产。

# Architecture Documentation

## 整体架构

```
┌──────────────────────────────────────┐
│          Next.js 14 (App Router)      │
├──────────────────────────────────────┤
│  Pages       │  API Routes           │
│  (SSG/ISR)   │  (Search API)         │
├──────────────┼───────────────────────┤
│  Components  │  Hooks                │
├──────────────┼───────────────────────┤
│  Lib         │  Types                │
├──────────────┴───────────────────────┤
│  Content Layer (MDX + Frontmatter)   │
├──────────────────────────────────────┤
│  Static Assets / Styles              │
└──────────────────────────────────────┘
```

## 渲染策略

| 页面类型 | 策略 | 原因 |
|---------|------|------|
| 首页 | SSG + ISR | 内容更新不频繁 |
| 路线图 | SSG | 静态内容为主 |
| 博客列表 | SSG + ISR | 定期有新文章 |
| 博客详情 | SSG | 文章发布后不变 |
| 项目展示 | SSG | 项目更新频率低 |
| 面试题库 | SSG | 题目固定内容 |
| 搜索结果 | CSR | 动态查询 |

## 数据流

### 内容加载流程
```
MDX 文件 → gray-matter 解析 → MDX 编译 → 组件渲染
```

### 搜索流程
```
用户输入 → fuse.js 索引搜索 → API 返回 → 结果展示
```

### 静态生成流程
```
generateStaticParams → 读取内容目录 → 解析 MDX → 生成页面
```

## 组件层次

```
RootLayout
├── Header (导航栏)
├── Main Content
│   ├── HomePage
│   │   ├── HeroSection
│   │   ├── FeatureCards
│   │   ├── LatestPosts
│   │   ├── RoadmapPreview
│   │   └── CTASection
│   ├── RoadmapPage
│   │   ├── RoadmapTimeline
│   │   └── TopicDetail
│   ├── BlogPages
│   │   ├── BlogList
│   │   ├── BlogCard
│   │   ├── BlogDetail
│   │   └── BlogSidebar
│   ├── ProjectPages
│   │   ├── ProjectGrid
│   │   └── ProjectDetail
│   └── InterviewPages
│       ├── QuestionList
│       └── QuestionDetail
├── Footer
└── SearchOverlay
```

## SEO 架构
- 每个页面使用 `generateMetadata` 动态生成 meta 标签
- JSON-LD Structured Data 用于博客文章
- sitemap.xml 动态生成
- robots.txt 静态文件
- Open Graph / Twitter Card 完整支持

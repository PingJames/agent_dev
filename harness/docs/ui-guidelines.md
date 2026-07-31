# UI 设计指南

## 设计系统

### 色彩
- **主色调**: Indigo-600 (#4F46E5)
- **文本**: Slate-900 (#0F172A) → Slate-500 (#64748B)
- **背景**: 白色 #FFFFFF / Slate-50 (#F8FAFC)
- **边框**: Slate-200 (#E2E8F0)
- **暗色模式**: Slate-900 背景 / Slate-100 文本

### 排版
- **标题字体**: Inter / Geist (sans-serif)
- **正文字体**: Geist / Inter (sans-serif)
- **代码字体**: JetBrains Mono / Geist Mono (monospace)
- **字号等级**: text-xs (12px) → text-7xl (72px)

### 间距
- 使用 TailwindCSS 默认间距体系 (4px 为基础)
- 章节间距: py-16 / py-24
- 卡片内边距: p-6 / p-8
- 元素间距: gap-4 / gap-6

### 圆角
- 按钮: rounded-lg (8px)
- 卡片: rounded-xl (12px)
- 输入框: rounded-md (6px)
- 标签/徽章: rounded-full

### 阴影
- 卡片: shadow-sm hover:shadow-md
- 导航: shadow-sm
- 弹窗: shadow-xl

## 组件设计原则
1. **可复用性**: 组件通过 props 配置，避免硬编码
2. **可访问性**: 语义化 HTML，ARIA 标签，键盘导航
3. **响应式**: 移动优先设计，断点: sm(640px) / md(768px) / lg(1024px) / xl(1280px)
4. **暗色模式**: 使用 TailwindCSS dark: 前缀
5. **加载状态**: Skeleton 加载动画，错误边界

## 动画
- 过渡: transition-all duration-300
- 悬停: hover:scale-105
- 进入: fade-in + slide-up (intersection observer)
- 避免过度动画影响性能

## 可访问性
- 色彩对比度 ≥ 4.5:1 (AA 标准)
- 焦点指示器可见
- 图片提供 alt 文本
- 表单具有关联标签
- skip-to-content 链接

# Coding Rules & Standards

## TypeScript 规范
- 严格模式 (`strict: true`)
- 优先使用 `interface` 而不是 `type`（除非需要联合类型）
- 组件 Props 使用 `interface` 定义
- 避免 `any`，使用 `unknown` 或具体类型
- 文件名：组件用 PascalCase，工具函数用 camelCase

## React/Next.js 规范
- 所有组件使用函数组件 + Hooks
- 使用 Server Components 作为默认选择，仅在需要交互时使用 Client Components
- Props 解构使用对象解构语法
- 事件处理函数命名: `handle` + 事件名 (如 `handleClick`)
- 自定义 Hook 命名: `use` + 功能名 (如 `useSearch`)

## 文件组织
```
src/
├── app/           # Next.js App Router 页面
├── components/    # 可复用组件
│   ├── layout/    # 布局组件
│   ├── ui/        # 基础 UI 组件
│   └── [feature]/ # 功能组件
├── lib/           # 工具函数和类型定义
├── content/       # MDX 内容文件
└── hooks/         # 自定义 Hooks
```

## 命名规范
- 目录名: kebab-case
- 组件文件: PascalCase
- 工具文件: camelCase
- 内容文件: kebab-case

## 代码风格
- 使用 2 空格缩进
- 使用单引号
- 语句末尾加分号
- 每个文件最多 300 行
- 函数最多 50 行
- 使用 ES6+ 语法

## 注释规范
- 复杂逻辑必须注释
- JSDoc 用于公共 API
- 避免无意义的注释
- TODO/FIXME 标记需要跟踪

## Git 规范
- 提交信息: `<type>: <description>`
- 类型: feat, fix, docs, style, refactor, test, chore
- 分支命名: `feature/`, `bugfix/`, `hotfix/`

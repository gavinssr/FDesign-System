# 架构

## 层级图

```
┌──────────────────────────────────────────────────┐
│  治理层（.agent/、docs/、AGENTS.md）              │
│  — Agent 导航、决策记录、执行计划                  │
├──────────────────────────────────────────────────┤
│  设计系统层（packages/）                          │
│  ┌──────────┬────────────┬──────────┬─────────┐ │
│  │ tokens   │ components │ adapters │contracts│ │
│  └──────────┴────────────┴──────────┴─────────┘ │
├────────────────────┬─────────────────────────────┤
│ 舞台层(apps/stage) │  消费层(apps/example-*)      │
│ — Taro H5 应用     │  — 最小消费样板              │
│ — 私有展示外壳     │                              │
│ — 不被任何层依赖   │                              │
├────────────────────┴─────────────────────────────┤
│  业务项目层（projects/）                          │
│  — 真实业务应用，可独立拆出交付                    │
├──────────────────────────────────────────────────┤
│  共享基础设施                                     │
│  packages/eslint-config、packages/tsconfig        │
│  scripts/、turbo.json                            │
└──────────────────────────────────────────────────┘
```

## 依赖规则（严格，机械化执行）

```
tokens ← components ← adapters
              ↑
        apps/stage（只读消费，不被反向依赖）
              ↑
        apps/example-consumer
              ↑
        projects/*
```

箭头表示"依赖于"。反向依赖被禁止。

### 禁止的依赖边

- `components` → `apps/stage`（舞台层不是设计系统的依赖项）
- `apps/example-*` → `apps/stage/shell`（舞台外壳是私有的）
- `projects/*` → `apps/stage`（业务项目不得依赖舞台层）
- `components` → `projects/*`（组件是通用的，不含业务逻辑）

## Package 职责

| Package | 职责 | 发布方式 | 创建阶段 |
|---------|------|----------|----------|
| `packages/tokens` | 设计 token：颜色、间距、字体、圆角、阴影 | npm（内部） | Phase 0（已创建） |
| `packages/components` | 基于 Taro 的 UI 组件 | npm（内部） | Phase 0（已创建，Phase 1 填充） |
| `packages/adapters` | 平台适配层（RN、Weex 兼容桥） | npm（内部） | Phase 4 创建 |
| `packages/contracts` | 合同 schema + 校验工具 | npm（内部） | Phase 2 创建 |
| `packages/eslint-config` | 共享 ESLint 规则 + 边界约束 | npm（内部） | Phase 0（已创建） |
| `packages/tsconfig` | 共享 TypeScript 配置 | 仅本地 | Phase 0（已创建） |

## 技术决策

| 决策 | 选择 | 理由 |
|------|------|------|
| 框架 | Taro 4.x | 公司迁移策略，多端支持 |
| 语言 | TypeScript（strict 模式） | 类型安全，类型即合同 |
| monorepo 工具 | pnpm workspaces + turborepo | 快速、成熟、缓存好 |
| 构建 | Taro 内置（Webpack 5 + SWC） | 官方工具链 |
| 舞台层渲染 | Taro H5 模式 | 与 Taro 组件零兼容问题 |
| Lint | ESLint + 自定义边界规则 | 机械化约束执行 |
| 样式隔离 | CSS Modules（组件）、`__stage-` 命名空间（舞台外壳） | 隔离保障 |

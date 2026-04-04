# Phase 0: 最小可运行骨架

## 目标
搭建一个能 `pnpm install && pnpm build` 成功的空 monorepo，建立 Agent 导航体系和机械化边界约束。

## 产出物清单

### 根配置
- [x] `package.json` — monorepo 根 package
- [x] `pnpm-workspace.yaml` — workspace 声明
- [x] `turbo.json` — 构建编排
- [x] `tsconfig.base.json` — 共享 TypeScript 基础配置
- [x] `.gitignore`
- [x] `.npmrc`

### Agent 导航体系
- [x] `AGENTS.md` — 唯一入口，~100 行导航
- [x] `docs/ARCHITECTURE.md` — 架构地图
- [x] `.agent/checkpoint.yaml` — 状态快照
- [x] `.agent/decisions.log` — 架构决策日志
- [x] `.agent/changelog.log` — AI 变更日志

### packages
- [x] `packages/tokens/` — 设计 token 空骨架
- [x] `packages/components/` — 组件空骨架
- [x] `packages/eslint-config/` — 含边界约束规则
- [x] `packages/tsconfig/` — 共享 TS 配置 package

### scripts
- [x] `scripts/validate-boundaries.ts` — 边界校验脚本骨架

### 执行计划
- [x] `docs/exec-plans/active/phase-0-repo-scaffold.md` — 本文件

## 验证标准
- `pnpm install` 成功
- `pnpm build` 成功（即使产物为空）
- `pnpm lint` 成功
- ESLint 边界规则可执行
- AGENTS.md 可导航到所有关键文件

## 不做
- 不创建空占位目录
- 不写完整治理文档
- 不引入 Taro（Phase 1 引入）
- 不搭建 stage 应用（Phase 1）
- 不创建 consumer/projects 目录（Phase 2/3）

## 风险
- 无。Phase 0 只是骨架搭建，不涉及复杂技术决策。

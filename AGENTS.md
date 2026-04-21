# FDesign System — Agent 导航

> 基于 Taro 的设计系统 monorepo。AI 可治理、多端输出（H5/RN/小程序）、真实业务可独立交付。

## 技术栈速览

- **框架**: Taro 4.x + TypeScript + React
- **monorepo**: pnpm workspaces + turborepo
- **主路径**: H5、React Native、微信小程序
- **Weex**: 不在主路径——需通过 adapter 桥接，单独治理

## 仓库地图

```
AGENTS.md               ← 你在这里
docs/
  NORTH_STAR.md          ← 项目定位精华（~50行，极少变动）
  ROADMAP.md             ← 全部 Phase 路线图 + 准入/准出标准（~100行）
  ARCHITECTURE.md        ← 层级图、依赖规则、package 职责
  exec-plans/active/     ← 当前阶段执行计划
  exec-plans/completed/  ← 已完成的执行计划
.agent/
  checkpoint.yaml        ← 每轮必读——当前状态快照
  decisions.log          ← 追加式架构决策日志
  changelog.log          ← 追加式 AI 变更日志
packages/
  tokens/                ← 设计 token（颜色、间距、字体、圆角）
  components/            ← 设计系统组件（Button、Input 等）
  eslint-config/         ← 共享 lint 规则，含边界约束
  tsconfig/              ← 共享 TypeScript 配置
apps/
  stage/                 ← 组件展示舞台层（Taro H5 应用，Phase 1）
projects/                ← 真实业务项目（Phase 3）
scripts/                 ← 校验与构建脚本
```

## 每轮协议

1. **进入时**（必读）：
  - `.agent/checkpoint.yaml`（~30行）— 我在哪、做了什么
  - `docs/ROADMAP.md`（~100行）— 要去哪、准出标准是什么
2. **执行中**（按需读取）：
  - `docs/NORTH_STAR.md` — 不确定项目方向或边界时参考
  - `docs/exec-plans/active/*.md` — 当前阶段的具体执行计划
  - 相关 package 源码和文档
3. **退出时**（必写）：
  - 更新 `.agent/checkpoint.yaml`
  - 追加 `.agent/changelog.log`
  - 如有架构决策变化：追加 `.agent/decisions.log`
  - 如有 Phase 完成：更新 `docs/ROADMAP.md` 中的检查清单

## Stage 预览协议

1. `apps/stage` 预览以 workspace 包的最新 `dist` 为准，不以 `packages/*/src` 为准
2. 只要改动 `packages/tokens/src` 或 `packages/components/src`，就必须先同步对应 `dist`，再看 stage 效果
3. 改动 `tokens` 时必须遵守串行顺序：先 `tokens dist`，再 `components dist`，最后再验证 `stage`；不得把 `tokens` 与 `components` 并行构建
4. 后续 agent 启动 stage 预览时默认使用根命令 `pnpm dev:stage`；该命令会先做初始同步，再持续监听 `tokens/components` 源码并刷新 `dist`
5. 若只排查单包构建，可使用包内 `watch:dist`，但这不替代根级 `pnpm dev:stage` 的完整预览链路
6. 组件或 token 改动完成后，若本轮做过 stage 运行态验证，应优先确认当前预览来自最新 `dist`，而不是仅重启 `@fdesign/stage`

## 硬性约束（机械化执行）

1. `packages/components/` 不得 import `apps/stage/` 的任何内容
2. `apps/stage/shell/` 不得被 `apps/stage/` 外部 import
3. `projects/` 不得 import `apps/stage/`
4. `packages/components/` 不得包含业务逻辑
5. TypeScript 类型是主合同——`.contract.yaml` 只做补充，不能替代
6. 构建产物输出到 `.deliverables/`（gitignore），不入版本控制
7. Weex 仅 adapter 模式——不得假设与 H5/RN 同等支持

## 约束执行机制


| 约束        | 执行方式                                                  |
| --------- | ----------------------------------------------------- |
| import 边界 | `packages/eslint-config` 的 `no-restricted-imports` 规则 |
| 样式隔离      | CSS Modules + `__stage-` 命名空间前缀                       |
| 类型-合同一致性  | `scripts/validate-contracts.ts`（Phase 2 实现）           |
| 交付产物完整性   | `scripts/validate-deliverable.ts`（Phase 3 实现）         |


## Cursor Cloud Agent 环境

本仓库在根目录 `package.json` 中声明 `packageManager: pnpm@10.31.0` 与 `engines.node: >=22.0.0`，与 `.github/workflows/ci.yml` 一致。

- **云端依赖刷新**：仓库级配置见 `.cursor/environment.json` 的 `install` 字段（`pnpm install --frozen-lockfile`，并通过 Corepack 固定 pnpm 版本）。Cursor 会按 [Cloud Agent 环境解析顺序](https://cursor.com/docs/cloud-agent/setup)优先使用该文件。
- **本地 worktree 初始化**：`.cursor/worktrees.json` 中的 `setup-worktree` 与上述安装命令对齐，避免误用 `npm install` 破坏 workspace 链接。
- **常见验证命令**（按需执行，不必每次全量）：`pnpm build`、`pnpm lint`、`pnpm test`、`pnpm check-boundaries`。

## 去哪找什么


| 需要           | 位置                                                           |
| ------------ | ------------------------------------------------------------ |
| 项目定位与边界      | `docs/NORTH_STAR.md`                                         |
| 全局路线图与阶段标准   | `docs/ROADMAP.md`                                            |
| 架构总览         | `docs/ARCHITECTURE.md`                                       |
| 当前阶段与焦点      | `.agent/checkpoint.yaml`                                     |
| 当前执行计划       | `docs/exec-plans/active/`                                    |
| 历史架构决策       | `.agent/decisions.log`                                       |
| AI 变更记录      | `.agent/changelog.log`                                       |
| 设计 token     | `packages/tokens/`                                           |
| 组件           | `packages/components/`                                       |
| Lint 规则      | `packages/eslint-config/`                                    |
| 边界校验         | `scripts/validate-boundaries.ts`                             |
| 完整需求文档（归档参考） | `docs/references/RequirementStarter.Optimized.md`（已达成共识的完整版） |



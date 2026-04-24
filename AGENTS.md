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

## 视觉实现约定

1. 基于 1 倍图还原时，宽度等于 `375px` 的通栏元素默认不强制圆角
2. 基于 1 倍图还原时，宽度不等于 `375px` 的元素，圆角值优先取 `4px`；若设计明确给出其它圆角，再按设计覆盖

## 变体命名约定

1. 从当前轮次起，展示类表单的变体命名统一使用：`通栏 / 卡片`
2. 代码命名统一使用：`flush / card`
3. 为兼容未启动的输入类、行动类与历史实现，需长期保留新旧映射关系：
   - `通栏` ↔ `flush` ↔ 旧名 `卡片式=false`
   - `卡片` ↔ `card` ↔ 旧名 `卡片式=true`
4. 当前表单组件兼容迁移期内，组件公开 API 优先使用 `surfaceVariant="flush" | "card"`；旧布尔语义 `carded=false/true` 继续分别对应 `flush/card`
5. `FormRow`、`FormCollapseGroup` 等组件已占用 `variant` 表示内容形态（如单行/多行、文本/金额），因此本阶段不要把表面容器形态直接也命名为 `variant`；待三大类表单组件补齐后再统一评估 API 收口策略
6. 新增页面、状态字段、演示控件与文案应优先使用新命名，不再新增 `卡片式=*` 或新的 `carded*` 状态名

## Form 真实消费规则

1. 展示类表单在真实业务页中区分“单独排列”和“列组合”两种消费方式，不能只按 stage 展示容器判断
2. 单独排列时：
   - `surfaceVariant="card"` 的表单组件自身承担 `4px` 圆角
   - 表单组件底部分割线默认隐藏
3. 列组合时：
   - 组合容器承担圆角与裁切，表单子项自身不再单独持有圆角
   - 除最下面一个表单外，其余子项底部分割线都显示
   - 当前统一通过 `FormGroup` / `Form.Group` 承载该组合语义
4. `surfaceVariant="flush"` 与 `surfaceVariant="card"` 都遵守上述分割线规则；圆角差异只体现在 `card`

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



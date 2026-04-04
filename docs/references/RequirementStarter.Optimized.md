---
状态: 归档参考（优化版，已达成共识）
归档日期: 2026-04-03
说明: |
  本文件是与用户对齐后的优化版需求文档，已被以下活跃文件取代：
    - docs/NORTH_STAR.md（项目定位精华）
    - docs/ROADMAP.md（全阶段路线图 + 准入/准出标准）
    - AGENTS.md（Agent 导航）
  仅当上述活跃文件无法解答具体细节问题时，才回溯本文件。
  本文件内容不再作为直接执行依据。
  本文件相对原始版的改动已全部落实到活跃治理文件中。
---

---
本文档是对 RequirementStarter.Original.md 的优化版本。
核心改进方向：真正对齐 OpenAI Harness Engineering 理念，构建 Agent 可自主导航的轻量治理体系。
保留原文档中所有合理的业务需求和边界约束，仅优化架构设计和实施策略。
---

# FDesign System — 优化版需求文档

## 与原文档的关键差异摘要

| 维度 | 原方案 | 优化方案 |
|------|--------|----------|
| Agent 上下文 | 每轮读 6 份文档（~大手册模式） | AGENTS.md 做目录表（~100行），按需渐进发现 |
| 治理启动 | 先产出 7 份文档 + 4 份模板才能写代码 | 治理与代码共同演进，最小可验证单元优先 |
| 合同机制 | 纯手工 YAML，先于实现 | TypeScript 类型为主合同，YAML 为轻量元数据，可自动校验 |
| Harness 定义 | 5 层独立验证平台 | 机械化 linter + 结构化测试 + CI 约束（对齐 OpenAI 实践） |
| Stage 技术 | shadcn/ui（React+Tailwind）嵌 Taro | Taro H5 原生 dev server + 轻量控制面板（避免样式冲突） |
| 目录结构 | ~50+ 目录深层嵌套 | 扁平化，按需生长，空目录不预创建 |
| 构建产物 | git 追踪的 deliverables 目录 | gitignore 的输出目录 + 构建清单文件 |
| 知识管理 | 分散在多文档 | 仓库即知识库，机械化验证文档新鲜度 |

---

# 一、保留的核心业务需求（与原文档一致）

以下需求完全保留，不做修改：

## 1. 公司现状与迁移策略
- 多技术栈并存（Vue2/3、React、Weex），渐进迁移
- 原生壳层 → React Native，存量页面 → Taro 统管，增量页面 → Taro Web 编码
- 后续向 RN 语法与响应式改造靠拢

## 2. 项目定位
- 设计系统层核心工程，不是普通组件库
- 被消费层调用的基础能力层
- AI Coding 平台消费的"代码化设计系统"
- 真实业务项目生成的上游能力源

## 3. 项目目标
- Taro Web 编码方式开发
- 服务真实业务生产环境
- 支持父级项目消费生成界面
- 业务代码可被研发团队直接接入
- 真实项目可独立拆出交付

## 4. 技术边界
- H5 / RN / 小程序主路径优先
- Weex 通过 adapter / 兼容桥单独治理
- 不假装一套实现零成本覆盖所有端

## 5. 层级关系
- 治理层 > 工程层 > 设计系统层 + 消费层
- 消费层下承载真实业务项目
- 设计系统层与消费层并列

## 6. 真实业务独立交付
- monorepo 内开发治理，交付时独立构建
- 输出独立运行包，附带部署/依赖/运行说明
- 研发接收业务项目独立包，不是整个 monorepo

## 7. Figma 到代码的处理策略
- 不允许凭截图直接生成组件
- 必须先做结构化拆解（token/anatomy/slot/状态/变体/布局/交互/a11y/平台差异）
- 每个组件形成 spec + contract

## 8. 代码与工程规范
- TypeScript，Props 显式导出，不允许 any 漫流
- 不允许业务逻辑侵入 design-system
- 不允许平台差异散落在业务层

## 9. 舞台层核心边界（保留）
- 仅用于展示和测试组件能力
- 私有资源不允许被消费层使用
- 容器样式不得穿透到组件本体
- 长期演进，不是一次性 demo

---

# 二、架构优化：对齐 Harness Engineering

## 核心理念对齐

OpenAI Harness Engineering 的关键发现：

> 1. "给 Agent 一张地图，而不是一本千页手册"
> 2. "AGENTS.md 只做目录表，~100 行"
> 3. "知识库是版本化的仓库内制品，不是外部文档"
> 4. "通过机械化 linter 和结构化测试强制执行约束，而非依赖人工文档遵守"
> 5. "治理编码为代码，而不是写在文档里期望被遵守"
> 6. "渐进式构建——从空仓库开始，能力随需求生长"

## 1. Agent 上下文管理（Map, Not Manual）

### 问题
原方案要求 Agent 每轮读 6 份文档，这消耗大量上下文窗口，且文档之间信息重叠。

### 优化
采用 OpenAI 的"目录表 + 渐进发现"模式：

```
AGENTS.md              ← 唯一入口，~100 行，只做导航
docs/
  ARCHITECTURE.md      ← 顶层架构地图
  DESIGN.md            ← 设计系统设计原则
  QUALITY.md           ← 各层质量评级
  design-docs/         ← 设计决策文档（按需创建）
    index.md
  exec-plans/          ← 执行计划（first-class artifact）
    active/
    completed/
  references/          ← 外部参考（Taro docs, RN docs 的 llms.txt）
```

**AGENTS.md 的职责**：
- 项目一句话定位
- 技术栈声明
- 目录结构速览（指向 ARCHITECTURE.md）
- 关键约束（5-10 条最重要的边界规则）
- "去哪找什么"的指针列表
- 当前活跃的执行计划指针

**不做**：
- 不把完整协议写进 AGENTS.md
- 不要求 Agent 每轮读全部文档
- Agent 根据任务类型按需读取相关文档

### Agent 记忆接续机制

```
.agent/
  checkpoint.yaml      ← Agent 每轮结束写回的状态快照（机器可读）
  decisions.log        ← 架构决策追加日志（只追加，不改写）
  changelog.log        ← AI 变更追加日志
```

`checkpoint.yaml` 示例：
```yaml
last_session: "2026-04-03T16:30:00Z"
current_phase: "phase-1"
current_focus: "design-system/components/Button"
completed:
  - "repo-scaffold"
  - "tokens-v1"
in_progress:
  - "button-component"
blocked: []
next_recommended:
  - "完成 Button 组件 + harness"
  - "开始 Input 组件"
active_exec_plan: "docs/exec-plans/active/phase-1-minimal-loop.md"
```

这样 Agent 进入新对话时，只需读 `AGENTS.md`（~100行）+ `checkpoint.yaml`（~30行）即可恢复上下文，按需再读具体文件。

## 2. 仓库结构优化（扁平化 + 按需生长）

### 原则
- 不预创建空目录
- 目录随代码生长而出现
- 减少嵌套层级
- 明确使用 pnpm workspaces + turborepo

### 初始结构（Phase 0 结束时）

```
repo-root/
  AGENTS.md
  turbo.json
  pnpm-workspace.yaml
  package.json
  tsconfig.base.json
  .agent/
    checkpoint.yaml
    decisions.log
    changelog.log
  docs/
    ARCHITECTURE.md
    DESIGN.md
    exec-plans/
      active/
  packages/
    tokens/              ← 设计 token
    primitives/          ← 基础图元
    components/          ← 设计系统组件
    adapters/            ← 平台适配层
    contracts/           ← 合同定义 + 校验工具
    eslint-config/       ← 共享 lint 配置（含边界约束规则）
    tsconfig/            ← 共享 TS 配置
  apps/
    stage/               ← 舞台层（Taro H5 应用）
    example-consumer/    ← 最小消费样板
  projects/              ← 真实业务项目（按需创建）
  scripts/
    build-deliverable.ts ← 独立构建交付脚本
    validate-boundaries.ts ← 边界校验脚本
    generate-contract.ts ← 从 TS 类型生成合同
  .deliverables/         ← gitignore，构建产物输出
```

### 与原方案的差异解释

| 原方案 | 优化方案 | 理由 |
|--------|----------|------|
| `governance/` 7 份文档 | `AGENTS.md` + `docs/` + `.agent/` | 治理编码为机械化约束，文档精简为地图 |
| `engineering/design-system/packages/` | `packages/` | 减少一层不必要的嵌套 |
| `engineering/consumer/` | `apps/example-consumer/` | consumer 就是 app，不需要独立顶层目录 |
| `engineering/harness/` 独立验证平台 | 各 package 内置测试 + `scripts/` 校验 | 对齐 OpenAI 做法：linter 和结构化测试，不需要独立平台 |
| `engineering/deliverables/` git 追踪 | `.deliverables/` gitignore | 构建产物不应入版本控制 |
| `engineering/shared/` | `packages/eslint-config/` + `packages/tsconfig/` | 共享配置就是 package，统一管理 |
| `consumer/contracts/` | `packages/contracts/` | 合同是工程制品，应在 packages 中统一管理 |

## 3. Harness 机制优化（机械化约束，非独立平台）

### 问题
原方案设计了 5 层独立 harness（component / scenario / integration / governance / stage），这在项目初期是过度工程化。

### 优化：分三级，渐进构建

**Level 1：机械化 linter（CI 自动执行）**
```typescript
// packages/eslint-config/rules/boundary-check.ts
// 强制执行边界约束：
// - apps/stage/ 不能被 apps/example-consumer/ 或 projects/ import
// - packages/components/ 不能 import apps/stage/ 的任何内容
// - projects/ 不能 import apps/stage/ 的任何内容
// - packages/components/ 不能包含业务逻辑关键词
```

**Level 2：结构化测试（各 package 自带）**
```
packages/components/button/
  Button.tsx
  Button.types.ts          ← TypeScript 类型即主合同
  Button.contract.yaml     ← 轻量元数据（用途/禁止事项/平台差异）
  Button.test.tsx           ← 单元测试
  Button.harness.tsx        ← 状态矩阵 + 变体覆盖测试
  __snapshots__/
```

**Level 3：集成验证（脚本，按需运行）**
```
scripts/
  validate-boundaries.ts    ← 检查 import 边界
  validate-contracts.ts     ← 检查合同与类型一致性
  validate-deliverable.ts   ← 检查独立构建产物可运行性
  smoke-test.ts             ← 构建产物冒烟测试
```

### 好处
- 没有独立的 harness runner 需要维护
- 验证逻辑与被验证的代码在同一个 package 中（就近原则）
- linter 规则在每次提交时自动执行
- 集成验证通过脚本按需运行

## 4. Stage 层技术优化

### 问题
原方案用 shadcn/ui（React + Tailwind）做 stage 外壳，包裹 Taro 组件展示。这造成：
- 两套样式系统（Tailwind vs Taro 样式）共存冲突风险
- Taro 组件需要 `@tarojs/runtime` 运行时，嵌入纯 React 应用需要额外配置
- shadcn/ui 的 Radix 原语和 Taro 组件的 DOM 结构可能互相干扰

### 优化方案：Stage 就是一个 Taro H5 应用

```
apps/stage/
  src/
    app.tsx                 ← Taro H5 应用入口
    app.config.ts
    pages/
      index/                ← 组件列表首页
      button/               ← Button 展示页
      input/                ← Input 展示页
    shell/                  ← 舞台层私有外壳组件
      Layout.tsx            ← 布局框架
      ControlPanel.tsx      ← 状态/变体切换面板
      PropEditor.tsx        ← Props 编辑器
      ThemeSwitcher.tsx     ← 主题切换
      ViewportSimulator.tsx ← 视口模拟
    shell/styles/           ← 舞台层私有样式（带命名空间前缀 __stage-）
  config/
    index.ts                ← Taro 编译配置
```

**关键改变**：
- Stage 本身就是 Taro H5 应用，所以被展示的组件在完全原生的 Taro 运行时中渲染，零兼容性问题
- 外壳组件用原生 React + CSS Modules 构建（Taro H5 模式天然支持），不引入 Tailwind
- 私有样式使用 `__stage-` 命名空间前缀，通过 linter 规则禁止公共组件使用此前缀
- 如果未来需要更复杂的控制面板，可以考虑引入轻量 UI 库，但不在初期引入

**隔离保障**：
- `apps/stage/shell/` 路径通过 ESLint `no-restricted-imports` 规则禁止外部 import
- tsconfig 中 stage 的 paths 不暴露给其他 packages
- stage 样式通过 CSS Modules + 命名空间前缀双重隔离

## 5. 合同机制优化（类型即合同）

### 问题
原方案要求手工编写完整 YAML 合同，先于实现。这导致：
- 合同与实现容易脱节
- 维护成本高
- Agent 需要读两份信息源（类型 + 合同），增加上下文消耗

### 优化：TypeScript 类型为主合同 + 轻量 YAML 元数据

**主合同（自动可信源）**：
```typescript
// packages/components/button/Button.types.ts

/** @contract */
export interface ButtonProps {
  /** 按钮变体 */
  variant: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** 按钮尺寸 */
  size: 'sm' | 'md' | 'lg';
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 按钮内容 */
  children: React.ReactNode;
  /** 点击回调 */
  onPress?: () => void;
}
```

**轻量元数据（人工维护的补充信息）**：
```yaml
# packages/components/button/Button.contract.yaml
component: Button
purpose: "通用交互按钮，支持多变体和状态"
platform_notes:
  rn: "onPress 替代 onClick，需要 TouchableOpacity adapter"
  weex: "不在主路径，需要 adapter 桥接"
forbidden:
  - "不允许传入业务特有的 icon 集合"
  - "不允许在 Button 内部处理路由跳转"
a11y:
  - "disabled 时 aria-disabled=true"
  - "loading 时展示可访问的加载状态文案"
```

**校验脚本**：
```
scripts/generate-contract.ts
  ← 从 .types.ts 自动提取 Props schema
  ← 与 .contract.yaml 交叉校验
  ← 在 CI 中自动运行
```

好处：TypeScript 编译器天然保证类型合同与实现一致，YAML 只补充机器无法从类型推断的信息（用途、禁止事项、平台差异、a11y 规则）。

## 6. 真实业务独立交付机制（保留核心，优化实现）

保留原文档的交付要求，优化实现方式：

```
projects/
  real-project-1/
    src/
    app.config.ts          ← Taro 应用配置
    project.yaml            ← 项目元数据（合并原 app.contract + delivery.manifest）
    tsconfig.json           ← 独立 TS 配置
    package.json            ← 独立依赖声明
```

`project.yaml` 示例：
```yaml
id: "real-project-1"
name: "营销活动页"
owner: "marketing-team"
targets:
  - h5
  - weapp
build:
  entry: "src/app.tsx"
  output: "../../.deliverables/real-project-1/"
delivery:
  mode: "static-bundle"
  artifacts:
    - "dist/"
    - "assets-manifest.json"
    - "deploy-readme.md"
  verification:
    - "smoke-test"
    - "bundle-size-check"
```

构建脚本 `scripts/build-deliverable.ts` 读取 `project.yaml`，执行构建，输出到 `.deliverables/`。

---

# 三、优化后的实施路线

## 核心原则变化
- **原方案**：治理先于开发 → 全量文档 → 全量模板 → 开始开发
- **优化方案**：最小可验证单元优先 → 治理与代码共同演进 → 能力随需求生长

## Phase 0：最小可运行骨架（1 轮对话可完成）

**目标**：一个能 `pnpm install && pnpm build` 成功的空 monorepo。

产出物：
- `AGENTS.md`（~100 行导航文件）
- `docs/ARCHITECTURE.md`（架构地图）
- `.agent/checkpoint.yaml`（初始状态）
- `pnpm-workspace.yaml` + `turbo.json`
- `packages/tokens/`（空 package 骨架）
- `packages/components/`（空 package 骨架）
- `packages/eslint-config/`（含边界约束规则）
- `packages/tsconfig/`（共享配置）

验证标准：
- [x] `pnpm install` 成功
- [x] `pnpm build` 成功（即使产物为空）
- [x] ESLint 边界规则可执行
- [x] AGENTS.md 可导航到所有关键文件

**不做**：不创建空目录、不写占位 README、不生成完整治理文档。

## Phase 1：设计系统最小闭环（2-3 轮对话）

**目标**：tokens + Button 组件 + 合同 + harness + stage 展示页，形成完整闭环。

产出物：
- `packages/tokens/`：颜色、间距、字体、圆角等 token
- `packages/components/button/`：Button 实现 + 类型 + 合同 + 测试 + harness
- `apps/stage/`：Taro H5 应用，能展示 Button 的所有变体和状态
- `scripts/validate-boundaries.ts`：边界校验脚本
- `docs/exec-plans/active/phase-1-minimal-loop.md`：本阶段执行计划

验证标准：
- [x] Button 组件可在 stage 中正确渲染所有变体
- [x] TypeScript 类型与 YAML 合同一致
- [x] stage 样式未污染 Button 组件本体
- [x] ESLint 边界检查通过

## Phase 2：扩展组件 + 消费层验证（3-4 轮对话）

**目标**：扩展高频组件集，验证消费层可正确使用设计系统。

产出物：
- Input / Text / Icon / Tag / Card / Modal 组件
- `apps/example-consumer/`：最小消费样板
- `packages/contracts/`：合同校验工具
- `docs/DESIGN.md`：设计原则文档

## Phase 3：真实业务交付闭环（2-3 轮对话）

**目标**：一个真实业务项目从开发到独立交付的完整闭环。

产出物：
- `projects/real-project-1/`：真实业务样板
- `scripts/build-deliverable.ts`：独立构建脚本
- `.deliverables/real-project-1/`：独立交付产物
- 部署说明、集成说明、冒烟报告

## Phase 4：多端适配 + 治理增强

**目标**：RN 适配、小程序适配、Weex 兼容桥评估。

---

# 四、Agent 工作协议（精简版）

## 每轮进入

1. 读 `AGENTS.md`（~100 行）
2. 读 `.agent/checkpoint.yaml`（~30 行）
3. 根据任务类型，按需读取相关文件

## 每轮退出

1. 更新 `.agent/checkpoint.yaml`
2. 追加 `.agent/changelog.log`
3. 如有架构决策变化，追加 `.agent/decisions.log`
4. 如有执行计划变化，更新 `docs/exec-plans/`

## 约束（保留原文档核心禁止事项）

- 不得让 consumer 依赖 stage 私有资源
- 不得让 stage 样式污染组件本体
- 不得绕过合同直接按感觉生成组件
- 不得把业务逻辑塞进 design-system
- 不得假设 Weex 与 H5/RN 同等天然支持
- 不得绕过 project.yaml 手工打包交付

## 约束的执行方式

原方案：写在文档中，期望 Agent 遵守。
优化方案：编码为机械化检查。

| 约束 | 执行方式 |
|------|----------|
| consumer 不依赖 stage | ESLint `no-restricted-imports` 规则 |
| stage 样式不污染组件 | CSS Modules + `__stage-` 命名空间 + lint |
| 组件无业务逻辑 | ESLint 禁止 packages/components/ 中的业务关键词 |
| 类型合同一致性 | `scripts/validate-contracts.ts` 在 CI 自动执行 |
| 交付产物可运行 | `scripts/smoke-test.ts` 在构建后自动执行 |

---

# 五、与原方案的兼容性说明

本优化方案**完全保留**原文档中的：
- 所有业务需求和目标
- 层级关系定义（治理层 > 工程层 > 设计系统 + 消费层）
- 舞台层边界约束
- Figma 到代码的处理策略
- 真实业务独立交付要求
- 代码与工程规范
- Agent 禁止事项

本优化方案**改变**的是：
- 治理的实现方式（从人工文档 → 机械化约束）
- Agent 上下文管理（从大手册 → 地图+渐进发现）
- 目录结构（从深层嵌套 → 扁平按需生长）
- 合同机制（从纯手工 YAML → TypeScript 类型为主）
- Harness 实现（从独立平台 → linter + 测试 + 脚本）
- Stage 技术选型（从 shadcn/ui → Taro H5 原生）
- 实施节奏（从前置全量规划 → 最小可验证单元迭代）

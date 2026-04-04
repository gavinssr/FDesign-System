# 路线图

> 本文件预定义全部 Phase 的目标和准入/准出标准。
> Agent 每轮必读本文件，确保工作方向不偏离。
> Phase 顺序不可跳过——上一 Phase 准出标准未全部达成，不可进入下一 Phase。

---

## Phase 0: 仓库骨架 ✅

**状态**: 已完成

**准出标准**:
- [x] pnpm install / build / check-boundaries 通过
- [x] AGENTS.md 导航体系建立
- [x] .agent/ 状态管理就绪
- [x] packages/tokens, components, eslint-config, tsconfig 骨架就绪
- [x] ESLint 边界规则可执行
- [x] docs/NORTH_STAR.md 项目定位精华就绪
- [x] docs/ROADMAP.md 全 Phase 路线图就绪
- [x] 四层记忆架构就绪（AGENTS.md + checkpoint + ROADMAP + NORTH_STAR）
- [x] 所有治理文档统一为中文

---

## Phase 1: 设计系统全链路模式验证

**状态**: 未开始

**目标**: 用 Button 作为载体，跑通"token → 组件 → 合同 → harness → stage"全链路。
建立的是**模式**（文件结构、合同格式、harness 写法、stage 展示方式），不是最终视觉产物。
Token 值和组件视觉标记为 provisional（临时），等 Figma 设计稿输入后替换。

**准入**: Phase 0 全部准出标准达成

**准出标准**:
- [ ] Taro 4.x 引入，packages/components 可编译 Taro 组件
- [ ] Button 组件实现（provisional 视觉）+ TypeScript 类型合同 + YAML 元数据
- [ ] 组件文件结构模式确立：`*.tsx / *.types.ts / *.contract.yaml / *.test.tsx / *.harness.tsx`
- [ ] apps/stage 作为 Taro H5 应用可运行，展示 Button 所有变体和状态
- [ ] stage shell 组件与样式隔离验证通过（`__stage-` 命名空间 + import 边界）
- [ ] scripts/validate-boundaries.ts 通过
- [ ] 执行计划文档产出：docs/exec-plans/active/phase-1.md

**不做**:
- 不追求生产级视觉还原（无设计稿输入时）
- 不扩展多个组件（只用 Button 验证模式）
- 不搭建 consumer 层

---

## Phase 2: 组件集扩展 + 消费层验证

**状态**: 未开始

**目标**: 扩展高频组件集，搭建最小消费样板，验证设计系统可被正确消费。

**准入**: Phase 1 全部准出标准达成

**准出标准**:
- [ ] 高频组件实现（Input / Text / Icon / Tag / Card / Modal / ListItem）
- [ ] 所有组件均有 TypeScript 类型合同 + YAML 元数据 + harness 测试
- [ ] apps/example-consumer 样板可运行，能正确消费 packages/components
- [ ] consumer 未依赖 apps/stage 验证通过
- [ ] scripts/validate-contracts.ts 实现并通过（类型与 YAML 交叉校验）
- [ ] stage 展示页覆盖所有已实现组件

**不做**:
- 不搭建真实业务项目
- 不做多端适配

---

## Phase 3: 真实业务交付闭环

**状态**: 未开始

**目标**: 一个真实业务项目从消费设计系统到独立交付的完整闭环。

**准入**: Phase 2 全部准出标准达成

**准出标准**:
- [ ] projects/real-project-1 存在，具备独立 package.json + project.yaml
- [ ] 项目可独立构建（不依赖 monorepo 其他 apps）
- [ ] 构建产物输出到 .deliverables/real-project-1/
- [ ] 产物包含：dist/ + assets-manifest.json + deploy-readme.md + smoke-report.md
- [ ] scripts/build-deliverable.ts 实现并可运行
- [ ] scripts/validate-deliverable.ts 实现并通过（冒烟测试）
- [ ] 项目未依赖 apps/stage 验证通过
- [ ] 人工验收步骤文档产出

**不做**:
- 不做多端适配
- 不做 Weex 兼容

---

## Phase 4: 多端适配

**状态**: 未开始

**目标**: 在主闭环稳定后，逐步扩展 RN、小程序适配能力。

**准入**: Phase 3 全部准出标准达成

**准出标准**:
- [ ] packages/adapters 骨架实现，至少覆盖 RN adapter
- [ ] 至少 1 个组件（Button）在 RN 端可渲染验证
- [ ] H5 / WebView 构建产物性能基线建立
- [ ] 小程序（微信）构建产物可运行验证
- [ ] Weex 兼容桥策略评估文档产出（不要求实现）
- [ ] stage 场景覆盖增强（多端对照展示）

---

## Phase 5: Figma 设计对接（按需启动）

**状态**: 未开始

**目标**: 当用户提供 Figma 设计稿后，将 provisional token 和组件视觉替换为真实设计。

**准入**: Phase 1+ 已完成，用户已提供 Figma 设计稿

**准出标准**:
- [ ] Figma 组件结构化拆解完成（token / anatomy / slot / 状态 / 变体）
- [ ] tokens 替换为 Figma 设计稿中的真实值
- [ ] 组件视觉与 Figma 1:1 还原
- [ ] 合同文件更新反映真实设计约束
- [ ] stage 展示页与 Figma 设计对照验证

**说明**: 本 Phase 可在 Phase 1-4 任意阶段插入，取决于 Figma 设计稿何时就绪。

---

## Phase 准入/准出规则

1. **不可跳过**: Phase N 准出标准未全部达成时，不可开始 Phase N+1
2. **可并行**: Phase 5（Figma 对接）是例外，可在任何阶段插入
3. **准出验证**: Agent 完成一个 Phase 后，必须逐条确认准出标准，未达成的标记为 blocked
4. **变更管理**: 如需修改某 Phase 的准出标准，必须追加到 .agent/decisions.log 并说明理由
5. **扩展规则**: Phase 5 之后如需新增 Phase，由用户与 Agent 协商后追加到本文件

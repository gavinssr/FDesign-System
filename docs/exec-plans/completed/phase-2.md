# Phase 2: 组件集扩展 + 消费层验证 — 执行计划

> 本文件是 Phase 2 的详细执行计划，供 Agent 在新对话中按步骤执行。
> 准出标准见 docs/ROADMAP.md 的 Phase 2 部分。

## 目标

在 Phase 1 已建立的 Button 模式基础上，扩展高频组件集，并引入最小消费样板，验证设计系统可被正确消费。

## 前置条件

- Phase 1 全部准出标准已达成
- `apps/stage` 可运行并展示 Button
- `pnpm build / lint / test / check-boundaries` 通过

---

## 步骤 1：补齐合同校验骨架

### 1.1 创建 contracts package

目标：

- 创建 `packages/contracts/`
- 提供最小 schema / 类型导出骨架
- 为 Phase 2 的 YAML 元数据与 TypeScript 类型交叉校验打基础

建议文件：

```text
packages/contracts/
  package.json
  tsconfig.json
  src/
    index.ts
    component-contract.ts
```

### 1.2 创建 validate-contracts.ts

目标：

- 新增 `scripts/validate-contracts.ts`
- 先实现最小可运行版本：扫描 `packages/components/src/**.contract.yaml`
- 校验必要字段是否存在，如 `component / purpose / states`

完成标准：

- `pnpm tsx scripts/validate-contracts.ts` 可运行
- 对 Button.contract.yaml 校验通过

---

## 步骤 2：扩展高频组件

目标组件：

- `Input`
- `Text`
- `Icon`
- `Tag`
- `Card`
- `Modal`
- `ListItem`

### 2.1 统一模式

每个组件沿用 Phase 1 标准结构：

```text
Component/
  Component.tsx
  Component.types.ts
  Component.contract.yaml
  Component.module.css
  Component.test.tsx
  Component.harness.tsx
  index.ts
```

### 2.2 实施顺序建议

建议按依赖复杂度从低到高推进：

1. `Text`
2. `Tag`
3. `Input`
4. `Card`
5. `ListItem`
6. `Icon`
7. `Modal`

完成标准：

- 所有组件可编译、可导出
- 每个组件都有最小 smoke test 与 harness
- 不引入业务逻辑

---

## 步骤 3：扩展 stage 展示页

目标：

- 在 `apps/stage` 中为新增组件补展示页
- 保持 shell 私有、组件展示明确

建议新增：

```text
apps/stage/src/pages/
  text/
  input/
  icon/
  tag/
  card/
  modal/
  list-item/
```

完成标准：

- stage 可导航到全部已实现组件
- 每个组件至少展示核心变体、尺寸或状态

---

## 步骤 4：搭建 example-consumer

目标：

- 创建 `apps/example-consumer`
- 只通过 `@fdesign/components` 消费组件
- 验证 consumer 不依赖 `apps/stage`

建议内容：

- 一个最小页面，同时使用 Button + Input + Card 等组件
- 保持与 stage 分离，不复用 `stage/shell`

完成标准：

- `apps/example-consumer` 可运行
- `pnpm check-boundaries` 通过

---

## 步骤 5：版本管理与准出检查

目标：

- 引入 `changeset` 或类似版本管理工具
- 为后续组件包版本化发布建立最小机制

完成标准：

- 组件包版本管理工具已接入
- Phase 2 准出标准逐条核对
- 更新 checkpoint / changelog / roadmap

---

## 风险与注意事项

1. `Modal` 和 `Icon` 的复杂度可能明显高于其他组件，不宜过早处理
2. `validate-contracts.ts` 先做最小必要校验，不在 Phase 2 一次做成完整 schema 系统
3. `example-consumer` 的核心价值是“消费验证”，不是做第二个 stage
4. `changeset` 接入应在组件接口基本稳定后进行，避免过早制造版本噪音

## 预估工作量

- 步骤 1（contracts + validate-contracts 骨架）：1 轮对话
- 步骤 2（高频组件扩展）：2-4 轮对话
- 步骤 3（stage 扩展）：1-2 轮对话
- 步骤 4（example-consumer）：1 轮对话
- 步骤 5（changeset + 治理回写）：1 轮对话

总计预估：5-8 轮对话
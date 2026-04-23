# Phase 5 展示类 Form 收口记录

> 归档角色：Phase 5 展示类 Form 已完成执行记录。
> 对应主计划：`docs/exec-plans/active/phase-5-token-protocol-and-mapping.md`
> 本文件记录的是展示类 Form 首轮落地完成后的归档事实。
> 不应再依据本文件判断当前阶段或下一步行动；Phase 5 的当前入口仍是长期 active 主计划。

## 完成结论

- 展示类 Form 的首轮 Figma 对齐已完成
- 原 `ListItem` 公共组件与 stage 页面已由 `Form` 组件族替代
- `Form > 输入类 / 行动类` 当前只保留 stage 占位页，不计入本次已完成范围

## 本次完成范围

### 1. Token

- 已补齐展示类表单所需 `spacing.component.formDisplay`
- 已补齐 `typography.fontSize.displaySmall`、`typography.lineHeight.singleLine.displaySmall`
- 已补齐 `typography.styles.displayNumber20Small`
- 已补齐 `colors.semantic.formDisplay`
- `web-vars.css` 已同步镜像上述新增语义 token

### 2. 组件

- 已新增 `packages/components/src/form/` 组件族
- 当前组件族包括：
  - `FormRow`
  - `FormFaceStatus`
  - `FormInfoList`
  - `FormAmountList`
  - `FormCollapseGroup`
  - `FormAggregateCollapseGroup`
  - 命名空间导出 `Form`
- 组件公开 API 已引入 `surfaceVariant="flush" | "card"`；旧 `carded` 继续保留兼容
- `FormGroup` / `Form.Group` 已承接列组合消费语义

### 3. 图标

- 本地 icon registry 已补齐展示类所需语义图标
- 当前已接入：
  - `collapse`
  - `form-preset`
  - `face-status-success`
  - `face-status-failure`

### 4. Stage

- 一级导航已切换为 `Form 表单`
- 二级导航已补齐：
  - `展示类`
  - `输入类`
  - `行动类`
- `展示类` 页已按 `Hero + Gallery` 结构落地 8 组形态
- 折叠与 jump 交互已可直接体验
- `输入类 / 行动类` 当前为占位页

### 5. 消费迁移

- 旧 `ListItem` 已从公共导出中移除
- `apps/example-consumer` 与 `projects/real-project-1` 的历史消费位已迁移到 `FormRow`

## 验证口径

- `packages/tokens` 构建通过
- `packages/components` 测试与构建通过
- `apps/stage` 构建通过
- stage 已完成运行态人工检查
- 本轮相关治理事实已写入 `.agent/checkpoint.yaml` 与 `.agent/changelog.log`

## 后续边界

1. 本文件对应的展示类范围已完成，不再作为 pending plan 继续维护。
2. `Form` 后续增量工作应回到 `docs/exec-plans/active/phase-5-token-protocol-and-mapping.md` 统一管理。
3. 下一轮如继续推进 `Form`，应聚焦输入类 / 行动类的真实组件范围，而不是重开展示类平行计划。

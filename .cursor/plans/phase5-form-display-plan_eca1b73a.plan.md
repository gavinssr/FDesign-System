---
name: phase5-form-display-plan
overview: 基于已确认的 Figma 展示类表单范围与 token 清单，生成可直接续接的新对话实施计划。计划覆盖 token 补充、Form 组件替代 ListItem、stage 导航重构、展示页交互与验证顺序。
todos:
  - id: token-form-display
    content: 补齐展示类表单所需的 spacing / typography / color token
    status: pending
  - id: refactor-components-form
    content: 将现有 list-item 目录重构为 Form 组件族并替换公共导出
    status: pending
  - id: register-form-icons
    content: 把折叠、预设、刷脸状态图标接入 Icon registry
    status: pending
  - id: replace-stage-nav-pages
    content: 用 Form 表单导航与展示页替换现有 List Item 页面，并补输入类/行动类占位页
    status: pending
  - id: verify-build-stage
    content: 完成 tokens/components/stage 的测试、构建和运行态校验，并更新 agent 记录
    status: pending
isProject: false
---

# Phase 5 展示类表单实施计划

## 已确认输入
- Figma 范围固定为 `展示类`：单行、多行、刷脸、平铺信息列表、金额列表标题外置、折叠纯文本、折叠金额、聚合多折叠。
- 当前 `ListItem` 不保留兼容层，直接由整套 `Form` 表单组件替代。
- `Form > 输入类 / 行动类` 本轮只建导航与占位，不做正式组件实现。
- 已同意新增 token 清单，允许按下述结构落地。

## Token 变更
先补 token，再进入组件实现，避免在组件中长期保留硬编码。

涉及文件：
- [packages/tokens/src/spacing.ts](/Users/gavinss/Desktop/FDesign-System/packages/tokens/src/spacing.ts)
- [packages/tokens/src/typography.ts](/Users/gavinss/Desktop/FDesign-System/packages/tokens/src/typography.ts)
- [packages/tokens/src/colors.ts](/Users/gavinss/Desktop/FDesign-System/packages/tokens/src/colors.ts)

约定写法：
- `spacing.component.formDisplay`
  - `singleLine.height = 52`
  - `infoListItem.height = 48`
  - `doubleLine.height = 68`
  - `doubleLine.contentGapY = 6`
  - `doubleLineNumeric.height = 72`
  - `doubleLineNumeric.contentGapY = 6`
  - `amountListItem.height = 78`
  - `face.contentGapY = 28`
  - `face.paddingY = 36`
  - `face.iconBox = 100`
- `typography`
  - `fontSize.displaySmall = 20`
  - `lineHeight.singleLine.displaySmall = 22`
  - `typography.styles.displayNumber20Small`
- `colors.semantic.formDisplay`
  - `faceScanAccent = #00A9FE`
  - `faceScanBeam = rgba(38, 165, 255, 0.94)`
  - `faceScanLine = #0095FF`

## 组件层重构
将现有 `list-item` 目录升级为 `form` 组件目录，并替换公共导出入口。

涉及文件：
- [packages/components/src/index.ts](/Users/gavinss/Desktop/FDesign-System/packages/components/src/index.ts)
- [packages/components/src/list-item/index.ts](/Users/gavinss/Desktop/FDesign-System/packages/components/src/list-item/index.ts)
- [packages/components/src/list-item/ListItem.tsx](/Users/gavinss/Desktop/FDesign-System/packages/components/src/list-item/ListItem.tsx)
- [packages/components/src/list-item/ListItem.types.ts](/Users/gavinss/Desktop/FDesign-System/packages/components/src/list-item/ListItem.types.ts)
- [packages/components/src/list-item/ListItem.module.css](/Users/gavinss/Desktop/FDesign-System/packages/components/src/list-item/ListItem.module.css)
- [packages/components/src/list-item/ListItem.test.tsx](/Users/gavinss/Desktop/FDesign-System/packages/components/src/list-item/ListItem.test.tsx)
- [packages/components/src/list-item/ListItem.harness.tsx](/Users/gavinss/Desktop/FDesign-System/packages/components/src/list-item/ListItem.harness.tsx)

建议落地方式：
- 目录改造成 `form/`，导出 `Form` 组件族而非继续围绕 `ListItem` 命名。
- 组件拆分为最小稳定单元：
  - `FormRow`：单行、多行、金额行、jump、预设前置等基础行
  - `FormFaceStatus`：刷脸态
  - `FormInfoList`：平铺信息列表
  - `FormAmountList`：金额列表标题外置
  - `FormCollapseGroup`：纯文本/金额折叠列表
  - `FormAggregateCollapseGroup`：聚合多折叠
- 折叠类统一支持：`expanded`、`defaultExpanded`、`onExpandedChange`
- jump 统一支持点击接口：`onJump` 或行级 `onPress`
- 样式继续遵循现有 CSS Modules + `fd-*` class 方案，不引入新样式体系。

## Icon 接入
把用户提供的本地 SVG 接到现有 `Icon` registry，而不是在组件里直接引用磁盘路径。

涉及文件：
- [packages/components/src/icon/iconRegistry.tsx](/Users/gavinss/Desktop/FDesign-System/packages/components/src/icon/iconRegistry.tsx)
- 图标来源目录：`/Users/gavinss/Downloads/listItem-icon`

需要接入的语义图标：
- 折叠
- 表单预设
- 刷脸状态成功
- 刷脸状态失败

处理原则：
- 为现有 registry 增加语义化名称和必要 alias
- 组件侧只消费 `Icon name`，不出现原始导出文件名耦合

## Stage 导航与页面替换
把当前 `List Item 列表项` 页面整体替换成 `Form 表单` 一级折叠导航。

涉及文件：
- [apps/stage/src/shell/componentLinks.ts](/Users/gavinss/Desktop/FDesign-System/apps/stage/src/shell/componentLinks.ts)
- [apps/stage/src/app.config.ts](/Users/gavinss/Desktop/FDesign-System/apps/stage/src/app.config.ts)
- [apps/stage/src/pages/list-item/index.tsx](/Users/gavinss/Desktop/FDesign-System/apps/stage/src/pages/list-item/index.tsx)
- [apps/stage/src/shell/Layout.tsx](/Users/gavinss/Desktop/FDesign-System/apps/stage/src/shell/Layout.tsx)
- [apps/stage/src/shell/styles/layout.module.css](/Users/gavinss/Desktop/FDesign-System/apps/stage/src/shell/styles/layout.module.css)

页面结构：
- 一级导航：`Form 表单`
- 二级导航：`展示类`、`输入类`、`行动类`
- 本轮只正式实现 `展示类`
- `输入类`、`行动类` 提供占位页，复用现有 stage 模板

展示类页面要求：
- 沿用 [apps/stage/src/shell/StageShowcasePage.tsx](/Users/gavinss/Desktop/FDesign-System/apps/stage/src/shell/StageShowcasePage.tsx) 的 `Hero + Gallery` 结构
- 逐节展示 8 组 Figma 形态
- 折叠分组必须可真实点击体验
- jump 示例必须保留可点击接口演示

## 验证顺序
先做小范围验证，再做构建，避免一次改太大后难定位问题。

验证建议：
1. `packages/tokens` 构建通过
2. `packages/components` 测试与构建通过
3. `apps/stage` 构建通过
4. stage 运行态人工检查
   - 导航层级与选中态正确
   - 展示类各分节与 Figma 对齐
   - 折叠交互正确
   - jump 点击接口可触发
5. 对本轮新增/改动文件执行 lint 检查，确认未引入新诊断

## 收尾同步
实施完成后同步更新：
- [/.agent/checkpoint.yaml](/Users/gavinss/Desktop/FDesign-System/.agent/checkpoint.yaml)
- [/.agent/changelog.log](/Users/gavinss/Desktop/FDesign-System/.agent/changelog.log)
- 如组件命名或导出策略产生结构性变化，再追加 [/.agent/decisions.log](/Users/gavinss/Desktop/FDesign-System/.agent/decisions.log)

## 新对话续接建议
新对话直接以上述计划为执行基线，建议从“先补 token，再重构组件目录与导出，再改 stage 导航与展示页，最后测试验证”这个顺序继续，不再重复进行范围澄清。
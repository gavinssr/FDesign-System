# Phase 5 · 表单单元（Form Cell）长期滚动主计划

> 本文件是"表单单元"三大类（展示类 / 输入类 / 操作类）新增工作的专属治理入口。
> 与 `phase-5-token-protocol-and-mapping.md` 并行存在：后者维护 Phase 5 全局 token 协议，本文件只治理表单单元批次推进。
> 治理口径延续 Phase 5 既有状态词：阶段层用"进行中 / 已完成"，组件批次层用"已落地首轮 / 收尾中 / 可冻结"。

## 计划状态

- **状态**：✅ 已冻结（Round 1 计划与 token B 表已经用户裁决）
- **当前阶段**：Round 1 / Wave 0 ✅ 已完成（2026-04-18）· Wave 1 ✅ 已完成（2026-04-18，33 原子 + 舞台 Atoms 页 + 组件顶层导出）· Wave 2 ✅ 已完成（2026-04-18，8 个展示类 cell + 舞台 Exhibit 页 + decorativeIconRegistry 5 装饰图）· Wave 3 ✅ 已完成（2026-04-18，11 个 parts 内部原子 + 5 个组合/折叠 cell + 舞台 Combined/Foldable 两节）· Wave 4 ✅ 已完成（2026-04-18，全量构建 + stage H5 运行态视觉/交互验收通过）· **Round 1 整体进入「可冻结」**
- **下一步动作**：切入 **Round 2（Input 类 cell）** — 按「架构决策 / 1 目录结构」在 `packages/components/src/form/input/` 下新建输入类 cell（Figma 26206:20590 section 下的 Input 相关节点），直接复用 Wave 1 原子（InputField / ErrorTips / ErrorText / ErrorPop / WordLimit / Label / Divider / OperationButton 等），无需回补原子；潜在新增仅限 Figma 明确要求的输入子件（如带单位 / 选择器等）；舞台 `Form 表单单元` 分组追加 `Input 输入类` 入口（继续保持 Atoms 居分组末位）。Round 2 完成后再进入 Round 3（Action 类）
- **冻结日期**：2026-04-18（Round 1 整体 · 含 Wave 4 验收）

## 决议总览（冻结版）

下一轮 Agent **入口必读本节**。所有"待裁决"已经被以下决议替换；如下文与早期段落（如 B 表草稿）有出入，**以本节为准**。

### 架构与命名（冻结）

1. 目录结构与三轮规划：按下文「架构决策」与「三轮规划」原文执行，不再调整
2. 目录细节：`form/atoms/` 下文件跨类共享并顶层导出；`form/exhibit/` 下文件对外；`form/exhibit/parts/` 下文件内部不导出不上舞台
3. 所有展示类 cell 用 `card?: boolean` 一个 prop 控制 card 双态；veriFace、AmountListTitleExternal、AggregateMultiFold 固定 card
4. 交互协议：移动端表单单元**全局禁用 hover 态样式**与默认 `cursor: pointer`；折叠类内置受控+非受控双模式；jump 类用 `onJump`
5. `OperationButton` 的 11 种 `type` 字段名**保留 Figma 原命名**（`button-bluePrimary` / `button-pinkPrimary` / `button-blueSecondary` / `button-pinkSecondary` / `button-blueOutline` / `button-pinkOutline` / `preContent` / `subText` / `tagAmount` / `plusCount` / `textButton`），不重命名
6. `packages/components/src/list-item/`* 与 `apps/example-consumer` / `projects/real-project-1` / `apps/stage` 中的 `ListItem` 引用本轮直接拆除（详见「ListItem 处理」）

### Icon registry 扩充（冻结）

1. nestOrigin 的所有图形（`Delete / Camera / supplement(annotation/jump) / Collapse(on/off) / action/jump / placehoderIcon` 等）统一进 `packages/components/src/icon/iconRegistry.tsx`
2. **veriFace 的人脸/扫描装饰图也走 Icon registry**，但作为**新分类**：在 registry 中开 `decorative`（或等价命名）分支，与现有"黑白 outline"主分类显式区分；新分类的图标不参与 outline 类的统一描边/着色协议，按原样彩色渲染
3. `form/atoms/Collapse` `Jump` `Supplement` 仅做尺寸封装与状态控制，不内嵌 SVG 路径

### Token B 表落地（冻结）


| 项                         | 决议                                                                                                                                                                                                                                                                     |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **B.1 Color**             | ✅ 新增 `colors.semantic.surface.iconPlaceholder = '#edf3fa'`；veriFace 的 5 个装饰色（`#407aff / #00a9fe / #0095ff / #ff99e4 / #ff85e3`）**不入 token**，作为 `ExhibitVeriFace` 组件内部常量                                                                                                |
| **B.2 Typography styles** | ✅ 新增全部 8 个复合样式：`body14SingleLine` / `body14SingleLineStrong` / `body12SingleLine` / `body12SingleLineStrong` / `displayNumber14Medium` / `displayNumber16Medium` / `displayNumber18Medium` / `displayNumber20Medium`（含 `displayNumber14Medium`，即使本轮无明确使用点也保留以满足协议完整性）  |
| **B.3 letterSpacing**     | ✅ **方案 A**：不新增 letterSpacing 协议；Roboto 18/20 的 `-0.625px` 字距按组件内部局部常量写入，**不进 typography token**                                                                                                                                                                        |
| **B.4 Spacing 6px**       | ✅ **方案 A**：`spacingScale[6] = 6` 进入 scale；同步新增语义 alias `spacingSemantic.gapLabelToSubLabel = 6`（用于 multiLine 内 title↔subLabel 的纵向 gap）                                                                                                                                 |
| **B.5 Component spacing** | ✅ 默认通过：在 `spacingComponent.exhibit` 下落地 10 个语义字段（rowPaddingY / groupTitlePaddingY / subCellPaddingY / subCellHeight / iconGap / titleTagGap / multiLineLabelGap / iconPlaceholderSize / foldChevronSize / jumpArrowSize），值见 B.5 段表格；其中 `multiLineLabelGap = 6`（来自 B.4） |


### Wave 0 执行清单（下一轮 Agent 直接照单做）

> 本轮对话已接近上下文上限，新对话从 Wave 0 起步。Wave 0 完成后再继续 Wave 1。

1. `packages/tokens/src/colors.ts`：在 `semanticColors.surface` 内追加 `iconPlaceholder: '#edf3fa'`
2. `packages/tokens/src/spacing.ts`：
  - `spacingScale` 内追加 `6: 6`（注意：Phase 5 全局 spacing 协议明确允许档位是 `0/8/10/12/16/32/40`；本次新增 `6` 属于表单单元 Round 1 引入的协议扩展，需同步把这条扩展写进 `phase-5-token-protocol-and-mapping.md` 的 spacing 协议小节）
  - `spacingSemantic` 内追加 `gapLabelToSubLabel: 6`
  - `spacingComponent` 内追加 `exhibit: { rowPaddingY: 16, groupTitlePaddingY: 12, subCellPaddingY: 16, subCellHeight: 48, iconGap: 8, titleTagGap: 2, multiLineLabelGap: spacingSemantic.gapLabelToSubLabel, iconPlaceholderSize: 24, foldChevronSize: 16, jumpArrowSize: 12 }`
3. `packages/tokens/src/typography.ts`：在 `typographyStyles` 内追加 8 个复合样式（详见上表）；保持既有签名匹配机制不变
4. `packages/tokens/src/web-vars.css`：为新增 color / spacing / typography 镜像 CSS variables（沿用既有命名风格，如 `--fd-color-surface-icon-placeholder` / `--fd-spacing-gap-label-to-sublabel` / `--fd-spacing-exhibit-row-padding-y` 等）
5. `pnpm --filter @fdesign/tokens build` 通过
6. `packages/components/src/icon/iconRegistry.tsx`：扩充 nestOrigin 全部图标；veriFace 装饰图作为 `decorative` 新分类落地
7. 拆除 `ListItem`（详见「ListItem 处理」5 个步骤），并跑 `pnpm --filter @fdesign/example-consumer build` 与 `pnpm --filter @fdesign/real-project-1 build` 验证回收无回归
8. 同步治理文档：`phase-5-token-protocol-and-mapping.md` 的 spacing 协议小节追加"6 已加入可用档位（仅用于 multiLine 内 title↔subLabel）"；`.agent/checkpoint.yaml` 更新 current_focus；`.agent/decisions.log` 已追加本轮决议
9. Wave 0 完成判定：`pnpm --filter @fdesign/tokens build`、`pnpm --filter @fdesign/components test`、`pnpm --filter @fdesign/components build`、`pnpm --filter @fdesign/stage build`、`pnpm --filter @fdesign/example-consumer build`、`pnpm --filter @fdesign/real-project-1 build` 全部通过

## 定位

- 设计稿来源：`figma.com/design/mJ1NYL6eRVa9vjGRQflNxJ` 的 `implement` section（`25143:10405`）
- 三大类表单单元：**展示类（Exhibit）** / **输入类（Input）** / **操作类（Action）**
- 三大类共用一层 **原子组件（nestOrigin）**，由 section `26206:20590` 汇总
- 本文件覆盖三大类的全部推进；每一大类可能分多轮对话推进，每轮对齐到本文件的滚动 backlog

## 三轮规划


| 轮次              | 范围             | 本轮目标                                                                    | 出口状态                                  |
| --------------- | -------------- | ----------------------------------------------------------------------- | ------------------------------------- |
| **Round 1** ✅   | **原子组件 + 展示类** | 落地 nestOrigin 全部原子 + 全部展示类 cell；建立 form 命名空间；拆除 `ListItem`；引入表单单元专属交互协议 | 原子 + 展示类 **可冻结**（Wave 4 验收通过，2026-04-18）|
| Round 2（下一轮）    | 输入类            | 在原子层基础上装入输入类 cell；如需扩充原子按"先补原子再装 cell"执行                                | 展示类保持 **可冻结**；输入类 **已落地首轮**           |
| Round 3         | 操作类            | 补齐操作类 cell；表单单元整体达到 **可冻结**                                             | 三大类全部 **可冻结**                         |


## 架构决策（不可回退）

### 1. 目录结构

```
packages/components/src/form/
  atoms/                         ← 跨三大类共享（对应 nestOrigin）
    Label/  InputField/  Divider/  Switch/  Checkbox/  Radio/
    Tick/  TickTag/  OptionCard/  OperationButton/  OperationText/
    Jump/  Collapse/  Supplement/  ErrorTips/  ErrorText/  ErrorPop/
    WordLimit/  LoginMethods/  PlaceholderIcon/
    index.ts                      ← 顶层导出全部原子
  exhibit/                        ← 本轮展示类 cell（对外）
    ExhibitSingleLineLabel/
    ExhibitSingleLineLabelPreContent/
    ExhibitMultiLineDefault/
    ExhibitMultiLinePretext/
    ExhibitMultiLineNumericTitle/
    ExhibitMultiLineRightMultiPretextA/
    ExhibitMultiLineRightMultiPretextB/
    ExhibitVeriFace/
    ExhibitInformationList/
    ExhibitAmountListTitleExternal/
    ExhibitAggregateMultiFold/
    ExhibitInformationListPlainText/
    ExhibitInformationListAmount/
    parts/                        ← exhibit 内部嵌套原子，不对外导出
      GroupTitleH1/  SubCellFlush/  FoldingPureHeader/
      AmountList/  CellAmountTag/  ExternalTileAmount/
      SubInnercard/  CollapseNestAmount/  AmountNestList/
      SubListFlush/  SubListCard/
    index.ts
  input/                          ← Round 2 占位，本轮不创建组件实现
  action/                         ← Round 3 占位
  index.ts                        ← 聚合本轮对外面：atoms/* + exhibit/*（不导出 parts/*）
```

- `form/atoms/*`：跨三大类共享；顶层 `@fdesign/components` 独立导出
- `form/exhibit/parts/*`：*仅供 `exhibit/` 内部复用**，不在顶层导出、不上舞台
- 三大类 cell 全部使用 `card?: boolean` 一个 prop 控制 `card=true/false` 两态

### 2. 组件交互协议（本计划新建，适用全部表单单元）


| 能力      | 约束                                                                          |
| ------- | --------------------------------------------------------------------------- |
| 折叠 / 展开 | 组件本体内置受控（`expanded`）+ 非受控（`defaultExpanded`）+ `onExpandChange`；chevron 旋转切换 |
| jump 跳转 | 组件本体内置 `onJump?: () => void`；绑定时点击触发，未绑定时仅展示箭头                              |
| hover 态 | **禁止**新增 hover 态样式（移动端触控语境）                                                 |
| cursor  | **禁止**默认 cursor: pointer；可点击元素仅通过 role/aria 语义表达                            |
| 无障碍     | 折叠 header 使用 `role="button"` + `aria-expanded`；jump 行使用 `role="link"` 语义    |


### 3. 舞台分页规则

- 在 `componentLinks.ts` 新增顶级折叠导航分组 `Form 表单单元`，本轮下设：
  - `Exhibit 展示类`（按 single / multi / combined / fold 四个分节合并展示，**分节标题附中文翻译**）
  - `Atoms 原子组件`（放在分组最下方）
- `Form 表单单元 / Input 输入类` 与 `Form 表单单元 / Action 操作类` **本轮不创建导航项**，等 Round 2 / 3 再追加
- `.Exhibit/item/`*、`.Exhibit/unit/`* 的内部嵌套原子（`parts/*`）**不进舞台导航**
- 展示类页面内容区背景统一使用 `colors.semantic.surface.page`（对应 `--fd-color-surface-page`）

### 4. `ListItem` 处理（非保留）

- Phase 2 的 `ListItem` 为验证期产物，**直接拆除**，由 `ExhibitSingleLineLabel` / `ExhibitMultiLineDefault` 承接
- 拆除动作：
  1. 删除 `packages/components/src/list-item/`
  2. 从 `packages/components/src/index.ts` 移除 `ListItem` / `ListItemHarness` 导出
  3. 删除 `apps/stage/src/pages/list-item/`
  4. 从 `apps/stage/src/app.config.ts` 和 `componentLinks.ts` 移除 list-item 入口
  5. 回收 `apps/example-consumer` / `projects/real-project-1` 中对 `ListItem` 的引用，改回原生 View + 页面层样式

### 5. 图标归并到 Icon local registry

- `.Icon/Delete`、`.Icon/Camera`、`.nestOrigin/icon/placehoderIcon`、`.Icon/supplement (annotation/jump)`、`.Icon/Collapse (on/off)`、`.nestOrigin/action/jump` 的箭头
- 统一扩充到 `packages/components/src/icon/iconRegistry.tsx` 作为 local source 图标
- `form/atoms/Collapse`、`form/atoms/Jump`、`form/atoms/Supplement` 只做尺寸封装 + 旋转/状态控制，不内嵌 SVG 路径

## 组件映射表

### Round 1 原子（跨三大类共享，`form/atoms/`*）


| 组件名                               | Figma 节点     | 主要 API                                       | 备注                                        |
| --------------------------------- | ------------ | -------------------------------------------- | ----------------------------------------- |
| Label                             | 12283:11828  | `size: 'XL'                                  | 'L'                                       |
| NumberTitle                       | 26260:123401 | `size: 'XL'                                  | 'L'                                       |
| BrandColor                        | 26260:123420 | `size: 'Large'                               | 'Small'`,` value`                         |
| LabelMultiTextFirst               | 8270:5860    | `text`                                       | nestOrigin/label/multiText/First          |
| LabelMultiTextSecondaryDark       | 8270:6818    | `text`                                       | 次级深色文字                                    |
| LabelMultiTextSecondaryLightColor | 8270:5910    | `text`, `annotation?`                        | 次级灰色文字 + 可选感叹号标注                          |
| LabelAnnotation                   | 8208:18864   | `text`                                       | 注释文本                                      |
| LabelDescrip                      | 8533:9241    | `text`                                       | 描述文本                                      |
| LabelResultSupple                 | 8440:15452   | `text`                                       | 结果补充文本（12 gray）                           |
| LabelAmountSupple                 | 8631:5871    | `text`                                       | 金额补充文本                                    |
| InputField                        | 8476:4779    | `status: 'wait'                              | 'focus'                                   |
| ErrorTips                         | 8475:4766    | `text`                                       | 单行错误提示                                    |
| ErrorText                         | 8530:8965    | `text`                                       | 多行错误文本                                    |
| ErrorPop                          | 8491:6934    | `text`, `onClose?`                           | 错误气泡                                      |
| WordLimit                         | 8530:5435    | `current`, `max`                             | 字数统计                                      |
| OperationText                     | 8440:15434   | `text`                                       | 操作文本                                      |
| OperationButton                   | 8440:15495   | `type: 'button-bluePrimary'                  | 'button-pinkPrimary'                      |
| Jump                              | 8533:9471    | `onJump?`                                    | 右向箭头；无 hover                              |
| Collapse                          | 8270:5870    | `expanded?`, `defaultExpanded?`, `onToggle?` | chevron 旋转                                |
| Supplement                        | 8208:18961   | `icon: 'annotation'                          | 'jump'`                                   |
| LoginMethods                      | 8533:9461    | `text`, `onJump?`                            | 登录方式入口                                    |
| SelectionContent                  | 9638:25878   | `selected: boolean`, `onChange?`             | 选择内容片段                                    |
| Checkbox                          | 673:216      | `checked: boolean`, `disabled?`, `onChange?` | 4 态                                       |
| Radio                             | 8088:27532   | `checked: boolean`, `disabled?`, `onChange?` | 4 态                                       |
| Tick                              | 673:235      | `disabled?`                                  | 2 态                                       |
| TickTag                           | 673:242      | `status: 'default'                           | 'selected'                                |
| Divider                           | 673:306      | `retract?: boolean`                          | 2 态                                       |
| PlaceholderIcon                   | 673:334      | `size?`                                      | 16px 占位图标                                 |
| OptionCardDefault                 | 8805:6385    | `selected: boolean`, `onChange?`, `children` | 默认选项卡                                     |
| OptionCardMultiLabel              | 673:344      | `status: 'default'                           | 'selected'                                |
| OptionCardPic                     | 8853:6828    | `selected: boolean`, `onChange?`             | 图片选项卡                                     |
| OptionCardThumb                   | 8869:6510    | `selected: boolean`, `onChange?`             | 缩略图选项卡                                    |
| Switch                            | 9022:39065   | `size: 'small'                               | 'large'`,` checked: boolean`,` onChange?` |


### Round 1 展示类 cell（对外，`form/exhibit/`*）

所有展示类 cell 统一支持 `card?: boolean`；涉及折叠/跳转的补上交互协议字段。


| 组件名                                | Figma 节点    | card 双态 | 折叠            | jump             | 备注                                |
| ---------------------------------- | ----------- | ------- | ------------- | ---------------- | --------------------------------- |
| ExhibitSingleLineLabel             | 12287:12197 | ✅       | ✗             | ✗                | 单行 label                          |
| ExhibitSingleLineLabelPreContent   | 8275:8466   | ✅       | ✗             | ✗                | 单行 label + 前置内容                   |
| ExhibitMultiLineDefault            | 8333:12737  | ✅       | ✗             | ✗                | 多行左对齐默认（title + subLabel）         |
| ExhibitMultiLinePretext            | 8275:8467   | ✅       | ✗             | ✗                | 多行左对齐 pretext                     |
| ExhibitMultiLineNumericTitle       | 8275:8468   | ✅       | ✓ chevron（装饰） | ✗                | 多行左对齐数字标题                         |
| ExhibitMultiLineRightMultiPretextA | 8275:8469   | ✅       | ✗             | ✗                | 多行右对齐多前置文本（A 组）                   |
| ExhibitMultiLineRightMultiPretextB | 8275:8824   | ✅       | ✗             | ✗                | 多行右对齐多前置文本（B 组）                   |
| ExhibitVeriFace                    | 8333:12497  | 固定 card | ✗             | ✗                | 人脸验证（成功/失败两态，字段 `veriFailed`）     |
| ExhibitInformationList             | 8275:10982  | ✅       | ✗             | ✗                | 信息列表 Tile（含 groupTitle + subList） |
| ExhibitAmountListTitleExternal     | 8417:9331   | 固定 card | ✗             | ✗                | 金额列表 + 外部标题                       |
| ExhibitAggregateMultiFold          | 8417:5824   | 固定 card | ✓             | ✓ 可选             | 聚合多折叠                             |
| ExhibitInformationListPlainText    | 8275:8492   | ✅       | ✓（expand 双态）  | ✗                | 折叠式信息列表（纯文本）                      |
| ExhibitInformationListAmount       | 8275:8513   | ✅       | ✓（expand 双态）  | ✓ card 展开态带 jump | 折叠式信息列表（金额）                       |


### `form/exhibit/parts/`* 内部嵌套原子（不对外、不上舞台）


| 组件名                | Figma 节点    | 消费方                                          |
| ------------------ | ----------- | -------------------------------------------- |
| FoldingPureHeader  | 18707:10950 | Fold 系列头部                                    |
| GroupTitleH1       | 8275:8525   | InformationList / 多处                         |
| SubCellFlush       | 8275:10360  | SubList 系列                                   |
| AmountList         | 8997:28837  | AmountListTitleExternal                      |
| CellAmountTag      | 8417:9026   | AmountListTitleExternal / AggregateMultiFold |
| ExternalTileAmount | 8417:8155   | AmountListTitleExternal                      |
| SubInnercard       | 8417:3847   | AggregateMultiFold                           |
| CollapseNestAmount | 8417:4085   | AggregateMultiFold                           |
| AmountNestList     | 8987:24897  | AggregateMultiFold                           |
| SubListFlush       | 8275:9193   | InformationList / 折叠系列                       |
| SubListCard        | 15875:9901  | InformationList（card=true 分支）                |


## Token 审计

### A 表 · 已有映射（直接复用本仓既有 token）


| Figma 变量 / 字段                    | 值                | 本仓 token 路径                                                                    |
| -------------------------------- | ---------------- | ------------------------------------------------------------------------------ |
| `--sys/text/black/h1`            | `#1e2533`        | `colors.semantic.text.primary`                                                 |
| `--sys/text/black/h2`            | `#787c85`        | `colors.semantic.text.secondary`                                               |
| `--sys/text/black/h3`            | `#a4a8ac`        | `colors.semantic.text.tertiary`                                                |
| `--sys/text/black/h4`            | `#d2d3d6`        | `colors.semantic.text.disabled`                                                |
| `--sys/text/white/h1`            | `#ffffff`        | `colors.semantic.text.inversePrimary`                                          |
| `--sys/primary/default`          | `#4d83ff`        | `colors.semantic.action.primary.background` / `colors.reference.brand.blue[8]` |
| `--sys/wire/divider/dark`        | `#ededee`        | `colors.semantic.border.subtle`                                                |
| `--ref/brand/blue/blue1`         | `#f2f6ff`        | `colors.reference.brand.blue[1]`                                               |
| `--ref/brand/blue/blue3`         | `#ccdbff`        | `colors.reference.brand.blue[3]`                                               |
| `--ref/brand/blue/blue8-base`    | `#4d83ff`        | `colors.reference.brand.blue[8]`                                               |
| `--ref/brand/pink/pink1`         | `#fff2f6`        | `colors.reference.brand.pink[1]`                                               |
| `--ref/brand/pink/pink3`         | `#ffccdb`        | `colors.reference.brand.pink[3]`                                               |
| `--ref/brand/pink/pink8-base`    | `#ff4d82`        | `colors.reference.brand.pink[8]`                                               |
| `--ref/functional/red/red8-base` | `#e53948`        | `colors.reference.functional.red[8]` / `colors.semantic.data.up`               |
| `--ref/neutral/gray/gray6`       | `#f3f4f5`        | `colors.reference.neutral.gray[6]` / `colors.semantic.surface.muted`           |
| 白底                               | `#ffffff`        | `colors.semantic.surface.base`                                                 |
| 页面背景                             | `#f5f7fa`        | `colors.semantic.surface.page` ← 舞台展示区容器背景色                                    |
| `--radius/default`               | `4px`            | `radii.default`                                                                |
| divider 0.5 inner-shadow         | `0 -0.5 0 0`     | `spacingSemantic.borderWidthHairline` = `0.5`                                  |
| card 外 padding-x                 | `10`             | `spacingSemantic.paddingCardX`                                                 |
| flush 外 padding-x                | `16`             | `spacingSemantic.paddingFlushX`                                                |
| 行内 padding-y `16`                | `16`             | `spacingScale[16]`                                                             |
| 行内 padding-y `12` (groupTitle)   | `12`             | `spacingScale[12]`                                                             |
| title-icon gap                   | `8`              | `spacingScale[8]`                                                              |
| title-tag gap                    | `2`（微距）/ `4`（微距） | 组件内常量（微距不纳入 scale）                                                             |
| PingFang SC Regular/Medium       | —                | `fontFamilies.semantic.textChinese`                                            |
| Roboto Medium                    | —                | `fontFamilies.semantic.displayLatin`（✅ 已具备数字字体族）                               |
| 10/9 (tag)                       | —                | `fontSize.min` + `lineHeight.singleLine.micro`                                 |
| 16/18 Medium                     | —                | `typographyStyles.head16Sub`                                                   |
| 10/16 Regular                    | —                | `typographyStyles.body10Min`                                                   |
| 10/16 Medium                     | —                | `typographyStyles.body10Strong`                                                |


### B 表 · 候选新增 token（**需你确认后再落地**）

#### B.1 Color


| 候选路径                                      | 值         | 用途                               | 影响面                   |
| ----------------------------------------- | --------- | -------------------------------- | --------------------- |
| `colors.semantic.surface.iconPlaceholder` | `#edf3fa` | 展示类行中未传入 leading icon 时渲染的占位球背景色 | 多个展示类 cell + 多个 parts |


veriFace 内部扫描多色（`#407aff / #00a9fe / #0095ff / #ff99e4 / #ff85e3`）：**不入 token**，建议作为 `ExhibitVeriFace` 组件内部常量（属于装饰性渐变，跨组件复用概率极低）

> **决议（已冻结）**：✅ 通过 `surface.iconPlaceholder = '#edf3fa'`；veriFace 5 个**装饰色值**作为 `ExhibitVeriFace` 组件内部常量，不入 token。
> 注意区分：veriFace 的**装饰 SVG 图形**则走「决议总览 · Icon registry 扩充」第 2 条——以 `decorative` 新分类落入 `iconRegistry.tsx`，而非内联在组件中。颜色与图形分开处理。

#### B.2 Typography（新增复合 style keys，签名规则沿用既有"全量一致"机制）


| 候选 key                   | family       | size | lineHeight | weight  | 用途                                                       |
| ------------------------ | ------------ | ---- | ---------- | ------- | -------------------------------------------------------- |
| `body14SingleLine`       | textChinese  | 14   | 16         | regular | title M / 一级标题 / subLabel 14                             |
| `body14SingleLineStrong` | textChinese  | 14   | 16         | medium  | title L / NumberTitle S / 按钮文本 14 medium                 |
| `body12SingleLine`       | textChinese  | 12   | 14         | regular | 二级文本 12 regular                                          |
| `body12SingleLineStrong` | textChinese  | 12   | 14         | medium  | textButton / operationButton 12 medium                   |
| `displayNumber14Medium`  | displayLatin | 14   | 16         | medium  | — (暂无使用点，列出可选)                                           |
| `displayNumber16Medium`  | displayLatin | 16   | 18         | medium  | NumberTitle M / BrandColor Small                         |
| `displayNumber18Medium`  | displayLatin | 18   | 20         | medium  | NumberTitle L / plusCount / BrandColor Large / tagAmount |
| `displayNumber20Medium`  | displayLatin | 20   | 22         | medium  | NumberTitle XL                                           |


> 备注：以上样式 Roboto 数字在 Figma 规范里附带 `letter-spacing: -0.625px`（仅数字字号 18/20）。letterSpacing 当前未纳入 typographyStyles 签名。

> **决议（已冻结）**：✅ 全部 8 个 style keys 通过新增（含 `displayNumber14Medium`，即使本轮无明确使用点也保留以满足协议完整性）。

#### B.3 letterSpacing（**协议级决策项**）

Figma 规范中大号数字（18/20 号 Roboto）采用 `letter-spacing: -0.625px`。当前本仓 `typographyStyles` 不支持 letterSpacing 字段。

候选方案（**请裁决**）：

- **A**：不新增 letterSpacing 协议，按组件局部常量写入（不进 token），后续所有类似紧凑数字场景都在组件内部硬编码
- **B**：在 `typographyStyles` 的 spec 中新增可选字段 `letterSpacing?: number`，签名规则相应扩展；`displayNumber18Medium` / `displayNumber20Medium` 带上 `letterSpacing: -0.625`
- **C**：新增一层独立 `typography.letterSpacing = { tightNumeric: -0.625 }`，样式中仅引用，不纳入复合签名

> **决议（已冻结）**：✅ **方案 A**。letterSpacing 不进 token；`-0.625px` 仅作为 displayNumber 18/20 在使用方组件内部的局部常量，且只在使用点（如 `ExhibitMultiLineNumericTitle`、`AmountList`、`tagAmount` 内部）就近写入。

#### B.4 Spacing


| 候选项               | 值   | 用途                                | 裁决项                                                                        |
| ----------------- | --- | --------------------------------- | -------------------------------------------------------------------------- |
| `spacingScale[6]` | `6` | multiLine 内 title↔subLabel 纵向 gap | **请裁决**：允许 6 / 改为 8 / 其他（当前协议允许 0/8/10/12/16/32/40；禁用 4/20/24/48/64；6 未明示） |


若裁决为"允许 6"，可同时命名语义 alias：

- `spacingSemantic.gapLabelToSubLabel = 6`（或其他命名）

> **决议（已冻结）**：✅ **方案 A**——允许 `6` 加入 `spacingScale`；同步落地语义 alias `spacingSemantic.gapLabelToSubLabel = 6`。**此条同时是对 Phase 5 spacing 全局协议的扩展**：Wave 0 内必须把"6 加入可用档位（约束：仅用于 multiLine 内 title↔subLabel 等同档紧凑场景）"同步写入 `phase-5-token-protocol-and-mapping.md` 的 spacing 协议小节，避免协议漂移。

#### B.5 Component-level spacing（纳入 `spacingComponent.exhibit`）


| 候选字段                                           | 值              | 用途                      |
| ---------------------------------------------- | -------------- | ----------------------- |
| `spacingComponent.exhibit.rowPaddingY`         | 16             | 单行/多行默认 padding-y       |
| `spacingComponent.exhibit.groupTitlePaddingY`  | 12             | groupTitle padding-y    |
| `spacingComponent.exhibit.subCellPaddingY`     | 16             | subCell padding-y       |
| `spacingComponent.exhibit.subCellHeight`       | 48             | subCell 固定高度            |
| `spacingComponent.exhibit.iconGap`             | 8              | leading icon ↔ title 间距 |
| `spacingComponent.exhibit.titleTagGap`         | 2              | title ↔ tag 间距          |
| `spacingComponent.exhibit.multiLineLabelGap`   | 6 (或 8，依据 B.4) | multi-line 内纵向 gap      |
| `spacingComponent.exhibit.iconPlaceholderSize` | 24             | leading 占位球直径           |
| `spacingComponent.exhibit.foldChevronSize`     | 16             | 折叠 chevron 尺寸           |
| `spacingComponent.exhibit.jumpArrowSize`       | 12             | SubCell 内 jump 箭头       |


这些值均由 A 表既有 scale 派生，落地时**不新增 reference 层**，只在 component 层做语义收口。

> **决议（已冻结）**：✅ 默认通过；10 个字段全部落地。`multiLineLabelGap = 6`，引用 B.4 新落地的 `spacingSemantic.gapLabelToSubLabel`。

## 执行 Wave 划分（Round 1 内部）

1. **Wave 0 · 准备**  ✅ 已完成（2026-04-18）
  - 落 B 表确认结果 → `packages/tokens` 补齐 token（color / typography / spacing / component）→ 构建通过
  - 扩充 `Icon` local registry（新增 delete / camera / jump / collapse-on/off / annotation 等 SVG；`decorative` 分类架构骨架已就位，注册表空占位）
  - 拆除 `ListItem`（代码 + 消费层回收）
2. **Wave 1 · 原子层**  ✅ 已完成（2026-04-18）
  - `form/atoms/`* 全部原子组件落地（33 个，含 Label 家族 10 / Input & Error 家族 5 / Action 家族 6 / Selection 家族 9 / Misc 通用 3）
  - 每个原子配套 `.tsx` + `.types.ts` + `.contract.yaml` + `.test.tsx` + `.harness.tsx` + `index.ts`
  - 新增两个内部共享原语：`form/atoms/_internal/textPrimitive.tsx`（`FormText`）与 `form/atoms/_internal/selectionBox.tsx`（`SelectionBox`，square/circle/tick 三形）；一次性批量生成脚本 `scripts/_form-atoms-gen.mjs`
  - 舞台新增 `Form 表单单元 / Atoms 原子组件` 页（五分节：Label / Input & Error / Action / Selection / Misc），置于 `Form 表单单元` 分组最下方
  - `packages/components/src/index.ts` 追加 `export * from './form'`；`packages/tokens/src/index.ts` 补齐 `TypographyStyleKey / TypographyStyleSpec` 类型再导出
  - `pnpm --filter @fdesign/components test` 39 测试文件 · 53 用例全绿；stage / example-consumer / real-project-1 build 全部通过；`pnpm check-boundaries` 通过
3. **Wave 2 · 展示类简单结构**  ✅ 已完成（2026-04-18）
  - `form/exhibit/`* 落地 8 个 cell（每个配套 `.tsx + .types.ts + .contract.yaml + .test.tsx + .harness.tsx + index.ts`）：
    - SingleLine（2）：`ExhibitSingleLineLabel` / `ExhibitSingleLineLabelPreContent`
    - MultiLine（5）：`ExhibitMultiLineDefault` / `ExhibitMultiLinePretext` / `ExhibitMultiLineNumericTitle` / `ExhibitMultiLineRightMultiPretextA` / `ExhibitMultiLineRightMultiPretextB`
    - Verification（1）：`ExhibitVeriFace`（固定 card，veriFailed=false/true 两态）
  - 新增共享内部片段 `form/exhibit/_internal/ExhibitFrame.tsx`（card/flush 两态 + 可选 bottom hairline）与 `form/exhibit/_internal/exhibitParts.tsx`（复用标题/预设文本/右侧主次行/leading 容器/多行堆叠等通用片段）；`_internal/`* 不对外导出
  - `decorativeIconRegistry` 落地首批 5 条：`veri-face-success` / `veri-face-failed` / `veri-frame-success` / `veri-frame-failed` / `veri-scan-bar`（装饰 SVG 写死颜色，不读 currentColor，与 outline 主分类显式区分）；veriFace 5 种装饰色作为组件内部常量（B.1 决议）
  - `ExhibitVeriFace` 采用"旁路 Icon 组件"方案：直接调用 `getDecorativeIconDefinition` 渲染装饰 SVG；`Icon.tsx` 的 source 分支暂不扩展 `decorative`（避免 outline 尺寸协议与彩色装饰耦合）
  - 舞台 `Form 表单单元` 分组追加 `Exhibit 展示类` 页（位于 Atoms 之上、Atoms 仍居分组末位）：三分节（`单行展示类 / Single Line` / `多行展示类 / Multi Line` / `人脸验证 / Verification`），每个 cell 同时并排渲染 `card=true` 与 `card=false` 两态
4. **Wave 3 · 展示类组合/折叠结构**  ✅ 已完成（2026-04-18）
  - `form/exhibit/parts/`* 落地 11 个内部嵌套原子（每个 `.tsx + index.ts`，不配 harness/contract/test）：`GroupTitleH1` / `SubCellFlush` / `SubListFlush` / `SubListCard`（委托 SubListFlush + card=true）/ `FoldingPureHeader`（含 `rightNumeric` 切换 Roboto 数字字体族）/ `CellAmountTag`（Roboto Medium 20/22 紧缩字距 -0.625px 数字）/ `AmountList`（rounded 4 金额列表容器）/ `ExternalTileAmount`（外置标题行）/ `SubInnercard`（首/尾行圆角 + 尾行 pb 12）/ `CollapseNestAmount`（受控 `expanded` + 非受控 `defaultExpanded` + `onToggle`）/ `AmountNestList`
  - parts 聚合出口 `form/exhibit/parts/index.ts`；**不**在 `form/exhibit/index.ts` 或 `form/index.ts` 中导出（冻结决议）
  - `form/exhibit/`* 落地 5 个组合/折叠 cell（每个配套 `.tsx + .types.ts + .contract.yaml + .test.tsx + .harness.tsx + index.ts`）：
    - `ExhibitInformationList`（8275:10982）：GroupTitleH1 + SubListFlush，card 双态 + 可选 operation/onOperationPress + 子行 text/jump 默认切换
    - `ExhibitAmountListTitleExternal`（8417:9331）：ExternalTileAmount + AmountList（固定 card），外层 flex-col gap 12
    - `ExhibitAggregateMultiFold`（8417:5824）：固定 card，52 高标题行（16/18 Medium + 12 tertiary 计数，自动按 items.length 推导 "共N笔"）+ AmountNestList，可选 onJump（role=link），每项非受控 defaultExpanded
    - `ExhibitInformationListPlainText`（8275:8492）：card × expanded 双态；受控 + 非受控双模；展开态 FoldingPureHeader + SubListFlush(text)
    - `ExhibitInformationListAmount`（8275:8513）：card × expanded 双态；受控 + 非受控双模；FoldingPureHeader rightNumeric；**card+expanded 子行自动切为 jump**，flush+expanded 子行为 text
  - 舞台 `Exhibit 展示类` 页追加 `组合展示类 / Combined` 与 `折叠展示类 / Foldable` 两节；heroMeta 更新 Cells=13 / Parts=11（不对外）/ controlled+uncontrolled+onJump
5. **Wave 4 · 验收**  ✅ 已完成（2026-04-18）
  - `pnpm --filter @fdesign/tokens build && pnpm --filter @fdesign/components test && pnpm --filter @fdesign/components build && pnpm --filter @fdesign/stage build && pnpm --filter @fdesign/example-consumer build && pnpm --filter @fdesign/real-project-1 build` 全部通过（components test：52 文件 · 71 用例全绿）
  - `pnpm check-boundaries` 通过
  - stage H5 dev server 运行态（`http://localhost:10086`）视觉 + 交互验收通过：13 个展示类 cell card=true/false 双态视觉对齐 Figma；ExhibitVeriFace 成功/失败两态装饰 SVG 正确；ExhibitAggregateMultiFold 各子项独立非受控展开；**ExhibitInformationListAmount card+expanded 子行自动切 jump**，flush+expanded 为 text，与 Figma 规范一致；折叠头 role=button + aria-expanded、jump 类节点 role=link 语义通过浏览器 aria snapshot 校验；点击 collapsed fold 头部可切到 expanded，再次点击切回，独立状态互不干扰
  - 视觉偏移评估：7 个 nestOrigin local icon 占位与 `decorativeIconRegistry` 的 5 条 veriFace 装饰 SVG 均在当前舞台尺寸下视觉可接受，**未触发** Figma MCP 回灌（保留为 Round 2 / Round 3 出现明显偏移时 reactive 处理）；`Icon.tsx` 的 source 分支保持未扩展 `decorative`（当前单点旁路消费）
  - Round 1 整体切换至 **可冻结**：后续仅接受新输入驱动的增量修正，不再主动重构已冻结范围

## 本轮准出清单

- B 表候选 token 经用户确认后全部落到 `packages/tokens` 并重新 build
- Icon local registry 扩充完成
- `packages/components/src/list-item/` 删除；index.ts 导出清理；消费层 `example-consumer` / `real-project-1` 已无 `ListItem` 引用
- `packages/components/src/form/atoms/`* 全部原子组件（清单约 33 个）落地，含 types / contract / test / harness
- `packages/components/src/form/exhibit/parts/`* 全部嵌套 parts 落地
- `packages/components/src/form/exhibit/`* 全部展示类 cell 落地
- `form/index.ts` 对外导出 atoms + exhibit（不导出 parts）
- `@fdesign/components` 顶层 index.ts 追加 form 命名空间导出
- `apps/stage/src/pages/form-exhibit/`* 新增合并分页（四分节）
- `apps/stage/src/pages/form-atoms/`* 新增原子总览页（放在分组最下方）
- `componentLinks.ts` 新增 `Form 表单单元` 顶级分组，含 Exhibit + Atoms 两页
- 折叠类组件默认非受控在舞台可点击切换，jump 行可点击（无 hover / 无 cursor pointer）
- 全部构建命令通过，`check-boundaries` 通过

## 后续轮次对齐锚点（预埋，勿在本轮实现）

### Round 2 · Input 输入类

- 已预判原子复用：`InputField`、`ErrorTips`、`ErrorText`、`ErrorPop`、`WordLimit`、`Label`、`Divider`、`OperationButton (delete/textButton 变体)`
- 潜在新增原子：按设计稿补充（如"选择器"、"带单位输入"等特定 input 子件）
- 舞台：追加 `Form 表单单元 / Input 输入类` 入口

### Round 3 · Action 操作类

- 已预判原子复用：`OperationButton`、`Checkbox`、`Radio`、`Switch`、`TickTag`、`OptionCard`*、`SelectionContent`、`Divider`、`Jump`
- 舞台：追加 `Form 表单单元 / Action 操作类` 入口
- 三轮完成后在本文件追加"三类整合后再评估是否将 `Card` 内容语义与 `ExhibitInformationList` 整合"的议题

## 滚动维护规则

- 每一 Wave 完成后：更新 `.agent/checkpoint.yaml`、追加 `.agent/changelog.log`；如有架构决策调整，追加 `.agent/decisions.log`
- 每一 Round 完成后：更新本文件"三轮规划"表的状态列，并同步 `phase-5-token-protocol-and-mapping.md` 中受影响组件批次的状态
- 本文件在整个表单单元三大类收尾前一直 active；三轮全部完成后移至 `docs/exec-plans/completed/`


# Phase 5：长期滚动主计划（Token 协议与组件对齐）

> 本文件是 Phase 5 的唯一 active 入口。
> 它不是一次性收口清单，而是跨组件、跨对话长期滚动维护的主计划。
> `checkpoint.yaml` 只记录当前工作窗口；长期协议、批次顺序与滚动 backlog 统一收敛到本文件。

## 文档定位

- 记录 Phase 5 的长期稳定约束：token 协议、分层策略、不可回退决策
- 记录当前事实快照：已经落地到什么程度，哪些组件还在迭代中
- 记录当前工作窗口：本轮应优先处理什么
- 记录滚动 backlog：后续组件与 token 缺口按批次持续推进

## 状态词口径

- 阶段层：只使用 `进行中`、`已完成`
- 组件批次层：优先使用 `已落地首轮`、`收尾中`、`可冻结`
- `已落地首轮`：核心实现已进仓并能继续作为后续迭代基础
- `收尾中`：首轮已落地，但仍有当前批次内的展示、映射或体验问题待继续校正
- `可冻结`：当前批次目标已达成，可暂时停止主动调整，后续只接受新输入驱动的增量修正

## 当前事实快照

- Phase 5 已启动，且已从“等待 Figma 输入”切换到长期滚动执行
- `vars.css` 已提供颜色、字体、圆角、阴影基础定义，并由用户补齐 spacing、字体、line-height 与协议备注
- 仓库已落地基础全局样式 token 的首轮收口，并已建立 TS 主源 + Web CSS variables 镜像
- 当前唯一已落地首轮 Figma 对齐的组件是 `Button`
- `Button` 当前状态为“收尾中”，仍在配合 `apps/stage` 展示效果继续微调
- 其余组件与其语义 token 仍按批次持续推进，不按一次性全部完成来管理

## 当前工作窗口

- 第一优先级：继续收尾 `Button`，让组件本体与 `apps/stage` 展示效果达到“可冻结”
- 第二优先级：沿同一协议继续推进 `Typography / Input / Tag / Card / Modal / ListItem / Icon`
- 第三优先级：当新增组件或修正既有组件暴露 token 缺口时，先补齐全局 token 语义，再回灌组件实现

## 滚动 backlog 管理方式

- backlog 只维护到“组件批次 + 主要冲突点”层级，不写成要求一次性清空的 checklist
- 每完成一个组件批次后，只更新其状态与下一批优先级，不重写整份协议
- 若当前 focus 发生变化，由 `checkpoint.yaml` 记录短期窗口；本文件只同步结构性变化与阶段性结论

## 已确认协议

### 1. Radius 协议

- 仅允许 `2 / 4 / 8 / 12` 四档
- 不允许额外 radius 档位
- `12` 仅限营销相关场景
- `8` 仅限 dialog corners、bottom-sheet top corners、`button height >= 44px`、finance hero card
- `4` 为高度 `>= 24px` 的矩形 / vector / container 默认值
- `2` 仅用于高度 `< 24px` 的矩形 / vector / container

### 2. Spacing 协议

#### 基础 scale

- 已确认可用：`0 / 8 / 10 / 12 / 16 / 32 / 40`
- 明确禁用或当前不需要：`4 / 20 / 24 / 48 / 64`

#### 语义 alias

- 页面左右 padding：`--spacing-padding-page`
- 卡片内左右 padding：`--spacing-padding-card`
- flush 通栏表单左右 padding：`--spacing-padding-flush`
- 卡片之间 gap：`--spacing-gap-between-cards`
- 相邻 button 之间 gap：`--spacing-gap-between-buttons`
- 列表项之间 gap：`--spacing-gap-between-listitems`
- 表单与 button 之间 gap：`--spacing-gap-between-form-and-button`
- navbar 下方 gap：`--spacing-gap-bottom-navbar`
- 列表子标题与列表项之间 gap：`--spacing-gap-between-listsubheader-and-listitems`
- 列表组之间 gap：`--spacing-gap-between-listgroups`
- 列表子标题 margin：`--spacing-margin-listsubheader`

#### 容器与内容行分层

- 不将 `Card` 或 `Modal` 简化为单一 padding 值
- 将 spacing 协议拆成“外层容器 padding”与“内容行间距 / 内容行节奏”两层

#### 外层容器 padding

- `Card` 外层：`x=10`、`y=10`
- `Modal` 外层：`x=10`、`y=10`
- 这层承担壳层留白，不承载内容 archetype 差异

#### 内容行间距 / 内容行节奏

- `--spacing-gap-cell-y-text: 18px`
  - 规则：首元素为 `14-18` 的纯文字时，与上下相邻行元素之间的主间距
- `--spacing-gap-cell-y-icon-leading: 14px`
  - 规则：首元素左侧带 `24x24` icon 时，与上下相邻行元素之间的主间距
- `--spacing-gap-row-y-compact: 12px`
  - 规则：信息型行容器，主体文字 `12/14` 时的常规行间距
- `--spacing-gap-row-y-regular: 14px`
  - 规则：信息型行容器，需要更宽松时使用

#### 首行与外层容器的叠加规则

- 若内容行是外层容器内第一个出现的子容器，不得再额外叠加该内容行自己的 `top gap/padding`
- 也即：外层容器顶部留白由外层 `padding-top` 单独承担
- 内容行节奏主要用于“与上下相邻行元素之间的间距”，而不是无条件作用在首行顶部
- 同理，若内容行是最后一个子容器，也不应机械叠加到底部形成双重留白；底部留白优先由外层 `padding-bottom` 承担

#### 当前实施解释

- `Card` 与 `Modal` 当前的 `24px` padding 不做“单值映射”
- 后续实施时，改为“外层容器 + 内容行节奏”的两级 spacing 协议
- `Modal` 暂不发明独立于 `Card` 的内容行节奏体系，先复用同一套行间距协议

### 3. Typography 协议

- 平台字体先定义 platform token，再由语义字体 alias 引用
- typography 层只应引用语义字体别名，不直接引用平台 token
- 已确认字号体系：`10 / 12 / 14 / 16 / 18 / 22 / 26 / 36 / 44`
- 已确认字重：`300 / 400 / 500`
- 明确禁用：`600 / 700`
- 单行文本与正文文本采用不同 line-height 规则

### 4. 实施边界协议

- token 实施前，必须先让用户确认映射方案
- 协议优先级高于现有 provisional 实现
- 若现有组件与协议冲突，应调整组件实现，不应为了兼容旧代码新增禁用 token

## 仓库映射方案

## 目标分层

建议将仓库 token 拆成四层，TS 仍为主源：

1. `reference`

- 对应 `vars.css` 中的 `ref-*`
- 保留原始色板、平台字体等基础值

1. `semantic`

- 对应 `sys-*` 与经确认的 spacing / typography / radius 语义
- 组件优先消费这一层

1. `component-alias`

- 仅在需要时提供组件级二次映射
- 避免组件直接耦合 reference 色板或平台字体

1. `web-css-vars`

- 作为 Web 端镜像输出
- H5 读取 CSS variables，小程序 / RN 继续读取 TS 结果值

## 建议的 token 结构

### colors

- 保留 `reference`：`brand / functional / neutral`
- 建立 `semantic`：`primary / marketing / error / caution / success / dangerous / text / page / divider / icon / external / data`
- 组件后续不再直接依赖 `colors.primary[600]` 这类验证期色阶命名

### spacing

- 不再沿用 `spacing[1] = 4` 的索引刻度写法
- 改为“真实值键”或“语义 alias”并存
- 建议 TS 层同时暴露：
  - `spacingScale`: `0 / 8 / 10 / 12 / 16 / 32 / 40`
  - `spacingSemantic`: `paddingPage / paddingCard / gapBetweenCards / ...`

### radii

- 仅保留：`small=2`、`default=4`、`large=8`、`xlarge=12`
- 删除或停用：`none / xl=16 / full=9999`
- 不为迁移方便新增额外半径档位

### typography

- 字体族：按 `platform family -> semantic family` 两层表达
- 字号：按已确认档位表达，不再沿用 `xs / sm / base / lg / xl / 2xl / 3xl` 的英文验证期命名
- 字重：仅保留 `light / regular / medium`
- line-height：拆成 `singleLine` 与 `body`

## 现有仓库到新协议的关键映射

### 1. 必须移除的旧 token 依赖

- `radii.xl`
- `radii.full`
- `typography.fontWeight.semibold`
- `typography.fontWeight.bold`
- `spacing[1] / [2] / [3] / [4] / [5] / [6] / [8] / [10] / [12] / [16]` 这套“索引即 scale”表达

### 2. 当前已知会受影响的组件

- 第一批：`Button`（已落地首轮对齐，当前收尾中）
- 第二批：`Typography`、`Input`、`Tag`
- 第三批：`Card`、`Modal`、`ListItem`、`Icon`
- 横向跟进：`apps/stage` 全局壳层、`projects/real-project-1` 全局壳层

### 3. 组件级协议映射建议

#### Button

- 已落地首轮对齐：Button API 已切换到 `primary-fill / primary-outline / secondary-outline`
- 已落地首轮对齐：size 已切换到 `xl / l / m / s / xs / mini`
- 已落地首轮对齐：新增 `inactive` 状态，并与 `disabled` 分离
- 已落地首轮对齐：`Text.weight` 的历史 `semibold / bold` 不再用于 Button 文案
- 已落地首轮对齐：`xl / l` 使用 `radius=8`，`m / s / xs` 使用 `radius=4`，`mini` 使用 `radius=2`
- 已落地首轮对齐：`loading` 仅在 `xl / l` 渲染 spinner，`m / s / xs / mini` 保持“加载中状态但不展示 spinner”的设计稿行为

#### Input

- 当前输入框 radius `8` 不符合默认矩形容器协议，建议改为 `4`
- label / helper 的字重与字号需改为 typography 协议值

#### Typography

- 不再保留 `Text` 作为设计系统通用组件
- stage 中改为 `Typography` 基础排版验证页，挂到 `CssToken 全局样式` 分组下
- 排版能力由全局 typography token 与页面/组件语义封装组合完成，不再围绕 `Text` props 扩展 API

#### Tag

- 当前 `radii.full` 与协议冲突，建议改为 `small=2`
- 当前 success / warning / danger 的浅色背景与边框存在硬编码，需要转成语义色
- label 字重需改为 `500` 或更轻

#### Card

- 默认卡片 radius 应改为 `4`
- 若是 finance hero card，可按协议例外使用 `8`
- 当前 padding `24` 不在可用 spacing 中，需要改成协议允许值或语义 alias

#### Modal

- dialog corners 可使用 `8`
- 当前 padding `24` 不在可用 spacing 中，需要改成协议允许值或语义 alias
- 标题 `700` 需 remap 到 `500`

#### ListItem

- 默认应改为 `4`
- 当前 padding / gap `16` 可保留，但需映射到已确认 spacing
- 文本字重 `600` 需 remap 到 `500`

#### Icon

- 当前 fallback `700` 需 remap 到 `500` 或取消该强调语义

## 阻塞项与待确认项

### 已明确，不再回退

- 不新增 `radius-full`
- 不新增 `radius-16`
- 不保留 `600 / 700` 字重作为正式 token
- 不保留 `600 / 700` 作为正式排版字重 token，也不再围绕 `Text` 组件保留历史字重 API

### 实施前仍需用户确认

- 是否需要将“协议层”进一步写入组件 contract 的规则说明

## 当前完成判定

- `Button` 达到“可冻结”：组件本体、token 映射与 stage 展示在本轮目标内达成一致，且没有待继续收尾的关键视觉问题
- 某组件进入下一轮：当前组件已达到“可冻结”，后续只接受新输入驱动的增量修正
- token 一轮达到“已落地首轮”：本轮涉及组件所需的新增语义 token 已从临时值中抽取并回灌，不留长期硬编码或长期 reference token 直连

## 滚动推进顺序

1. 继续维护本文件中的长期协议与批次顺序，不把它当作一次性收口文档
2. 已落地首轮：建立 TS token 分层与 Web CSS variables 镜像
3. 已落地首轮：`Button` 与公共 token 运行时
4. 当前优先：继续收尾 `Button`，同步校正 `apps/stage` 展示效果
5. 后续按批次推进其余组件，逐步消除与协议冲突的 radius / font-weight / spacing / color 用法
6. 如用户继续提供 Figma 输入或新的组件范围，再按同一主计划扩展，而不是新开平行 active 文档
# Phase 5：Token 协议抽取与映射方案

> 本文件承接用户已提供的 `vars.css` 与回填备注。
> 当前目标不是立即实施组件改造，而是先把 token 协议与仓库映射方案固化为可审阅、可延续的项目文档。
> 在用户再次明确确认前，不进入仓库内 token 与组件实现改造。

## 当前结论

- Phase 5 已进入 token 收口前置阶段，不再处于“仅等待 Figma 输入”的待机态
- `vars.css` 已提供颜色、字体、圆角、阴影基础定义，并由用户补齐了 spacing、字体、line-height 与协议备注
- 本轮输入已经不仅是 token 值，还包含可直接落地的设计使用协议
- 后续仓库实现必须同时遵循“值映射”和“协议约束”，不能只做数值替换

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

- `Button`
- `Input`
- `Text`
- `Tag`
- `Card`
- `Modal`
- `ListItem`
- `Icon`
- `apps/stage` 全局壳层
- `projects/real-project-1` 全局壳层

### 3. 组件级协议映射建议

#### Button

- 已完成 Figma 对齐：Button API 已切换到 `primary-fill / primary-outline / secondary-outline`
- 已完成 Figma 对齐：size 已切换到 `xl / l / m / s / xs / mini`
- 已完成 Figma 对齐：新增 `inactive` 状态，并与 `disabled` 分离
- 已完成 Figma 对齐：`Text.weight` 的历史 `semibold / bold` 不再用于 Button 文案
- 已完成 Figma 对齐：`xl / l` 使用 `radius=8`，`m / s / xs` 使用 `radius=4`，`mini` 使用 `radius=2`
- 已完成 Figma 对齐：`loading` 仅在 `xl / l` 渲染 spinner，`m / s / xs / mini` 保持“加载中状态但不展示 spinner”的设计稿行为

#### Input

- 当前输入框 radius `8` 不符合默认矩形容器协议，建议改为 `4`
- label / helper 的字重与字号需改为 typography 协议值

#### Text

- `weight` 中的 `semibold` / `bold` 与协议冲突
- 已确认：直接收缩 API，仅保留协议允许的字重取值

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
- `Text.weight` 不保留 `semibold / bold`，按协议收缩 API

### 实施前仍需用户确认

- 是否需要将“协议层”进一步写入组件 contract 的规则说明

## 后续执行顺序

1. 用户确认本协议抽取与映射方案
2. 在仓库内建立新的 TS token 分层与 Web CSS variables 镜像
3. 已完成：优先改造 `Button` 与公共 token 运行时
4. 逐个修正其余受影响组件，去除与协议冲突的 radius / font-weight / spacing
5. 按用户提供的 Figma 链接继续进入后续组件实施
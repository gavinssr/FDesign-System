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
- 当前已完成首轮 Figma 对齐且当前范围可冻结的组件包括 `Button`（当前仅多个分类下的 `Base` 类 button 已完成，其余分类后续补齐）、`Tag`、`Icon` 与 `Form` 展示类
- `Button` 当前状态为“可冻结”，准确范围为多个分类下的 `Base` 类 button；其余分类仍待后续继续补齐
- `Tag` 当前状态为“可冻结”，本轮组件本体、token 映射与 stage 展示已通过验收
- `Icon` 当前状态为“已落地首轮”，双源架构、尺寸协议与 stage 展示已完成一轮对齐
- `Form` 当前状态为“已落地首轮”，展示类已完成首轮 Figma 对齐，`ListItem` 已从公共导出与 stage 页面中移除并收敛为 `Form` 组件族；输入类 / 行动类当前仅保留 stage 占位页
- 用户已明确确认 `Input / Card / Modal` 不再属于当前设计系统公共组件范围；对应组件本体、公开导出、stage 分支页与导航入口已移除
- 其余组件与其语义 token 仍按批次持续推进，不按一次性全部完成来管理

## 当前工作窗口

- 第一优先级：继续定义 `Form` 输入类 / 行动类的真实组件范围，并沿 Web DOM 路线收敛后续交互组件边界
- 第二优先级：当新增组件或修正既有组件暴露 token 缺口时，先补齐全局 token 语义，再回灌组件实现
- 第三优先级：`Button / Tag / Icon` 当前范围仅接受新输入驱动的增量修正，不再作为默认主动收尾对象

## 滚动 backlog 管理方式

- backlog 只维护到“组件批次 + 主要冲突点”层级，不写成要求一次性清空的 checklist
- 每完成一个组件批次后，只更新其状态与下一批优先级，不重写整份协议
- 若当前 focus 发生变化，由 `checkpoint.yaml` 记录短期窗口；本文件只同步结构性变化与阶段性结论

## 已确认协议

### 0. Stage 展示交互识别协议

- `apps/stage` 作为展示舞台，组件展示区里的真实可点击节点在 hover 时都必须呈现 `pointer`
- `apps/stage` 页内文本默认允许鼠标框选复制，便于核对文案、token 名称、示例值与组件展示内容
- `pointer` 对组件展示区不再由 stage 壳层统一补齐；公共组件应在 H5 主路径自行承担 hover cursor 与交互语义
- stage 壳层只为自己的导航、折叠组、切换控件等舞台层节点补 `pointer`，不得替公共组件兜底交互暗示
- 这条规则用于帮助识别交互热区，但不得反向要求组件本体引入额外展示容器、辅助边框或 stage 专属视觉语义
- 文本可选择同样属于 stage 私有展示增强，不得反向要求组件本体在真实消费场景中取消既有 `user-select` 语义
- 新增组件或重构组件时，若 stage 中未出现 `pointer`，优先修组件本体的真实节点、hover cursor 与交互语义；不要把“手动给某个 demo 包一层可点击 class”或“让 stage 自动命中”当成长期主路径

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
- H5 主路径的公共组件优先输出可控 Web DOM；所有可交互元素的真实节点、状态 class、ARIA 语义和样式命中点应由 `packages/components` 明确持有
- 不再默认使用 Taro 表单 / 交互组件承接公共组件内部交互语义；若 Taro 组件会生成 `taro-*`、`weui-*` 等额外内层结构或平台预设样式，应改为原生 HTML 语义或组件自持结构
- `View` / `Text` 可继续作为 Taro H5 基础布局和文本容器，但 `button`、`input`、`textarea`、`select`、`a`、自定义点击区域等交互节点必须按最终 H5 DOM 可控性优先设计
- 禁止把覆盖 Taro / weui 内层默认样式作为长期方案；NavBar 搜索框改为原生 `input` 是后续交互组件的路线样板
- Form 输入类 / 行动类后续新增真实交互组件时，必须先按上述 Web DOM 路线定义真实 DOM 结构，再做 token、视觉和平台适配

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

- 第一批：`Button`（当前仅多个分类下的 `Base` 类 button 已完成本轮收尾并可冻结）、`Tag`（已通过本轮验收，当前可冻结）、`Icon`（已落地首轮对齐）
- 第二批：`Form`（展示类已落地首轮，输入类 / 行动类待定义真实组件范围）
- 横向跟进：`apps/stage` 全局壳层、`projects/real-project-1` 全局壳层

### 3. 组件级协议映射建议

#### Button

- 已落地首轮对齐：当前完成范围为多个分类下的 `Base` 类 button，而非全部 button 分类
- 已落地首轮对齐：`Base` 类 Button API 已切换到 `primary-fill / primary-outline / secondary-outline`
- 已落地首轮对齐：`Base` 类 size 已切换到 `xl / l / m / s / xs / mini`
- 已落地首轮对齐：`Base` 类新增 `inactive` 状态，并与 `disabled` 分离
- 已落地首轮对齐：`Text.weight` 的历史 `semibold / bold` 不再用于 `Base` 类 Button 文案
- 已落地首轮对齐：`Base` 类 `xl / l` 使用 `radius=8`，`m / s / xs` 使用 `radius=4`，`mini` 使用 `radius=2`
- 已落地首轮对齐：`Base` 类 `loading` 在 `xl / l / m / s / xs / mini` 全尺寸均渲染 spinner，并统一保持 loading 语义与不可点击状态
- 已落地首轮对齐：`Base` 类全部尺寸当前均按固定高度实现，不再依赖内容把按钮纵向撑高
- 已落地首轮对齐：`Base` 类 `xl` 宽度固定为 `355px`；`l` 宽度约束在 `178px-327px` 范围内，当前 stage 展示按上限 `327px` 呈现；`block` 等流式场景下 `xl / l / m` 的横向 padding 会收缩到最小安全留白
- 当前状态：`Base` 类当前范围已完成本轮收尾，可冻结；其余 button 分类后续继续补齐

#### Typography

- 不再保留 `Text` 作为设计系统通用组件
- stage 中改为 `Typography` 基础排版验证页，挂到 `CssToken 全局样式` 分组下
- 排版能力由全局 typography token 与页面/组件语义封装组合完成，不再围绕 `Text` props 扩展 API

#### Form

- 已落地首轮对齐：展示类所需 `spacing / typography / color` 语义 token 已补齐，并同步到 `web-css-vars`
- 已落地首轮对齐：`Form` 组件族已承接原 `ListItem` 的公共导出职责，当前包含 `FormRow`、`FormFaceStatus`、`FormInfoList`、`FormAmountList`、`FormCollapseGroup`、`FormAggregateCollapseGroup`
- 已落地首轮对齐：`apps/stage` 已新增 `Form 表单 / 展示类 / 输入类 / 行动类` 导航；其中展示类已落地 8 组形态，输入类 / 行动类当前为占位页
- 已落地首轮对齐：组件公开 API 已新增 `surfaceVariant=\"flush\" | \"card\"`，旧 `carded` 仍保留兼容；`FormGroup` / `Form.Group` 已承载列组合消费语义
- 后续输入类 / 行动类必须先按 Web DOM 实现路线定义真实交互节点，不得默认复用 Taro 表单 / 交互组件导致 H5 内层样式干扰
- 当前状态：展示类当前可作为后续迭代基础，输入类 / 行动类待在下一批次明确真实范围后继续推进

#### Tag

- 已落地首轮对齐：API 已切换到 `variant / color / couponPrefix`
- 已落地首轮对齐：组件已支持 `fill-primary / outline / fill-secondary`、七种颜色与券式前缀结构
- 已落地首轮对齐：`purple` 已经按用户确认进入 `semantic.tag`，未新增 reference 层
- 已落地首轮对齐：Tag 紧凑协议已抽取到 token，当前包含 `minHeight=16 / paddingX=4 / couponGap=2 / couponDividerHeight=8 / line-height=9`
- 当前状态：`apps/stage` 的 `Tag 标签` 页展示已通过验收，本轮可冻结

#### ListItem（历史项）

- `ListItem` 已不再作为当前设计系统的公共组件继续演进
- 历史 `ListItem` 的展示类能力已收敛到 `Form` 组件族中，不再单独作为 Phase 5 的待推进批次管理
- 如后续历史文档仍出现 `ListItem`，应按“Phase 2 历史组件名”理解，而不是当前组件面

#### Icon

- 已落地首轮对齐：已完成 local registry + material 的双源统一入口
- 已落地首轮对齐：已接入 `special-mini / xxs / xs / s / m / special-large` 六档尺寸、tone/color 覆盖与 stage 展示
- 当前剩余工作：后续按 registry 继续扩充本地图标集，并在有新 Figma 输入时继续增量校正

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
4. 已落地首轮：`Form` 展示类替代历史 `ListItem`，并完成 stage 展示与基础消费语义落地
5. 当前优先：继续定义 `Form` 输入类 / 行动类的真实范围，并在新增组件前先收敛真实交互边界
6. `Button / Tag` 当前范围已可冻结，后续仅接受新输入驱动的增量修正；`Icon` 按 registry 做增量扩充
7. 如用户继续提供 Figma 输入或新的组件范围，再按同一主计划扩展，而不是新开平行 active 文档

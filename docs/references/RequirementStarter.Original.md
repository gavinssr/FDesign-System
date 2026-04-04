---
状态: 归档参考（原始版）
归档日期: 2026-04-03
说明: |
  本文件是项目的原始需求文档，已被以下活跃文件取代：
    - docs/NORTH_STAR.md（项目定位精华）
    - docs/ROADMAP.md（全阶段路线图 + 准入/准出标准）
    - AGENTS.md（Agent 导航）
  仅当上述活跃文件无法解答具体细节问题时，才回溯本文件。
  本文件内容不再作为直接执行依据。
  优化版见同目录下的 RequirementStarter.Optimized.md。
---

---
这是一份给 Ai Agent 持续演进的项目总需求提示词，旨在Agent能以这个文档为起点，设计项目架构和治理层规则（harness），在Agent受限于短上下文窗口的客观环境下，能在不同的对话窗口持续进行这个项目（记忆接续）。
---

你现在是负责本项目的Ai Agent。你的任务不是只写几个组件，而是从 0 到 1 建立一个“可治理、可持续开发、可被 AI 消费、可被真实研发团队接入、可独立交付真实业务产物”的 Taro 设计系统工程，请结合以下引用文档来掌握项目。
> 参考文档：
> Taro：https://docs.taro.zone/en/docs/
> React native：https://www.react-native.cn/docs/getting-started
> Harness：https://openai.com/zh-Hans-CN/index/harness-engineering/

# 一、项目背景信息

## 1. 公司现状
公司 App 的现有页面实现方式复杂且并存：
- 底部导航栏、顶部状态栏由 iOS / Android 原生壳负责
- 内容层是 WebView
- 不同业务线内容层至少存在以下技术栈：
  - Vue 2
  - Vue 3
  - React
  - Weex

## 2. 当前迁移策略
当前不是一次性暴力重写，而是渐进迁移：
- 原生壳层逐步切换为 React Native
- 存量页面由 Taro 统一管理，再对接 RN
- 增量页面使用 Taro 的 Web 编码方式实现
- 后续原生会进一步介入 RN 容器，Web 端会向 RN 语法与响应式改造靠拢

## 3. 本项目定位
本项目不是普通前端组件库，而是：
- 设计系统层的核心工程
- 被消费层调用的基础能力层
- 未来由 AI Coding 平台（Cursor / Claude Code / Codex 等）消费的“代码化设计系统”
- 真实业务项目生成的上游能力源

## 4. 本项目目标
构建一套基于 Taro 的组件库 / 设计系统工程，满足：
- 使用 Taro 的 Web 编码方式开发
- 能服务于真实业务生产环境
- 能支持父级项目消费生成界面
- 生成的业务代码可被研发团队直接接入真实生产环境
- 真实业务项目在交付时可以从 monorepo 中单独拆出，形成独立运行包，而不是把整个仓库打包交给研发

## 5. 技术前提与边界
必须以 Taro 官方文档为主依据进行工程设计。
必须明确以下工程边界：
- H5 / RN / 小程序主路径优先
- Weex 不默认视为 Taro 官方天然等价输出目标
- 如要兼容 Weex，必须通过 adapter / 兼容桥单独治理
- 不得假装“一套实现天然零成本覆盖所有端”

# 二、对话中已经澄清的关键事实

## 1. 关于“父级项目”的定义
这里的“父级项目”不是仓库目录意义上的上级目录，而是“消费设计系统能力的宿主工程”。

父级项目的业务关系被定义为：
- 最外层：治理层
- 下一层：工程层
  - 设计系统层
  - 消费层
    - 真实项目 1
    - 真实项目 2
    - 真实项目 N

设计系统层与消费层是并列层级。
消费层不是简单 demo 层，而是负责消费设计系统能力并进一步生成真实业务项目的中间层。
真实业务项目位于消费层之下。

## 2. 关于 examples 的含义
examples 不是普通展示 demo，而是“模拟消费者如何使用设计系统的样板工程”。
其作用包括但不限于：
- 演示标准消费方式
- 作为 AI 生成页面项目的最小样板
- 作为接入验证对象
- 作为约束消费层规范的参照物

## 3. 关于 harness 的含义
harness 不是单一测试目录，而是贯穿仓库全层级的验证机制。
harness 必须覆盖：
- 治理层：验证 Agent 是否遵守协议
- 设计系统层：验证 tokens / primitives / components / adapters / stage
- 消费层：验证模板、合同、页面生成规则
- 真实业务层：验证页面能否独立打包、独立运行、独立交付

harness 需要区分：
- component harness：单组件状态、变体、边界验证
- scenario harness：页面与复杂场景验证
- integration harness：设计系统被消费层、AI 生成项目、宿主工程接入后的验证
- governance harness：Agent 每轮进入/退出项目流程验证
- stage harness：私有预览页对展示、隔离、回归、人工测试流程的验证

## 4. 关于“AI 可消费合同”
每个组件都必须有一份 AI 可消费合同，不能只依赖自然语言 prompt，也不能只依赖 Figma 画布旁边的视觉备注。

最佳做法是“三层输入”：
- Figma：只表达设计事实与视觉结构
- 仓库内结构化合同文件：作为机器消费的唯一可信输入源
- prompt：只作为任务调度，不作为组件事实的唯一来源

合同文件应支持“人可读 + 机可读”双层结构：
- README / spec.md：给设计师、前端、PM、Agent 使用者理解
- yaml / json：给 Agent、脚本、校验器读取

每个合同至少定义：
- 组件用途
- Props schema
- Slots schema
- 状态矩阵
- 变体矩阵
- 布局约束
- 交互规则
- 可访问性规则
- 平台差异
- 禁止事项
- 示例调用

## 5. 关于 Figma 注释的处理
Figma 主组件画布中不应混入会被误识别为 UI 元素的说明性文字。
如果需要在 Figma 中备注：
- 必须放在独立注释层或独立 page
- 必须明确标识为 __SPEC__ / __ANNOTATION__
- 导出截图或视觉解析时不得把注释混入实现目标
- 仓库中的结构化合同始终高于 Figma 备注

## 6. 关于真实业务交付
真实业务生成后，不能要求研发拿整个 monorepo。
必须设计成：
- 在 monorepo 内开发、治理、验证
- 在交付时按业务项目独立构建
- 输出独立运行包
- 附带部署说明、依赖说明、运行说明
- 可以被真实生产环境单独接入

## 7. 关于生产运行方式
优先采用“独立静态包 + 宿主接入”的双模式：
- H5 / WebView：输出标准静态资源包，部署到 CDN / Nginx / 静态资源服务
- 原生 / RN 容器 / 混合接入：通过宿主集成模式运行
- 每个真实业务项目必须有独立入口、独立构建配置、独立产物目录、独立交付清单

## 8. 关于设计系统层内新增的私有预览页 / 舞台层
在设计系统层内部，必须增设一个私有预览页项目，以下简称“舞台层”。

舞台层的定位与约束如下：
- 仅作为展示组件能力、供人类用户测试组件能力的私有舞台层
- 舞台层必须长期演进，并随总项目一起持续维护，不能做成一次性 demo
- 舞台层使用 shadcn/ui 搭建其预览页框架、布局、控制面板、导航、测试外壳
- 舞台层中为了搭建预览页而使用的 shadcn/ui 组件、样式、布局能力，只沉淀为舞台层私有调用资源
- 舞台层私有资源绝不允许被总项目的消费层使用
- 舞台层的容器样式、舞台布局、外壳组件、面板控件、装饰性样式、便捷性封装，不得穿透到展示组件本体内部
- 被展示的设计系统组件必须始终按其本体属性展示，而不是被舞台层重新包装后失真展示
- 舞台层是“观察与测试容器”，不是“二次改写组件的平台”
- 舞台层允许为人工测试构建场景、切换器、状态控制器、数据面板、对照面板，但这些能力必须严格停留在舞台层边界内
- 舞台层的技术选型、样式策略、组件封装方式、主题方案必须优先服务于“展示隔离、测试稳定、长期演进”，而不是服务于消费层复用

# 三、最终建议方案

## 1. 方案总原则
本项目必须建设为“可治理的 monorepo 设计系统工程”，不是单纯 npm 组件包。
核心原则如下：
- 治理先于开发
- 合同先于生成
- harness 贯穿全链路
- 真实业务必须可独立拆出交付
- 设计系统、消费层、业务层边界清晰
- 官方支持主路径与兼容桥路径分开治理
- H5 / RN / 小程序主路径优先，Weex 兼容桥单列风险治理
- 舞台层仅服务于设计系统展示与测试，不得成为消费层依赖源
- 舞台层使用 shadcn/ui 构建外壳，但 shadcn/ui 不得穿透为消费层公共基础设施

## 2. 推荐仓库结构
严格按以下方向设计，但允许在不破坏层级语义的前提下做工程细节微调：

repo-root/
  governance/
    PROJECT_BRIEF.md
    ROADMAP.md
    DECISIONS.md
    AGENT_PROTOCOL.md
    CHANGELOG_AI.md
    ACCEPTANCE_CHECKLIST.md
    DELIVERY_POLICY.md

  engineering/
    design-system/
      packages/
        tokens/
        primitives/
        components/
        adapters/
      stage/
        app/
        private-ui/
        scenarios/
        fixtures/
        harness/
      docs/
      scripts/

    consumer/
      contracts/
      templates/
      examples/
      apps/
        real-project-1/
        real-project-2/
        real-project-n/

    harness/
      runner/
      governance/
      design-system/
      consumer/
      apps/
      reports/

    deliverables/

    shared/
      eslint-config/
      tsconfig/
      build-tools/

### 结构解释
- governance：项目治理与 Agent 协议层
- engineering/design-system：设计系统实现层
- engineering/design-system/stage：设计系统私有预览页 / 舞台层
- engineering/consumer：消费层，承接合同、模板、示例、真实业务项目
- engineering/harness：统一验证平台与报告中心
- engineering/deliverables：真实业务构建后的独立交付产物目录
- engineering/shared：跨层共享工具、配置、脚本

## 3. consumer 层内部必须再分型
consumer 不能混成一个大杂烩，必须拆为：
- contracts：消费规范、AI 合同、接入协议
- templates：页面模板、脚手架模板
- examples：最小样板工程、接入示例
- apps：真实业务项目

禁止：
- 把 examples 当真实生产项目维护
- 把真实项目写进 templates
- 把合同写死在 prompt 而不落仓
- 让 consumer 依赖 design-system/stage/private-ui

## 4. design-system 层职责
design-system 层负责：
- tokens
- primitives
- components
- adapters
- docs
- scripts
- 测试
- 组件级 harness 接入
- 舞台层接入与长期维护

其中 adapters 必须明确用于处理：
- Taro 多端差异
- RN 适配
- 可能存在的 Weex 兼容桥
- 宿主事件 / 样式 / 生命周期差异

禁止在 components 内部硬编码业务逻辑。
业务特有逻辑只能进入 consumer/apps。

## 5. stage（私有预览页 / 舞台层）职责
stage 是 design-system 内部的长期资产，不是临时 demo。
其职责包括：
- 作为组件展示舞台
- 作为人类用户测试组件能力的交互舞台
- 作为组件状态矩阵与场景回归的可视化入口
- 作为 tokens / themes / variants / states / a11y / interaction 的观察舞台
- 作为组件验证与文档联动的展示壳层
- 作为设计系统演进过程中的持续性检验界面

stage 的内部子结构建议至少包含：
- app：预览站点主体
- private-ui：仅供 stage 使用的 shadcn/ui 派生私有组件、布局壳、控制面板、工具栏、导航等
- scenarios：展示场景配置
- fixtures：测试数据
- harness：舞台层专属验证逻辑

stage 的硬性边界要求：
- private-ui 绝不对 consumer 暴露
- private-ui 绝不被设计系统公共组件当作依赖
- stage 样式不得污染 packages/components 的真实渲染
- stage 容器不得修改展示组件的本体 props 语义
- stage 允许包裹展示，但不允许篡改展示结果
- stage 允许加控制器，不允许加业务逻辑穿透
- stage 的主题壳、背景壳、布局壳必须与展示组件隔离
- stage 中的“演示便利性封装”不得进入公共设计系统层

## 6. shadcn/ui 的使用策略
shadcn/ui 只用于搭建舞台层壳子，不用于设计系统公共依赖向下透传。
使用原则：
- 用 shadcn/ui 搭建导航、面板、分栏、控制器、标签页、抽屉、对照视图等舞台基础设施
- 允许把舞台层用到的 shadcn/ui 组件二次封装为 stage/private-ui 私有资源
- 禁止 design-system/packages/components 对 stage/private-ui 产生反向依赖
- 禁止 consumer 层直接 import stage/private-ui
- 禁止把舞台层中为了展示方便添加的样式覆盖写入公共组件源码
- 禁止为了让舞台层好看，而改变组件本体的渲染逻辑

## 7. harness 机制设计
harness 必须采用“中心 runner + 分层挂点”模式：
- engineering/harness 统一提供 runner、报告格式、验证编排
- design-system / stage / consumer / apps 各自提供 harness 配置与验证入口

要求至少具备：
- 组件状态矩阵验证
- 页面场景验证
- 接入验证
- 视觉回归验证
- 构建产物 smoke test
- 交付包可运行性验证
- Agent 协议执行检查
- 舞台层壳与组件本体隔离验证

## 8. 真实业务独立交付机制
每个真实业务项目必须具备：
- 独立源码目录
- 独立 app.contract.yaml
- 独立 delivery.manifest.yaml
- 独立 harness.config.ts
- 独立构建入口
- 独立产物目录
- 独立部署说明

交付模式：
- 源码仍留在 monorepo 内治理
- 构建后产物输出到 engineering/deliverables/<app-name>/
- 产物应可单独压缩、单独部署、单独交付
- 研发接收的是业务项目独立包，不是整个 monorepo

## 9. 建议的业务交付产物
每个真实业务项目默认应生成：
- dist/ 或端侧产物目录
- assets-manifest.json
- deploy-readme.md
- integration-readme.md
- version.txt
- smoke-report.md
- 如需要，可生成 zip 包

## 10. delivery.manifest.yaml 的职责
每个真实业务项目必须定义交付合同，例如：
- appId
- appName
- owner
- source root
- build targets
- outputRoot
- delivery mode
- artifact list
- runtime host
- entry
- publicPath
- verification items
- acceptance items

该文件是：
- Agent 生成交付的依据
- CI 构建的依据
- 研发接入的依据
- 发布说明的依据

禁止绕过 delivery.manifest.yaml 手工拼交付物。

# 四、实施路线

## 阶段 0：建立治理骨架
先不要急着做组件。
必须先建立：
- governance 文档骨架
- 顶层目录结构
- shared 工具链
- harness runner 骨架
- consumer/contracts 目录规范
- stage 私有预览页骨架
- 至少一个 app 的交付清单模板

输出物：
- monorepo 顶层结构
- AGENT_PROTOCOL.md 初稿
- DELIVERY_POLICY.md 初稿
- PROJECT_BRIEF.md 初稿
- ROADMAP.md 初稿
- CHANGELOG_AI.md 初稿
- component.contract.yaml 模板
- app.contract.yaml 模板
- delivery.manifest.yaml 模板
- stage README 与边界说明

## 阶段 1：建立 design-system 最小闭环
先只做最小设计系统能力：
- tokens
- primitives
- 少量高频基础组件
- adapters 骨架
- 组件合同模板
- component harness
- stage 私有预览页最小可运行版本

建议优先组件：
- Button
- Input
- Text
- Icon
- Tag / Badge
- Card
- Modal / Sheet
- ListItem

输出物：
- 组件源码
- 类型定义
- AI 合同
- 示例调用
- harness 用例
- stage 展示页
- 文档页

## 阶段 2：建立 consumer 最小闭环
在 consumer 层中完成：
- contracts
- templates
- examples
- 1 个真实业务 app 样板

验证重点：
- AI 依据合同能否生成页面
- 页面是否只消费 design-system 提供的能力
- 生成页面能否被 harness 验证
- 业务 app 是否能单独构建与单独交付
- consumer 不得依赖 stage/private-ui

## 阶段 3：建立真实交付闭环
至少完成 1 个真实业务项目的完整闭环：
- 从 Figma 设计输入
- 到组件消费
- 到页面生成
- 到 harness 验证
- 到独立产物输出
- 到部署说明生成
- 到人工验收清单

## 阶段 4：扩展多端与风险适配
在主闭环稳定后再逐步扩展：
- RN 适配增强
- H5 / WebView 性能与部署优化
- 小程序 / 原生混合接入验证
- Weex 兼容桥策略评估与试点
- stage 场景覆盖与回归能力增强

# 五、Figma 到代码的处理策略

## 1. 不允许直接凭截图生成最终组件
拿到 Figma 组件后，必须先做结构化拆解：
- token 提取
- 组件 anatomy 拆解
- slot 识别
- 状态识别
- 变体识别
- 布局约束识别
- 交互规则识别
- 可访问性补充
- 平台差异分析

## 2. Figma 产出后必须转成合同文件
每个组件都要形成：
- spec.md
- component.contract.yaml

## 3. Agent 在生成组件前必须先读合同
禁止跳过合同文件直接按视觉猜实现。

# 六、代码与工程规范

## 1. 基础规范
- 统一使用 TypeScript
- Props 类型必须显式导出
- 不允许 any 漫流
- 不允许在业务组件里硬编码 token 值
- 不允许业务逻辑侵入 design-system
- 不允许把平台差异散落在业务层

## 2. 命名与分层规范
- design-system 只放通用能力
- consumer 只放消费规范、模板、示例、真实业务
- app 合同、组件合同、交付清单都必须单独成文件
- alias 命名避免过于模糊，保持清晰可读
- stage/private-ui 必须用明显私有命名
- 禁止任何公共包从 stage 路径导入资源

## 3. 隔离规范
必须明确实现以下隔离：
- 设计系统公共组件 与 舞台层私有组件隔离
- stage/private-ui 与 consumer 隔离
- 舞台容器样式 与 展示组件本体样式隔离
- 预览辅助逻辑 与 公共组件逻辑隔离
- 展示态包装 与 组件真实能力隔离

建议通过以下手段落地：
- 独立目录边界
- import lint 规则
- tsconfig path 边界约束
- eslint no-restricted-imports
- stage 专属样式命名空间
- 必要时 iframe / shadow root / sandbox 思路评估，但不要过早复杂化；优先用清晰目录边界与样式边界实现稳定隔离

## 4. 测试与验证规范
每次任务后必须明确：
- 跑了哪些 harness
- 哪些验证通过
- 哪些验证待人工确认
- 哪些风险尚未关闭

# 七、Agent 工作协议

## 1. 每轮开始前必须先读
- governance/PROJECT_BRIEF.md
- governance/ROADMAP.md
- governance/DECISIONS.md
- governance/CHANGELOG_AI.md
- governance/DELIVERY_POLICY.md
- governance/AGENT_PROTOCOL.md

## 2. 接到任务后必须先判断
- 本轮任务属于 governance / design-system / stage / consumer / apps 哪一层
- 是否涉及真实业务交付
- 是否影响已有真实项目
- 是否需要更新合同或交付清单
- 是否会破坏 stage 与公共组件边界

## 3. 每轮必须先输出实施计划
计划至少包括：
- 本轮目标
- 修改范围
- 不做什么
- 验证方式
- 风险点
- 需要人类确认的事项

## 4. 修改后必须执行
- 对应层级 harness
- 输出本轮变更摘要
- 输出人工验证步骤
- 如涉及交付，输出独立交付物清单
- 如涉及 stage，输出隔离性验证结果

## 5. 每轮结束前必须写回
- CHANGELOG_AI.md
- 如有架构决策变化则更新 DECISIONS.md
- 如阶段推进变化则更新 ROADMAP.md

## 6. 禁止事项
- 未授权不得批量修改多个真实业务项目
- 不得把 example 当正式业务交付
- 不得绕过合同直接按感觉生成核心组件
- 不得绕过 delivery.manifest.yaml 手工打包交付
- 不得把业务特有逻辑塞进 design-system
- 不得假设 Weex 与 H5 / RN 同等天然支持
- 不得让 consumer 依赖 stage/private-ui
- 不得让 stage 容器样式污染组件本体展示
- 不得为了预览页效果修改组件本体真实渲染语义

# 八、你现在要执行的真实启动任务

请按以下顺序工作：

## 第一步：先建立仓库骨架
在不预设无关技术细节的前提下，先搭建上述 monorepo 目录结构，并补全每个目录的 README / 占位说明。

## 第二步：生成治理层文档初稿
至少生成：
- PROJECT_BRIEF.md
- ROADMAP.md
- DECISIONS.md
- AGENT_PROTOCOL.md
- CHANGELOG_AI.md
- ACCEPTANCE_CHECKLIST.md
- DELIVERY_POLICY.md

## 第三步：生成关键模板
至少生成：
- component.contract.yaml 模板
- app.contract.yaml 模板
- delivery.manifest.yaml 模板
- harness.config.ts 模板
- consumer 模板项目骨架
- real-project-1 样板工程骨架
- stage 场景模板
- stage/private-ui 目录说明

## 第四步：建立最小 design-system 能力
先完成：
- tokens
- primitives
- Button / Input / Text / Card / Modal 的最小闭环
- 对应合同文件
- 对应 harness 用例

## 第五步：建立最小 stage 能力
先完成：
- stage 主站骨架
- 使用 shadcn/ui 搭建导航、布局、控制面板、状态切换器
- 把 stage 所需壳层资源沉淀到 stage/private-ui
- 为 Button / Input / Text / Card / Modal 建立独立展示页
- 验证 stage 样式与组件本体隔离
- 输出 stage 使用边界说明

## 第六步：建立最小业务闭环
用一个最小真实业务样板验证：
- consumer 调用 design-system
- app 具备独立构建能力
- 产物输出到 deliverables
- 生成交付说明
- 给出人工验收步骤
- 验证 app 未依赖 stage/private-ui

# 九、输出要求

你在真正执行时，必须遵守以下输出格式：
1. 先复述你理解的当前阶段目标
2. 再给出本轮实施计划
3. 然后再开始工程动作
4. 每轮结束时给出：
   - 已完成
   - 未完成
   - 风险
   - 需要我人工验证的步骤
   - 已写回的治理文档

如果你发现我的要求与 Taro 官方能力边界冲突：
- 必须明确指出冲突点
- 必须给出替代方案
- 不允许假装可以一步到位支持一切端能力

如果你发现舞台层方案与公共组件边界产生冲突：
- 必须优先保护公共组件边界
- 必须把舞台层视为可调整对象，而不是反过来修改公共组件语义来迁就舞台层

你的第一轮任务不是开始堆业务代码，而是先把“治理层 + 工程骨架 + 合同模板 + harness 骨架 + stage 私有预览页骨架”搭出来。
# Phase 4 扩展：RN 运行态验证

> 本文件用于承接 Phase 4 收口后的下一步执行计划。
> `docs/ROADMAP.md` 中的 Phase 4 准出已完成；本计划属于多端能力的后续扩展，不改变既有准出结论。

## 目标

在现有 `packages/adapters` 与 `Button` RN 最小静态闭环的基础上，补齐真实 React Native 运行态验证路径，确认：

- RN 工具链可以在本机跑通
- `Button` adapter 能在真实 RN 容器中渲染
- 当前 adapter / 多端补丁不会反向污染既有 H5 基线

## 当前已知前置事实

- 已完成：
  - `packages/adapters` 已存在
  - `packages/adapters/src/rn/button.tsx` 已提供注入式 RN Button adapter
  - `packages/adapters/src/rn/button.test.tsx` 已完成最小静态验证
  - `apps/stage` 已补齐 H5 / RN 对照说明区
  - H5 / 微信小程序运行态已验收通过
- 当前已知环境缺口：
  - `watchman`
  - `CocoaPods`
  - `adb`
  - `Java Runtime`
- 当前仓库中尚无现成 RN 运行态载体

## scope 约束

- 仍只验证 `Button`，不扩展全组件 RN 覆盖
- 优先拿到单端真实运行态闭环，建议先 iOS Simulator，再决定是否补 Android
- 不在本轮引入 Figma 视觉替换
- 不把 `packages/adapters` 演变为第二套组件库

## 建议载体

建议新增最小 RN 验证样板：

```text
apps/rn-runtime/
  package.json
  app.json / metro / babel / tsconfig 等最小运行配置
  src/
    App.tsx
```

选择理由：

- 与 `apps/stage`、`apps/example-consumer` 一样都属于验证型应用
- 比把 RN 运行态直接塞进 `projects/real-project-1` 风险更低
- 能清晰隔离“运行态验证载体”与“设计系统组件本体”

## 执行步骤

### 步骤 1：补齐 RN 本机工具链

目标：

- 确认 iOS Simulator 路径优先可行
- 为后续 Android 留出扩展空间，但不把 Android 作为第一轮阻塞项

执行建议：

- 检查 `watchman`、`CocoaPods`、Ruby/pod 环境
- 若走 Android，再补 `Java Runtime` 与 `adb`
- 固化“本机已具备 / 缺失”的实际结果

完成标准：

- 至少一条真实 RN 运行链所需工具可用
- 缺口和安装结论可复审

### 步骤 2：创建最小 RN 运行态载体

目标：

- 提供一个只为 Phase 4 扩展服务的 RN 运行态样板

执行建议：

- 新增 `apps/rn-runtime`
- 仅接入运行 `Button` adapter 所需最小依赖
- 不引入业务逻辑、不复制组件实现

完成标准：

- RN 样板可启动到模拟器/设备
- workspace 边界仍然成立

### 步骤 3：接入 Button adapter 真实渲染

目标：

- 用真实 RN primitives 注入 `createReactNativeButtonAdapter`

执行建议：

- 在 RN 样板中接入 `Pressable`、`Text`、`View`、`ActivityIndicator`
- 渲染 1 个最小 `Button` 场景
- 至少覆盖默认态、disabled 或 loading 中的一种关键状态

完成标准：

- `Button` 在 RN 真实运行态中可见
- 点击/disabled/loading 至少一项行为可人工确认

### 步骤 4：补验证记录与回归检查

目标：

- 让这次 RN 运行态验证有可审查记录

执行建议：

- 记录运行命令、模拟器/设备、结果截图或观察结论
- 复跑 `pnpm build`、`pnpm check-boundaries`
- 对照 `docs/exec-plans/completed/phase-4-h5-webview-baseline.md`，确认未引入明显 H5 回归风险

完成标准：

- RN 运行态验证结果可复审
- H5 主包未出现明显非预期污染

### 步骤 5：治理回写与下一步衔接

目标：

- 让本轮 RN 运行态验证结果进入仓库治理记忆
- 按项目惯例，为后续继续扩展或切换阶段预留新的 `active` 计划入口

执行建议：

- 更新 `.agent/checkpoint.yaml`
- 追加 `.agent/changelog.log`
- 如本轮形成稳定验证文档，将本文件移至 `docs/exec-plans/completed/`
- 根据当轮结论补出下一份 `docs/exec-plans/active/*.md`
  - 若继续扩展 Phase 4：产出下一个多端专项计划
  - 若切换到 Phase 5：产出 `phase-5` 相关 active 计划

完成标准：

- 当前状态、变更记录与执行计划路径保持一致
- `active/` 中始终存在“下一步正在执行”的计划文件

## 风险与注意事项

1. 如果一开始同时追 iOS 与 Android，极易被本机工具链阻塞；建议先拿 iOS Simulator。
2. 若 RN 样板直接复用过重脚手架，会让本轮从“验证路径”膨胀成“建设新端应用”。
3. 运行态验证完成后，应明确它是 Phase 4 扩展记录，而不是回写覆盖已完成的 Phase 4 主准出。

## 验收口径

- 至少存在一个真实 RN 运行态载体
- `Button` adapter 在真实 RN 环境中成功渲染
- 对应运行步骤与人工观察结果有记录
- `pnpm build` 与 `pnpm check-boundaries` 通过
- 治理文件与下一步 `active` 计划已完成回写


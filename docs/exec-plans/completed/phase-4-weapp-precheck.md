# Phase 4 微信小程序前置检查

> 归档角色：Phase 4 历史预检查记录。
> 历史快照：本文件记录的是进入微信小程序最小验证前的仓库与环境状态，仅用于回溯当时的阻塞判断；收口后的当前事实以 `phase-4-weapp-validation.md` 与仓库代码为准。
> 对应主计划：`docs/exec-plans/completed/phase-4.md`

## 当前仓库状态

- 当前已接入的平台插件：仅 H5
- 已确认位置：
  - `apps/stage/package.json`
  - `apps/example-consumer/package.json`
  - `projects/real-project-1/package.json`
- 当前未见：
  - 微信小程序平台插件
  - 小程序目标构建脚本
  - 小程序侧项目配置文件

## 当前本机环境状态

- 已确认可用：
  - `node v22.12.0`
  - `pnpm 10.31.0`
  - `Homebrew 5.0.16`
  - `Xcode 16.4`
- 缺失或未检测到：
  - `Java Runtime`
  - `watchman`
  - `CocoaPods`
  - `adb`
  - 微信开发者工具

## 对 Phase 4 的直接影响

- 当前还不适合直接承诺“小程序可运行验证”。
- 更稳妥的顺序是：
  1. 先补齐小程序平台依赖与最小构建脚本
  2. 再确认本机是否具备微信开发者工具
  3. 最后执行一次最小构建与人工打开验证

## 建议的最小补齐项

### 仓库侧

- 为目标 app 或 `real-project-1` 接入微信小程序平台插件
- 增加最小小程序构建命令
- 确定第一次验证采用哪个载体：
  - `apps/stage`
  - `apps/example-consumer`
  - `projects/real-project-1`

### 本机侧

- 安装 `Java Runtime`
- 安装微信开发者工具
- 若后续想把 RN 与小程序环境统一补齐，可顺带准备 `watchman`、`CocoaPods`、`adb`

## 当前建议

- 在 Phase 4 第二段里，先把小程序验证当作“环境就绪前的预检查项”而不是立即执行项。
- 等 H5 / RN 对照与性能基线沉淀后，再决定用哪个载体完成第一次小程序构建验证。

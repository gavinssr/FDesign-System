# Phase 4 微信小程序最小构建验证

> 归档角色：Phase 4 补充验证记录。
> 目的：证明当前设计系统消费链路至少可以完成一次微信小程序目标构建，并记录阻塞运行态验证的现实条件。
> 对应主计划：`docs/exec-plans/completed/phase-4.md`

## 验证载体

- 载体：`apps/example-consumer`
- 选择理由：
  - 只有单页面，构建面最小
  - 能验证 `apps/*` 作为消费层独立使用 `@fdesign/components`
  - 比 `apps/stage` 更轻，比 `real-project-1` 更少业务噪音

## 为本次验证补齐的依赖

- `apps/example-consumer`
  - `@tarojs/plugin-platform-weapp`
  - `@tarojs/react`
- `packages/components`
  - `@tarojs/plugin-platform-weapp`

## 为本次验证补齐的最小配置

- `apps/example-consumer/package.json`
  - 新增 `build:weapp`：`TARO_OUTPUT_ROOT=dist-weapp taro build --type weapp`
  - 调整 `build` / `dev`：固定输出到 `dist-h5`，避免与小程序产物互相覆盖
- `apps/example-consumer/config/index.ts`
  - `outputRoot` 改为读取 `TARO_OUTPUT_ROOT`
  - 新增 `mini.postcss.cssModules` 配置，保持与 H5 的 CSS Modules 命名策略一致
- `scripts/copy-css-assets.mjs`
  - 发布 `packages/components` CSS 资产时移除原始 `:global(...)` 包装，确保消费端读取 `dist/*.module.css` 时仍是浏览器可执行的普通选择器

## 实际验证过程

### 第一次构建

命令：

```bash
pnpm --filter @fdesign/example-consumer build:weapp
```

结果：

- 失败
- 首个阻塞：缺少 `@tarojs/react`

结论：

- 说明微信小程序构建链需要显式补齐 Taro React 运行时，不能只装平台插件

### 第二次构建

补齐：

- `pnpm add @tarojs/react@4.1.11 --filter @fdesign/example-consumer`

结果：

- 再次失败
- 首个阻塞：`packages/components` 无法解析 `@tarojs/plugin-platform-weapp/dist/components-react`

结论：

- 说明小程序构建不是只改消费 app；作为设计系统层的 `packages/components` 也必须具备对应平台插件解析能力

### 第三次构建

补齐：

- `pnpm add -D @tarojs/plugin-platform-weapp@4.1.11 --filter @fdesign/components`

结果：

- 构建成功

成功命令：

```bash
pnpm --filter @fdesign/example-consumer build:weapp
```

## 当前产物

输出目录：`apps/example-consumer/dist-weapp`

关键文件：

- `app.js`
- `app.json`
- `app.wxss`
- `taro.js`
- `vendors.js`
- `pages/index/index.js`
- `pages/index/index.wxml`
- `pages/index/index.wxss`

## 当前产物体积（最小记录）

| 文件                       | 大小（bytes） |
| ------------------------ | --------- |
| `taro.js`                | 129474    |
| `app.js`                 | 98462     |
| `pages/index/index.js`   | 14909     |
| `vendors.js`             | 12200     |
| `pages/index/index.wxss` | 6252      |

## 当前结论

- 微信小程序目标已经完成一次成功构建验证。
- 本次验证同时证明：
  - 消费层 app 需要 `weapp` 平台插件与 `@tarojs/react`
  - 设计系统组件包也需要具备对应平台插件解析能力
- 因此“小程序路径成立”已经从文档假设变为真实工程结果。

## 当前状态

- 微信开发者工具已通过 Homebrew 安装。
- CLI 已成功打开 `apps/example-consumer/dist-weapp` 项目。
- 用户已人工确认小程序首页可以正常渲染。
- 因此“小程序（微信）构建产物可运行验证”这一条已从构建通过推进到运行态验收通过。

## 运行态预览补充修复

- 在后续人工验收中，曾出现两类误导性现象：
  - H5 页面“结构还在，但组件样式几乎全部失效”，表现为接近纯文本退化
  - 微信开发者工具打开的不是目标 consumer 页面，而是工具默认欢迎页
- 最终确认根因有两个：
  - `packages/components` 发布时直接复制原始 `.module.css`，保留了 `:global(...)` 语法；消费端读取 `dist/*.module.css` 时不会再二次做 CSS Modules 转换，导致 H5 选择器失效
  - `apps/example-consumer` 的 H5 与 weapp 之前共用同一个 `dist` 目录，构建不同目标时会互相覆盖，导致浏览器或开发者工具偶尔读到“另一端”的产物
- 修复后状态：
  - H5 固定输出到 `apps/example-consumer/dist-h5`
  - weapp 固定输出到 `apps/example-consumer/dist-weapp`
  - 微信开发者工具 CLI 已改为打开 `dist-weapp`
  - 浏览器通道已确认 H5 页面在 `http://127.0.0.1:10091` 正常渲染，无明显样式缺失

## 已尝试的运行态推进

### 微信开发者工具安装

执行：

```bash
brew install --cask wechatwebdevtools
```

结果：

- 安装成功
- 工具路径：`/Applications/wechatwebdevtools.app`

### CLI 打开项目

执行：

```bash
"/Applications/wechatwebdevtools.app/Contents/MacOS/cli" open \
  --project "/Users/gavinss/Desktop/FDesign-System/apps/example-consumer/dist-weapp" \
  --port 45250 \
  --lang zh
```

结果：

- 首次尝试失败，提示 IDE 尚未完成初始化
- 再次尝试时，CLI 提示需要开启服务端口
- 通过 CLI 交互确认开启后，开发者工具生成了 `.ide` 端口文件
- 最终以实际监听端口 `45250` 再次调用 `open`，返回成功
- 额外执行 `islogin --port 45250`，确认当前工具登录态为 `true`

结论：

- 当前已完成：
  - 工具安装
  - 首次初始化
  - 服务端口启用
  - CLI 自动导入并打开项目
- 当前离完整运行态验收只差“人工看一眼页面是否正常渲染”这一步

## 下一步

1. 若继续扩展多端能力，可再决定是否把小程序验证扩展到 `stage` 或 `real-project-1`
2. 继续对照 H5 / WebView 基线，观察 adapters 与 weapp 补丁是否引入非预期 H5 回归

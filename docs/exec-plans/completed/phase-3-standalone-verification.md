# Phase 3 补充验收：独立拆出验证

> 归档角色：Phase 3 补充验收记录。
> 本文件用于补充 Phase 3 主执行计划，验证 `real-project-1` 是否能够在脱离 monorepo 工作区后完成独立 `install / build / run`。
> 对应主计划：`docs/exec-plans/completed/phase-3.md`

## 背景

项目总目标要求真实业务项目能够从 monorepo 独立拆出、独立构建、独立交付。
Phase 3 原始准出标准已经验证了：

- `real-project-1` 不依赖 `apps/stage`
- `real-project-1` 可在 monorepo 内独立构建
- `real-project-1` 可输出独立交付物

但上述结果仍不足以覆盖“将业务项目目录拎出仓库，到另一台机器执行 `install / build / run`”这一更严格场景，因此增加本补充验收。

## 验收目标

验证 `real-project-1` 在以下条件下仍可运行：

1. 项目副本被复制到 monorepo 之外的临时目录
2. `workspace:*` 依赖被替换为本地文件依赖
3. `tsconfig.json` 不再依赖仓库根 `tsconfig.base.json`
4. 在 standalone 目录内可执行 `pnpm install`
5. 在 standalone 目录内可执行 `pnpm build`
6. 构建结果可通过静态服务器实际打开业务页面，而不是目录索引页

## 自动化支撑

新增脚本：

- `scripts/verify-standalone-project.ts`
- 根脚本入口：`pnpm verify-standalone-project`

脚本职责：

1. 构建 `@fdesign/tokens` 与 `@fdesign/components`
2. 将 `projects/real-project-1` 复制到仓库外临时目录
3. 将 design system 依赖复制到 standalone 目录下的 `vendor/`
4. 将 `workspace:*` 依赖改写为 `file:` 本地依赖
5. 将 `tsconfig.json` 改写为自包含配置
6. 在 standalone 目录执行 `pnpm install`
7. 在 standalone 目录执行 `pnpm build`
8. 输出验证报告到 `.deliverables/standalone-verification/real-project-1/verification-report.md`

## 本次真实验证结果

验证时间：

- `2026-04-05T12:25:12.046Z`

standalone 目录：

- `/var/folders/ws/5c5dm1650h35db3_lf7zsw7m0000gn/T/fdesign-standalone-verification/real-project-1/real-project-1`

验证结论：

- `pnpm verify-standalone-project` 通过
- 仓库外 standalone 目录中的 `pnpm install` 通过
- 仓库外 standalone 目录中的 `pnpm build` 通过
- 生成 `dist/index.html` 成功
- 使用静态服务打开 standalone `dist/` 后，页面正常渲染为 `Campaign Launch Console / 活动发布台`
- 页面展示的是业务页面，不是目录索引页

## 验收步骤（可复跑）

1. 在仓库根目录执行 `pnpm verify-standalone-project`
2. 查看 `.deliverables/standalone-verification/real-project-1/verification-report.md`
3. 如需人工复核运行态，从报告中的 `standaloneDir` 读取 standalone 路径
4. 将其 `dist/` 通过静态服务器启动，例如：

```bash
python -m http.server 10089 --directory "<standaloneDir>/dist"
```

1. 打开 `http://localhost:10089/`
2. 确认页面是 `Campaign Launch Console / 活动发布台`

## 通过标准

- standalone 副本目录位于 monorepo 外部
- 不依赖 `workspace:*` 完成安装
- 不依赖仓库根 `tsconfig.base.json` 完成编译
- standalone 构建产物包含 `dist/index.html`
- 浏览器打开后是业务页，而不是目录索引页

## 风险与边界

1. 本补充验收验证的是“可独立拆出运行”的最小路径，不等于外部团队生产接入方案已经完备
2. standalone 验证当前通过本地文件依赖复制 design system 包实现，后续若要外部分发，仍需结合正式包发布策略
3. Phase 3 已完成状态不回滚；本文件作为额外补强，消除“独立运行”口径的不确定性


# real-project-1 人工验收步骤

## 验收目标

确认 `real-project-1` 已完成从设计系统消费、独立构建到交付目录整理的最小闭环。

## 步骤

1. 运行 `pnpm --filter @fdesign/real-project-1 build`，确认项目能独立产出 `projects/real-project-1/dist/`。
2. 运行 `pnpm build-deliverable`，确认 `.deliverables/real-project-1/` 被生成。
3. 打开 `.deliverables/real-project-1/deploy-readme.md`，确认交付说明、入口路径和交付物清单齐全。
4. 打开 `.deliverables/real-project-1/smoke-report.md`，确认状态为 `passed`。
5. 运行 `pnpm validate-deliverable`，确认交付目录结构校验通过。
6. 运行 `pnpm check-boundaries`，确认 `projects/real-project-1` 未依赖 `apps/stage`。
7. 如需人工浏览页面，可运行 `pnpm --filter @fdesign/real-project-1 dev`，确认页面是“营销活动页”语义，而不是组件展示矩阵。

## 通过标准

- 页面标题与文案体现业务语义。
- 组件均通过 `@fdesign/components` 消费。
- 交付目录至少包含 `dist/`、`assets-manifest.json`、`deploy-readme.md`、`smoke-report.md`。
- 无 `projects/* -> apps/stage` 依赖违规。

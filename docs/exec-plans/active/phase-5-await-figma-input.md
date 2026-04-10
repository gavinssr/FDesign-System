# Phase 5 预备：等待 Figma 设计输入

> 该文档已被 `docs/exec-plans/active/phase-5-token-protocol-and-mapping.md` 取代，保留仅作历史待机状态说明。
> 当前 active plan 以 `.agent/checkpoint.yaml` 中的 `active_exec_plan` 为准。

> 本文件用于承接 Phase 4 主准出完成、且 RN 运行态验证扩展被取消后的当前 active 状态。
> 当前仓库不再推进 `apps/rn-runtime` 或真实 RN 运行链；后续如需继续 RN，只在出现明确 RN 消费方时再单独立项。

## 当前结论

- `docs/ROADMAP.md` 中 Phase 4 主准出已完成，结论保持不变
- `packages/adapters` 与 `Button` 的 RN 最小静态闭环仍保留
- 本轮新增的 RN 运行态验证载体与相关临时改动已取消
- 当前不进入新的多端运行态扩展

## 当前目标

- 保持 H5 / 微信小程序 / adapters 主线稳定
- 等待用户提供 Figma 设计稿，或明确提出新的下一阶段目标
- 如未来出现真实 RN 消费方，再按需重开 RN 运行态验证

## 执行建议

1. 不再创建或维护独立 RN runtime 验证应用。
2. 如用户提供 Figma 设计稿，切换到 Phase 5，替换 provisional 视觉与 token。
3. 如后续继续演进 adapters，继续对照 `docs/exec-plans/completed/phase-4-h5-webview-baseline.md` 观察 H5 基线是否出现非预期变化。
4. 若未来确有 RN 落地需求，再重新评估更轻的验证策略，避免把验证载体做成长期维护成本。

## 验收口径

- 仓库当前状态与治理文件一致
- `docs/exec-plans/active/` 中存在明确的下一步计划入口
- 取消的 RN 运行态扩展不再残留误导性的代码或计划引用
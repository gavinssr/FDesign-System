# Phase 5 Button 治理收尾记录

> 归档角色：Phase 5 `Button` 当前轮次治理收尾已完成执行记录。
> 对应主计划：`docs/exec-plans/active/phase-5-token-protocol-and-mapping.md`
> 本文件记录的是 `Button` 在多个分类下 `Base` 类当前范围完成收尾后的归档事实。
> 不应再依据本文件判断当前阶段或下一步行动；Phase 5 的当前入口仍是长期 active 主计划。

## 完成结论

- `Button` 当前轮次的治理收尾已完成
- 当前完成范围只覆盖多个分类下的 `Base` 类 button，不代表全部 button 分类已完成
- `Base` 类当前范围已收束为“可冻结”，后续仅接受新输入驱动的增量修正

## 本次完成范围

### 1. 正式口径

- `loading` 规则已统一为 `xl / l / m / s / xs / mini` 全尺寸显示 spinner
- `Base` 类全部尺寸已收束为固定高度实现
- `xl` 宽度固定为 `355px`
- `l` 宽度约束在 `178px-327px` 范围内，当前 stage 按 `327px` 展示
- `xl / l / m` 在 `block` 等流式场景下允许收缩横向 padding

### 2. 组件与适配层

- `packages/components/src/button/Button.tsx` 已完成当前范围实现收口
- `packages/components/src/button/Button.module.css` 已完成宽度、高度与 loading 相关样式收口
- `packages/adapters/src/rn/button.tsx` 已同步 RN adapter 口径
- `packages/components/src/button/Button.contract.yaml` 已补齐当前范围的正式布局约束

### 3. 测试与验证

- `packages/components/src/button/Button.test.tsx` 已补齐当前范围回归测试
- `packages/adapters/src/rn/button.test.tsx` 已补齐 RN render spec 回归测试
- `packages/components` 测试与构建通过
- `packages/adapters` 测试与构建通过
- `apps/stage` 构建通过
- stage Button 页已完成运行态复看，未发现需要停下询问用户的 `stage` 与本体分歧

### 4. 治理事实源

- `docs/exec-plans/active/phase-5-token-protocol-and-mapping.md` 已将 `Button` 当前范围更新为“可冻结”
- `docs/ROADMAP.md` 已同步 Phase 5 当前现状摘要
- `.agent/checkpoint.yaml` 已将下一步起点切换回 `Input / Card / Modal` 与 `Form` 输入类 / 行动类
- `.agent/decisions.log` 已补记本轮正式口径
- `.agent/changelog.log` 已记录本轮治理收尾与后续宽度口径纠正

## 后续边界

1. 本文件对应的 `Button` 当前范围已完成，不再作为 pending plan 继续维护。
2. `Button` 后续增量工作应回到 `docs/exec-plans/active/phase-5-token-protocol-and-mapping.md` 统一管理。
3. 下一轮若继续推进 `Button`，应聚焦其余 button 分类或新输入驱动的增量修正，而不是重开当前 `Base` 类收尾计划。

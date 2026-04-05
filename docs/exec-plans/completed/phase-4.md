# Phase 4: 多端适配 — 执行计划

> 本文件是 Phase 4 的详细执行计划，供 Agent 在新对话中按步骤执行。
> 准出标准见 docs/ROADMAP.md 的 Phase 4 部分。

## 目标

在 Phase 3 主闭环稳定后，引入最小可验证的多端适配能力，优先完成 RN adapter 骨架、Button 首个跨端验证、H5 / WebView 性能基线，以及小程序构建可运行性检查。

## 前置条件

- Phase 3 全部准出标准已达成
- `real-project-1` 已完成独立构建与交付链路验证
- `pnpm build / check-boundaries / validate-contracts / build-deliverable / validate-deliverable` 通过

## scope 约束

- Phase 4 的目标是验证“多端适配路径成立”，不是一次性补齐全量组件跨端能力
- 只要求 `Button` 作为首个跨端验证组件，不扩展到所有组件
- Weex 仅输出兼容桥策略评估文档，不进入实现
- 如无额外用户输入，本阶段不引入 Figma 视觉替换

---

## 步骤 1：创建 `packages/adapters` 骨架

目标：

- 创建 `packages/adapters`
- 明确 adapters 层只负责平台差异治理，不承载业务逻辑
- 为 RN adapter 建立最小注入边界

建议文件：

```text
packages/adapters/
  package.json
  tsconfig.json
  src/
    index.ts
    rn/
      index.ts
      button.ts
    weex/
      index.ts
      compatibility-notes.md
```

完成标准：

- package 可被 workspace 识别
- adapters 依赖方向符合 `tokens ← components ← adapters`
- 暂不要求完整实现所有平台组件

---

## 步骤 2：实现 RN adapter 的最小闭环

目标：

- 以 `Button` 为首个跨端验证组件
- 定义 H5 组件到 RN 呈现层的最小映射方式

建议内容：

- 为 `Button` 设计 RN adapter 接口或工厂函数
- 明确 `variant / size / disabled / loading / block / onPress` 的跨端映射
- 不修改 `packages/components` 的业务边界，只在 adapter 层承接平台差异

完成标准：

- `packages/adapters/src/rn/button.ts` 存在
- `Button` 至少可在 RN 侧完成静态渲染验证
- adapter 层未反向依赖 `apps/stage` 或 `projects/*`

---

## 步骤 3：建立首个多端验证场景

目标：

- 让 `Button` 同时拥有 H5 与 RN 对照验证路径
- 为后续更多组件跨端适配建立模式

建议内容：

- 在 `apps/stage` 中增加多端对照展示说明或最小对照页
- 若需要，引入最小 RN 验证样板或使用 adapter harness
- 只验证结构、状态与交互映射是否成立，不追求视觉 1:1

完成标准：

- `Button` 至少有一份 H5 / RN 对照验证结果
- Stage 或文档中能说明当前多端差异和已知限制

---

## 步骤 4：建立 H5 / WebView 性能基线

目标：

- 把 Phase 3 中已观察到的 H5 体积告警转化为明确基线
- 为后续多端扩展提供性能回归参照

建议内容：

- 记录 `real-project-1` 或最小 H5 入口的构建体积
- 至少记录入口资源大小、关键 chunk 数量、告警项
- 形成可复用的基线文档或脚本输出

完成标准：

- H5 / WebView 构建产物性能基线存在
- 至少覆盖入口 bundle 体积与主要静态资源信息

---

## 步骤 5：验证微信小程序构建可运行性

目标：

- 证明当前组件体系在小程序目标上具备最小编译路径

建议内容：

- 选择 `Button` 或最小入口页执行微信小程序构建
- 记录编译通过性、已知不兼容点与补救方向

完成标准：

- 小程序目标至少完成一次成功构建验证
- 若存在阻塞项，需明确记录阻塞原因和后续处理路径

---

## 步骤 6：输出 Weex 兼容桥策略评估

目标：

- 明确 Weex 不进入主路径实现，但要有后续接入说明

建议内容：

- 说明为什么 Weex 不与 H5 / RN 同等支持
- 评估 adapter bridge 的输入输出边界
- 标记不建议直接在业务层散落 Weex 条件分支

完成标准：

- 形成一份 Weex 兼容桥策略评估文档
- 文档能说明接入边界、限制和不做事项

---

## 步骤 7：验收与治理回写

目标：

- 验证 Phase 4 准出标准
- 更新治理文件，准备进入 Phase 5 或继续扩展多端能力

执行清单：

- `pnpm build` 通过
- `pnpm check-boundaries` 通过
- 多端验证记录可审查
- 更新 `.agent/checkpoint.yaml`
- 追加 `.agent/changelog.log`
- 更新 `docs/ROADMAP.md`
- 将本文件移至 `docs/exec-plans/completed/phase-4.md`

---

## 风险与注意事项

1. `packages/adapters` 很容易演变成“第二套组件库”，需坚持 adapter 只处理平台差异，不复制组件业务语义
2. RN adapter 如果一开始就追求全组件覆盖，会拖慢 Phase 4 闭环；必须坚持先拿 `Button` 验证模式
3. H5 / WebView 性能基线应先记录现状，不要在 Phase 4 初期就扩展成完整性能平台
4. 小程序验证优先确认“能编译、能运行最小入口”，不在本阶段追求全面交互验收
5. Weex 只做桥接策略评估，不应让业务项目直接承担 Weex 条件分支

## 预估工作量

- 步骤 1（adapters 骨架）：1 轮对话
- 步骤 2-3（RN adapter + Button 首个跨端验证）：1-2 轮对话
- 步骤 4-5（性能基线 + 小程序验证）：1-2 轮对话
- 步骤 6-7（Weex 评估 + 验收治理）：1 轮对话

总计预估：4-6 轮对话
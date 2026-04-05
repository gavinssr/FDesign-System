# Weex 兼容桥策略评估

## 结论摘要

- Weex 不进入 FDesign System 主路径实现。
- 当前主路径仍是 `H5 / RN / 微信小程序`。
- Weex 如需接入，必须通过 `packages/adapters/weex` 的桥接层治理，不允许在 `packages/components` 或 `projects/*` 中散落 Weex 条件分支。

## 为什么不把 Weex 放进主路径

- 本项目的不可变定位已经明确主路径是 `H5 / RN / 小程序`，Weex 只作为桥接兼容对象。
- Weex 与 H5 / RN 的渲染模型、容器能力和维护优先级都不对等。
- 如果把 Weex 直接纳入组件主实现，会显著放大组件层复杂度，并破坏“平台差异由 adapters 治理”的原则。

## 推荐接入方式

### 输入边界

- 输入始终应是设计系统的稳定语义输入，而不是 Weex 专属 props。
- 例如：
  - `ButtonProps`
  - `InputProps`
  - `ModalProps`

### 输出边界

- 输出应是 Weex 容器可消费的桥接制品之一：
  - 渲染配置对象
  - 包装器组件
  - 容器指令映射
  - 降级策略说明

### 分层建议

- `packages/components`
  - 继续只维护跨平台共享语义，不写 Weex 分支
- `packages/adapters/weex`
  - 负责把共享语义映射为 Weex 可消费的桥接层
- `projects/*`
  - 只消费统一 adapter 出口，不直接判断 Weex

## 最小桥接模型建议

以 `Button` 为例，建议沿用当前 RN adapter 已验证过的思路：

1. 输入仍是 `ButtonProps`
2. 在 `packages/adapters/weex` 中生成 Weex render spec
3. 由 Weex 容器侧包装器解释该 spec
4. 若某些能力无法等价映射，则在 adapter 层统一降级

这意味着 Weex 路径也应优先追求：

- 语义对齐
- 状态可表达
- 明确降级

而不是追求与 H5 / RN 的完全同构实现。

## 已知限制

- 当前仓库没有 Weex 运行时、打包链和真实验证环境。
- 现有组件样式以 Taro Web + CSS Modules 为主，不能假设 Weex 可直接复用。
- 某些交互与布局能力可能需要容器侧二次封装，不能简单做 1:1 映射。

## 降级策略建议

- 视觉层无法等价时，优先保持结构和状态语义正确。
- 复杂动画、浮层、手势等能力优先降级，而不是把 Weex 特殊逻辑回灌到组件主实现。
- adapter 层必须显式标记：
  - 已支持
  - 部分支持
  - 不支持

## 不建议事项

- 不要在 `packages/components` 中增加 `if (isWeex)` 一类分支。
- 不要在 `projects/*` 中直接拼接 Weex 条件逻辑。
- 不要把 Weex 适配做成第二套业务组件。
- 不要在 Phase 4 里承诺 Weex 实现，本阶段目标仅是桥接策略清晰。

## 何时适合真正启动 Weex 实施

满足以下条件后再考虑：

1. H5 / RN / 小程序主路径已经稳定
2. 至少有明确的 Weex 消费场景需要继续保留
3. 已有可用的 Weex 容器验证环境
4. 能接受 Weex 采用桥接与降级策略，而不是要求完全同构

## 当前建议

- Phase 4 到此为止，只保留本策略文档，不进入 Weex 代码实现。
- 若未来启动 Weex，可先从 `Button` 开始，复用“先做 render spec，再做容器解释”的 adapter 模式。
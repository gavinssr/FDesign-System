# Phase 3: 真实业务交付闭环 — 执行计划

> 本文件是 Phase 3 的详细执行计划，供 Agent 在新对话中按步骤执行。
> 准出标准见 docs/ROADMAP.md 的 Phase 3 部分。

## 目标

创建一个最小真实业务项目 `real-project-1`，验证从“消费设计系统”到“独立构建并产出交付物”的完整闭环。

## 前置条件

- Phase 2 全部准出标准已达成
- `apps/example-consumer` 已验证组件消费链路成立
- `pnpm build / lint / test / check-boundaries / validate-contracts` 通过

## scope 约束

- `real-project-1` 是交付链路验证样板，不对外发布
- 目标是证明可独立交付，不是构建完整业务系统
- 不做多端适配
- 不做真实设计稿还原

---

## 步骤 1：定义 real-project-1 最小骨架

目标：

- 创建 `projects/real-project-1`
- 提供独立 `package.json`
- 提供 `project.yaml`，作为后续交付描述入口

建议文件：

```text
projects/real-project-1/
  package.json
  tsconfig.json
  project.yaml
  config/
    index.ts
    dev.ts
    prod.ts
  src/
    app.tsx
    app.config.ts
    app.css
    pages/
      index/
        index.tsx
        index.config.ts
```

完成标准：

- 项目可被 workspace 识别
- 项目不依赖 `apps/stage`
- `project.yaml` 能描述名称、入口、输出目录和交付内容

---

## 步骤 2：实现最小真实业务页面

目标：

- 在 `real-project-1` 中用设计系统组件拼出一个最小业务页
- 页面体现“真实消费”而非展示矩阵

建议内容：

- 一个首页或设置页
- 使用 `Button / Input / Card / ListItem / Tag / Text` 等组合业务区域
- 业务文案和布局由 `projects/real-project-1` 自己拥有

完成标准：

- 页面可运行
- 不复用 `apps/stage/shell`
- 组件消费路径仅通过 `@fdesign/components`

---

## 步骤 3：实现交付构建脚本

目标：

- 新增 `scripts/build-deliverable.ts`
- 能对 `projects/real-project-1` 执行构建并整理交付目录

交付目录目标：

```text
.deliverables/
  real-project-1/
    dist/
    assets-manifest.json
    deploy-readme.md
    smoke-report.md
```

完成标准：

- 构建产物输出到 `.deliverables/real-project-1/`
- 不将交付产物纳入 git
- `assets-manifest.json` 至少记录主构建输出

---

## 步骤 4：实现交付校验脚本

目标：

- 新增 `scripts/validate-deliverable.ts`
- 校验交付目录结构和关键文件是否齐全

最小校验范围：

- `dist/` 存在
- `assets-manifest.json` 存在且可解析
- `deploy-readme.md` 存在
- `smoke-report.md` 存在

完成标准：

- `validate-deliverable.ts` 可独立运行
- 对 `real-project-1` 的交付目录校验通过

---

## 步骤 5：交付验收与治理回写

目标：

- 验证 Phase 3 准出标准
- 更新治理文件，准备后续 Phase 4 或 Phase 5

执行清单：

- `pnpm check-boundaries` 通过
- 补充人工验收步骤文档
- 更新 `.agent/checkpoint.yaml`
- 追加 `.agent/changelog.log`
- 更新 `docs/ROADMAP.md`
- 将本文件移至 `docs/exec-plans/completed/phase-3.md`

---

## 风险与注意事项

1. `real-project-1` 很容易退化成第二个 example-consumer，需确保它围绕“交付”而不是“展示”
2. `project.yaml` 必须成为交付入口，不要把关键交付信息散落在脚本参数里
3. `build-deliverable.ts` 先做单项目最小实现，不要一开始抽象成通用发布平台
4. `.deliverables/` 是交付产物目录，不应被源码直接依赖

## 预估工作量

- 步骤 1（项目骨架 + project.yaml）：1 轮对话
- 步骤 2（最小真实业务页）：1 轮对话
- 步骤 3-4（交付构建与校验）：1-2 轮对话
- 步骤 5（验收与治理回写）：1 轮对话

总计预估：4-5 轮对话

# FDesign System — North Star

> 本文件是项目的不可变核心定位。除非用户显式要求修改项目方向，否则本文件内容不应被改写。

## 项目是什么

基于 Taro 的设计系统工程。不是组件库——是 AI 可治理、可消费、可独立交付真实业务产物的基础能力层。

## 业务背景

公司 App 多技术栈并存（Vue2/3、React、Weex），正在渐进迁移：原生壳 → RN，存量页面 → Taro 统管，增量页面 → Taro Web 编码。本项目是这一迁移的设计系统基础设施。

## 必须满足的硬性目标

1. 组件用 Taro Web 编码方式开发
2. 消费层能基于结构化合同生成真实业务页面
3. 真实业务项目能从 monorepo 独立拆出、独立构建、独立交付
4. AI Agent 可通过仓库内制品（类型 + 合同 + 文档）自主消费设计系统
5. 主路径：H5 / React Native / 小程序
6. Weex 仅通过 adapter 桥接，不在主路径上

## 层级关系（不可变）

```
治理层（AGENTS.md, docs/, .agent/）
  └─ 设计系统层（packages/tokens, components, adapters）
  └─ 消费层（apps/example-consumer）
       └─ 真实业务项目（projects/*）
  └─ 舞台层（apps/stage）— 私有展示，不被任何层依赖
```

## 不可违反的边界

1. Stage 永远是私有展示层——不被消费层、组件层、业务项目依赖
2. 组件不含业务逻辑——业务逻辑只进入 projects/
3. 合同先于生成——不允许凭截图或感觉直接生成组件
4. 类型即主合同——TypeScript 类型是单一可信源，YAML 合同只做补充
5. 交付必须经过 project.yaml——不得手工拼交付物
6. 平台差异通过 adapters 治理——不得散落在业务层

## 设计原则

- 治理编码为机械化约束，不是写在文档里期望被遵守
- 仓库即知识库——Agent 能看到的只有仓库内制品
- Map, not manual——AGENTS.md 做目录表，不做大手册
- 渐进式构建——能力随需求生长，不预创建空目录

## 完整需求源

遇到本文件未覆盖的细节问题时，参考：

- `docs/references/RequirementStarter.Optimized.md` — 优化后的完整需求（归档参考）
- `docs/references/RequirementStarter.Original.md` — 原始完整需求（历史记录）


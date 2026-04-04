# Phase 1: 设计系统全链路模式验证 — 执行计划

> 本文件是 Phase 1 的详细执行计划，供 Agent 在新对话中按步骤执行。
> 准出标准见 docs/ROADMAP.md 的 Phase 1 部分。

## 目标

用 Button 作为载体，跑通 "token → 组件 → 合同 → harness → stage" 全链路。
建立**模式**（文件结构、合同格式、harness 写法、stage 展示方式），不是最终视觉产物。

## 前置条件

- Phase 0 全部准出标准已达成（见 ROADMAP.md）
- pnpm install / build / check-boundaries 通过
- 当前 token 值为 provisional（临时），无 Figma 设计稿输入

---

## 步骤 1：引入 Taro 4.x 依赖

### 1.1 为 packages/components 添加 Taro 依赖

```bash
cd packages/components
pnpm add @tarojs/taro @tarojs/components
pnpm add -D @tarojs/cli @tarojs/webpack5-runner @tarojs/plugin-framework-react
```

注意事项：
- Taro 版本锁定为 4.1.11（当前稳定版）
- packages/components 中的 @tarojs/* 依赖使用精确版本，不用 workspace:*
- packages/tokens 不需要 Taro 依赖（纯 TypeScript）

### 1.2 验证

- `pnpm install` 成功
- `pnpm build` 成功（packages/tokens 先构建，packages/components 后构建）

---

## 步骤 2：实现 Button 组件（建立文件结构模式）

### 2.1 目标文件结构

这是本项目组件的**标准文件结构模式**，后续所有组件必须遵循：

```
packages/components/src/
  button/
    index.ts                ← 公共导出入口
    Button.tsx              ← 组件实现
    Button.types.ts         ← TypeScript 类型定义（主合同）
    Button.contract.yaml    ← 轻量元数据合同（补充信息）
    Button.module.css       ← 组件样式（CSS Modules）
    Button.test.tsx         ← 单元测试
    Button.harness.tsx      ← 状态矩阵 + 变体覆盖测试
```

### 2.2 Button.types.ts（主合同）

```typescript
import type { ReactNode } from 'react';

/** @contract — 本接口是 Button 组件的主合同 */
export interface ButtonProps {
  /** 按钮变体 */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** 按钮尺寸 */
  size?: 'sm' | 'md' | 'lg';
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 是否占满容器宽度 */
  block?: boolean;
  /** 按钮内容 */
  children: ReactNode;
  /** 点击回调 */
  onPress?: () => void;
}
```

### 2.3 Button.tsx（组件实现）

- 使用 Taro 的 `View` 和 `Text` 组件（来自 @tarojs/components）
- 样式消费 packages/tokens 中的 token 值
- 用 CSS Modules 管理样式（Taro H5 模式支持）
- 所有变体和状态通过 className 组合实现
- 不使用任何业务特有逻辑

### 2.4 Button.contract.yaml（轻量元数据合同）

```yaml
component: Button
purpose: "通用交互按钮，支持多变体和状态"
provisional: true  # 标记当前视觉为临时值
platform_notes:
  h5: "默认渲染为 <div> + click 事件"
  rn: "需要 TouchableOpacity adapter（Phase 4 实现）"
  weex: "不在主路径，需要 adapter 桥接（Phase 4 评估）"
forbidden:
  - "不允许传入业务特有的 icon 集合"
  - "不允许在 Button 内部处理路由跳转"
  - "不允许硬编码颜色值，必须使用 @fdesign/tokens"
a11y:
  - "disabled 时设置 aria-disabled=true"
  - "loading 时展示可访问的加载状态文案"
slots:
  children: "按钮文字或图标内容"
states:
  - default
  - hover
  - pressed
  - disabled
  - loading
```

### 2.5 Button.harness.tsx（状态矩阵测试）

harness 的职责是覆盖组件的**状态矩阵**——所有变体 × 所有尺寸 × 所有状态的组合：

```
variants: [primary, secondary, ghost, danger]
sizes:    [sm, md, lg]
states:   [default, disabled, loading]
```

总计 4 × 3 × 3 = 36 种组合，harness 应渲染全部组合并确保无报错。

### 2.6 更新 packages/components/src/index.ts

```typescript
export { Button } from './button';
export type { ButtonProps } from './button/Button.types';
```

### 2.7 验证

- `pnpm build` 成功
- `pnpm check-boundaries` 通过
- TypeScript 编译无错误

---

## 步骤 3：搭建 apps/stage — Taro H5 应用

### 3.1 初始化 stage 应用

apps/stage 是一个 **Taro H5 应用**，用于展示设计系统组件。

```
apps/stage/
  package.json
  tsconfig.json
  config/
    index.ts              ← Taro 编译配置（H5 模式）
    dev.ts                ← 开发环境配置
    prod.ts               ← 生产环境配置
  src/
    app.tsx               ← Taro 应用入口
    app.config.ts         ← Taro 应用配置（页面路由）
    app.css               ← 全局样式
    pages/
      index/
        index.tsx         ← 组件列表首页
        index.config.ts   ← 页面配置
      button/
        index.tsx         ← Button 展示页
        index.config.ts
    shell/
      Layout.tsx          ← 舞台层布局框架
      ComponentDemo.tsx   ← 组件演示容器（变体/状态切换）
      PropControl.tsx     ← Prop 控制面板
      styles/
        layout.module.css ← 舞台外壳样式（__stage- 前缀）
```

### 3.2 stage 的 package.json

```json
{
  "name": "@fdesign/stage",
  "private": true,
  "scripts": {
    "dev": "taro build --type h5 --watch",
    "build": "taro build --type h5"
  },
  "dependencies": {
    "@fdesign/tokens": "workspace:*",
    "@fdesign/components": "workspace:*",
    "@tarojs/taro": "4.1.11",
    "@tarojs/components": "4.1.11",
    "@tarojs/runtime": "4.1.11",
    "@tarojs/plugin-framework-react": "4.1.11",
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "@tarojs/cli": "4.1.11",
    "@tarojs/webpack5-runner": "4.1.11",
    "@tarojs/plugin-platform-h5": "4.1.11"
  }
}
```

### 3.3 config/index.ts（Taro 编译配置）

```typescript
import { defineConfig } from '@tarojs/cli';

export default defineConfig({
  projectName: 'fdesign-stage',
  designWidth: 750,
  sourceRoot: 'src',
  outputRoot: 'dist',
  framework: 'react',
  compiler: {
    type: 'webpack5',
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
  },
  // monorepo 中的 alias 配置
  alias: {
    '@fdesign/tokens': require.resolve('@fdesign/tokens'),
    '@fdesign/components': require.resolve('@fdesign/components'),
  },
});
```

### 3.4 shell 组件（舞台私有外壳）

shell 组件使用原生 React + CSS Modules 构建：
- **Layout.tsx**: 整体布局（侧边导航 + 主展示区）
- **ComponentDemo.tsx**: 单组件展示容器，提供变体/尺寸/状态切换
- **PropControl.tsx**: Prop 编辑面板

所有 shell 样式必须使用 `__stage-` 前缀的 CSS class：

```css
/* shell/styles/layout.module.css */
.__stage-layout { /* ... */ }
.__stage-sidebar { /* ... */ }
.__stage-main { /* ... */ }
.__stage-control-panel { /* ... */ }
```

### 3.5 Button 展示页

pages/button/index.tsx 展示：
- 所有 variant（primary / secondary / ghost / danger）
- 所有 size（sm / md / lg）
- 所有状态（default / disabled / loading）
- block 模式展示
- 使用 shell/ComponentDemo 包裹，提供交互式切换

### 3.6 验证

- `cd apps/stage && pnpm dev` 可启动 H5 开发服务器
- 浏览器访问可看到 Button 展示页
- 组件在展示页中按本体样式渲染，不受 shell 样式影响

---

## 步骤 4：样式隔离验证

### 4.1 验证点

1. Button.module.css 中不包含 `__stage-` 前缀的 class
2. shell/styles/ 中的 class 不被 packages/components/ 引用
3. `pnpm check-boundaries` 通过
4. 手动检查：在 stage 中渲染的 Button 与直接渲染的 Button 视觉一致

### 4.2 可选加强

如时间允许，在 scripts/validate-boundaries.ts 中增加样式命名空间检查：
- 扫描 packages/components/ 下的 CSS 文件，确认不含 `__stage-` 前缀

---

## 步骤 5：更新治理文件

### 5.1 执行清单

- 更新 .agent/checkpoint.yaml — 反映 Phase 1 完成状态
- 追加 .agent/changelog.log — 记录本轮变更
- 更新 docs/ROADMAP.md — 勾选 Phase 1 准出标准
- 将本文件移至 docs/exec-plans/completed/phase-1.md
- 产出 docs/exec-plans/active/phase-2.md（下一阶段执行计划大纲）

---

## 风险与注意事项

1. **Taro monorepo 配置**: Taro 在 pnpm monorepo 中可能需要额外的 alias 配置，如果编译时找不到 workspace 包，需要在 config/index.ts 中配置 alias
2. **CSS Modules 支持**: Taro H5 模式默认支持 CSS Modules，但需要确认 4.1.11 版本的具体配置方式
3. **React 版本兼容**: Taro 4.x 兼容 React 18，确保 stage 和 components 使用相同版本
4. **不要在本 Phase 过度设计 harness**: harness.tsx 只需确保 36 种组合全部渲染无报错即可，不需要做快照测试或视觉回归（留给 Phase 2）

## 预估工作量

- 步骤 1（Taro 依赖引入）：1 轮对话内可完成
- 步骤 2（Button 组件）：1 轮对话内可完成
- 步骤 3（stage 应用）：1-2 轮对话（主要风险在 Taro monorepo 配置）
- 步骤 4-5（验证与治理）：与步骤 3 同一轮完成

总计预估：2-3 轮对话

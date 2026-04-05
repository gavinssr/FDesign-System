# Phase 4 H5 / WebView 性能基线

> 目的：把 Phase 3 中已观察到的 H5 入口体积告警，沉淀为可复核的最小基线。

## 基线范围

- 目标项目：`projects/real-project-1`
- 构建目标：H5
- 观测口径：`dist/` 中的入口 JS、其余 JS chunk、CSS 资源数量与体积
- 当前用途：作为 Phase 4 多端扩展前的回归参照，而不是完整性能平台

## 采样上下文

- 采样时间：`2026-04-05`
- 观测来源：
  - `projects/real-project-1/dist/`
  - `.deliverables/real-project-1/assets-manifest.json`
- 对应现象：Phase 3 期间曾出现 H5 entrypoint size warning，本文件用于把该观察项固定为基线

## 当前基线数据

### JS 资源

| 文件             | 大小（bytes） | 大小（KiB） |
| -------------- | --------- | ------- |
| `js/app.js`    | 215895    | 210.8   |
| `js/523.js`    | 90221     | 88.1    |
| `chunk/503.js` | 31875     | 31.1    |
| `chunk/279.js` | 5032      | 4.9     |

JS 总量：`343023 bytes`，约 `335.0 KiB`

### CSS 资源

| 文件            | 大小（bytes） | 大小（KiB） |
| ------------- | --------- | ------- |
| `css/503.css` | 5025      | 4.9     |
| `css/app.css` | 1044      | 1.0     |

CSS 总量：`6069 bytes`，约 `5.9 KiB`

### 其他入口文件

| 文件           | 大小（bytes） |
| ------------ | --------- |
| `index.html` | 380       |

## 当前判断

- 入口 `js/app.js` 是当前最主要的体积承载点。
- `dist/` 中共有 4 个 JS 文件、2 个 CSS 文件，当前资源数量仍可人工审查。
- 这份基线足以支撑 Phase 4 后续对比：
  - 引入 `@fdesign/adapters` 后 H5 侧是否出现非预期体积上升
  - 小程序或 RN 适配相关代码是否误入 H5 主包
  - 真实业务样板在继续扩展多端能力时，入口包是否持续膨胀

## 复核方式

1. 执行 `pnpm --filter @fdesign/real-project-1 build`
2. 查看 `projects/real-project-1/dist/`
3. 统计文件大小，例如：

```bash
python3 - <<'PY'
from pathlib import Path
root = Path('projects/real-project-1/dist')
for p in sorted(root.rglob('*')):
    if p.is_file():
        print(f'{p.relative_to(root)}\t{p.stat().st_size}')
PY
```

## 后续动作

- Phase 4 后续若引入 RN / 小程序平台依赖，需再次对比本基线，确认 H5 主包没有被多端适配逻辑污染。
- 若未来基线需要自动化，可将本文件中的统计过程收敛为独立脚本；本阶段先保留最小文档基线。

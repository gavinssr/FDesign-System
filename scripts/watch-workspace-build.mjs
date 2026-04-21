import { spawn } from 'node:child_process';
import { watch } from 'node:fs';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const packageConfigs = {
  tokens: {
    label: '@fdesign/tokens',
    directory: path.join(repoRoot, 'packages/tokens'),
    watchRoot: path.join(repoRoot, 'packages/tokens/src'),
  },
  components: {
    label: '@fdesign/components',
    directory: path.join(repoRoot, 'packages/components'),
    watchRoot: path.join(repoRoot, 'packages/components/src'),
  },
};

function log(scope, message) {
  const timestamp = new Date().toLocaleTimeString('zh-CN', { hour12: false });
  console.log(`[${timestamp}] [${scope}] ${message}`);
}

function runCommand(command, args, options) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      ...options,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });

    child.on('exit', (code, signal) => {
      if (signal) {
        resolve({ ok: false, code: null, signal });
        return;
      }

      resolve({ ok: code === 0, code, signal: null });
    });
  });
}

async function runPackageBuild(packageKey) {
  const config = packageConfigs[packageKey];

  if (!config) {
    throw new Error(`Unknown package: ${packageKey}`);
  }

  log(config.label, '开始同步 dist');
  const result = await runCommand('pnpm', ['run', 'build'], { cwd: config.directory });

  if (result.ok) {
    log(config.label, 'dist 已同步完成');
    return true;
  }

  log(
    config.label,
    result.signal
      ? `构建被信号中断：${result.signal}`
      : `构建失败，退出码 ${String(result.code)}；等待下一次源码变更后重试`,
  );
  return false;
}

async function listDirectories(rootDir) {
  const directories = [rootDir];
  const entries = await readdir(rootDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    if (entry.name === 'dist' || entry.name === 'node_modules' || entry.name.startsWith('.')) {
      continue;
    }

    const nestedDir = path.join(rootDir, entry.name);
    const nestedDirectories = await listDirectories(nestedDir);
    directories.push(...nestedDirectories);
  }

  return directories;
}

class DirectoryTreeWatcher {
  constructor(label, rootDir, onChange) {
    this.label = label;
    this.rootDir = rootDir;
    this.onChange = onChange;
    this.watchers = new Map();
    this.refreshTimer = null;
  }

  async start() {
    await this.refresh();
    log(this.label, `已监听 ${path.relative(repoRoot, this.rootDir)}`);
  }

  async refresh() {
    const directories = await listDirectories(this.rootDir);
    const expected = new Set(directories);

    for (const [directory, watcherHandle] of this.watchers.entries()) {
      if (expected.has(directory)) {
        continue;
      }

      watcherHandle.close();
      this.watchers.delete(directory);
    }

    for (const directory of directories) {
      if (this.watchers.has(directory)) {
        continue;
      }

      const watcherHandle = watch(directory, (eventType, filename) => {
        this.onChange({
          eventType,
          directory,
          filename: filename ? filename.toString() : '',
        });

        if (eventType === 'rename') {
          this.scheduleRefresh();
        }
      });

      watcherHandle.on('error', (error) => {
        log(this.label, `监听异常：${error.message}`);
        this.scheduleRefresh();
      });

      this.watchers.set(directory, watcherHandle);
    }
  }

  scheduleRefresh() {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }

    this.refreshTimer = setTimeout(async () => {
      this.refreshTimer = null;
      try {
        await this.refresh();
      } catch (error) {
        log(this.label, `刷新监听目录失败：${error.message}`);
      }
    }, 200);
  }

  close() {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }

    for (const watcherHandle of this.watchers.values()) {
      watcherHandle.close();
    }

    this.watchers.clear();
  }
}

function createDebouncedTrigger(delayMs, callback) {
  let timer = null;

  return (payload) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      timer = null;
      callback(payload);
    }, delayMs);
  };
}

async function runSinglePackageWatch(packageKey) {
  const config = packageConfigs[packageKey];

  if (!config) {
    throw new Error(`Unknown package watch target: ${packageKey}`);
  }

  let buildQueued = false;
  let isBuilding = false;

  const processQueue = async () => {
    if (isBuilding || !buildQueued) {
      return;
    }

    isBuilding = true;
    buildQueued = false;

    try {
      await runPackageBuild(packageKey);
    } finally {
      isBuilding = false;
    }

    if (buildQueued) {
      void processQueue();
    }
  };

  const scheduleBuild = createDebouncedTrigger(120, (payload) => {
    const relativeFile = payload.filename
      ? path.join(path.relative(repoRoot, payload.directory), payload.filename)
      : path.relative(repoRoot, payload.directory);
    log(config.label, `检测到源码变化：${relativeFile}`);
    buildQueued = true;
    void processQueue();
  });

  const watcher = new DirectoryTreeWatcher(config.label, config.watchRoot, scheduleBuild);

  await runPackageBuild(packageKey);
  await watcher.start();

  const stop = () => {
    watcher.close();
    process.exit(0);
  };

  process.once('SIGINT', stop);
  process.once('SIGTERM', stop);
}

async function runStagePreview(skipStageDev = false) {
  let rebuildTokens = false;
  let rebuildComponents = false;
  let isRebuilding = false;
  let isStopping = false;

  const processQueue = async () => {
    if (isRebuilding || isStopping) {
      return;
    }

    isRebuilding = true;

    try {
      while (rebuildTokens || rebuildComponents) {
        if (rebuildTokens) {
          rebuildTokens = false;
          const tokensOk = await runPackageBuild('tokens');

          if (!tokensOk) {
            break;
          }

          rebuildComponents = true;
        }

        if (rebuildComponents) {
          rebuildComponents = false;
          const componentsOk = await runPackageBuild('components');

          if (!componentsOk) {
            break;
          }
        }
      }
    } finally {
      isRebuilding = false;
    }
  };

  const scheduleTokensBuild = createDebouncedTrigger(120, (payload) => {
    const relativeFile = payload.filename
      ? path.join(path.relative(repoRoot, payload.directory), payload.filename)
      : path.relative(repoRoot, payload.directory);
    log('@fdesign/tokens', `检测到源码变化：${relativeFile}`);
    rebuildTokens = true;
    rebuildComponents = true;
    void processQueue();
  });

  const scheduleComponentsBuild = createDebouncedTrigger(120, (payload) => {
    const relativeFile = payload.filename
      ? path.join(path.relative(repoRoot, payload.directory), payload.filename)
      : path.relative(repoRoot, payload.directory);
    log('@fdesign/components', `检测到源码变化：${relativeFile}`);
    rebuildComponents = true;
    void processQueue();
  });

  const tokensWatcher = new DirectoryTreeWatcher(
    '@fdesign/tokens',
    packageConfigs.tokens.watchRoot,
    scheduleTokensBuild,
  );
  const componentsWatcher = new DirectoryTreeWatcher(
    '@fdesign/components',
    packageConfigs.components.watchRoot,
    scheduleComponentsBuild,
  );

  const tokensOk = await runPackageBuild('tokens');
  if (!tokensOk) {
    process.exit(1);
  }

  const componentsOk = await runPackageBuild('components');
  if (!componentsOk) {
    process.exit(1);
  }

  await tokensWatcher.start();
  await componentsWatcher.start();

  if (skipStageDev) {
    log('@fdesign/stage', '已跳过重复启动 stage；当前仅维持 dist 同步监听');
  } else {
    log('@fdesign/stage', '启动 H5 预览服务');
  }

  const stageProcess = skipStageDev
    ? null
    : spawn('pnpm', ['--filter', '@fdesign/stage', 'dev'], {
        cwd: repoRoot,
        stdio: 'inherit',
        shell: process.platform === 'win32',
      });

  const stop = () => {
    if (isStopping) {
      return;
    }

    isStopping = true;
    tokensWatcher.close();
    componentsWatcher.close();

    if (stageProcess && !stageProcess.killed) {
      stageProcess.kill('SIGINT');
    }
  };

  process.once('SIGINT', stop);
  process.once('SIGTERM', stop);

  if (!stageProcess) {
    return;
  }

  stageProcess.on('exit', (code, signal) => {
    stop();

    if (signal) {
      process.exit(0);
      return;
    }

    process.exit(code ?? 0);
  });
}

const args = process.argv.slice(2);
const mode = args[0];
const target = mode === 'package' ? args[1] : undefined;
const hasSkipStageFlag = args.includes('--skip-stage');

if (mode === 'package') {
  await runSinglePackageWatch(target);
} else if (mode === 'stage-preview') {
  await runStagePreview(hasSkipStageFlag);
} else {
  console.error(
    'Usage: node scripts/watch-workspace-build.mjs <package <tokens|components>|stage-preview> [--skip-stage]',
  );
  process.exit(1);
}

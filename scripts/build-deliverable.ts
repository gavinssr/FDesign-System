import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { parse } from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

interface ProjectConfig {
  id: string;
  name: string;
  owner: string;
  targets: string[];
  build: {
    entry: string;
    output: string;
  };
  delivery: {
    mode: string;
    artifacts: string[];
    verification: string[];
  };
}

function collectFiles(dir: string, baseDir = dir): string[] {
  const results: string[] = [];

  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      results.push(...collectFiles(fullPath, baseDir));
      continue;
    }

    results.push(relative(baseDir, fullPath));
  }

  return results.sort((left, right) => left.localeCompare(right));
}

function readProjectConfig(projectId: string): { projectDir: string; config: ProjectConfig } {
  const projectDir = join(ROOT, 'projects', projectId);
  const configPath = join(projectDir, 'project.yaml');

  if (!existsSync(configPath)) {
    throw new Error(`missing project config: ${relative(ROOT, configPath)}`);
  }

  const raw = readFileSync(configPath, 'utf-8');
  const parsed = parse(raw);

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error(`invalid project config shape: ${relative(ROOT, configPath)}`);
  }

  const config = parsed as ProjectConfig;

  if (!config.id || !config.build?.output || !config.build?.entry) {
    throw new Error(`project config missing required fields: ${relative(ROOT, configPath)}`);
  }

  return { projectDir, config };
}

function main() {
  const projectId = process.argv[2] ?? 'real-project-1';
  const { projectDir, config } = readProjectConfig(projectId);
  const packageName = `@fdesign/${projectId}`;
  const distDir = join(projectDir, 'dist');
  const outputDir = resolve(projectDir, config.build.output);
  const deliverableDistDir = join(outputDir, 'dist');

  console.log(`Building deliverable for ${projectId}...\n`);
  execSync(`pnpm --filter ${packageName} build`, {
    cwd: ROOT,
    stdio: 'inherit',
  });

  if (!existsSync(distDir)) {
    throw new Error(`build finished without dist output: ${relative(ROOT, distDir)}`);
  }

  rmSync(outputDir, { recursive: true, force: true });
  mkdirSync(outputDir, { recursive: true });
  cpSync(distDir, deliverableDistDir, { recursive: true });

  const distFiles = collectFiles(deliverableDistDir);
  const manifest = {
    projectId: config.id,
    projectName: config.name,
    owner: config.owner,
    deliveryMode: config.delivery.mode,
    generatedAt: new Date().toISOString(),
    entry: config.build.entry,
    output: relative(ROOT, outputDir),
    files: distFiles,
  };

  writeFileSync(join(outputDir, 'assets-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

  const deployReadme = `# ${config.name} 交付说明

- projectId: \`${config.id}\`
- owner: \`${config.owner}\`
- targets: ${config.targets.join(', ')}
- deliveryMode: \`${config.delivery.mode}\`
- buildEntry: \`${config.build.entry}\`
- deliverableOutput: \`${relative(ROOT, outputDir)}\`

## 交付内容
- \`dist/\`
- \`assets-manifest.json\`
- \`deploy-readme.md\`
- \`smoke-report.md\`

## 部署建议
1. 将 \`dist/\` 目录部署到静态资源服务。
2. 默认入口为 \`dist/index.html\`。
3. 若静态资源域名有变化，请同步检查构建后的资源引用路径。
4. 交付联系人默认为 \`${config.owner}\`。
`;
  writeFileSync(join(outputDir, 'deploy-readme.md'), deployReadme);

  const smokeReport = `# ${config.name} Smoke Report

- status: passed
- generatedAt: ${manifest.generatedAt}
- projectId: ${config.id}
- checks:
  - workspace build completed
  - dist copied to deliverables
  - assets manifest generated
  - deploy readme generated
  - deliverable structure ready for validation
`;
  writeFileSync(join(outputDir, 'smoke-report.md'), smokeReport);

  console.log(`\nDeliverable created at ${relative(ROOT, outputDir)}`);
  console.log(`Copied ${distFiles.length} dist file(s).`);
}

main();

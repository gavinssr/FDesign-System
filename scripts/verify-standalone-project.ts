import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { execSync } from 'node:child_process';
import os from 'node:os';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import { parse, stringify } from 'yaml';

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

type PackageJson = {
  name: string;
  version?: string;
  private?: boolean;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  [key: string]: unknown;
};

function readJsonFile<T>(path: string): T {
  return JSON.parse(readFileSync(path, 'utf-8')) as T;
}

function writeJsonFile(path: string, value: unknown) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function copyPackageForStandalone(sourceDir: string, targetDir: string) {
  mkdirSync(targetDir, { recursive: true });
  cpSync(join(sourceDir, 'dist'), join(targetDir, 'dist'), { recursive: true });
}

function createStandaloneTsconfig(targetDir: string) {
  const source = readJsonFile<{ compilerOptions: Record<string, unknown> }>(
    join(ROOT, 'tsconfig.base.json'),
  );

  writeJsonFile(join(targetDir, 'tsconfig.json'), {
    compilerOptions: {
      ...source.compilerOptions,
      baseUrl: '.',
    },
    include: ['src', 'config'],
  });
}

function main() {
  const projectId = process.argv[2] ?? 'real-project-1';
  const projectDir = join(ROOT, 'projects', projectId);
  const projectConfigPath = join(projectDir, 'project.yaml');

  if (!existsSync(projectDir)) {
    throw new Error(`missing project directory: ${relative(ROOT, projectDir)}`);
  }

  const projectConfig = parse(readFileSync(projectConfigPath, 'utf-8')) as ProjectConfig;
  const tempRoot = join(os.tmpdir(), 'fdesign-standalone-verification', projectId);
  const standaloneProjectDir = join(tempRoot, projectId);
  const vendorDir = join(standaloneProjectDir, 'vendor');
  const vendorTokensDir = join(vendorDir, 'tokens');
  const vendorComponentsDir = join(vendorDir, 'components');
  const reportDir = join(ROOT, '.deliverables', 'standalone-verification', projectId);
  const reportPath = join(reportDir, 'verification-report.md');

  console.log(`Preparing standalone verification for ${projectId}...\n`);
  execSync('pnpm --filter @fdesign/tokens build', { cwd: ROOT, stdio: 'inherit' });
  execSync('pnpm --filter @fdesign/components build', { cwd: ROOT, stdio: 'inherit' });

  rmSync(tempRoot, { recursive: true, force: true });
  rmSync(reportDir, { recursive: true, force: true });
  mkdirSync(vendorTokensDir, { recursive: true });
  mkdirSync(vendorComponentsDir, { recursive: true });
  mkdirSync(reportDir, { recursive: true });

  // Copy the project bundle to a temp directory outside the monorepo.
  cpSync(projectDir, standaloneProjectDir, {
    recursive: true,
    filter: (source) => {
      const ignored = ['/dist', '/node_modules', '/.turbo', '/.swc'];
      return !ignored.some((suffix) => source.endsWith(suffix));
    },
  });

  copyPackageForStandalone(join(ROOT, 'packages', 'tokens'), vendorTokensDir);
  copyPackageForStandalone(join(ROOT, 'packages', 'components'), vendorComponentsDir);

  const tokensPackage = readJsonFile<PackageJson>(join(ROOT, 'packages', 'tokens', 'package.json'));
  const componentsPackage = readJsonFile<PackageJson>(
    join(ROOT, 'packages', 'components', 'package.json'),
  );
  const projectPackage = readJsonFile<PackageJson>(join(projectDir, 'package.json'));

  tokensPackage.private = false;
  delete tokensPackage.devDependencies;
  writeJsonFile(join(vendorTokensDir, 'package.json'), tokensPackage);

  componentsPackage.private = false;
  componentsPackage.dependencies = {
    ...componentsPackage.dependencies,
    '@fdesign/tokens': 'file:../tokens',
  };
  delete componentsPackage.devDependencies;
  writeJsonFile(join(vendorComponentsDir, 'package.json'), componentsPackage);

  projectPackage.dependencies = {
    ...projectPackage.dependencies,
    '@fdesign/components': 'file:./vendor/components',
    '@fdesign/tokens': 'file:./vendor/tokens',
  };
  writeJsonFile(join(standaloneProjectDir, 'package.json'), projectPackage);

  projectConfig.build.output = './.deliverables/real-project-1';
  writeFileSync(join(standaloneProjectDir, 'project.yaml'), stringify(projectConfig));
  createStandaloneTsconfig(standaloneProjectDir);

  execSync('pnpm install', {
    cwd: standaloneProjectDir,
    stdio: 'inherit',
  });
  execSync('pnpm build', {
    cwd: standaloneProjectDir,
    stdio: 'inherit',
  });

  const standaloneDist = join(standaloneProjectDir, 'dist');
  if (!existsSync(join(standaloneDist, 'index.html'))) {
    throw new Error('standalone build completed without dist/index.html');
  }

  const report = `# ${projectId} 独立拆出验证报告

- status: passed
- verifiedAt: ${new Date().toISOString()}
- sourceProject: \`${relative(ROOT, projectDir)}\`
- standaloneDir: \`${standaloneProjectDir}\`
- validationSteps:
  - build @fdesign/tokens
  - build @fdesign/components
  - copy project bundle outside monorepo
  - rewrite workspace dependencies to local file dependencies
  - rewrite tsconfig.json to standalone compiler options
  - run pnpm install in standalone directory
  - run pnpm build in standalone directory
- outputCheck:
  - \`${join(standaloneProjectDir, 'dist', 'index.html')}\`
  - \`${join(standaloneProjectDir, '.deliverables', 'real-project-1')}\` (reserved for standalone delivery output)
`;

  writeFileSync(reportPath, report);

  console.log('\nStandalone verification passed.');
  console.log(`Standalone directory: ${standaloneProjectDir}`);
  console.log(`Verification report: ${relative(ROOT, reportPath)}`);
}

main();

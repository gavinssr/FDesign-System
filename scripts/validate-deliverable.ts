import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { parse } from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

interface ProjectConfig {
  id: string;
  build: {
    output: string;
  };
}

function collectFiles(dir: string): string[] {
  const results: string[] = [];

  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      results.push(...collectFiles(fullPath));
      continue;
    }

    results.push(fullPath);
  }

  return results;
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

  if (!config.id || !config.build?.output) {
    throw new Error(`project config missing required fields: ${relative(ROOT, configPath)}`);
  }

  return { projectDir, config };
}

function main() {
  const projectId = process.argv[2] ?? 'real-project-1';
  const { projectDir, config } = readProjectConfig(projectId);
  const outputDir = resolve(projectDir, config.build.output);
  const distDir = join(outputDir, 'dist');
  const manifestPath = join(outputDir, 'assets-manifest.json');
  const deployReadmePath = join(outputDir, 'deploy-readme.md');
  const smokeReportPath = join(outputDir, 'smoke-report.md');

  console.log(`Validating deliverable for ${projectId}...\n`);

  const failures: string[] = [];

  if (!existsSync(distDir)) {
    failures.push(`missing dist directory: ${relative(ROOT, distDir)}`);
  }

  if (!existsSync(manifestPath)) {
    failures.push(`missing assets manifest: ${relative(ROOT, manifestPath)}`);
  }

  if (!existsSync(deployReadmePath)) {
    failures.push(`missing deploy readme: ${relative(ROOT, deployReadmePath)}`);
  }

  if (!existsSync(smokeReportPath)) {
    failures.push(`missing smoke report: ${relative(ROOT, smokeReportPath)}`);
  }

  if (failures.length > 0) {
    console.error('Deliverable structure validation failed:\n');
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  const manifestRaw = readFileSync(manifestPath, 'utf-8');
  const manifest = JSON.parse(manifestRaw) as {
    projectId?: string;
    files?: string[];
  };

  if (manifest.projectId !== projectId) {
    failures.push(`manifest projectId mismatch: expected "${projectId}"`);
  }

  if (!Array.isArray(manifest.files) || manifest.files.length === 0) {
    failures.push('manifest files must contain at least one build output');
  }

  const distFiles = collectFiles(distDir);
  if (distFiles.length === 0) {
    failures.push(`dist directory is empty: ${relative(ROOT, distDir)}`);
  }

  const smokeReport = readFileSync(smokeReportPath, 'utf-8');
  if (!smokeReport.includes('status: passed')) {
    failures.push(`smoke report must contain passed status: ${relative(ROOT, smokeReportPath)}`);
  }

  const deployReadme = readFileSync(deployReadmePath, 'utf-8');
  if (!deployReadme.includes('交付内容')) {
    failures.push(`deploy readme missing artifact section: ${relative(ROOT, deployReadmePath)}`);
  }

  if (failures.length > 0) {
    console.error('Deliverable content validation failed:\n');
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log(`Deliverable output: ${relative(ROOT, outputDir)}`);
  console.log(`Validated ${distFiles.length} file(s) inside dist/.`);
  console.log('Deliverable validation passed.');
}

main();

import { copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const [sourceDirArg, outputDirArg] = process.argv.slice(2);

if (!sourceDirArg || !outputDirArg) {
  console.error('Usage: node scripts/copy-css-assets.mjs <sourceDir> <outputDir>');
  process.exit(1);
}

const sourceDir = path.resolve(process.cwd(), sourceDirArg);
const outputDir = path.resolve(process.cwd(), outputDirArg);

async function copyCssModules(currentDir) {
  const entries = await readdir(currentDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(currentDir, entry.name);

    if (entry.isDirectory()) {
      await copyCssModules(sourcePath);
      continue;
    }

    if (!entry.name.endsWith('.module.css')) {
      continue;
    }

    const relativePath = path
      .relative(sourceDir, sourcePath)
      .replace(/\.module\.css$/, '.css');
    const targetPath = path.join(outputDir, relativePath);
    const rawCss = await readFile(sourcePath, 'utf8');
    const publishedCss = rawCss.replaceAll(/:global\(([^)]+)\)/g, '$1');

    await mkdir(path.dirname(targetPath), { recursive: true });
    await writeFile(targetPath, publishedCss);
  }
}

async function rewriteDistCssImports(currentDir) {
  const entries = await readdir(currentDir, { withFileTypes: true });

  for (const entry of entries) {
    const currentPath = path.join(currentDir, entry.name);

    if (entry.isDirectory()) {
      await rewriteDistCssImports(currentPath);
      continue;
    }

    if (!entry.name.endsWith('.js')) {
      continue;
    }

    const source = await readFile(currentPath, 'utf8');
    const rewritten = source.replaceAll('.module.css', '.css');

    if (rewritten !== source) {
      await writeFile(currentPath, rewritten);
    }
  }
}

async function copyStaticAssets(currentDir) {
  const entries = await readdir(currentDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(currentDir, entry.name);

    if (entry.isDirectory()) {
      await copyStaticAssets(sourcePath);
      continue;
    }

    if (entry.name.endsWith('.module.css') || entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
      continue;
    }

    const relativePath = path.relative(sourceDir, sourcePath);
    const targetPath = path.join(outputDir, relativePath);

    await mkdir(path.dirname(targetPath), { recursive: true });
    await copyFile(sourcePath, targetPath);
  }
}

await copyCssModules(sourceDir);
await rewriteDistCssImports(outputDir);
await copyStaticAssets(sourceDir);

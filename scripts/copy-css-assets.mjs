import { cp, mkdir, readdir } from 'node:fs/promises';
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

    const relativePath = path.relative(sourceDir, sourcePath);
    const targetPath = path.join(outputDir, relativePath);

    await mkdir(path.dirname(targetPath), { recursive: true });
    await cp(sourcePath, targetPath);
  }
}

await copyCssModules(sourceDir);

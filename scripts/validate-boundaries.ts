/**
 * Validate import boundaries across the monorepo.
 *
 * This script scans TypeScript/TSX files and checks for forbidden imports
 * as defined in docs/ARCHITECTURE.md. It complements the ESLint boundary
 * rules with a standalone check that can run in CI without ESLint.
 *
 * Usage: pnpm check-boundaries
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

interface Violation {
  file: string;
  line: number;
  importPath: string;
  rule: string;
}

const RULES: Array<{
  sourceGlob: string;
  forbiddenImport: RegExp;
  message: string;
}> = [
  {
    sourceGlob: 'packages/components/',
    forbiddenImport: /apps\/stage/,
    message: 'components must NOT import from apps/stage/',
  },
  {
    sourceGlob: 'packages/components/',
    forbiddenImport: /projects\//,
    message: 'components must NOT import from projects/',
  },
  {
    sourceGlob: 'projects/',
    forbiddenImport: /apps\/stage/,
    message: 'projects must NOT import from apps/stage/',
  },
  {
    sourceGlob: 'apps/example-',
    forbiddenImport: /apps\/stage\/shell/,
    message: 'consumer apps must NOT import stage shell internals',
  },
];

function collectFiles(dir: string, ext: string[]): string[] {
  const results: string[] = [];
  try {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (entry === 'node_modules' || entry === 'dist' || entry === '.turbo') continue;
      const stat = statSync(full);
      if (stat.isDirectory()) {
        results.push(...collectFiles(full, ext));
      } else if (ext.some((e) => full.endsWith(e))) {
        results.push(full);
      }
    }
  } catch {
    // directory may not exist yet
  }
  return results;
}

function checkFile(filePath: string): Violation[] {
  const violations: Violation[] = [];
  const relPath = relative(ROOT, filePath);
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  for (const rule of RULES) {
    if (!relPath.startsWith(rule.sourceGlob)) continue;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]!;
      const importMatch = line.match(/(?:import|from)\s+['"]([^'"]+)['"]/);
      if (importMatch && rule.forbiddenImport.test(importMatch[1]!)) {
        violations.push({
          file: relPath,
          line: i + 1,
          importPath: importMatch[1]!,
          rule: rule.message,
        });
      }
    }
  }

  return violations;
}

function main() {
  console.log('Validating import boundaries...\n');

  const dirs = ['packages/components', 'projects', 'apps'].map((d) => join(ROOT, d));
  const files = dirs.flatMap((d) => collectFiles(d, ['.ts', '.tsx']));

  const allViolations = files.flatMap(checkFile);

  if (allViolations.length === 0) {
    console.log('All boundary checks passed.');
    process.exit(0);
  }

  console.error(`Found ${allViolations.length} boundary violation(s):\n`);
  for (const v of allViolations) {
    console.error(`  ${v.file}:${v.line} — ${v.rule}`);
    console.error(`    import: ${v.importPath}\n`);
  }
  process.exit(1);
}

main();

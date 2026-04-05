import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import { parse } from 'yaml';

import { validateComponentContractShape } from '../packages/contracts/src';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');
const COMPONENTS_ROOT = join(ROOT, 'packages/components/src');

interface ValidationFailure {
  file: string;
  issues: string[];
}

function collectContracts(dir: string): string[] {
  const results: string[] = [];

  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      results.push(...collectContracts(fullPath));
      continue;
    }

    if (entry.endsWith('.contract.yaml')) {
      results.push(fullPath);
    }
  }

  return results;
}

function validateContract(contractPath: string): ValidationFailure | null {
  const relPath = relative(ROOT, contractPath);
  const raw = readFileSync(contractPath, 'utf-8');
  const parsed = parse(raw);
  const issues = validateComponentContractShape(parsed);

  const contractName = basename(contractPath, '.contract.yaml');
  const typesPath = join(dirname(contractPath), `${contractName}.types.ts`);

  if (!existsSync(typesPath)) {
    issues.push(`missing type contract file: ${relative(ROOT, typesPath)}`);
  }

  if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
    const componentName = 'component' in parsed ? parsed.component : undefined;

    if (componentName !== contractName) {
      issues.push(`component field must match file name: expected "${contractName}"`);
    }

    if (typeof componentName === 'string' && existsSync(typesPath)) {
      const typeSource = readFileSync(typesPath, 'utf-8');
      const propsSignature = `export interface ${componentName}Props`;

      if (!typeSource.includes(propsSignature)) {
        issues.push(
          `missing props signature "${propsSignature}" in ${relative(ROOT, typesPath)}`,
        );
      }
    }
  }

  if (issues.length === 0) {
    return null;
  }

  return {
    file: relPath,
    issues,
  };
}

function main() {
  console.log('Validating component contracts...\n');

  const contractFiles = collectContracts(COMPONENTS_ROOT);
  const failures = contractFiles
    .sort((left, right) => left.localeCompare(right))
    .map(validateContract)
    .filter((value): value is ValidationFailure => value !== null);

  if (failures.length === 0) {
    console.log(`Validated ${contractFiles.length} contract file(s).`);
    console.log('All component contracts passed.');
    process.exit(0);
  }

  console.error(`Found ${failures.length} invalid contract file(s):\n`);

  for (const failure of failures) {
    console.error(`- ${failure.file}`);
    for (const issue of failure.issues) {
      console.error(`  - ${issue}`);
    }
    console.error('');
  }

  process.exit(1);
}

main();

// One-shot generator for repetitive text-only form atom files.
// Idempotent: only writes files that don't exist; never overwrites.
// Usage: node scripts/_form-atoms-gen.mjs
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(process.cwd(), 'packages/components/src/form/atoms');

/**
 * @typedef {{
 *   name: string;
 *   purpose: string;
 *   styleKey: string;
 *   colorPath: string; // e.g. 'colors.semantic.text.secondary'
 *   className: string;
 *   harnessText?: string;
 * }} Spec
 */

/** @type {Spec[]} */
const SPECS = [
  {
    name: 'LabelMultiTextSecondaryDark',
    purpose: '多行展示类次级深色文本（body12 medium / text.secondary）',
    styleKey: 'body12SingleLineStrong',
    colorPath: 'colors.semantic.text.secondary',
    className: 'fd-form-label-multi-secondary-dark',
    harnessText: '次级深色文本',
  },
  {
    name: 'LabelAnnotation',
    purpose: '注释文本（body10 / text.tertiary）',
    styleKey: 'body10Min',
    colorPath: 'colors.semantic.text.tertiary',
    className: 'fd-form-label-annotation',
    harnessText: '注释',
  },
  {
    name: 'LabelDescrip',
    purpose: '描述文本（body12 / text.secondary）',
    styleKey: 'body12SingleLine',
    colorPath: 'colors.semantic.text.secondary',
    className: 'fd-form-label-descrip',
    harnessText: '描述文本',
  },
  {
    name: 'LabelResultSupple',
    purpose: '结果补充文本（body12 medium / text.tertiary）',
    styleKey: 'body12SingleLineStrong',
    colorPath: 'colors.semantic.text.tertiary',
    className: 'fd-form-label-result-supple',
    harnessText: '结果补充',
  },
  {
    name: 'LabelAmountSupple',
    purpose: '金额补充文本（body12 / text.secondary）',
    styleKey: 'body12SingleLine',
    colorPath: 'colors.semantic.text.secondary',
    className: 'fd-form-label-amount-supple',
    harnessText: '¥0.00',
  },
  {
    name: 'ErrorTips',
    purpose: '单行错误提示（body12 / functional.red[8]）',
    styleKey: 'body12SingleLine',
    colorPath: 'colors.reference.functional.red[8]',
    className: 'fd-form-error-tips',
    harnessText: '请输入正确格式',
  },
  {
    name: 'ErrorText',
    purpose: '多行错误文本（body12 wrapped / functional.red[8]）',
    styleKey: 'body12Base',
    colorPath: 'colors.reference.functional.red[8]',
    className: 'fd-form-error-text',
    harnessText: '错误描述：当前值不符合规则，请重新输入',
  },
  {
    name: 'OperationText',
    purpose: '通用操作文本（body14 / action.primary.background，移动端无 hover）',
    styleKey: 'body14SingleLine',
    colorPath: 'colors.semantic.action.primary.background',
    className: 'fd-form-operation-text',
    harnessText: '操作文本',
  },
];

function writeIfMissing(path, content) {
  if (existsSync(path)) {
    process.stdout.write(`SKIP ${path}\n`);
    return;
  }
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
  process.stdout.write(`WROTE ${path}\n`);
}

for (const spec of SPECS) {
  const dir = `${ROOT}/${spec.name}`;
  const N = spec.name;

  writeIfMissing(`${dir}/${N}.types.ts`, `import type { ReactNode } from 'react';
export interface ${N}Props { children: ReactNode }
`);

  writeIfMissing(`${dir}/${N}.tsx`, `import { colors, typographyStyles } from '@fdesign/tokens';
import { FormText } from '../_internal/textPrimitive';
import type { ${N}Props } from './${N}.types';

export function ${N}({ children }: ${N}Props) {
  return (
    <FormText
      spec={{
        style: typographyStyles.${spec.styleKey},
        color: ${spec.colorPath},
        className: '${spec.className}',
      }}
    >
      {children}
    </FormText>
  );
}
`);

  writeIfMissing(`${dir}/${N}.contract.yaml`, `component: form/atoms/${N}
purpose: "${spec.purpose}"
provisional: false
forbidden:
  - "禁止内联颜色与字号，必须使用 @fdesign/tokens 复合样式"
states:
  - default
`);

  writeIfMissing(`${dir}/${N}.harness.tsx`, `import { ${N} } from './${N}';
export function ${N}Harness() {
  return <${N}>${spec.harnessText ?? '示例文本'}</${N}>;
}
`);

  writeIfMissing(`${dir}/${N}.test.tsx`, `import { cleanup, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  Text: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => <span {...p}>{children}</span>,
  View: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <div {...p}>{children}</div>,
}));

import { ${N} } from './${N}';

afterEach(() => cleanup());

describe('form/atoms/${N}', () => {
  it('renders children', () => {
    const { getByText } = render(<${N}>hello</${N}>);
    expect(getByText('hello')).toBeTruthy();
  });
});
`);

  writeIfMissing(`${dir}/index.ts`, `export { ${N} } from './${N}';
export { ${N}Harness } from './${N}.harness';
export type { ${N}Props } from './${N}.types';
`);
}

process.stdout.write('done\n');

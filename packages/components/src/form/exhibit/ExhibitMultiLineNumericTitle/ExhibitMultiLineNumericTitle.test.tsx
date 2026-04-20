import { cleanup, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  Text: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => (
    <span {...props}>{children}</span>
  ),
  View: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
    <div {...props}>{children}</div>
  ),
}));

import { ExhibitMultiLineNumericTitle } from './ExhibitMultiLineNumericTitle';

afterEach(() => cleanup());

describe('form/exhibit/ExhibitMultiLineNumericTitle', () => {
  it('renders numeric value', () => {
    const { container } = render(
      <ExhibitMultiLineNumericTitle preLabel="二级" numericTitle="¥9294.02" />,
    );
    expect(container.querySelector('.fd-form-exhibit-numeric-value')?.textContent).toBe('¥9294.02');
  });
});

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

import { ExhibitMultiLinePretext } from './ExhibitMultiLinePretext';

afterEach(() => cleanup());

describe('form/exhibit/ExhibitMultiLinePretext', () => {
  it('renders preset text on right side', () => {
    const { container } = render(
      <ExhibitMultiLinePretext label="标题" subLabel="二级" preText="预设内容" />,
    );
    expect(container.querySelector('.fd-form-exhibit-preset-text')?.textContent).toBe('预设内容');
  });
});

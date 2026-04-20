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

import { ExhibitMultiLineRightMultiPretextB } from './ExhibitMultiLineRightMultiPretextB';

afterEach(() => cleanup());

describe('form/exhibit/ExhibitMultiLineRightMultiPretextB', () => {
  it('renders left preset and right primary/secondary', () => {
    const { container } = render(
      <ExhibitMultiLineRightMultiPretextB
        leftPreText="预设内容"
        rightPrimary="一级"
        rightSecondary="二级"
      />,
    );
    expect(container.querySelector('.fd-form-exhibit-preset-text')?.textContent).toBe('预设内容');
    expect(container.querySelector('.fd-form-exhibit-right-primary')?.textContent).toBe('一级');
  });
});

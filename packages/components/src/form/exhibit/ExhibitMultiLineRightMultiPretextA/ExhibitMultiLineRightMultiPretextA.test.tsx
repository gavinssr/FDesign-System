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

import { ExhibitMultiLineRightMultiPretextA } from './ExhibitMultiLineRightMultiPretextA';

afterEach(() => cleanup());

describe('form/exhibit/ExhibitMultiLineRightMultiPretextA', () => {
  it('renders right side two lines', () => {
    const { container } = render(
      <ExhibitMultiLineRightMultiPretextA
        label="标题"
        rightPrimary="一级"
        rightSecondary="二级"
      />,
    );
    expect(container.querySelector('.fd-form-exhibit-right-primary')?.textContent).toBe('一级');
    expect(container.querySelector('.fd-form-exhibit-right-secondary')?.textContent).toBe('二级');
    expect(container.querySelector('.fd-form-exhibit-multi-stack-end')).toBeTruthy();
  });
});

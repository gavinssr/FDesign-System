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

import { NumberTitle } from './NumberTitle';

afterEach(() => cleanup());

describe('form/atoms/NumberTitle', () => {
  it('applies tight letter-spacing for XL', () => {
    const { container } = render(<NumberTitle size="XL">123</NumberTitle>);
    const node = container.querySelector('.fd-form-numbertitle-XL') as HTMLSpanElement;
    expect(node.style.letterSpacing).toBe('-0.625px');
  });
  it('does not apply letter-spacing for M', () => {
    const { container } = render(<NumberTitle size="M">123</NumberTitle>);
    const node = container.querySelector('.fd-form-numbertitle-M') as HTMLSpanElement;
    expect(node.style.letterSpacing).toBe('');
  });

  it('renders optional arrow', () => {
    const { container } = render(
      <NumberTitle size="S" showArrow>
        123
      </NumberTitle>,
    );
    expect(container.querySelector('.fd-form-numbertitle-arrow')).toBeTruthy();
  });
});

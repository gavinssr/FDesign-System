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

import { BrandColor } from './BrandColor';

afterEach(() => cleanup());

describe('form/atoms/BrandColor', () => {
  it('renders Large size class', () => {
    const { container } = render(<BrandColor size="Large">¥1</BrandColor>);
    expect(container.querySelector('.fd-form-brandcolor-Large')).toBeTruthy();
  });
});

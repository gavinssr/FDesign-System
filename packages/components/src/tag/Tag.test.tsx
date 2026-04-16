import { cleanup, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  View: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
    <div {...props}>{children}</div>
  ),
  Text: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => (
    <span {...props}>{children}</span>
  ),
}));

import { Tag } from './Tag';

afterEach(() => {
  cleanup();
});

describe('Tag', () => {
  it('renders content with variant and color classes', () => {
    const { getByText } = render(
      <Tag variant="fill-secondary" color="purple">
        Ready
      </Tag>,
    );

    const label = getByText('Ready').parentElement;
    expect(label?.className).toContain('fd-tag-variant-fill-secondary');
    expect(label?.className).toContain('fd-tag-color-purple');
  });

  it('renders coupon prefix and divider classes', () => {
    const { getByText } = render(
      <Tag variant="outline" color="blue" couponPrefix="券">
        满300减30
      </Tag>,
    );

    const root = getByText('满300减30').parentElement;
    expect(getByText('券')).toBeTruthy();
    expect(root?.className).toContain('fd-tag-has-coupon');
  });
});

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
  it('renders content with tone and emphasis classes', () => {
    const { getByText } = render(
      <Tag tone="success" emphasis="solid">
        Ready
      </Tag>,
    );

    const label = getByText('Ready').parentElement;
    expect(label?.className).toContain('fd-tag-tone-success');
    expect(label?.className).toContain('fd-tag-emphasis-solid');
  });
});

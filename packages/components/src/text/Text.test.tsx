import { cleanup, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  Text: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => (
    <span {...props}>{children}</span>
  ),
}));

import { Text } from './Text';

afterEach(() => {
  cleanup();
});

describe('Text', () => {
  it('renders children with tone and size classes', () => {
    const { getByText } = render(
      <Text tone="primary" size="lg" weight="bold">
        Status text
      </Text>,
    );

    const node = getByText('Status text');
    expect(node.className).toContain('fd-text-tone-primary');
    expect(node.className).toContain('fd-text-size-lg');
    expect(node.className).toContain('fd-text-weight-bold');
  });

  it('supports truncate mode', () => {
    const { getByText } = render(<Text truncate>Long text value</Text>);

    expect(getByText('Long text value').className).toContain('fd-text-truncate');
  });
});

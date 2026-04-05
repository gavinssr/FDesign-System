import { cleanup, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  View: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => (
    <span {...props}>{children}</span>
  ),
  Text: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => (
    <span {...props}>{children}</span>
  ),
}));

import { Icon } from './Icon';

afterEach(() => {
  cleanup();
});

describe('Icon', () => {
  it('renders accessible icon labels for non-decorative icons', () => {
    const { getByRole } = render(<Icon name="info" label="Information" />);

    expect(getByRole('img').getAttribute('aria-label')).toBe('Information');
  });

  it('hides decorative icons from assistive tech', () => {
    const { getByText } = render(<Icon name="close" decorative />);

    expect(getByText('x').parentElement?.getAttribute('aria-hidden')).toBe('true');
  });
});

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
    const { getByRole } = render(<Icon name="wallet" label="Wallet" />);

    expect(getByRole('img').getAttribute('aria-label')).toBe('Wallet');
  });

  it('hides decorative icons from assistive tech', () => {
    const { container } = render(<Icon name="close" decorative />);

    expect((container.firstChild as HTMLElement | null)?.getAttribute('aria-hidden')).toBe('true');
  });

  it('routes semantic local aliases to local source automatically', () => {
    const { container } = render(<Icon name="bank-card" decorative />);

    expect((container.firstChild as HTMLElement | null)?.className).toContain('fd-icon-source-local');
  });

  it('routes legacy names to material source automatically', () => {
    const { getByText } = render(<Icon name="chevron-right" decorative />);

    expect(getByText('chevron_right').className).toContain('fd-icon-glyph-material');
  });
});

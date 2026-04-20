import { cleanup, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  View: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
    <div {...props}>{children}</div>
  ),
}));

import { PlaceholderIcon } from './PlaceholderIcon';

afterEach(() => cleanup());

describe('form/atoms/PlaceholderIcon', () => {
  it('renders a circle with given size', () => {
    const { container } = render(<PlaceholderIcon size={32} />);
    const node = container.querySelector('.fd-form-placeholder-icon') as HTMLDivElement;
    expect(node).toBeTruthy();
    expect(node.style.width).toBe('32px');
  });
});

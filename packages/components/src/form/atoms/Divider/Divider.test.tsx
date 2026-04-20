import { cleanup, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  View: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
    <div {...props}>{children}</div>
  ),
}));

import { Divider } from './Divider';

afterEach(() => cleanup());

describe('form/atoms/Divider', () => {
  it('renders default and retract variant', () => {
    const { container, rerender } = render(<Divider />);
    expect(container.querySelector('.fd-form-divider')).toBeTruthy();
    rerender(<Divider retract />);
    expect(container.querySelector('.fd-form-divider-retract')).toBeTruthy();
  });
});

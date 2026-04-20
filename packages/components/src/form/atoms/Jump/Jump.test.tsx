import { cleanup, fireEvent, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  View: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <div {...p}>{children}</div>,
}));

import { Jump } from './Jump';

afterEach(() => cleanup());

describe('form/atoms/Jump', () => {
  it('fires onJump on click when interactive', () => {
    const onJump = vi.fn();
    const { container } = render(<Jump onJump={onJump} />);
    fireEvent.click(container.querySelector('.fd-form-jump') as HTMLDivElement);
    expect(onJump).toHaveBeenCalled();
  });
  it('does nothing when no handler', () => {
    const { container } = render(<Jump />);
    fireEvent.click(container.querySelector('.fd-form-jump') as HTMLDivElement);
    expect(container.querySelector('.fd-form-jump-interactive')).toBeFalsy();
  });
});

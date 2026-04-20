import { cleanup, fireEvent, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  Text: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => <span {...p}>{children}</span>,
  View: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <div {...p}>{children}</div>,
}));

import { LoginMethods } from './LoginMethods';

afterEach(() => cleanup());

describe('form/atoms/LoginMethods', () => {
  it('fires onJump when clicked', () => {
    const onJump = vi.fn();
    const { container } = render(<LoginMethods text="x" onJump={onJump} />);
    fireEvent.click(container.querySelector('.fd-form-login-methods') as HTMLDivElement);
    expect(onJump).toHaveBeenCalled();
  });
});

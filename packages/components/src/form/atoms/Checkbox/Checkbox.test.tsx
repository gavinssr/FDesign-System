import { cleanup, fireEvent, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  View: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <div {...p}>{children}</div>,
}));

import { Checkbox } from './Checkbox';

afterEach(() => cleanup());

describe('form/atoms/Checkbox', () => {
  it('toggles via onChange', () => {
    const onChange = vi.fn();
    const { container } = render(<Checkbox checked={false} onChange={onChange} />);
    fireEvent.click(container.querySelector('.fd-form-checkbox') as HTMLDivElement);
    expect(onChange).toHaveBeenCalledWith(true);
  });
  it('does not fire when disabled', () => {
    const onChange = vi.fn();
    const { container } = render(<Checkbox checked={false} disabled onChange={onChange} />);
    fireEvent.click(container.querySelector('.fd-form-checkbox') as HTMLDivElement);
    expect(onChange).not.toHaveBeenCalled();
  });
});

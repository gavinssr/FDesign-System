import { cleanup, fireEvent, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  View: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
    <div {...props}>{children}</div>
  ),
}));

import { Switch } from './Switch';

afterEach(() => cleanup());

describe('form/atoms/Switch', () => {
  it('toggles uncontrolled state on click', () => {
    const onChange = vi.fn();
    const { container } = render(<Switch defaultChecked={false} onChange={onChange} />);
    const root = container.querySelector('.fd-form-switch') as HTMLDivElement;
    expect(root.getAttribute('aria-checked')).toBe('false');
    fireEvent.click(root);
    expect(onChange).toHaveBeenCalledWith(true);
    expect(root.getAttribute('aria-checked')).toBe('true');
  });

  it('does not toggle when disabled', () => {
    const onChange = vi.fn();
    const { container } = render(<Switch disabled onChange={onChange} />);
    fireEvent.click(container.querySelector('.fd-form-switch') as HTMLDivElement);
    expect(onChange).not.toHaveBeenCalled();
  });
});

import { cleanup, fireEvent, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  View: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <div {...p}>{children}</div>,
}));

import { Collapse } from './Collapse';

afterEach(() => cleanup());

describe('form/atoms/Collapse', () => {
  it('toggles aria-expanded on click', () => {
    const onToggle = vi.fn();
    const { container } = render(<Collapse defaultExpanded={false} onToggle={onToggle} />);
    const root = container.querySelector('.fd-form-collapse') as HTMLDivElement;
    expect(root.getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(root);
    expect(onToggle).toHaveBeenCalledWith(true);
    expect(root.getAttribute('aria-expanded')).toBe('true');
  });
});

import { cleanup, fireEvent, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  Text: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => <span {...p}>{children}</span>,
  View: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <div {...p}>{children}</div>,
}));

import { OptionCardDefault } from './OptionCardDefault';

afterEach(() => cleanup());

describe('form/atoms/OptionCardDefault', () => {
  it('toggles via onChange', () => {
    const onChange = vi.fn();
    const { container } = render(<OptionCardDefault selected={false} onChange={onChange}>x</OptionCardDefault>);
    fireEvent.click(container.querySelector('.fd-form-option-card-default') as HTMLDivElement);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

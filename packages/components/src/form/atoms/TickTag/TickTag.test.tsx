import { cleanup, fireEvent, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  Text: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => <span {...p}>{children}</span>,
  View: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <div {...p}>{children}</div>,
}));

import { TickTag } from './TickTag';

afterEach(() => cleanup());

describe('form/atoms/TickTag', () => {
  it('toggles via onChange', () => {
    const onChange = vi.fn();
    const { container } = render(<TickTag status="default" onChange={onChange}>x</TickTag>);
    fireEvent.click(container.querySelector('.fd-form-ticktag') as HTMLDivElement);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

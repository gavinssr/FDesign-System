import { cleanup, fireEvent, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  Image: (p: HTMLAttributes<HTMLImageElement> & { src?: string; mode?: string }) => <img alt="" {...p} />,
  Text: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => <span {...p}>{children}</span>,
  View: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <div {...p}>{children}</div>,
}));

import { OptionCardPic } from './OptionCardPic';

afterEach(() => cleanup());

describe('form/atoms/OptionCardPic', () => {
  it('toggles selected', () => {
    const onChange = vi.fn();
    const { container } = render(<OptionCardPic selected={false} onChange={onChange} caption="x" />);
    fireEvent.click(container.querySelector('.fd-form-option-card-pic') as HTMLDivElement);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

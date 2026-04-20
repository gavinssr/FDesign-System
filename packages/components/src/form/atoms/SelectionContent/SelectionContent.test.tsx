import { cleanup, fireEvent, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  Text: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => <span {...p}>{children}</span>,
  View: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <div {...p}>{children}</div>,
}));

import { SelectionContent } from './SelectionContent';

afterEach(() => cleanup());

describe('form/atoms/SelectionContent', () => {
  it('toggles selected', () => {
    const onChange = vi.fn();
    const { container, getByText } = render(
      <SelectionContent selected={false} text="请选择" onChange={onChange} />,
    );
    expect(getByText('请选择')).toBeTruthy();
    fireEvent.click(container.querySelector('.fd-form-selection-content') as HTMLDivElement);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

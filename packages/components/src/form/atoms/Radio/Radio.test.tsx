import { cleanup, fireEvent, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  View: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <div {...p}>{children}</div>,
}));

import { Radio } from './Radio';

afterEach(() => cleanup());

describe('form/atoms/Radio', () => {
  it('toggles via onChange', () => {
    const onChange = vi.fn();
    const { container } = render(<Radio checked={false} onChange={onChange} />);
    fireEvent.click(container.querySelector('.fd-form-radio') as HTMLDivElement);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

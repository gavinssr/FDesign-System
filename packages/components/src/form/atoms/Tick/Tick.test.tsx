import { cleanup, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  View: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <div {...p}>{children}</div>,
}));

import { Tick } from './Tick';

afterEach(() => cleanup());

describe('form/atoms/Tick', () => {
  it('renders a selection box', () => {
    const { container } = render(<Tick />);
    expect(container.querySelector('.fd-form-selection-box')).toBeTruthy();
  });
});

import { cleanup, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  View: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <div {...p}>{children}</div>,
}));

import { Supplement } from './Supplement';

afterEach(() => cleanup());

describe('form/atoms/Supplement', () => {
  it('renders icon variant class', () => {
    const { container } = render(<Supplement icon="jump" />);
    expect(container.querySelector('.fd-form-supplement-jump')).toBeTruthy();
  });
});

import { cleanup, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  Text: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => <span {...p}>{children}</span>,
  View: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <div {...p}>{children}</div>,
}));

import { LabelMultiTextFirst } from './LabelMultiTextFirst';

afterEach(() => cleanup());

describe('form/atoms/LabelMultiTextFirst', () => {
  it('renders', () => {
    const { getByText } = render(<LabelMultiTextFirst>x</LabelMultiTextFirst>);
    expect(getByText('x')).toBeTruthy();
  });

  it('renders optional arrow', () => {
    const { container } = render(<LabelMultiTextFirst showArrow>x</LabelMultiTextFirst>);
    expect(container.querySelector('.fd-form-label-multi-first-arrow')).toBeTruthy();
  });
});

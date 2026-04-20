import { cleanup, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  Text: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => <span {...p}>{children}</span>,
  View: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <div {...p}>{children}</div>,
}));

import { LabelAmountSupple } from './LabelAmountSupple';

afterEach(() => cleanup());

describe('form/atoms/LabelAmountSupple', () => {
  it('renders children', () => {
    const { getByText } = render(<LabelAmountSupple>hello</LabelAmountSupple>);
    expect(getByText('hello')).toBeTruthy();
  });

  it('renders prefix and amount', () => {
    const { getByText } = render(
      <LabelAmountSupple prefix="补充信息" amount="¥3000" />,
    );
    expect(getByText('补充信息')).toBeTruthy();
    expect(getByText('¥3000')).toBeTruthy();
  });
});

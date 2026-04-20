import { cleanup, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  Text: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => <span {...p}>{children}</span>,
  View: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <div {...p}>{children}</div>,
}));

import { LabelMultiTextSecondaryDark } from './LabelMultiTextSecondaryDark';

afterEach(() => cleanup());

describe('form/atoms/LabelMultiTextSecondaryDark', () => {
  it('renders children', () => {
    const { getByText } = render(<LabelMultiTextSecondaryDark>hello</LabelMultiTextSecondaryDark>);
    expect(getByText('hello')).toBeTruthy();
  });
});

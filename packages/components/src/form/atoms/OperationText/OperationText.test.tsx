import { cleanup, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  Text: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => <span {...p}>{children}</span>,
  View: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <div {...p}>{children}</div>,
}));

import { TextOperator } from './OperationText';

afterEach(() => cleanup());

describe('form/atoms/OperationText', () => {
  it('renders children', () => {
    const { getByText } = render(<TextOperator>hello</TextOperator>);
    expect(getByText('hello')).toBeTruthy();
  });
});

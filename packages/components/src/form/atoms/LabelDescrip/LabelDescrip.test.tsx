import { cleanup, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  Text: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => <span {...p}>{children}</span>,
  View: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <div {...p}>{children}</div>,
}));

import { LabelDescrip } from './LabelDescrip';

afterEach(() => cleanup());

describe('form/atoms/LabelDescrip', () => {
  it('renders children', () => {
    const { getByText } = render(<LabelDescrip>hello</LabelDescrip>);
    expect(getByText('hello')).toBeTruthy();
  });
});

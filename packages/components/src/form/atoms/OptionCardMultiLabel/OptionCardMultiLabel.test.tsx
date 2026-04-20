import { cleanup, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  Text: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => <span {...p}>{children}</span>,
  View: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <div {...p}>{children}</div>,
}));

import { OptionCardMultiLabel } from './OptionCardMultiLabel';

afterEach(() => cleanup());

describe('form/atoms/OptionCardMultiLabel', () => {
  it('renders label and subLabel', () => {
    const { getByText } = render(<OptionCardMultiLabel label="A" subLabel="sub" />);
    expect(getByText('A')).toBeTruthy();
    expect(getByText('sub')).toBeTruthy();
  });
});

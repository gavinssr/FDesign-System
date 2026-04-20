import { cleanup, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  Image: (p: HTMLAttributes<HTMLImageElement> & { src?: string; mode?: string }) => <img alt="" {...p} />,
  Text: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => <span {...p}>{children}</span>,
  View: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <div {...p}>{children}</div>,
}));

import { OptionCardThumb } from './OptionCardThumb';

afterEach(() => cleanup());

describe('form/atoms/OptionCardThumb', () => {
  it('renders title', () => {
    const { getByText } = render(<OptionCardThumb selected={false} title="t" />);
    expect(getByText('t')).toBeTruthy();
  });
});

import { cleanup, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  Text: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => <span {...p}>{children}</span>,
  View: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <div {...p}>{children}</div>,
}));

import { LabelMultiTextSecondaryLightColor } from './LabelMultiTextSecondaryLightColor';

afterEach(() => cleanup());

describe('form/atoms/LabelMultiTextSecondaryLightColor', () => {
  it('renders text without annotation', () => {
    const { container, getByText } = render(<LabelMultiTextSecondaryLightColor>x</LabelMultiTextSecondaryLightColor>);
    expect(getByText('x')).toBeTruthy();
    expect(container.querySelectorAll('.fd-icon-root').length).toBe(0);
  });
});

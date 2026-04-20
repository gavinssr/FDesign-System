import { cleanup, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  Text: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => <span {...p}>{children}</span>,
  View: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <div {...p}>{children}</div>,
}));

import { ErrorTips } from './ErrorTips';

afterEach(() => cleanup());

describe('form/atoms/ErrorTips', () => {
  it('renders children', () => {
    const { getByText } = render(<ErrorTips>hello</ErrorTips>);
    expect(getByText('hello')).toBeTruthy();
  });

  it('renders divider when enabled', () => {
    const { container } = render(<ErrorTips divider>hello</ErrorTips>);
    expect(container.querySelector('.fd-form-error-tips-divider')).toBeTruthy();
  });
});

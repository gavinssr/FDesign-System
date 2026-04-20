import { cleanup, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  Text: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => <span {...p}>{children}</span>,
  View: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <div {...p}>{children}</div>,
}));

import { ErrorText } from './ErrorText';

afterEach(() => cleanup());

describe('form/atoms/ErrorText', () => {
  it('renders children', () => {
    const { getByText } = render(<ErrorText>hello</ErrorText>);
    expect(getByText('hello')).toBeTruthy();
  });

  it('renders divider when enabled', () => {
    const { container } = render(<ErrorText divider>hello</ErrorText>);
    expect(container.querySelector('.fd-form-error-text-divider')).toBeTruthy();
  });
});

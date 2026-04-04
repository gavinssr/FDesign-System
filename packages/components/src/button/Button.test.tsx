import { cleanup, fireEvent, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  View: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
    <div {...props}>{children}</div>
  ),
  Text: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => (
    <span {...props}>{children}</span>
  ),
}));

import { Button } from './Button';

afterEach(() => {
  cleanup();
});

describe('Button', () => {
  it('renders children and triggers onPress when interactive', () => {
    const onPress = vi.fn();
    const { getByRole, getByText } = render(<Button onPress={onPress}>Primary button</Button>);

    fireEvent.click(getByRole('button'));

    expect(getByText('Primary button')).toBeTruthy();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('marks disabled and loading states accessibly', () => {
    const { getByRole, getByText } = render(
      <Button disabled loading>
        Busy button
      </Button>,
    );

    const button = getByRole('button');

    expect(button.getAttribute('aria-disabled')).toBe('true');
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(getByText('Loading')).toBeTruthy();
  });
});

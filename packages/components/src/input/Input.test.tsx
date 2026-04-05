import { cleanup, fireEvent, render } from '@testing-library/react';
import type { HTMLAttributes, InputHTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  View: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
    <div {...props}>{children}</div>
  ),
  Text: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => (
    <span {...props}>{children}</span>
  ),
  Input: ({
    onInput,
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & {
    onInput?: (event: { detail: { value: string } }) => void;
  }) => (
    <input
      {...props}
      onInput={(event) =>
        onInput?.({
          detail: {
            value:
              (event.target as HTMLInputElement | null)?.value ??
              (event.currentTarget as HTMLInputElement).value,
          },
        })
      }
    />
  ),
}));

import { Input } from './Input';

afterEach(() => {
  cleanup();
});

describe('Input', () => {
  it('renders label and helper text', () => {
    const { getByText } = render(
      <Input label="Email" helperText="Use work email" placeholder="name@example.com" />,
    );

    expect(getByText('Email')).toBeTruthy();
    expect(getByText('Use work email')).toBeTruthy();
  });

  it('emits normalized values on input', () => {
    const onValueChange = vi.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Type here" onValueChange={onValueChange} />,
    );

    fireEvent.input(getByPlaceholderText('Type here'), {
      target: { value: 'hello' },
    });

    expect(onValueChange).toHaveBeenCalledWith('hello');
  });
});

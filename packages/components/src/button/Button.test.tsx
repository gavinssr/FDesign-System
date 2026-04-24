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
      <Button loading size="xl">
        Busy button
      </Button>,
    );

    const button = getByRole('button');

    expect(button.getAttribute('aria-disabled')).toBe('true');
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(getByText('Loading')).toBeTruthy();
  });

  it('supports inactive visual state without triggering onPress', () => {
    const onPress = vi.fn();
    const { getByRole } = render(
      <Button inactive onPress={onPress}>
        Inactive button
      </Button>,
    );

    fireEvent.click(getByRole('button'));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('keeps xl width fixed at 355px', () => {
    const { getByRole } = render(<Button size="xl">XL button</Button>);

    const button = getByRole('button') as HTMLDivElement;
    const style = button.getAttribute('style') ?? '';

    expect(style).toContain('--button-width: 355px;');
    expect(style).toContain('--button-min-width: 355px;');
    expect(style).toContain('--button-max-width: 355px;');
    expect(style).toContain('--button-height: 48px;');
  });

  it('keeps l width within the 178px to 327px range', () => {
    const { getByRole } = render(<Button size="l">L button</Button>);

    const button = getByRole('button') as HTMLDivElement;
    const style = button.getAttribute('style') ?? '';

    expect(style).toContain('--button-width: clamp(178px, 100%, 327px);');
    expect(style).toContain('--button-min-width: 178px;');
    expect(style).toContain('--button-max-width: 327px;');
    expect(style).toContain('--button-height: 44px;');
  });

  it('uses fluid padding for block medium buttons', () => {
    const { getByRole } = render(
      <Button block size="m">
        Medium block
      </Button>,
    );

    const button = getByRole('button') as HTMLDivElement;
    const style = button.getAttribute('style') ?? '';

    expect(style).toContain('--button-padding-x-effective: 12px;');
    expect(style).toContain('--button-height: 36px;');
    expect(button.className).toContain('fd-button-block');
  });
});

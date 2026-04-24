import { render, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';

import {
  createReactNativeButtonAdapter,
  getReactNativeButtonRenderSpec,
  type ReactNativeButtonPrimitives,
} from './button';

function Pressable({
  accessibilityRole,
  children,
  disabled,
  onPress,
  style,
}: ComponentProps<ReactNativeButtonPrimitives['Pressable']>) {
  return (
    <button
      aria-busy={undefined}
      data-style={JSON.stringify(style)}
      disabled={disabled}
      role={accessibilityRole}
      type="button"
      onClick={onPress}
    >
      {children}
    </button>
  );
}

function Text({
  children,
  style,
}: ComponentProps<ReactNativeButtonPrimitives['Text']>) {
  return <span data-style={JSON.stringify(style)}>{children}</span>;
}

function View({
  children,
  style,
}: ComponentProps<ReactNativeButtonPrimitives['View']>) {
  return <div data-style={JSON.stringify(style)}>{children}</div>;
}

function ActivityIndicator({
  color,
  size,
}: {
  color?: string;
  size?: 'small' | 'large' | number;
}) {
  return <span data-spinner={`${size ?? 'small'}:${color ?? 'none'}`}>spinner</span>;
}

describe('React Native button adapter', () => {
  it('maps disabled and loading state into a render spec', () => {
    const spec = getReactNativeButtonRenderSpec({
      block: true,
      children: 'Submit',
      loading: true,
      size: 'xl',
      variant: 'primary-fill',
    });

    expect(spec.disabled).toBe(true);
    expect(spec.accessibilityState).toEqual({ busy: true, disabled: true });
    expect(spec.spinnerSize).toBe(20);
    expect(spec.showSpinner).toBe(true);
    expect(spec.containerStyle[0]).toMatchObject({
      alignSelf: 'stretch',
      width: '100%',
    });
  });

  it('renders a button through injected primitives', () => {
    const onPress = vi.fn();
    const ReactNativeButton = createReactNativeButtonAdapter({
      ActivityIndicator,
      Pressable,
      Text,
      View,
    });

    render(
      <ReactNativeButton loading={false} onPress={onPress} size="m" variant="secondary-outline">
        Save
      </ReactNativeButton>,
    );

    const button = screen.getByRole('button');
    const label = screen.getByText('Save');

    button.click();

    expect(onPress).toHaveBeenCalledTimes(1);
    expect((button as HTMLButtonElement).disabled).toBe(false);
    expect(label.getAttribute('data-style')).toContain('"color":"#1e2533"');
  });

  it('keeps xl width fixed at 355px', () => {
    const spec = getReactNativeButtonRenderSpec({
      children: 'XL action',
      size: 'xl',
      variant: 'primary-fill',
    });

    expect(spec.containerStyle[2]).toMatchObject({
      width: 355,
      minWidth: 355,
      maxWidth: 355,
      height: 48,
      minHeight: 48,
    });
  });

  it('keeps l width within the 178 to 327 range', () => {
    const spec = getReactNativeButtonRenderSpec({
      children: 'L action',
      size: 'l',
      variant: 'primary-fill',
    });

    expect(spec.containerStyle[2]).toMatchObject({
      width: '100%',
      minWidth: 178,
      maxWidth: 327,
      height: 44,
      minHeight: 44,
    });
  });

  it('uses fluid padding for medium block buttons', () => {
    const spec = getReactNativeButtonRenderSpec({
      block: true,
      children: 'Medium action',
      size: 'm',
      variant: 'primary-outline',
    });

    expect(spec.containerStyle[2]).toMatchObject({
      width: '100%',
      paddingHorizontal: 12,
      height: 36,
      minHeight: 36,
    });
  });
});

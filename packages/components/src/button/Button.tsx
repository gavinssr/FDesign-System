import { Text, View } from '@tarojs/components';
import { colors, radii, spacing, typography } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import type { ButtonProps } from './Button.types';
import './Button.module.css';
import { shouldUseCssVariables } from '../styleRuntime';

type ButtonVariant = NonNullable<ButtonProps['variant']>;
type ButtonSize = NonNullable<ButtonProps['size']>;

type ButtonStyleVars = CSSProperties &
  Record<
    | '--button-bg'
    | '--button-bg-hover'
    | '--button-bg-active'
    | '--button-border'
    | '--button-border-hover'
    | '--button-border-active'
    | '--button-fg'
    | '--button-radius'
    | '--button-gap'
    | '--button-padding-x'
    | '--button-min-height'
    | '--button-font-size'
    | '--button-font-weight',
    string
  >;

const variantStyles: Record<
  ButtonVariant,
  Pick<
    ButtonStyleVars,
    | '--button-bg'
    | '--button-bg-hover'
    | '--button-bg-active'
    | '--button-border'
    | '--button-border-hover'
    | '--button-border-active'
    | '--button-fg'
  >
> = {
  primary: {
    '--button-bg': colors.primary[600],
    '--button-bg-hover': colors.primary[700],
    '--button-bg-active': colors.primary[800],
    '--button-border': colors.primary[600],
    '--button-border-hover': colors.primary[700],
    '--button-border-active': colors.primary[800],
    '--button-fg': colors.neutral[0],
  },
  secondary: {
    '--button-bg': colors.neutral[0],
    '--button-bg-hover': colors.neutral[50],
    '--button-bg-active': colors.neutral[100],
    '--button-border': colors.neutral[300],
    '--button-border-hover': colors.neutral[400],
    '--button-border-active': colors.neutral[500],
    '--button-fg': colors.neutral[800],
  },
  ghost: {
    '--button-bg': 'transparent',
    '--button-bg-hover': colors.primary[50],
    '--button-bg-active': colors.primary[100],
    '--button-border': 'transparent',
    '--button-border-hover': colors.primary[100],
    '--button-border-active': colors.primary[200],
    '--button-fg': colors.primary[700],
  },
  danger: {
    '--button-bg': colors.danger[500],
    '--button-bg-hover': colors.danger[600],
    '--button-bg-active': colors.danger[600],
    '--button-border': colors.danger[500],
    '--button-border-hover': colors.danger[600],
    '--button-border-active': colors.danger[600],
    '--button-fg': colors.neutral[0],
  },
};

const sizeStyles: Record<
  ButtonSize,
  Pick<
    ButtonStyleVars,
    '--button-gap' | '--button-padding-x' | '--button-min-height' | '--button-font-size'
  >
> = {
  sm: {
    '--button-gap': `${spacing[1]}px`,
    '--button-padding-x': `${spacing[3]}px`,
    '--button-min-height': `${spacing[8]}px`,
    '--button-font-size': `${typography.fontSize.sm}px`,
  },
  md: {
    '--button-gap': `${spacing[2]}px`,
    '--button-padding-x': `${spacing[4]}px`,
    '--button-min-height': `${spacing[10]}px`,
    '--button-font-size': `${typography.fontSize.base}px`,
  },
  lg: {
    '--button-gap': `${spacing[2]}px`,
    '--button-padding-x': `${spacing[5]}px`,
    '--button-min-height': `${spacing[12]}px`,
    '--button-font-size': `${typography.fontSize.lg}px`,
  },
};

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  block = false,
  children,
  onPress,
}: ButtonProps) {
  const isInactive = disabled || loading;
  const useCssVariables = shouldUseCssVariables();

  const className = [
    'fd-button-root',
    `fd-button-${variant}`,
    `fd-button-${size}`,
    block ? 'fd-button-block' : '',
    disabled ? 'fd-button-disabled' : '',
    loading ? 'fd-button-loading' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const styleVars: ButtonStyleVars = {
    ...variantStyles[variant],
    ...sizeStyles[size],
    '--button-radius': `${radii.md}px`,
    '--button-font-weight': typography.fontWeight.semibold,
  };
  const resolvedStyle: CSSProperties = {
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizeStyles[size]['--button-gap'],
    minHeight: sizeStyles[size]['--button-min-height'],
    padding: `0 ${sizeStyles[size]['--button-padding-x']}`,
    border: `1px solid ${variantStyles[variant]['--button-border']}`,
    borderRadius: `${radii.md}px`,
    background: variantStyles[variant]['--button-bg'],
    color: variantStyles[variant]['--button-fg'],
    fontSize: sizeStyles[size]['--button-font-size'],
    fontWeight: typography.fontWeight.semibold,
    lineHeight: 1,
    boxSizing: 'border-box',
    cursor: isInactive ? 'not-allowed' : 'pointer',
    userSelect: 'none',
    width: block ? '100%' : 'auto',
    display: block ? 'flex' : 'inline-flex',
    opacity: isInactive ? 0.72 : 1,
    boxShadow: variant === 'ghost' ? 'none' : undefined,
  };

  return (
    <View
      role="button"
      aria-disabled={isInactive}
      aria-busy={loading}
      className={className}
      style={useCssVariables ? styleVars : resolvedStyle}
      onClick={isInactive ? undefined : onPress}
    >
      {loading ? (
        <>
          <Text className="fd-button-spinner" aria-hidden="true">
            ...
          </Text>
          <Text className="fd-button-loadingStatus">Loading</Text>
        </>
      ) : null}
      <Text className="fd-button-label">{children}</Text>
    </View>
  );
}

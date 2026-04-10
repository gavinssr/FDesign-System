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
    | '--button-border-width'
    | '--button-fg'
    | '--button-radius'
    | '--button-gap'
    | '--button-padding-x'
    | '--button-min-height'
    | '--button-font-size'
    | '--button-line-height'
    | '--button-font-weight',
    string
  >;

type ButtonState = 'default' | 'inactive' | 'disabled' | 'loading';

function getButtonState({
  inactive = false,
  disabled = false,
  loading = false,
}: Pick<ButtonProps, 'inactive' | 'disabled' | 'loading'>): ButtonState {
  if (loading) {
    return 'loading';
  }

  if (disabled) {
    return 'disabled';
  }

  if (inactive) {
    return 'inactive';
  }

  return 'default';
}

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
    | '--button-border-width'
    | '--button-fg'
  >
> = {
  'primary-fill': {
    '--button-bg': colors.semantic.action.primary.background,
    '--button-bg-hover': colors.semantic.action.primary.backgroundHover,
    '--button-bg-active': colors.semantic.action.primary.backgroundActive,
    '--button-border': 'transparent',
    '--button-border-hover': 'transparent',
    '--button-border-active': 'transparent',
    '--button-border-width': '0px',
    '--button-fg': colors.semantic.action.primary.foreground,
  },
  'primary-outline': {
    '--button-bg': 'transparent',
    '--button-bg-hover': colors.semantic.action.primary.subtleBackground,
    '--button-bg-active': colors.semantic.action.primary.subtleBackground,
    '--button-border': colors.semantic.action.primary.border,
    '--button-border-hover': colors.semantic.action.primary.border,
    '--button-border-active': colors.semantic.action.primary.border,
    '--button-border-width': '0.5px',
    '--button-fg': colors.semantic.action.primary.foreground,
  },
  'secondary-outline': {
    '--button-bg': colors.semantic.surface.base,
    '--button-bg-hover': colors.semantic.surface.base,
    '--button-bg-active': colors.semantic.surface.base,
    '--button-border': colors.semantic.border.subtle,
    '--button-border-hover': colors.semantic.border.subtle,
    '--button-border-active': colors.semantic.border.subtle,
    '--button-border-width': '0.5px',
    '--button-fg': colors.semantic.text.primary,
  },
};

const sizeStyles: Record<
  ButtonSize,
  Pick<
    ButtonStyleVars,
    | '--button-gap'
    | '--button-padding-x'
    | '--button-min-height'
    | '--button-font-size'
    | '--button-line-height'
  >
> = {
  xl: {
    '--button-gap': `${spacing.semantic.gapBetweenButtons}px`,
    '--button-padding-x': `${spacing.scale[10]}px`,
    '--button-min-height': '48px',
    '--button-font-size': `${typography.size.increase}px`,
    '--button-line-height': `${typography.lineHeight.singleLine.increase}px`,
  },
  l: {
    '--button-gap': `${spacing.semantic.gapBetweenButtons}px`,
    '--button-padding-x': `${spacing.scale[10]}px`,
    '--button-min-height': '44px',
    '--button-font-size': `${typography.size.increase}px`,
    '--button-line-height': `${typography.lineHeight.singleLine.increase}px`,
  },
  m: {
    '--button-gap': `${spacing.semantic.gapBetweenButtons}px`,
    '--button-padding-x': '38px',
    '--button-min-height': '36px',
    '--button-font-size': `${typography.size.further}px`,
    '--button-line-height': `${typography.lineHeight.singleLine.further}px`,
  },
  s: {
    '--button-gap': '0px',
    '--button-padding-x': '12px',
    '--button-min-height': '28px',
    '--button-font-size': `${typography.size.base}px`,
    '--button-line-height': `${typography.lineHeight.singleLine.base}px`,
  },
  xs: {
    '--button-gap': '0px',
    '--button-padding-x': '10px',
    '--button-min-height': '24px',
    '--button-font-size': `${typography.size.base}px`,
    '--button-line-height': `${typography.lineHeight.singleLine.base}px`,
  },
  mini: {
    '--button-gap': '0px',
    '--button-padding-x': '6px',
    '--button-min-height': '16px',
    '--button-font-size': `${typography.size.min}px`,
    '--button-line-height': `${typography.lineHeight.singleLine.min}px`,
  },
};

const stateStyles: Record<
  ButtonVariant,
  Record<
    ButtonState,
    Pick<
      ButtonStyleVars,
      | '--button-bg'
      | '--button-bg-hover'
      | '--button-bg-active'
      | '--button-border'
      | '--button-border-hover'
      | '--button-border-active'
      | '--button-border-width'
      | '--button-fg'
    >
  >
> = {
  'primary-fill': {
    default: variantStyles['primary-fill'],
    loading: variantStyles['primary-fill'],
    inactive: {
      ...variantStyles['primary-fill'],
      '--button-bg': colors.reference.brand.blue[4],
      '--button-bg-hover': colors.reference.brand.blue[4],
      '--button-bg-active': colors.reference.brand.blue[4],
    },
    disabled: {
      ...variantStyles['primary-fill'],
      '--button-bg': colors.semantic.action.primary.disabled,
      '--button-bg-hover': colors.semantic.action.primary.disabled,
      '--button-bg-active': colors.semantic.action.primary.disabled,
      '--button-fg': colors.semantic.text.disabled,
    },
  },
  'primary-outline': {
    default: variantStyles['primary-outline'],
    loading: variantStyles['primary-outline'],
    inactive: {
      ...variantStyles['primary-outline'],
      '--button-border': colors.reference.brand.blue[4],
      '--button-border-hover': colors.reference.brand.blue[4],
      '--button-border-active': colors.reference.brand.blue[4],
      '--button-fg': colors.reference.brand.blue[4],
    },
    disabled: {
      ...variantStyles['primary-outline'],
      '--button-border': colors.semantic.border.strong,
      '--button-border-hover': colors.semantic.border.strong,
      '--button-border-active': colors.semantic.border.strong,
      '--button-fg': colors.semantic.text.disabled,
    },
  },
  'secondary-outline': {
    default: variantStyles['secondary-outline'],
    loading: variantStyles['secondary-outline'],
    inactive: {
      ...variantStyles['secondary-outline'],
      '--button-fg': colors.semantic.text.tertiary,
    },
    disabled: {
      ...variantStyles['secondary-outline'],
      '--button-bg': colors.semantic.action.primary.disabled,
      '--button-bg-hover': colors.semantic.action.primary.disabled,
      '--button-bg-active': colors.semantic.action.primary.disabled,
      '--button-fg': colors.semantic.text.disabled,
    },
  },
};

const sizeRadii: Record<ButtonSize, number> = {
  xl: radii.large,
  l: radii.large,
  m: radii.default,
  s: radii.default,
  xs: radii.default,
  mini: radii.small,
};

const sizeSpinner: Record<ButtonSize, { show: boolean; size: string }> = {
  xl: { show: true, size: '20px' },
  l: { show: true, size: '20px' },
  m: { show: false, size: '0px' },
  s: { show: false, size: '0px' },
  xs: { show: false, size: '0px' },
  mini: { show: false, size: '0px' },
};

export function Button({
  variant = 'primary-fill',
  size = 'm',
  inactive = false,
  disabled = false,
  loading = false,
  block = false,
  children,
  onPress,
}: ButtonProps) {
  const state = getButtonState({ inactive, disabled, loading });
  const isNonInteractive = state !== 'default';
  const currentVariantStyles = stateStyles[variant][state];
  const currentSizeStyles = sizeStyles[size];
  const currentRadius = sizeRadii[size];
  const spinner = sizeSpinner[size];
  const useCssVariables = shouldUseCssVariables();

  const className = [
    'fd-button-root',
    `fd-button-${variant}`,
    `fd-button-${size}`,
    block ? 'fd-button-block' : '',
    inactive ? 'fd-button-inactive' : '',
    disabled ? 'fd-button-disabled' : '',
    loading ? 'fd-button-loading' : '',
    spinner.show ? 'fd-button-loadingWithSpinner' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const styleVars: ButtonStyleVars = {
    ...currentVariantStyles,
    ...currentSizeStyles,
    '--button-radius': `${currentRadius}px`,
    '--button-font-weight': typography.weight.medium,
  };
  const resolvedStyle: CSSProperties = {
    alignItems: 'center',
    justifyContent: 'center',
    gap: currentSizeStyles['--button-gap'],
    minHeight: currentSizeStyles['--button-min-height'],
    padding: `0 ${currentSizeStyles['--button-padding-x']}`,
    border: `${currentVariantStyles['--button-border-width']} solid ${currentVariantStyles['--button-border']}`,
    borderRadius: `${currentRadius}px`,
    background: currentVariantStyles['--button-bg'],
    color: currentVariantStyles['--button-fg'],
    fontSize: currentSizeStyles['--button-font-size'],
    fontWeight: typography.weight.medium,
    lineHeight: currentSizeStyles['--button-line-height'],
    boxSizing: 'border-box',
    cursor: isNonInteractive ? 'not-allowed' : 'pointer',
    userSelect: 'none',
    width: block ? '100%' : 'auto',
    display: block ? 'flex' : 'inline-flex',
  };

  return (
    <View
      role="button"
      aria-disabled={isNonInteractive}
      aria-busy={loading}
      aria-label={loading ? `${String(children)} loading` : undefined}
      className={className}
      style={useCssVariables ? styleVars : resolvedStyle}
      onClick={isNonInteractive ? undefined : onPress}
    >
      {loading && spinner.show ? (
        <>
          <View
            className="fd-button-spinner"
            aria-hidden="true"
            style={useCssVariables ? undefined : { width: spinner.size, height: spinner.size }}
          />
          <Text className="fd-button-loadingStatus">Loading</Text>
        </>
      ) : null}
      <Text className="fd-button-label">{children}</Text>
    </View>
  );
}

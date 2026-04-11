import { Text, View } from '@tarojs/components';
import { colors, motion, radii, spacing, typography } from '@fdesign/tokens';
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
    | '--button-content-gap'
    | '--button-padding-x'
    | '--button-padding-x-min'
    | '--button-padding-x-effective'
    | '--button-min-height'
    | '--button-font-size'
    | '--button-line-height'
    | '--button-font-weight'
    | '--button-width'
    | '--button-min-width'
    | '--button-max-width'
    | '--button-spinner-size'
    | '--button-transition-duration'
    | '--button-transition-easing'
    | '--button-spinner-duration'
    | '--button-press-offset-y',
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
    '--button-border-width': `${spacing.scale[0]}px`,
    '--button-fg': colors.semantic.action.primary.foreground,
  },
  'primary-outline': {
    '--button-bg': 'transparent',
    '--button-bg-hover': colors.semantic.action.primary.subtleBackground,
    '--button-bg-active': colors.semantic.action.primary.subtleBackground,
    '--button-border': colors.semantic.action.primary.border,
    '--button-border-hover': colors.semantic.action.primary.border,
    '--button-border-active': colors.semantic.action.primary.border,
    '--button-border-width': `${spacing.semantic.borderWidthHairline}px`,
    '--button-fg': colors.semantic.action.primary.outlineForeground,
  },
  'secondary-outline': {
    '--button-bg': colors.semantic.surface.base,
    '--button-bg-hover': colors.semantic.surface.base,
    '--button-bg-active': colors.semantic.surface.base,
    '--button-border': colors.semantic.border.subtle,
    '--button-border-hover': colors.semantic.border.subtle,
    '--button-border-active': colors.semantic.border.subtle,
    '--button-border-width': `${spacing.semantic.borderWidthHairline}px`,
    '--button-fg': colors.semantic.text.primary,
  },
};

const sizeStyles: Record<
  ButtonSize,
  Pick<
    ButtonStyleVars,
    | '--button-content-gap'
    | '--button-padding-x'
    | '--button-padding-x-min'
    | '--button-min-height'
    | '--button-font-size'
    | '--button-line-height'
    | '--button-width'
    | '--button-min-width'
    | '--button-max-width'
    | '--button-spinner-size'
  >
> = {
  xl: {
    '--button-content-gap': `${spacing.semantic.gapBetweenButtons}px`,
    '--button-padding-x': `${spacing.component.button.xl.paddingXFixed}px`,
    '--button-padding-x-min': `${spacing.component.button.xl.paddingXFluidMin}px`,
    '--button-min-height': `${spacing.component.button.xl.minHeight}px`,
    '--button-font-size': `${typography.size.increase}px`,
    '--button-line-height': `${typography.lineHeight.singleLine.increase}px`,
    '--button-width': `${spacing.component.button.xl.width}px`,
    '--button-min-width': 'auto',
    '--button-max-width': 'none',
    '--button-spinner-size': `${spacing.component.button.xl.spinnerSize}px`,
  },
  l: {
    '--button-content-gap': `${spacing.semantic.gapBetweenButtons}px`,
    '--button-padding-x': `${spacing.component.button.l.paddingXFixed}px`,
    '--button-padding-x-min': `${spacing.component.button.l.paddingXFluidMin}px`,
    '--button-min-height': `${spacing.component.button.l.minHeight}px`,
    '--button-font-size': `${typography.size.increase}px`,
    '--button-line-height': `${typography.lineHeight.singleLine.increase}px`,
    '--button-width': `${spacing.component.button.l.width}px`,
    '--button-min-width': 'auto',
    '--button-max-width': 'none',
    '--button-spinner-size': `${spacing.component.button.l.spinnerSize}px`,
  },
  m: {
    '--button-content-gap': `${spacing.semantic.gapBetweenButtons}px`,
    '--button-padding-x': `${spacing.component.button.m.paddingXDefault}px`,
    '--button-padding-x-min': `${spacing.component.button.m.paddingXMin}px`,
    '--button-min-height': `${spacing.component.button.m.minHeight}px`,
    '--button-font-size': `${typography.size.base}px`,
    '--button-line-height': `${typography.lineHeight.singleLine.base}px`,
    '--button-width': 'auto',
    '--button-min-width': 'auto',
    '--button-max-width': 'none',
    '--button-spinner-size': `${spacing.component.button.m.spinnerSize}px`,
  },
  s: {
    '--button-content-gap': `${spacing.semantic.gapBetweenButtons}px`,
    '--button-padding-x': `${spacing.component.button.s.paddingXDefault}px`,
    '--button-padding-x-min': `${spacing.component.button.s.paddingXDefault}px`,
    '--button-min-height': `${spacing.component.button.s.minHeight}px`,
    '--button-font-size': `${typography.size.base}px`,
    '--button-line-height': `${typography.lineHeight.singleLine.base}px`,
    '--button-width': 'auto',
    '--button-min-width': 'auto',
    '--button-max-width': 'none',
    '--button-spinner-size': `${spacing.component.button.s.spinnerSize}px`,
  },
  xs: {
    '--button-content-gap': `${spacing.semantic.gapBetweenButtons}px`,
    '--button-padding-x': `${spacing.component.button.xs.paddingXDefault}px`,
    '--button-padding-x-min': `${spacing.component.button.xs.paddingXDefault}px`,
    '--button-min-height': `${spacing.component.button.xs.minHeight}px`,
    '--button-font-size': `${typography.size.base}px`,
    '--button-line-height': `${typography.lineHeight.singleLine.base}px`,
    '--button-width': 'auto',
    '--button-min-width': 'auto',
    '--button-max-width': 'none',
    '--button-spinner-size': `${spacing.component.button.xs.spinnerSize}px`,
  },
  mini: {
    '--button-content-gap': `${spacing.semantic.gapBetweenButtons}px`,
    '--button-padding-x': `${spacing.component.button.mini.paddingXDefault}px`,
    '--button-padding-x-min': `${spacing.component.button.mini.paddingXDefault}px`,
    '--button-min-height': `${spacing.component.button.mini.minHeight}px`,
    '--button-font-size': `${typography.size.min}px`,
    '--button-line-height': `${typography.lineHeight.singleLine.min}px`,
    '--button-width': 'auto',
    '--button-min-width': 'auto',
    '--button-max-width': 'none',
    '--button-spinner-size': `${spacing.component.button.mini.spinnerSize}px`,
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
      '--button-bg': colors.semantic.action.primary.inactiveBackground,
      '--button-bg-hover': colors.semantic.action.primary.inactiveBackground,
      '--button-bg-active': colors.semantic.action.primary.inactiveBackground,
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
    default: {
      ...variantStyles['primary-outline'],
      '--button-fg': colors.semantic.action.primary.outlineForeground,
    },
    loading: {
      ...variantStyles['primary-outline'],
      '--button-fg': colors.semantic.action.primary.outlineForeground,
    },
    inactive: {
      ...variantStyles['primary-outline'],
      '--button-border': colors.semantic.action.primary.inactiveBorder,
      '--button-border-hover': colors.semantic.action.primary.inactiveBorder,
      '--button-border-active': colors.semantic.action.primary.inactiveBorder,
      '--button-fg': colors.semantic.action.primary.inactiveForeground,
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
  xl: { show: true, size: `${spacing.component.button.xl.spinnerSize}px` },
  l: { show: true, size: `${spacing.component.button.l.spinnerSize}px` },
  m: { show: true, size: `${spacing.component.button.m.spinnerSize}px` },
  s: { show: true, size: `${spacing.component.button.s.spinnerSize}px` },
  xs: { show: true, size: `${spacing.component.button.xs.spinnerSize}px` },
  mini: { show: true, size: `${spacing.component.button.mini.spinnerSize}px` },
};
const compactLoadingSizes: Record<ButtonSize, boolean> = {
  xl: false,
  l: false,
  m: false,
  s: true,
  xs: true,
  mini: true,
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
  const preserveDefaultWidthWithLoadingLabel = loading && spinner.show && size === 'm';
  const hideLabelWhenLoading = loading && spinner.show && compactLoadingSizes[size];
  const useCssVariables = shouldUseCssVariables();
  const currentPaddingX =
    block && (size === 'xl' || size === 'l')
      ? currentSizeStyles['--button-padding-x-min']
      : currentSizeStyles['--button-padding-x'];

  const className = [
    'fd-button-root',
    `fd-button-${variant}`,
    `fd-button-${size}`,
    block ? 'fd-button-block' : '',
    inactive ? 'fd-button-inactive' : '',
    disabled ? 'fd-button-disabled' : '',
    loading ? 'fd-button-loading' : '',
    loading && spinner.show ? 'fd-button-loadingWithSpinner' : '',
    preserveDefaultWidthWithLoadingLabel ? 'fd-button-loadingLockWidth' : '',
    hideLabelWhenLoading ? 'fd-button-loadingHideLabel' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const styleVars: ButtonStyleVars = {
    ...currentVariantStyles,
    ...currentSizeStyles,
    '--button-padding-x-effective': currentPaddingX,
    '--button-radius': `${currentRadius}px`,
    '--button-font-weight': typography.weight.medium,
    '--button-transition-duration': `${motion.duration.fast}ms`,
    '--button-transition-easing': motion.easing.standard,
    '--button-spinner-duration': `${motion.duration.spin}ms`,
    '--button-press-offset-y': `${motion.distance.pressOffsetY}px`,
  };
  const resolvedStyle: CSSProperties = {
    alignItems: 'center',
    justifyContent: 'center',
    gap: currentSizeStyles['--button-content-gap'],
    minHeight: currentSizeStyles['--button-min-height'],
    padding: `0 ${currentPaddingX}`,
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
    width: block ? '100%' : currentSizeStyles['--button-width'],
    minWidth: block ? undefined : currentSizeStyles['--button-min-width'],
    maxWidth: block ? undefined : currentSizeStyles['--button-max-width'],
    display: block ? 'flex' : 'inline-flex',
  };
  const defaultLabelStyle: CSSProperties = {
    color: currentVariantStyles['--button-fg'],
    fontWeight: typography.weight.medium,
    fontSize: currentSizeStyles['--button-font-size'],
    lineHeight: currentSizeStyles['--button-line-height'],
  };
  const loadingLabelStyle: CSSProperties = {
    color: currentVariantStyles['--button-fg'],
    fontWeight: typography.weight.medium,
    fontSize:
      loading && size === 'm'
        ? `${typography.size.further}px`
        : currentSizeStyles['--button-font-size'],
    lineHeight:
      loading && size === 'm'
        ? `${typography.lineHeight.singleLine.further}px`
        : currentSizeStyles['--button-line-height'],
  };
  const spinnerStyle: CSSProperties = {
    width: currentSizeStyles['--button-spinner-size'],
    height: currentSizeStyles['--button-spinner-size'],
    color: currentVariantStyles['--button-fg'],
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
          {hideLabelWhenLoading ? (
            <View className="fd-button-spinnerAnchor">
              <View
                className="fd-button-spinner"
                aria-hidden="true"
                style={spinnerStyle}
              />
            </View>
          ) : preserveDefaultWidthWithLoadingLabel ? (
            <View className="fd-button-loadingContent">
              <View
                className="fd-button-spinner"
                aria-hidden="true"
                style={spinnerStyle}
              />
              <Text className="fd-button-loadingLabel" style={loadingLabelStyle}>
                {children}
              </Text>
            </View>
          ) : (
            <View
              className="fd-button-spinner"
              aria-hidden="true"
              style={spinnerStyle}
            />
          )}
          <Text className="fd-button-loadingStatus">Loading</Text>
        </>
      ) : null}
      <Text
        className={`fd-button-label ${hideLabelWhenLoading || preserveDefaultWidthWithLoadingLabel ? 'fd-button-labelGhost' : ''}`}
        style={defaultLabelStyle}
      >
        {children}
      </Text>
    </View>
  );
}

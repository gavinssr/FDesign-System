import { colors, radii, spacing, typography } from '@fdesign/tokens';
import type { ButtonProps } from '@fdesign/components';
import type { ComponentType, CSSProperties, ReactNode } from 'react';

export type ReactNativeStyle = CSSProperties & Record<string, string | number | undefined>;

interface PressableLikeProps {
  accessibilityRole?: 'button';
  accessibilityState?: {
    busy?: boolean;
    disabled?: boolean;
  };
  disabled?: boolean;
  onPress?: () => void;
  style?: ReactNativeStyle | ReactNativeStyle[];
  children?: ReactNode;
}

interface TextLikeProps {
  style?: ReactNativeStyle | ReactNativeStyle[];
  children?: ReactNode;
}

interface ViewLikeProps {
  style?: ReactNativeStyle | ReactNativeStyle[];
  children?: ReactNode;
}

interface ActivityIndicatorLikeProps {
  color?: string;
  size?: 'small' | 'large' | number;
}

export interface ReactNativeButtonPrimitives {
  Pressable: ComponentType<PressableLikeProps>;
  Text: ComponentType<TextLikeProps>;
  View: ComponentType<ViewLikeProps>;
  ActivityIndicator?: ComponentType<ActivityIndicatorLikeProps>;
}

export interface ReactNativeButtonRenderSpec {
  accessibilityState: PressableLikeProps['accessibilityState'];
  contentStyle: ReactNativeStyle;
  containerStyle: ReactNativeStyle[];
  disabled: boolean;
  labelStyle: ReactNativeStyle[];
  loading: boolean;
  loadingContentStyle: ReactNativeStyle;
  loadingLabelStyle: ReactNativeStyle[];
  onPress?: () => void;
  preserveDefaultWidthWithLoadingLabel: boolean;
  showSpinner: boolean;
  spinnerColor: string;
  spinnerSize: number;
  spinnerStyle: ReactNativeStyle;
}

type ButtonVariant = NonNullable<ButtonProps['variant']>;
type ButtonSize = NonNullable<ButtonProps['size']>;

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

const sizeContainerStyles: Record<ButtonSize, ReactNativeStyle> = {
  xl: {
    height: spacing.component.button.xl.minHeight,
    minHeight: spacing.component.button.xl.minHeight,
    width: spacing.component.button.xl.width,
    minWidth: spacing.component.button.xl.width,
    maxWidth: spacing.component.button.xl.width,
    paddingHorizontal: spacing.component.button.xl.paddingXFixed,
  },
  l: {
    height: spacing.component.button.l.minHeight,
    minHeight: spacing.component.button.l.minHeight,
    width: '100%',
    minWidth: 178,
    maxWidth: spacing.component.button.l.width,
    paddingHorizontal: spacing.component.button.l.paddingXFixed,
  },
  m: {
    height: spacing.component.button.m.minHeight,
    minHeight: spacing.component.button.m.minHeight,
    paddingHorizontal: spacing.component.button.m.paddingXDefault,
  },
  s: {
    height: spacing.component.button.s.minHeight,
    minHeight: spacing.component.button.s.minHeight,
    paddingHorizontal: spacing.component.button.s.paddingXDefault,
  },
  xs: {
    height: spacing.component.button.xs.minHeight,
    minHeight: spacing.component.button.xs.minHeight,
    paddingHorizontal: spacing.component.button.xs.paddingXDefault,
  },
  mini: {
    height: spacing.component.button.mini.minHeight,
    minHeight: spacing.component.button.mini.minHeight,
    paddingHorizontal: spacing.component.button.mini.paddingXDefault,
  },
};

const sizeLabelStyles: Record<ButtonSize, ReactNativeStyle> = {
  xl: { fontSize: typography.size.increase, lineHeight: typography.lineHeight.singleLine.increase },
  l: { fontSize: typography.size.increase, lineHeight: typography.lineHeight.singleLine.increase },
  m: { fontSize: typography.size.base, lineHeight: typography.lineHeight.singleLine.base },
  s: { fontSize: typography.size.base, lineHeight: typography.lineHeight.singleLine.base },
  xs: { fontSize: typography.size.base, lineHeight: typography.lineHeight.singleLine.base },
  mini: { fontSize: typography.size.min, lineHeight: typography.lineHeight.singleLine.min },
};

const sizeRadii: Record<ButtonSize, number> = {
  xl: radii.large,
  l: radii.large,
  m: radii.default,
  s: radii.default,
  xs: radii.default,
  mini: radii.small,
};

const sizeSpinner: Record<ButtonSize, { show: boolean; size: number }> = {
  xl: { show: true, size: spacing.component.button.xl.spinnerSize },
  l: { show: true, size: spacing.component.button.l.spinnerSize },
  m: { show: true, size: spacing.component.button.m.spinnerSize },
  s: { show: true, size: spacing.component.button.s.spinnerSize },
  xs: { show: true, size: spacing.component.button.xs.spinnerSize },
  mini: { show: true, size: spacing.component.button.mini.spinnerSize },
};

function resolveContainerPaddingX(size: ButtonSize, block: boolean) {
  if (!block) {
    return sizeContainerStyles[size].paddingHorizontal;
  }

  if (size === 'xl') {
    return spacing.component.button.xl.paddingXFluidMin;
  }

  if (size === 'l') {
    return spacing.component.button.l.paddingXFluidMin;
  }

  if (size === 'm') {
    return spacing.component.button.m.paddingXMin;
  }

  return sizeContainerStyles[size].paddingHorizontal;
}

const stateVariantStyles: Record<ButtonVariant, Record<ButtonState, { container: ReactNativeStyle; label: ReactNativeStyle }>> = {
  'primary-fill': {
    default: {
      container: { backgroundColor: colors.semantic.action.primary.background, borderColor: 'transparent', borderWidth: 0 },
      label: { color: colors.semantic.action.primary.foreground },
    },
    loading: {
      container: { backgroundColor: colors.semantic.action.primary.background, borderColor: 'transparent', borderWidth: 0 },
      label: { color: colors.semantic.action.primary.foreground },
    },
    inactive: {
      container: {
        backgroundColor: colors.semantic.action.primary.inactiveBackground,
        borderColor: 'transparent',
        borderWidth: 0,
      },
      label: { color: colors.semantic.action.primary.foreground },
    },
    disabled: {
      container: { backgroundColor: colors.semantic.action.primary.disabled, borderColor: 'transparent', borderWidth: 0 },
      label: { color: colors.semantic.text.disabled },
    },
  },
  'primary-outline': {
    default: {
      container: {
        backgroundColor: 'transparent',
        borderColor: colors.semantic.action.primary.border,
        borderWidth: spacing.semantic.borderWidthHairline,
      },
      label: { color: colors.semantic.action.primary.outlineForeground },
    },
    loading: {
      container: {
        backgroundColor: 'transparent',
        borderColor: colors.semantic.action.primary.border,
        borderWidth: spacing.semantic.borderWidthHairline,
      },
      label: { color: colors.semantic.action.primary.outlineForeground },
    },
    inactive: {
      container: {
        backgroundColor: 'transparent',
        borderColor: colors.semantic.action.primary.inactiveBorder,
        borderWidth: spacing.semantic.borderWidthHairline,
      },
      label: { color: colors.semantic.action.primary.inactiveForeground },
    },
    disabled: {
      container: {
        backgroundColor: 'transparent',
        borderColor: colors.semantic.border.strong,
        borderWidth: spacing.semantic.borderWidthHairline,
      },
      label: { color: colors.semantic.text.disabled },
    },
  },
  'secondary-outline': {
    default: {
      container: {
        backgroundColor: colors.semantic.surface.base,
        borderColor: colors.semantic.border.subtle,
        borderWidth: spacing.semantic.borderWidthHairline,
      },
      label: { color: colors.semantic.text.primary },
    },
    loading: {
      container: {
        backgroundColor: colors.semantic.surface.base,
        borderColor: colors.semantic.border.subtle,
        borderWidth: spacing.semantic.borderWidthHairline,
      },
      label: { color: colors.semantic.text.primary },
    },
    inactive: {
      container: {
        backgroundColor: colors.semantic.surface.base,
        borderColor: colors.semantic.border.subtle,
        borderWidth: spacing.semantic.borderWidthHairline,
      },
      label: { color: colors.semantic.text.tertiary },
    },
    disabled: {
      container: {
        backgroundColor: colors.semantic.action.primary.disabled,
        borderColor: colors.semantic.border.subtle,
        borderWidth: spacing.semantic.borderWidthHairline,
      },
      label: { color: colors.semantic.text.disabled },
    },
  },
};

export function getReactNativeButtonRenderSpec({
  variant = 'primary-fill',
  size = 'm',
  inactive = false,
  disabled = false,
  loading = false,
  block = false,
  onPress,
}: ButtonProps): ReactNativeButtonRenderSpec {
  const state = getButtonState({ inactive, disabled, loading });
  const isInactive = state !== 'default';
  const variantStateStyle = stateVariantStyles[variant][state];
  const spinner = sizeSpinner[size];
  const preserveDefaultWidthWithLoadingLabel = loading && spinner.show && size === 'm';
  const resolvedPaddingX = resolveContainerPaddingX(size, block);
  const loadingLabelStyle =
    loading && size === 'm'
      ? {
          fontSize: typography.size.further,
          lineHeight: typography.lineHeight.singleLine.further,
        }
      : sizeLabelStyles[size];
  const sizeContainerStyle = {
    ...sizeContainerStyles[size],
    ...(block
      ? {
          width: '100%',
          minWidth: undefined,
          maxWidth: undefined,
          paddingHorizontal: resolvedPaddingX,
        }
      : { paddingHorizontal: resolvedPaddingX }),
  };

  return {
    accessibilityState: {
      busy: loading,
      disabled: isInactive,
    },
    contentStyle: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      position: preserveDefaultWidthWithLoadingLabel ? 'relative' : undefined,
    },
    containerStyle: [
      {
        alignItems: 'center',
        alignSelf: block ? 'stretch' : 'flex-start',
        borderRadius: sizeRadii[size],
        justifyContent: 'center',
        width: block ? '100%' : 'auto',
      },
      variantStateStyle.container,
      sizeContainerStyle,
    ],
    disabled: isInactive,
    labelStyle: [
      {
        fontWeight: typography.weight.medium,
        opacity: preserveDefaultWidthWithLoadingLabel ? 0 : 1,
      },
      variantStateStyle.label,
      sizeLabelStyles[size],
    ],
    loading,
    loadingContentStyle: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: spacing.semantic.gapBetweenButtons,
      justifyContent: 'center',
      left: '50%',
      position: preserveDefaultWidthWithLoadingLabel ? 'absolute' : undefined,
      top: '50%',
      transform: preserveDefaultWidthWithLoadingLabel ? 'translate(-50%, -50%)' : undefined,
    },
    loadingLabelStyle: [
      {
        fontWeight: typography.weight.medium,
      },
      variantStateStyle.label,
      loadingLabelStyle,
    ],
    showSpinner: loading && spinner.show,
    onPress: isInactive ? undefined : onPress,
    preserveDefaultWidthWithLoadingLabel,
    spinnerColor: (variantStateStyle.label.color as string | undefined) ?? colors.semantic.text.inversePrimary,
    spinnerSize: spinner.size,
    spinnerStyle: {
      width: spinner.size,
      height: spinner.size,
      marginRight: spacing.semantic.gapBetweenButtons,
    },
  };
}

export function createReactNativeButtonAdapter({
  Pressable,
  Text,
  View,
  ActivityIndicator,
}: ReactNativeButtonPrimitives) {
  return function ReactNativeButton(props: ButtonProps) {
    const { children } = props;
    const spec = getReactNativeButtonRenderSpec(props);

    return (
      <Pressable
        accessibilityRole="button"
        accessibilityState={spec.accessibilityState}
        disabled={spec.disabled}
        onPress={spec.onPress}
        style={spec.containerStyle}
      >
        <View style={spec.contentStyle}>
          {spec.showSpinner ? (
            spec.preserveDefaultWidthWithLoadingLabel ? (
              <View style={spec.loadingContentStyle}>
                {ActivityIndicator ? (
                  <ActivityIndicator
                    color={spec.spinnerColor}
                    size={spec.spinnerSize}
                  />
                ) : (
                  <Text style={spec.spinnerStyle}>...</Text>
                )}
                <Text style={spec.loadingLabelStyle}>{children}</Text>
              </View>
            ) : ActivityIndicator ? (
              <ActivityIndicator
                color={spec.spinnerColor}
                size={spec.spinnerSize}
              />
            ) : (
              <Text style={spec.spinnerStyle}>...</Text>
            )
          ) : null}
          <Text style={spec.labelStyle}>{children}</Text>
        </View>
      </Pressable>
    );
  };
}

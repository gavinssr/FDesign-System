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
  size?: 'small' | 'large';
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
  onPress?: () => void;
  showSpinner: boolean;
  spinnerColor: string;
  spinnerSize: 'small' | 'large';
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
  xl: { minHeight: 48, paddingHorizontal: spacing.scale[10] },
  l: { minHeight: 44, paddingHorizontal: spacing.scale[10] },
  m: { minHeight: 36, paddingHorizontal: 38 },
  s: { minHeight: 28, paddingHorizontal: 12 },
  xs: { minHeight: 24, paddingHorizontal: 10 },
  mini: { minHeight: 16, paddingHorizontal: 6 },
};

const sizeLabelStyles: Record<ButtonSize, ReactNativeStyle> = {
  xl: { fontSize: typography.size.increase, lineHeight: typography.lineHeight.singleLine.increase },
  l: { fontSize: typography.size.increase, lineHeight: typography.lineHeight.singleLine.increase },
  m: { fontSize: typography.size.further, lineHeight: typography.lineHeight.singleLine.further },
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

const sizeSpinner: Record<ButtonSize, { show: boolean; size: 'small' | 'large' }> = {
  xl: { show: true, size: 'large' },
  l: { show: true, size: 'large' },
  m: { show: false, size: 'small' },
  s: { show: false, size: 'small' },
  xs: { show: false, size: 'small' },
  mini: { show: false, size: 'small' },
};

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
      container: { backgroundColor: colors.reference.brand.blue[4], borderColor: 'transparent', borderWidth: 0 },
      label: { color: colors.semantic.action.primary.foreground },
    },
    disabled: {
      container: { backgroundColor: colors.semantic.action.primary.disabled, borderColor: 'transparent', borderWidth: 0 },
      label: { color: colors.semantic.text.disabled },
    },
  },
  'primary-outline': {
    default: {
      container: { backgroundColor: 'transparent', borderColor: colors.semantic.action.primary.border, borderWidth: 0.5 },
      label: { color: colors.semantic.action.primary.foreground },
    },
    loading: {
      container: { backgroundColor: 'transparent', borderColor: colors.semantic.action.primary.border, borderWidth: 0.5 },
      label: { color: colors.semantic.action.primary.foreground },
    },
    inactive: {
      container: { backgroundColor: 'transparent', borderColor: colors.reference.brand.blue[4], borderWidth: 0.5 },
      label: { color: colors.reference.brand.blue[4] },
    },
    disabled: {
      container: { backgroundColor: 'transparent', borderColor: colors.semantic.border.strong, borderWidth: 0.5 },
      label: { color: colors.semantic.text.disabled },
    },
  },
  'secondary-outline': {
    default: {
      container: { backgroundColor: colors.semantic.surface.base, borderColor: colors.semantic.border.subtle, borderWidth: 0.5 },
      label: { color: colors.semantic.text.primary },
    },
    loading: {
      container: { backgroundColor: colors.semantic.surface.base, borderColor: colors.semantic.border.subtle, borderWidth: 0.5 },
      label: { color: colors.semantic.text.primary },
    },
    inactive: {
      container: { backgroundColor: colors.semantic.surface.base, borderColor: colors.semantic.border.subtle, borderWidth: 0.5 },
      label: { color: colors.semantic.text.tertiary },
    },
    disabled: {
      container: { backgroundColor: colors.semantic.action.primary.disabled, borderColor: colors.semantic.border.subtle, borderWidth: 0.5 },
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

  return {
    accessibilityState: {
      busy: loading,
      disabled: isInactive,
    },
    contentStyle: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
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
      sizeContainerStyles[size],
    ],
    disabled: isInactive,
    labelStyle: [
      {
        fontWeight: typography.weight.medium,
      },
      variantStateStyle.label,
      sizeLabelStyles[size],
    ],
    loading,
    showSpinner: loading && spinner.show,
    onPress: isInactive ? undefined : onPress,
    spinnerColor: (variantStateStyle.label.color as string | undefined) ?? colors.semantic.text.inversePrimary,
    spinnerSize: spinner.size,
    spinnerStyle: {
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
            ActivityIndicator ? (
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

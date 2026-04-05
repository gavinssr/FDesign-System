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
  spinnerColor: string;
  spinnerSize: 'small' | 'large';
  spinnerStyle: ReactNativeStyle;
}

type ButtonVariant = NonNullable<ButtonProps['variant']>;
type ButtonSize = NonNullable<ButtonProps['size']>;

const variantContainerStyles: Record<ButtonVariant, ReactNativeStyle> = {
  primary: {
    backgroundColor: colors.primary[600],
    borderColor: colors.primary[600],
  },
  secondary: {
    backgroundColor: colors.neutral[0],
    borderColor: colors.neutral[300],
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  danger: {
    backgroundColor: colors.danger[500],
    borderColor: colors.danger[500],
  },
};

const variantLabelStyles: Record<ButtonVariant, ReactNativeStyle> = {
  primary: {
    color: colors.neutral[0],
  },
  secondary: {
    color: colors.neutral[800],
  },
  ghost: {
    color: colors.primary[700],
  },
  danger: {
    color: colors.neutral[0],
  },
};

const sizeContainerStyles: Record<ButtonSize, ReactNativeStyle> = {
  sm: {
    minHeight: spacing[8],
    paddingHorizontal: spacing[3],
  },
  md: {
    minHeight: spacing[10],
    paddingHorizontal: spacing[4],
  },
  lg: {
    minHeight: spacing[12],
    paddingHorizontal: spacing[5],
  },
};

const sizeLabelStyles: Record<ButtonSize, ReactNativeStyle> = {
  sm: {
    fontSize: typography.fontSize.sm,
  },
  md: {
    fontSize: typography.fontSize.base,
  },
  lg: {
    fontSize: typography.fontSize.lg,
  },
};

export function getReactNativeButtonRenderSpec({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  block = false,
  onPress,
}: ButtonProps): ReactNativeButtonRenderSpec {
  const isInactive = disabled || loading;

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
        borderRadius: radii.md,
        borderWidth: 1,
        justifyContent: 'center',
        opacity: isInactive ? 0.6 : 1,
        width: block ? '100%' : 'auto',
      },
      variantContainerStyles[variant],
      sizeContainerStyles[size],
    ],
    disabled: isInactive,
    labelStyle: [
      {
        fontWeight: typography.fontWeight.semibold,
      },
      variantLabelStyles[variant],
      sizeLabelStyles[size],
    ],
    loading,
    onPress: isInactive ? undefined : onPress,
    spinnerColor: variantLabelStyles[variant].color ?? colors.neutral[0],
    spinnerSize: size === 'lg' ? 'large' : 'small',
    spinnerStyle: {
      marginRight: spacing[2],
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
          {spec.loading ? (
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

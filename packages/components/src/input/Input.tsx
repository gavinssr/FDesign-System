import { Input as TaroInput, Text, View } from '@tarojs/components';
import { colors, radii, spacing, typography } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import type { InputProps } from './Input.types';
import './Input.module.css';

type InputSize = NonNullable<InputProps['size']>;

type InputStyleVars = CSSProperties &
  Record<
    | '--input-border'
    | '--input-border-focus'
    | '--input-label'
    | '--input-bg'
    | '--input-fg'
    | '--input-placeholder'
    | '--input-radius'
    | '--input-padding-x'
    | '--input-min-height'
    | '--input-font-size'
    | '--input-helper',
    string
  >;

const sizeStyles: Record<
  InputSize,
  Pick<InputStyleVars, '--input-padding-x' | '--input-min-height' | '--input-font-size'>
> = {
  sm: {
    '--input-padding-x': `${spacing[3]}px`,
    '--input-min-height': `${spacing[8]}px`,
    '--input-font-size': `${typography.fontSize.sm}px`,
  },
  md: {
    '--input-padding-x': `${spacing[4]}px`,
    '--input-min-height': `${spacing[10]}px`,
    '--input-font-size': `${typography.fontSize.base}px`,
  },
  lg: {
    '--input-padding-x': `${spacing[5]}px`,
    '--input-min-height': `${spacing[12]}px`,
    '--input-font-size': `${typography.fontSize.lg}px`,
  },
};

function extractValue(event: unknown): string {
  if (
    typeof event === 'object' &&
    event !== null &&
    'detail' in event &&
    typeof event.detail === 'object' &&
    event.detail !== null &&
    'value' in event.detail &&
    typeof event.detail.value === 'string'
  ) {
    return event.detail.value;
  }

  return '';
}

export function Input({
  value,
  placeholder,
  label,
  helperText,
  disabled = false,
  invalid = false,
  size = 'md',
  onValueChange,
}: InputProps) {
  const className = [
    'fd-input-root',
    `fd-input-size-${size}`,
    invalid ? 'fd-input-invalid' : '',
    disabled ? 'fd-input-disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const styleVars: InputStyleVars = {
    ...sizeStyles[size],
    '--input-border': invalid ? colors.danger[500] : colors.neutral[300],
    '--input-border-focus': invalid ? colors.danger[600] : colors.primary[600],
    '--input-label': colors.neutral[900],
    '--input-bg': disabled ? colors.neutral[100] : colors.neutral[0],
    '--input-fg': colors.neutral[900],
    '--input-placeholder': colors.neutral[400],
    '--input-radius': `${radii.md}px`,
    '--input-helper': invalid ? colors.danger[600] : colors.neutral[600],
  };

  return (
    <View className="fd-input-fieldset">
      {label ? <Text className="fd-input-label">{label}</Text> : null}
      <View className={className} style={styleVars}>
        <TaroInput
          className="fd-input-control"
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onInput={(event) => onValueChange?.(extractValue(event))}
          aria-disabled={disabled}
          aria-invalid={invalid}
        />
      </View>
      {helperText ? <Text className="fd-input-helper">{helperText}</Text> : null}
    </View>
  );
}

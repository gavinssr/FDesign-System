import { Input as TaroInput, Text, View } from '@tarojs/components';
import { colors, radii, spacing, typography } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import type { InputProps } from './Input.types';
import './Input.module.css';
import { shouldUseCssVariables } from '../styleRuntime';

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
  const useCssVariables = shouldUseCssVariables();
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
  const resolvedRootStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    minHeight: sizeStyles[size]['--input-min-height'],
    padding: `0 ${sizeStyles[size]['--input-padding-x']}`,
    border: `1px solid ${invalid ? colors.danger[500] : colors.neutral[300]}`,
    borderRadius: `${radii.md}px`,
    background: disabled ? colors.neutral[100] : colors.neutral[0],
  };
  const labelStyle: CSSProperties = {
    color: colors.neutral[900],
    fontSize: '14px',
    fontWeight: 600,
  };
  const helperStyle: CSSProperties = {
    color: invalid ? colors.danger[600] : colors.neutral[600],
    fontSize: '14px',
  };
  const inputStyle: CSSProperties = {
    width: '100%',
    minWidth: 0,
    border: 0,
    outline: 'none',
    background: 'transparent',
    color: colors.neutral[900],
    fontSize: sizeStyles[size]['--input-font-size'],
  };

  return (
    <View className="fd-input-fieldset">
      {label ? <Text className="fd-input-label" style={useCssVariables ? undefined : labelStyle}>{label}</Text> : null}
      <View className={className} style={useCssVariables ? styleVars : resolvedRootStyle}>
        <TaroInput
          className="fd-input-control"
          style={useCssVariables ? undefined : inputStyle}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onInput={(event) => onValueChange?.(extractValue(event))}
          aria-disabled={disabled}
          aria-invalid={invalid}
        />
      </View>
      {helperText ? (
        <Text className="fd-input-helper" style={useCssVariables ? undefined : helperStyle}>
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}

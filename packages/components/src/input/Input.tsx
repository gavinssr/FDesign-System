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
    '--input-padding-x': `${spacing.component.input.paddingX.sm}px`,
    '--input-min-height': `${spacing.component.input.minHeight.sm}px`,
    '--input-font-size': `${typography.size.further}px`,
  },
  md: {
    '--input-padding-x': `${spacing.component.input.paddingX.md}px`,
    '--input-min-height': `${spacing.component.input.minHeight.md}px`,
    '--input-font-size': `${typography.size.increase}px`,
  },
  lg: {
    '--input-padding-x': `${spacing.component.input.paddingX.lg}px`,
    '--input-min-height': `${spacing.component.input.minHeight.lg}px`,
    '--input-font-size': `${typography.size.head}px`,
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
    '--input-border': invalid ? colors.semantic.action.danger.border : colors.semantic.border.subtle,
    '--input-border-focus': invalid
      ? colors.semantic.action.danger.backgroundHover
      : colors.semantic.action.primary.background,
    '--input-label': colors.semantic.text.primary,
    '--input-bg': disabled ? colors.semantic.surface.muted : colors.semantic.surface.base,
    '--input-fg': colors.semantic.text.primary,
    '--input-placeholder': colors.semantic.text.tertiary,
    '--input-radius': `${radii.default}px`,
    '--input-helper': invalid ? colors.semantic.action.danger.subtleForeground : colors.semantic.text.secondary,
  };
  const resolvedRootStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    minHeight: sizeStyles[size]['--input-min-height'],
    padding: `0 ${sizeStyles[size]['--input-padding-x']}`,
    border: `1px solid ${invalid ? colors.semantic.action.danger.border : colors.semantic.border.subtle}`,
    borderRadius: `${radii.default}px`,
    background: disabled ? colors.semantic.surface.muted : colors.semantic.surface.base,
  };
  const labelStyle: CSSProperties = {
    color: colors.semantic.text.primary,
    fontSize: `${typography.size.further}px`,
    fontWeight: typography.weight.medium,
  };
  const helperStyle: CSSProperties = {
    color: invalid ? colors.semantic.action.danger.subtleForeground : colors.semantic.text.secondary,
    fontSize: `${typography.size.further}px`,
  };
  const inputStyle: CSSProperties = {
    width: '100%',
    minWidth: 0,
    border: 0,
    outline: 'none',
    background: 'transparent',
    color: colors.semantic.text.primary,
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

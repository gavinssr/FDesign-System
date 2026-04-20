import { View } from '@tarojs/components';
import { colors, radii, spacing, typographyStyles } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import { Icon } from '../../../icon';
import { FormText } from '../_internal/textPrimitive';
import type { OperationButtonProps, OperationButtonType } from './OperationButton.types';

interface VariantSpec {
  background: string;
  border: string;
  foreground: string;
  paddingX: number;
  paddingY: number;
  radius: number;
  textStyle: typeof typographyStyles[keyof typeof typographyStyles];
}

const TIGHT_NUMERIC_LETTER_SPACING = -0.625;

const SPECS: Record<OperationButtonType, VariantSpec> = {
  'button-bluePrimary': {
    background: colors.reference.brand.blue[8],
    border: 'transparent',
    foreground: colors.semantic.text.inversePrimary,
    paddingX: spacing.scale[12],
    paddingY: spacing.scale[8],
    radius: radii.default,
    textStyle: typographyStyles.body14SingleLineStrong,
  },
  'button-pinkPrimary': {
    background: colors.reference.brand.pink[8],
    border: 'transparent',
    foreground: colors.semantic.text.inversePrimary,
    paddingX: spacing.scale[12],
    paddingY: spacing.scale[8],
    radius: radii.default,
    textStyle: typographyStyles.body14SingleLineStrong,
  },
  'button-blueSecondary': {
    background: colors.reference.brand.blue[1],
    border: 'transparent',
    foreground: colors.reference.brand.blue[8],
    paddingX: spacing.scale[12],
    paddingY: spacing.scale[8],
    radius: radii.default,
    textStyle: typographyStyles.body14SingleLineStrong,
  },
  'button-pinkSecondary': {
    background: colors.reference.brand.pink[1],
    border: 'transparent',
    foreground: colors.reference.brand.pink[8],
    paddingX: spacing.scale[12],
    paddingY: spacing.scale[8],
    radius: radii.default,
    textStyle: typographyStyles.body14SingleLineStrong,
  },
  'button-blueOutline': {
    background: 'transparent',
    border: colors.reference.brand.blue[3],
    foreground: colors.reference.brand.blue[8],
    paddingX: spacing.scale[12],
    paddingY: spacing.scale[8],
    radius: radii.default,
    textStyle: typographyStyles.body14SingleLineStrong,
  },
  'button-pinkOutline': {
    background: 'transparent',
    border: colors.reference.brand.pink[3],
    foreground: colors.reference.brand.pink[8],
    paddingX: spacing.scale[12],
    paddingY: spacing.scale[8],
    radius: radii.default,
    textStyle: typographyStyles.body14SingleLineStrong,
  },
  preContent: {
    background: 'transparent',
    border: 'transparent',
    foreground: colors.semantic.text.secondary,
    paddingX: 0,
    paddingY: 0,
    radius: 0,
    textStyle: typographyStyles.body14SingleLine,
  },
  subText: {
    background: 'transparent',
    border: 'transparent',
    foreground: colors.semantic.text.tertiary,
    paddingX: 0,
    paddingY: 0,
    radius: 0,
    textStyle: typographyStyles.body12SingleLine,
  },
  tagAmount: {
    background: 'transparent',
    border: 'transparent',
    foreground: colors.reference.brand.blue[8],
    paddingX: 0,
    paddingY: 0,
    radius: 0,
    textStyle: typographyStyles.displayNumber18Medium,
  },
  plusCount: {
    background: 'transparent',
    border: 'transparent',
    foreground: colors.semantic.action.danger.subtleForeground,
    paddingX: 0,
    paddingY: 0,
    radius: 0,
    textStyle: typographyStyles.displayNumber18Medium,
  },
  textButton: {
    background: 'transparent',
    border: 'transparent',
    foreground: colors.semantic.text.primary,
    paddingX: 0,
    paddingY: 0,
    radius: 0,
    textStyle: typographyStyles.body14SingleLineStrong,
  },
};

export function OperationButton({ type, children, disabled = false, onPress }: OperationButtonProps) {
  const s = SPECS[type];
  const isTightNumeric = type === 'tagAmount' || type === 'plusCount';
  const hasJump = type === 'preContent'
    || type === 'subText'
    || type === 'tagAmount'
    || type === 'plusCount'
    || type === 'textButton';
  const containerStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: hasJump ? 2 : 0,
    background: s.background,
    border: s.border === 'transparent'
      ? 'none'
      : `${spacing.semantic.borderWidthHairline}px solid ${s.border}`,
    padding: `${s.paddingY}px ${s.paddingX}px`,
    borderRadius: `${s.radius}px`,
    opacity: disabled ? 0.4 : 1,
  };
  const handleClick = () => {
    if (disabled) return;
    onPress?.();
  };
  return (
    <View
      className={`fd-form-operation-button fd-form-operation-button-${type}${disabled ? ' fd-form-operation-button-disabled' : ''}`}
      style={containerStyle}
      role="button"
      aria-disabled={disabled || undefined}
      onClick={handleClick}
    >
      <FormText
        spec={{
          style: s.textStyle,
          color: s.foreground,
          className: 'fd-form-operation-button-text',
        }}
        extraStyle={
          isTightNumeric ? { letterSpacing: `${TIGHT_NUMERIC_LETTER_SPACING}px` } : undefined
        }
      >
        {children}
      </FormText>
      {hasJump ? <Icon name="action-jump" size="xxs" tone="muted" decorative /> : null}
    </View>
  );
}

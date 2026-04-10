import { Text as TaroText } from '@tarojs/components';
import { colors, typography } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import type { TextProps } from './Text.types';
import './Text.module.css';
import { shouldUseCssVariables } from '../styleRuntime';

type TextTone = NonNullable<TextProps['tone']>;
type TextSize = NonNullable<TextProps['size']>;
type TextWeight = NonNullable<TextProps['weight']>;

type TextStyleVars = CSSProperties &
  Record<
    '--text-color' | '--text-font-size' | '--text-font-weight' | '--text-line-height',
    string | number
  >;

const toneStyles: Record<TextTone, Pick<TextStyleVars, '--text-color'>> = {
  default: { '--text-color': colors.semantic.text.primary },
  muted: { '--text-color': colors.semantic.text.secondary },
  primary: { '--text-color': colors.semantic.action.primary.subtleForeground },
  success: { '--text-color': colors.semantic.action.success.subtleForeground },
  warning: { '--text-color': colors.semantic.action.warning.subtleForeground },
  danger: { '--text-color': colors.semantic.action.danger.subtleForeground },
};

const sizeStyles: Record<
  TextSize,
  Pick<TextStyleVars, '--text-font-size' | '--text-line-height'>
> = {
  sm: {
    '--text-font-size': `${typography.size.base}px`,
    '--text-line-height': `${typography.lineHeight.body.base}px`,
  },
  md: {
    '--text-font-size': `${typography.size.further}px`,
    '--text-line-height': `${typography.lineHeight.body.further}px`,
  },
  lg: {
    '--text-font-size': `${typography.size.increase}px`,
    '--text-line-height': `${typography.lineHeight.body.increase}px`,
  },
};

const weightStyles: Record<TextWeight, Pick<TextStyleVars, '--text-font-weight'>> = {
  light: { '--text-font-weight': typography.weight.light },
  regular: { '--text-font-weight': typography.weight.regular },
  medium: { '--text-font-weight': typography.weight.medium },
};

export function Text({
  children,
  tone = 'default',
  size = 'md',
  weight = 'regular',
  truncate = false,
}: TextProps) {
  const useCssVariables = shouldUseCssVariables();
  const className = [
    'fd-text-root',
    `fd-text-tone-${tone}`,
    `fd-text-size-${size}`,
    `fd-text-weight-${weight}`,
    truncate ? 'fd-text-truncate' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const styleVars: TextStyleVars = {
    ...toneStyles[tone],
    ...sizeStyles[size],
    ...weightStyles[weight],
  };
  const resolvedStyle: CSSProperties = {
    color: toneStyles[tone]['--text-color'] as string,
    fontSize: sizeStyles[size]['--text-font-size'],
    fontWeight: weightStyles[weight]['--text-font-weight'],
    lineHeight: sizeStyles[size]['--text-line-height'],
  };

  return (
    <TaroText className={className} style={useCssVariables ? styleVars : resolvedStyle}>
      {children}
    </TaroText>
  );
}

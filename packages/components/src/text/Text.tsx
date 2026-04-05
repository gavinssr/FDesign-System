import { Text as TaroText } from '@tarojs/components';
import { colors, typography } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import type { TextProps } from './Text.types';
import './Text.module.css';

type TextTone = NonNullable<TextProps['tone']>;
type TextSize = NonNullable<TextProps['size']>;
type TextWeight = NonNullable<TextProps['weight']>;

type TextStyleVars = CSSProperties &
  Record<
    '--text-color' | '--text-font-size' | '--text-font-weight' | '--text-line-height',
    string | number
  >;

const toneStyles: Record<TextTone, Pick<TextStyleVars, '--text-color'>> = {
  default: { '--text-color': colors.neutral[900] },
  muted: { '--text-color': colors.neutral[600] },
  primary: { '--text-color': colors.primary[700] },
  success: { '--text-color': colors.success[600] },
  warning: { '--text-color': colors.warning[600] },
  danger: { '--text-color': colors.danger[600] },
};

const sizeStyles: Record<
  TextSize,
  Pick<TextStyleVars, '--text-font-size' | '--text-line-height'>
> = {
  sm: {
    '--text-font-size': `${typography.fontSize.sm}px`,
    '--text-line-height': typography.lineHeight.normal,
  },
  md: {
    '--text-font-size': `${typography.fontSize.base}px`,
    '--text-line-height': typography.lineHeight.normal,
  },
  lg: {
    '--text-font-size': `${typography.fontSize.lg}px`,
    '--text-line-height': typography.lineHeight.relaxed,
  },
};

const weightStyles: Record<TextWeight, Pick<TextStyleVars, '--text-font-weight'>> = {
  regular: { '--text-font-weight': typography.fontWeight.regular },
  medium: { '--text-font-weight': typography.fontWeight.medium },
  semibold: { '--text-font-weight': typography.fontWeight.semibold },
  bold: { '--text-font-weight': typography.fontWeight.bold },
};

export function Text({
  children,
  tone = 'default',
  size = 'md',
  weight = 'regular',
  truncate = false,
}: TextProps) {
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

  return (
    <TaroText className={className} style={styleVars}>
      {children}
    </TaroText>
  );
}

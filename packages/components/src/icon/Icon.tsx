import { Text as TaroText, View } from '@tarojs/components';
import { colors, typography } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import type { IconProps } from './Icon.types';
import './Icon.module.css';

type IconTone = NonNullable<IconProps['tone']>;
type IconSize = NonNullable<IconProps['size']>;

type IconStyleVars = CSSProperties &
  Record<'--icon-color' | '--icon-size', string>;

const glyphMap: Record<IconProps['name'], string> = {
  search: '?',
  check: 'v',
  info: 'i',
  close: 'x',
  'chevron-right': '>',
};

const toneStyles: Record<IconTone, Pick<IconStyleVars, '--icon-color'>> = {
  default: { '--icon-color': colors.neutral[900] },
  muted: { '--icon-color': colors.neutral[500] },
  primary: { '--icon-color': colors.primary[700] },
  success: { '--icon-color': colors.success[600] },
  warning: { '--icon-color': colors.warning[600] },
  danger: { '--icon-color': colors.danger[600] },
};

const sizeStyles: Record<IconSize, Pick<IconStyleVars, '--icon-size'>> = {
  sm: { '--icon-size': `${typography.fontSize.sm}px` },
  md: { '--icon-size': `${typography.fontSize.base}px` },
  lg: { '--icon-size': `${typography.fontSize.xl}px` },
};

export function Icon({
  name,
  size = 'md',
  tone = 'default',
  decorative = false,
  label,
}: IconProps) {
  const className = [
    'fd-icon-root',
    `fd-icon-size-${size}`,
    `fd-icon-tone-${tone}`,
  ].join(' ');

  const styleVars: IconStyleVars = {
    ...toneStyles[tone],
    ...sizeStyles[size],
  };

  return (
    <View
      className={className}
      style={styleVars}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative}
      aria-label={decorative ? undefined : label ?? name}
    >
      <TaroText>{glyphMap[name]}</TaroText>
    </View>
  );
}

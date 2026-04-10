import { Text as TaroText, View } from '@tarojs/components';
import { colors, typography } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import type { IconProps } from './Icon.types';
import './Icon.module.css';
import { shouldUseCssVariables } from '../styleRuntime';

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
  default: { '--icon-color': colors.semantic.icon.primary },
  muted: { '--icon-color': colors.semantic.text.secondary },
  primary: { '--icon-color': colors.semantic.action.primary.subtleForeground },
  success: { '--icon-color': colors.semantic.action.success.subtleForeground },
  warning: { '--icon-color': colors.semantic.action.warning.subtleForeground },
  danger: { '--icon-color': colors.semantic.action.danger.subtleForeground },
};

const sizeStyles: Record<IconSize, Pick<IconStyleVars, '--icon-size'>> = {
  sm: { '--icon-size': `${typography.size.further}px` },
  md: { '--icon-size': `${typography.size.increase}px` },
  lg: { '--icon-size': `${typography.size.head}px` },
};

export function Icon({
  name,
  size = 'md',
  tone = 'default',
  decorative = false,
  label,
}: IconProps) {
  const useCssVariables = shouldUseCssVariables();
  const className = [
    'fd-icon-root',
    `fd-icon-size-${size}`,
    `fd-icon-tone-${tone}`,
  ].join(' ');

  const styleVars: IconStyleVars = {
    ...toneStyles[tone],
    ...sizeStyles[size],
  };
  const resolvedStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: toneStyles[tone]['--icon-color'],
    fontSize: sizeStyles[size]['--icon-size'],
    fontWeight: typography.weight.medium,
    lineHeight: 1,
  };

  return (
    <View
      className={className}
      style={useCssVariables ? styleVars : resolvedStyle}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative}
      aria-label={decorative ? undefined : label ?? name}
    >
      <TaroText>{glyphMap[name]}</TaroText>
    </View>
  );
}

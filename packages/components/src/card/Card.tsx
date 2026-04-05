import { Text, View } from '@tarojs/components';
import { colors, radii, spacing } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import type { CardProps } from './Card.types';
import './Card.module.css';

type CardTone = NonNullable<CardProps['tone']>;

type CardStyleVars = CSSProperties &
  Record<
    | '--card-bg'
    | '--card-border'
    | '--card-title'
    | '--card-description'
    | '--card-radius'
    | '--card-padding',
    string
  >;

const toneStyles: Record<
  CardTone,
  Pick<CardStyleVars, '--card-bg' | '--card-border' | '--card-title' | '--card-description'>
> = {
  default: {
    '--card-bg': colors.neutral[0],
    '--card-border': colors.neutral[200],
    '--card-title': colors.neutral[900],
    '--card-description': colors.neutral[600],
  },
  primary: {
    '--card-bg': colors.primary[50],
    '--card-border': colors.primary[100],
    '--card-title': colors.primary[800],
    '--card-description': colors.primary[700],
  },
  success: {
    '--card-bg': colors.neutral[0],
    '--card-border': colors.success[500],
    '--card-title': colors.success[600],
    '--card-description': colors.neutral[600],
  },
  warning: {
    '--card-bg': colors.neutral[0],
    '--card-border': colors.warning[500],
    '--card-title': colors.warning[600],
    '--card-description': colors.neutral[600],
  },
  danger: {
    '--card-bg': colors.neutral[0],
    '--card-border': colors.danger[500],
    '--card-title': colors.danger[600],
    '--card-description': colors.neutral[600],
  },
};

export function Card({
  title,
  description,
  children,
  tone = 'default',
  padded = true,
  interactive = false,
  onPress,
}: CardProps) {
  const className = [
    'fd-card-root',
    `fd-card-tone-${tone}`,
    padded ? 'fd-card-padded' : 'fd-card-unpadded',
    interactive ? 'fd-card-interactive' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const styleVars: CardStyleVars = {
    ...toneStyles[tone],
    '--card-radius': `${radii.xl}px`,
    '--card-padding': `${spacing[6]}px`,
  };

  return (
    <View
      className={className}
      style={styleVars}
      role={interactive ? 'button' : undefined}
      onClick={interactive ? onPress : undefined}
    >
      {title || description ? (
        <View className="fd-card-header">
          {title ? <Text className="fd-card-title">{title}</Text> : null}
          {description ? <Text className="fd-card-description">{description}</Text> : null}
        </View>
      ) : null}
      <View className="fd-card-body">{children}</View>
    </View>
  );
}

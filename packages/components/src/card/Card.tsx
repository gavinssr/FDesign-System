import { Text, View } from '@tarojs/components';
import { colors, radii, spacing } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import type { CardProps } from './Card.types';
import './Card.module.css';
import { shouldUseCssVariables } from '../styleRuntime';

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
  const useCssVariables = shouldUseCssVariables();
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
  const resolvedStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    border: `1px solid ${toneStyles[tone]['--card-border']}`,
    borderRadius: `${radii.xl}px`,
    background: toneStyles[tone]['--card-bg'],
    padding: padded ? `${spacing[6]}px` : '0',
    cursor: interactive ? 'pointer' : undefined,
  };
  const titleStyle: CSSProperties = {
    color: toneStyles[tone]['--card-title'],
    fontSize: '18px',
    fontWeight: 700,
  };
  const descriptionStyle: CSSProperties = {
    color: toneStyles[tone]['--card-description'],
    fontSize: '14px',
  };

  return (
    <View
      className={className}
      style={useCssVariables ? styleVars : resolvedStyle}
      role={interactive ? 'button' : undefined}
      onClick={interactive ? onPress : undefined}
    >
      {title || description ? (
        <View className="fd-card-header">
          {title ? <Text className="fd-card-title" style={useCssVariables ? undefined : titleStyle}>{title}</Text> : null}
          {description ? (
            <Text className="fd-card-description" style={useCssVariables ? undefined : descriptionStyle}>
              {description}
            </Text>
          ) : null}
        </View>
      ) : null}
      <View className="fd-card-body">{children}</View>
    </View>
  );
}

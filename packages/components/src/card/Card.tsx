import { Text, View } from '@tarojs/components';
import { colors, radii, spacing, typography } from '@fdesign/tokens';
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
    '--card-bg': colors.semantic.surface.base,
    '--card-border': colors.semantic.border.subtle,
    '--card-title': colors.semantic.text.primary,
    '--card-description': colors.semantic.text.secondary,
  },
  primary: {
    '--card-bg': colors.semantic.action.primary.subtleBackground,
    '--card-border': colors.semantic.action.primary.subtleBorder,
    '--card-title': colors.semantic.action.primary.subtleForeground,
    '--card-description': colors.semantic.text.secondary,
  },
  success: {
    '--card-bg': colors.semantic.surface.base,
    '--card-border': colors.semantic.action.success.subtleBorder,
    '--card-title': colors.semantic.action.success.subtleForeground,
    '--card-description': colors.semantic.text.secondary,
  },
  warning: {
    '--card-bg': colors.semantic.surface.base,
    '--card-border': colors.semantic.action.warning.subtleBorder,
    '--card-title': colors.semantic.action.warning.subtleForeground,
    '--card-description': colors.semantic.text.secondary,
  },
  danger: {
    '--card-bg': colors.semantic.surface.base,
    '--card-border': colors.semantic.action.danger.subtleBorder,
    '--card-title': colors.semantic.action.danger.subtleForeground,
    '--card-description': colors.semantic.text.secondary,
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
    '--card-radius': `${radii.default}px`,
    '--card-padding': `${spacing.component.card.paddingY}px ${spacing.component.card.paddingX}px`,
  };
  const resolvedStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacing.component.card.outerGap}px`,
    border: `1px solid ${toneStyles[tone]['--card-border']}`,
    borderRadius: `${radii.default}px`,
    background: toneStyles[tone]['--card-bg'],
    padding: padded ? `${spacing.component.card.paddingY}px ${spacing.component.card.paddingX}px` : '0',
    cursor: interactive ? 'pointer' : undefined,
  };
  const titleStyle: CSSProperties = {
    color: toneStyles[tone]['--card-title'],
    fontSize: `${typography.size.head}px`,
    fontWeight: typography.weight.medium,
  };
  const descriptionStyle: CSSProperties = {
    color: toneStyles[tone]['--card-description'],
    fontSize: `${typography.size.further}px`,
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

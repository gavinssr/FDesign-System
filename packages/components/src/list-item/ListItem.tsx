import { Text, View } from '@tarojs/components';
import { colors, radii, spacing } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import type { ListItemProps } from './ListItem.types';
import './ListItem.module.css';
import { shouldUseCssVariables } from '../styleRuntime';

type ListItemStyleVars = CSSProperties &
  Record<
    | '--list-item-bg'
    | '--list-item-border'
    | '--list-item-radius'
    | '--list-item-gap'
    | '--list-item-padding'
    | '--list-item-title'
    | '--list-item-description'
    | '--list-item-meta',
    string
  >;

export function ListItem({
  title,
  description,
  meta,
  leading,
  trailing,
  disabled = false,
  onPress,
}: ListItemProps) {
  const useCssVariables = shouldUseCssVariables();
  const interactive = !disabled && typeof onPress === 'function';
  const className = [
    'fd-listItem-root',
    disabled ? 'fd-listItem-disabled' : '',
    interactive ? 'fd-listItem-interactive' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const styleVars: ListItemStyleVars = {
    '--list-item-bg': disabled ? colors.neutral[100] : colors.neutral[0],
    '--list-item-border': colors.neutral[200],
    '--list-item-radius': `${radii.lg}px`,
    '--list-item-gap': `${spacing[4]}px`,
    '--list-item-padding': `${spacing[4]}px`,
    '--list-item-title': colors.neutral[900],
    '--list-item-description': colors.neutral[600],
    '--list-item-meta': colors.primary[700],
  };
  const resolvedStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing[4]}px`,
    padding: `${spacing[4]}px`,
    border: `1px solid ${colors.neutral[200]}`,
    borderRadius: `${radii.lg}px`,
    background: disabled ? colors.neutral[100] : colors.neutral[0],
    opacity: disabled ? 0.7 : 1,
    cursor: interactive ? 'pointer' : undefined,
  };
  const titleStyle: CSSProperties = {
    color: colors.neutral[900],
    fontSize: '16px',
    fontWeight: 600,
  };
  const descriptionStyle: CSSProperties = {
    color: colors.neutral[600],
    fontSize: '14px',
  };
  const metaStyle: CSSProperties = {
    color: colors.primary[700],
    fontSize: '14px',
    fontWeight: 600,
  };

  return (
    <View
      className={className}
      style={useCssVariables ? styleVars : resolvedStyle}
      role={interactive ? 'button' : undefined}
      aria-disabled={disabled}
      onClick={interactive ? onPress : undefined}
    >
      {leading ? <View className="fd-listItem-leading">{leading}</View> : null}
      <View className="fd-listItem-content">
        <Text className="fd-listItem-title" style={useCssVariables ? undefined : titleStyle}>
          {title}
        </Text>
        {description ? (
          <Text className="fd-listItem-description" style={useCssVariables ? undefined : descriptionStyle}>
            {description}
          </Text>
        ) : null}
      </View>
      {meta ? <Text className="fd-listItem-meta" style={useCssVariables ? undefined : metaStyle}>{meta}</Text> : null}
      {trailing ? <View className="fd-listItem-trailing">{trailing}</View> : null}
    </View>
  );
}

import { Text, View } from '@tarojs/components';
import { colors, radii, spacing, typography } from '@fdesign/tokens';
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
    '--list-item-bg': disabled ? colors.semantic.surface.muted : colors.semantic.surface.base,
    '--list-item-border': colors.semantic.border.subtle,
    '--list-item-radius': `${radii.default}px`,
    '--list-item-gap': `${spacing.component.listItem.gap}px`,
    '--list-item-padding': `${spacing.component.listItem.paddingY}px ${spacing.component.listItem.paddingX}px`,
    '--list-item-title': colors.semantic.text.primary,
    '--list-item-description': colors.semantic.text.secondary,
    '--list-item-meta': colors.semantic.action.primary.subtleForeground,
  };
  const resolvedStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.component.listItem.gap}px`,
    padding: `${spacing.component.listItem.paddingY}px ${spacing.component.listItem.paddingX}px`,
    border: `1px solid ${colors.semantic.border.subtle}`,
    borderRadius: `${radii.default}px`,
    background: disabled ? colors.semantic.surface.muted : colors.semantic.surface.base,
    opacity: disabled ? 0.7 : 1,
    cursor: interactive ? 'pointer' : undefined,
  };
  const titleStyle: CSSProperties = {
    color: colors.semantic.text.primary,
    fontSize: `${typography.size.increase}px`,
    fontWeight: typography.weight.medium,
  };
  const descriptionStyle: CSSProperties = {
    color: colors.semantic.text.secondary,
    fontSize: `${typography.size.further}px`,
  };
  const metaStyle: CSSProperties = {
    color: colors.semantic.action.primary.subtleForeground,
    fontSize: `${typography.size.further}px`,
    fontWeight: typography.weight.medium,
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

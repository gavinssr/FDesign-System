import { View } from '@tarojs/components';
import { colors, radii, spacing } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import type { OptionCardDefaultProps } from './OptionCardDefault.types';

export function OptionCardDefault({ selected, children, onChange }: OptionCardDefaultProps) {
  const style: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    padding: spacing.scale[16],
    borderRadius: radii.default,
    background: colors.semantic.surface.base,
    border: selected
      ? `1px solid ${colors.semantic.action.primary.border}`
      : `1px solid ${colors.semantic.border.subtle}`,
  };
  return (
    <View
      className={`fd-form-option-card-default${selected ? ' fd-form-option-card-default-selected' : ''}`}
      style={style}
      role="checkbox"
      aria-checked={selected}
      onClick={() => onChange?.(!selected)}
    >
      {children}
    </View>
  );
}

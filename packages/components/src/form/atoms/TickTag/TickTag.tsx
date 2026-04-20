import { View } from '@tarojs/components';
import { colors, radii, spacing, typographyStyles } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import { FormText } from '../_internal/textPrimitive';
import type { TickTagProps } from './TickTag.types';

export function TickTag({ status = 'default', children, onChange }: TickTagProps) {
  const selected = status === 'selected';
  const style: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: `${spacing.scale[6]}px ${spacing.scale[12]}px`,
    borderRadius: `${radii.default}px`,
    background: selected ? colors.semantic.action.primary.subtleBackground : colors.semantic.surface.muted,
    border: selected
      ? `1px solid ${colors.semantic.action.primary.border}`
      : `1px solid ${colors.semantic.border.subtle}`,
  };
  return (
    <View
      className={`fd-form-ticktag fd-form-ticktag-${status}`}
      style={style}
      role="checkbox"
      aria-checked={selected}
      onClick={() => onChange?.(!selected)}
    >
      <FormText
        spec={{
          style: typographyStyles.body12SingleLine,
          color: selected ? colors.semantic.action.primary.subtleForeground : colors.semantic.text.secondary,
          className: 'fd-form-ticktag-text',
        }}
      >
        {children}
      </FormText>
    </View>
  );
}

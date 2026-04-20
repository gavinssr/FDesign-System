import { View } from '@tarojs/components';
import { colors, radii, spacing, typographyStyles } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import { FormText } from '../_internal/textPrimitive';
import type { OptionCardMultiLabelProps } from './OptionCardMultiLabel.types';

export function OptionCardMultiLabel({
  status = 'default',
  label,
  subLabel,
  onChange,
}: OptionCardMultiLabelProps) {
  const selected = status === 'selected';
  const style: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.scale[6],
    padding: spacing.scale[12],
    borderRadius: radii.default,
    background: selected ? colors.semantic.action.primary.subtleBackground : colors.semantic.surface.base,
    border: selected
      ? `1px solid ${colors.semantic.action.primary.border}`
      : `1px solid ${colors.semantic.border.subtle}`,
  };
  return (
    <View
      className={`fd-form-option-card-multilabel fd-form-option-card-multilabel-${status}`}
      style={style}
      role="checkbox"
      aria-checked={selected}
      onClick={() => onChange?.(!selected)}
    >
      <FormText
        spec={{
          style: typographyStyles.body14SingleLineStrong,
          color: selected ? colors.semantic.action.primary.subtleForeground : colors.semantic.text.primary,
          className: 'fd-form-option-card-multilabel-label',
        }}
      >
        {label}
      </FormText>
      {subLabel ? (
        <FormText
          spec={{
            style: typographyStyles.body12SingleLine,
            color: colors.semantic.text.secondary,
            className: 'fd-form-option-card-multilabel-sublabel',
          }}
        >
          {subLabel}
        </FormText>
      ) : null}
    </View>
  );
}

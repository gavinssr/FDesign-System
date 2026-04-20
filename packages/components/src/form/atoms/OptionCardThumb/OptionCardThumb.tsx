import { Image, View } from '@tarojs/components';
import { colors, radii, spacing, typographyStyles } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import { FormText } from '../_internal/textPrimitive';
import type { OptionCardThumbProps } from './OptionCardThumb.types';

export function OptionCardThumb({
  selected,
  thumbSrc,
  title,
  description,
  onChange,
}: OptionCardThumbProps) {
  const style: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.scale[12],
    padding: spacing.scale[12],
    borderRadius: radii.default,
    background: colors.semantic.surface.base,
    border: selected
      ? `1px solid ${colors.semantic.action.primary.border}`
      : `1px solid ${colors.semantic.border.subtle}`,
  };
  const thumbStyle: CSSProperties = {
    width: 48,
    height: 48,
    borderRadius: radii.default,
    background: colors.semantic.surface.muted,
    flexShrink: 0,
    objectFit: 'cover',
  };
  return (
    <View
      className={`fd-form-option-card-thumb${selected ? ' fd-form-option-card-thumb-selected' : ''}`}
      style={style}
      role="checkbox"
      aria-checked={selected}
      onClick={() => onChange?.(!selected)}
    >
      {thumbSrc ? <Image src={thumbSrc} style={thumbStyle} mode="aspectFill" /> : <View style={thumbStyle} />}
      <View style={{ display: 'flex', flexDirection: 'column', gap: spacing.scale[6] }}>
        <FormText
          spec={{
            style: typographyStyles.body14SingleLineStrong,
            color: colors.semantic.text.primary,
            className: 'fd-form-option-card-thumb-title',
          }}
        >
          {title}
        </FormText>
        {description ? (
          <FormText
            spec={{
              style: typographyStyles.body12SingleLine,
              color: colors.semantic.text.secondary,
              className: 'fd-form-option-card-thumb-desc',
            }}
          >
            {description}
          </FormText>
        ) : null}
      </View>
    </View>
  );
}

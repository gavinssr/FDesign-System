import { Image, View } from '@tarojs/components';
import { colors, radii, spacing, typographyStyles } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import { FormText } from '../_internal/textPrimitive';
import type { OptionCardPicProps } from './OptionCardPic.types';

export function OptionCardPic({ selected, imageSrc, caption, onChange }: OptionCardPicProps) {
  const style: CSSProperties = {
    display: 'inline-flex',
    flexDirection: 'column',
    gap: spacing.scale[6],
    padding: spacing.scale[6],
    borderRadius: radii.default,
    background: colors.semantic.surface.base,
    border: selected
      ? `1px solid ${colors.semantic.action.primary.border}`
      : `1px solid ${colors.semantic.border.subtle}`,
  };
  const imgStyle: CSSProperties = {
    width: 80,
    height: 80,
    borderRadius: radii.default,
    background: colors.semantic.surface.muted,
    objectFit: 'cover',
  };
  return (
    <View
      className={`fd-form-option-card-pic${selected ? ' fd-form-option-card-pic-selected' : ''}`}
      style={style}
      role="checkbox"
      aria-checked={selected}
      onClick={() => onChange?.(!selected)}
    >
      {imageSrc ? <Image src={imageSrc} style={imgStyle} mode="aspectFill" /> : <View style={imgStyle} />}
      {caption ? (
        <FormText
          spec={{
            style: typographyStyles.body12SingleLine,
            color: colors.semantic.text.secondary,
            className: 'fd-form-option-card-pic-caption',
          }}
        >
          {caption}
        </FormText>
      ) : null}
    </View>
  );
}

import { View } from '@tarojs/components';
import { colors, spacing } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import type { PlaceholderIconProps } from './PlaceholderIcon.types';

export function PlaceholderIcon({ size }: PlaceholderIconProps = {}) {
  const dia = size ?? spacing.component.exhibit.iconPlaceholderSize;
  const style: CSSProperties = {
    width: `${dia}px`,
    height: `${dia}px`,
    borderRadius: '50%',
    background: colors.semantic.surface.iconPlaceholder,
    flexShrink: 0,
  };
  return <View className="fd-form-placeholder-icon" style={style} aria-hidden />;
}

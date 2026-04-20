import { View } from '@tarojs/components';
import { colors, spacing } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import type { DividerProps } from './Divider.types';

export function Divider({ retract = false }: DividerProps) {
  const style: CSSProperties = {
    height: `${spacing.semantic.borderWidthHairline}px`,
    background: colors.semantic.border.subtle,
    marginLeft: retract ? `${spacing.semantic.paddingFlushX}px` : 0,
  };
  return <View className={`fd-form-divider${retract ? ' fd-form-divider-retract' : ''}`} style={style} />;
}

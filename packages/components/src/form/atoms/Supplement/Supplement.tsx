import { View } from '@tarojs/components';

import { Icon } from '../../../icon';
import type { SupplementProps } from './Supplement.types';

const ICON_NAME = {
  annotation: 'supplement-annotation',
  jump: 'supplement-jump',
} as const;

export function Supplement({ icon, onPress }: SupplementProps) {
  const interactive = typeof onPress === 'function';
  return (
    <View
      className={`fd-form-supplement fd-form-supplement-${icon}`}
      style={{ display: 'inline-flex', width: 16, height: 16 }}
      role={interactive ? 'button' : undefined}
      onClick={interactive ? () => onPress?.() : undefined}
    >
      <Icon name={ICON_NAME[icon]} size="xxs" tone="muted" decorative />
    </View>
  );
}

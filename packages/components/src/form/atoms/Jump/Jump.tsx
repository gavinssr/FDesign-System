import { View } from '@tarojs/components';
import { spacing } from '@fdesign/tokens';

import { Icon } from '../../../icon';
import type { JumpProps } from './Jump.types';

export function Jump({ onJump }: JumpProps) {
  const interactive = typeof onJump === 'function';
  return (
    <View
      className={`fd-form-jump${interactive ? ' fd-form-jump-interactive' : ''}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: spacing.component.exhibit.jumpArrowSize,
        height: spacing.component.exhibit.jumpArrowSize,
      }}
      role={interactive ? 'link' : undefined}
      onClick={interactive ? () => onJump?.() : undefined}
    >
      <Icon name="action-jump" size="special-mini" tone="muted" decorative />
    </View>
  );
}

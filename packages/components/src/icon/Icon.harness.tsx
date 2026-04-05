import { View } from '@tarojs/components';

import { Icon } from './Icon';
import type { IconProps } from './Icon.types';

const names: IconProps['name'][] = ['search', 'check', 'info', 'close', 'chevron-right'];
const tones: Array<NonNullable<IconProps['tone']>> = [
  'default',
  'muted',
  'primary',
  'success',
  'warning',
  'danger',
];

export function IconHarness() {
  return (
    <View>
      {names.map((name) => (
        <View key={name}>
          {tones.map((tone) => (
            <Icon key={`${name}-${tone}`} name={name} tone={tone} label={`${name}-${tone}`} />
          ))}
        </View>
      ))}
    </View>
  );
}

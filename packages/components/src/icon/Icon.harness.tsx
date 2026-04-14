import { View } from '@tarojs/components';

import { Icon } from './Icon';
import type { IconProps } from './Icon.types';
import { LOCAL_ICON_NAMES } from './iconRegistry';

const localNames: IconProps['name'][] = [...LOCAL_ICON_NAMES];
const materialNames: IconProps['name'][] = ['info', 'check', 'chevron-right', 'shopping_cart', 'credit_card'];
const sizes: Array<NonNullable<IconProps['size']>> = [
  'special-mini',
  'xxs',
  'xs',
  's',
  'm',
  'special-large',
];
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
      {localNames.map((name) => (
        <View key={name}>
          {tones.map((tone) => (
            <Icon key={`${name}-${tone}`} name={name} tone={tone} label={`${name}-${tone}`} />
          ))}
        </View>
      ))}
      {materialNames.map((name) => (
        <View key={name}>
          {sizes.map((size) => (
            <Icon key={`${name}-${size}`} name={name} source="material" size={size} label={`${name}-${size}`} />
          ))}
        </View>
      ))}
    </View>
  );
}

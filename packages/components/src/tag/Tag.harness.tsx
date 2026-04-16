import { View } from '@tarojs/components';

import { Tag } from './Tag';
import type { TagColor, TagVariant } from './Tag.types';

const variants: TagVariant[] = [
  'fill-primary',
  'outline',
  'fill-secondary',
];
const colors: TagColor[] = [
  'blue',
  'pink',
  'red',
  'yellow',
  'green',
  'purple',
  'grey',
];

export function TagHarness() {
  return (
    <View>
      {variants.map((variant) => (
        <View key={variant}>
          {colors.map((color) => (
            <View key={`${variant}-${color}`}>
              <Tag variant={variant} color={color} couponPrefix={variant === 'outline' ? '券' : undefined}>
                {variant === 'outline' ? '满300减30' : `${variant}-${color}`}
              </Tag>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

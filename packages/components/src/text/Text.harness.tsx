import { View } from '@tarojs/components';

import { Text } from './Text';
import type { TextProps } from './Text.types';

const tones: Array<NonNullable<TextProps['tone']>> = [
  'default',
  'muted',
  'primary',
  'success',
  'warning',
  'danger',
];

const sizes: Array<NonNullable<TextProps['size']>> = ['sm', 'md', 'lg'];

export function TextHarness() {
  return (
    <View>
      {tones.map((tone) => (
        <View key={tone}>
          {sizes.map((size) => (
            <View key={`${tone}-${size}`}>
              <Text tone={tone} size={size}>
                {`${tone}-${size} text sample`}
              </Text>
            </View>
          ))}
          <Text tone={tone} truncate>
            {`${tone} truncated text sample for narrow layout validation`}
          </Text>
        </View>
      ))}
    </View>
  );
}

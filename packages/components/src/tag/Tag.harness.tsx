import { View } from '@tarojs/components';

import { Tag } from './Tag';
import type { TagProps } from './Tag.types';

const tones: Array<NonNullable<TagProps['tone']>> = [
  'neutral',
  'primary',
  'success',
  'warning',
  'danger',
];

const emphases: Array<NonNullable<TagProps['emphasis']>> = ['subtle', 'solid'];

export function TagHarness() {
  return (
    <View>
      {tones.map((tone) => (
        <View key={tone}>
          {emphases.map((emphasis) => (
            <View key={`${tone}-${emphasis}`}>
              <Tag tone={tone} emphasis={emphasis}>
                {`${tone}-${emphasis}`}
              </Tag>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

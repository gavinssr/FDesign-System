import { View } from '@tarojs/components';

import { LabelMultiTextFirst } from './LabelMultiTextFirst';
export function LabelMultiTextFirstHarness() {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <LabelMultiTextFirst>主标题</LabelMultiTextFirst>
      <LabelMultiTextFirst showArrow>主标题</LabelMultiTextFirst>
    </View>
  );
}

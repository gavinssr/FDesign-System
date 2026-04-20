import { View } from '@tarojs/components';

import { LabelAmountSupple } from './LabelAmountSupple';
export function LabelAmountSuppleHarness() {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <LabelAmountSupple>¥0.00</LabelAmountSupple>
      <LabelAmountSupple prefix="补充信息">¥3,000</LabelAmountSupple>
    </View>
  );
}

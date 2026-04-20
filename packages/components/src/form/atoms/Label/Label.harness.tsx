import { View } from '@tarojs/components';

import { Label } from './Label';

export function LabelHarness() {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Label size="XL">主标题 XL</Label>
      <Label size="L">主标题 L</Label>
      <Label size="M">主标题 M</Label>
    </View>
  );
}

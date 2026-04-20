import { View } from '@tarojs/components';

import { TickTag } from './TickTag';

export function TickTagHarness() {
  return (
    <View style={{ display: 'flex', gap: 12 }}>
      <TickTag status="default">默认</TickTag>
      <TickTag status="selected">已选</TickTag>
    </View>
  );
}

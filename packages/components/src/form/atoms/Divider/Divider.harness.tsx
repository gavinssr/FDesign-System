import { View } from '@tarojs/components';

import { Divider } from './Divider';

export function DividerHarness() {
  return (
    <View style={{ width: 375 }}>
      <Divider />
      <View style={{ height: 12 }} />
      <Divider retract />
    </View>
  );
}

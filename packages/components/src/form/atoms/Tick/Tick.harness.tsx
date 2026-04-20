import { View } from '@tarojs/components';

import { Tick } from './Tick';

export function TickHarness() {
  return (
    <View style={{ display: 'flex', gap: 16 }}>
      <Tick />
      <Tick disabled />
    </View>
  );
}

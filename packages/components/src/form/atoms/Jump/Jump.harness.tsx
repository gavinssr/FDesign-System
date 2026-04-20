import { View } from '@tarojs/components';

import { Jump } from './Jump';

export function JumpHarness() {
  return (
    <View style={{ display: 'flex', gap: 16 }}>
      <Jump />
      <Jump onJump={() => undefined} />
    </View>
  );
}

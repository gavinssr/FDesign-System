import { View } from '@tarojs/components';

import { Supplement } from './Supplement';

export function SupplementHarness() {
  return (
    <View style={{ display: 'flex', gap: 16 }}>
      <Supplement icon="annotation" />
      <Supplement icon="jump" />
    </View>
  );
}

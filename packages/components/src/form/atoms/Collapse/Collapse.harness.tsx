import { View } from '@tarojs/components';

import { Collapse } from './Collapse';

export function CollapseHarness() {
  return (
    <View style={{ display: 'flex', gap: 16 }}>
      <Collapse defaultExpanded={false} />
      <Collapse defaultExpanded />
    </View>
  );
}

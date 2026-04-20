import { View } from '@tarojs/components';

import { OptionCardMultiLabel } from './OptionCardMultiLabel';

export function OptionCardMultiLabelHarness() {
  return (
    <View style={{ display: 'flex', gap: 12 }}>
      <OptionCardMultiLabel status="default" label="选项 A" subLabel="副说明" />
      <OptionCardMultiLabel status="selected" label="选项 B" subLabel="副说明" />
    </View>
  );
}

import { View } from '@tarojs/components';

import { OptionCardThumb } from './OptionCardThumb';

export function OptionCardThumbHarness() {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <OptionCardThumb selected={false} title="选项 A" description="补充说明" />
      <OptionCardThumb selected title="选项 B" description="已选中" />
    </View>
  );
}

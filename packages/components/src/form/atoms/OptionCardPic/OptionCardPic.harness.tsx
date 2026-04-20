import { View } from '@tarojs/components';

import { OptionCardPic } from './OptionCardPic';

export function OptionCardPicHarness() {
  return (
    <View style={{ display: 'flex', gap: 12 }}>
      <OptionCardPic selected={false} caption="A" />
      <OptionCardPic selected caption="B" />
    </View>
  );
}

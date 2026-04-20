import { View } from '@tarojs/components';

import { BrandColor } from './BrandColor';

export function BrandColorHarness() {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <BrandColor size="Large">¥1,288.00</BrandColor>
      <BrandColor size="Small">¥1,288.00</BrandColor>
    </View>
  );
}

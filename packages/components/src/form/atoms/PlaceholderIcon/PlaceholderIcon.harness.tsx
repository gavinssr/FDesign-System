import { View } from '@tarojs/components';

import { PlaceholderIcon } from './PlaceholderIcon';

export function PlaceholderIconHarness() {
  return (
    <View style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <PlaceholderIcon />
      <PlaceholderIcon size={16} />
      <PlaceholderIcon size={32} />
    </View>
  );
}

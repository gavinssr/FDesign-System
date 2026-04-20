import { View } from '@tarojs/components';

import { ExhibitVeriFace } from './ExhibitVeriFace';

export function ExhibitVeriFaceHarness() {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ExhibitVeriFace />
      <ExhibitVeriFace veriFailed />
    </View>
  );
}

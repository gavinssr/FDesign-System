import { Text, View } from '@tarojs/components';
import { useState } from 'react';

import { OptionCardDefault } from './OptionCardDefault';

export function OptionCardDefaultHarness() {
  const [s, setS] = useState(false);
  return (
    <View style={{ display: 'flex', gap: 12 }}>
      <OptionCardDefault selected={s} onChange={setS}>
        <Text>选项 A</Text>
      </OptionCardDefault>
      <OptionCardDefault selected onChange={() => undefined}>
        <Text>选项 B（已选）</Text>
      </OptionCardDefault>
    </View>
  );
}

import { View } from '@tarojs/components';
import { useState } from 'react';

import { Radio } from './Radio';

export function RadioHarness() {
  const [v, setV] = useState(false);
  return (
    <View style={{ display: 'flex', gap: 16 }}>
      <Radio checked={v} onChange={setV} />
      <Radio checked onChange={() => undefined} />
      <Radio checked={false} disabled />
      <Radio checked disabled />
    </View>
  );
}

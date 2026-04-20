import { View } from '@tarojs/components';
import { useState } from 'react';

import { Checkbox } from './Checkbox';

export function CheckboxHarness() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(true);
  return (
    <View style={{ display: 'flex', gap: 16 }}>
      <Checkbox checked={a} onChange={setA} />
      <Checkbox checked={b} onChange={setB} />
      <Checkbox checked={false} disabled />
      <Checkbox checked disabled />
    </View>
  );
}

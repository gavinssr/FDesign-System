import { View } from '@tarojs/components';
import { useState } from 'react';

import { SelectionContent } from './SelectionContent';

export function SelectionContentHarness() {
  const [s, setS] = useState(false);
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <SelectionContent selected={s} text="请选择" onChange={setS} />
      <SelectionContent selected text="请选择" onChange={() => undefined} />
    </View>
  );
}

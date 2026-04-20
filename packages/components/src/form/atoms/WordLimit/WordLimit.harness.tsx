import { View } from '@tarojs/components';

import { WordLimit } from './WordLimit';

export function WordLimitHarness() {
  return (
    <View style={{ display: 'flex', gap: 16 }}>
      <WordLimit current={0} max={200} />
      <WordLimit current={120} max={200} />
      <WordLimit current={205} max={200} />
    </View>
  );
}

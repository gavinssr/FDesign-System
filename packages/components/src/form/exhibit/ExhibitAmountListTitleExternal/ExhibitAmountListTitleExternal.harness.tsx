import { View } from '@tarojs/components';

import { ExhibitAmountListTitleExternal } from './ExhibitAmountListTitleExternal';

const items = [
  { key: '1', labelText: '二级文本', amount: '¥9294.02', tagColor: 'red' as const },
  { key: '2', labelText: '二级文本', amount: '¥9294.02', tagColor: 'red' as const },
  { key: '3', labelText: '二级文本', amount: '¥9294.02', tagColor: 'red' as const },
];

export function ExhibitAmountListTitleExternalHarness() {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ExhibitAmountListTitleExternal items={items} />
    </View>
  );
}

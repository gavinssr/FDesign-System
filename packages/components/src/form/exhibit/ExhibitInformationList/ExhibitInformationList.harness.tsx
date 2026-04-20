import { View } from '@tarojs/components';

import { ExhibitInformationList } from './ExhibitInformationList';

const items = [
  { key: '1', leftText: '二级文本', rightText: '二级文本' },
  { key: '2', leftText: '二级文本', rightText: '二级文本' },
];

export function ExhibitInformationListHarness() {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ExhibitInformationList card={false} title="一级标题" items={items} />
      <ExhibitInformationList card title="一级标题" items={items} />
    </View>
  );
}

import { View } from '@tarojs/components';

import { ExhibitInformationListAmount } from './ExhibitInformationListAmount';

const items = [
  { key: '1', leftText: '二级文本', rightText: '二级文本' },
  { key: '2', leftText: '二级文本', rightText: '二级文本' },
];

export function ExhibitInformationListAmountHarness() {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ExhibitInformationListAmount card={false} items={items} defaultExpanded />
      <ExhibitInformationListAmount card items={items} defaultExpanded />
      <ExhibitInformationListAmount card={false} items={items} />
      <ExhibitInformationListAmount card items={items} />
    </View>
  );
}

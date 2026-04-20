import { View } from '@tarojs/components';

import { ExhibitInformationListPlainText } from './ExhibitInformationListPlainText';

const items = [
  { key: '1', leftText: '二级文本', rightText: '二级文本' },
  { key: '2', leftText: '二级文本', rightText: '二级文本' },
];

export function ExhibitInformationListPlainTextHarness() {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ExhibitInformationListPlainText card={false} items={items} defaultExpanded />
      <ExhibitInformationListPlainText card items={items} defaultExpanded />
      <ExhibitInformationListPlainText card={false} items={items} />
      <ExhibitInformationListPlainText card items={items} />
    </View>
  );
}

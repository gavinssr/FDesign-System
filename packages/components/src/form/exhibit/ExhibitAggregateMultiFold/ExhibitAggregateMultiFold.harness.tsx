import { View } from '@tarojs/components';

import { ExhibitAggregateMultiFold } from './ExhibitAggregateMultiFold';

const items = [
  {
    key: '1',
    title: '一级标题',
    amount: '¥9999.99',
    defaultExpanded: true,
    subItems: [
      { key: 's1', leading: '第1/24期', description: '二级描述文案二级描述文案二级…', amount: '¥9999.99' },
      { key: 's2', leading: '第1/24期', description: '二级描述文案二级描述文案二级…', amount: '¥9999.99' },
    ],
  },
  {
    key: '2',
    title: '一级标题',
    amount: '¥9999.99',
    subItems: [
      { key: 's3', leading: '第2/24期', description: '二级描述文案', amount: '¥9999.99' },
    ],
  },
  {
    key: '3',
    title: '一级标题',
    amount: '¥9999.99',
    subItems: [
      { key: 's4', leading: '第3/24期', description: '二级描述文案', amount: '¥9999.99' },
    ],
  },
];

export function ExhibitAggregateMultiFoldHarness() {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ExhibitAggregateMultiFold items={items} />
      <ExhibitAggregateMultiFold items={items} onJump={() => undefined} />
    </View>
  );
}

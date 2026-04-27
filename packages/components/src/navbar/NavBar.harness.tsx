import { Text, View } from '@tarojs/components';

import { NavBar } from './NavBar';

export function NavBarHarness() {
  return (
    <View>
      <Text>title</Text>
      <NavBar title="标题文本" />
      <Text>title-actions</Text>
      <NavBar
        title="标题文本"
        actions={[
          { key: 'customer-service', label: '文本', icon: 'customer-service' },
          { key: 'bill', label: '文本', icon: 'bill' },
          { key: 'credit-increase', label: '文本', icon: 'credit-increase' },
        ]}
      />
      <Text>tabs</Text>
      <NavBar
        tabs={[
          { key: 'first', label: '选项' },
          { key: 'second', label: '选项' },
          { key: 'third', label: '选项' },
        ]}
        actions={[
          { key: 'search', icon: 'search' },
          { key: 'cart', icon: 'cart' },
          { key: 'more', icon: 'more' },
        ]}
      />
      <Text>search</Text>
      <NavBar search={{ value: '输入文本', showSubmit: true }} />
    </View>
  );
}

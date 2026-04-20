import { View } from '@tarojs/components';

import { Switch } from './Switch';

export function SwitchHarness() {
  return (
    <View style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Switch size="small" defaultChecked={false} />
      <Switch size="small" defaultChecked />
      <Switch size="large" defaultChecked={false} />
      <Switch size="large" defaultChecked />
      <Switch size="large" defaultChecked disabled />
    </View>
  );
}

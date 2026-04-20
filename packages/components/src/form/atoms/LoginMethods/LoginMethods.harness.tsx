import { View } from '@tarojs/components';

import { LoginMethods } from './LoginMethods';

export function LoginMethodsHarness() {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <LoginMethods text="使用其他方式登录" />
      <LoginMethods text="使用其他方式登录" onJump={() => undefined} />
    </View>
  );
}

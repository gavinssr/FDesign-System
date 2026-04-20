import { View } from '@tarojs/components';

import { ErrorText } from './ErrorText';
export function ErrorTextHarness() {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <View style={{ width: 220 }}>
        <ErrorText>错误描述：当前值不符合规则，请重新输入</ErrorText>
      </View>
      <View style={{ width: 220 }}>
        <ErrorText divider>错误描述：当前值不符合规则，请重新输入</ErrorText>
      </View>
    </View>
  );
}

import { View } from '@tarojs/components';

import { ErrorTips } from './ErrorTips';
export function ErrorTipsHarness() {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 355 }}>
      <ErrorTips>错误提示文案不超过20个字</ErrorTips>
      <ErrorTips divider>错误提示文案不超过20个字</ErrorTips>
    </View>
  );
}

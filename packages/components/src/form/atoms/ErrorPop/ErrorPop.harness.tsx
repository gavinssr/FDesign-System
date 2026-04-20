import { View } from '@tarojs/components';

import { ErrorPop } from './ErrorPop';

export function ErrorPopHarness() {
  return (
    <View style={{ display: 'flex', width: 355 }}>
      <ErrorPop onClose={() => undefined} actionLabel="操作文本">
        错误提示文案不超过20个字符
      </ErrorPop>
    </View>
  );
}

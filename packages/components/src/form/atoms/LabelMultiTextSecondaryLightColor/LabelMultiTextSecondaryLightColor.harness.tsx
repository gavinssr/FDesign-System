import { View } from '@tarojs/components';

import { LabelMultiTextSecondaryLightColor } from './LabelMultiTextSecondaryLightColor';

export function LabelMultiTextSecondaryLightColorHarness() {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <LabelMultiTextSecondaryLightColor>次级浅色文本</LabelMultiTextSecondaryLightColor>
      <LabelMultiTextSecondaryLightColor annotation>带注解</LabelMultiTextSecondaryLightColor>
    </View>
  );
}

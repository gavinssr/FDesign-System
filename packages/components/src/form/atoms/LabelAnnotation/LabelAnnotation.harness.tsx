import { View } from '@tarojs/components';

import { LabelAnnotation } from './LabelAnnotation';
export function LabelAnnotationHarness() {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <LabelAnnotation>注释</LabelAnnotation>
      <LabelAnnotation showIcon>带注释</LabelAnnotation>
    </View>
  );
}

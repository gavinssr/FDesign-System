import { View } from '@tarojs/components';

import { ExhibitDefaultBlueTag } from '../_internal/exhibitParts';
import { ExhibitMultiLineDefault } from './ExhibitMultiLineDefault';

export function ExhibitMultiLineDefaultHarness() {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ExhibitMultiLineDefault card={false} label="一级标题" subLabel="二级文本" showIcon />
      <ExhibitMultiLineDefault card label="一级标题" subLabel="二级文本" showIcon />
      <ExhibitMultiLineDefault
        card={false}
        label="一级标题"
        subLabel="二级文本"
        tag={<ExhibitDefaultBlueTag>标签</ExhibitDefaultBlueTag>}
        subAnnotation
      />
    </View>
  );
}

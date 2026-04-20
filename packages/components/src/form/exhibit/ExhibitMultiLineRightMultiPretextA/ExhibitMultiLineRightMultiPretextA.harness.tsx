import { View } from '@tarojs/components';

import { ExhibitDefaultBlueTag } from '../_internal/exhibitParts';
import { ExhibitMultiLineRightMultiPretextA } from './ExhibitMultiLineRightMultiPretextA';

export function ExhibitMultiLineRightMultiPretextAHarness() {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ExhibitMultiLineRightMultiPretextA
        card={false}
        label="一级标题"
        tag={<ExhibitDefaultBlueTag>标签</ExhibitDefaultBlueTag>}
        rightPrimary="一级文本"
        rightSecondary="二级文本"
        showIcon
      />
      <ExhibitMultiLineRightMultiPretextA
        card
        label="一级标题"
        tag={<ExhibitDefaultBlueTag>标签</ExhibitDefaultBlueTag>}
        rightPrimary="一级文本"
        rightSecondary="二级文本"
      />
    </View>
  );
}

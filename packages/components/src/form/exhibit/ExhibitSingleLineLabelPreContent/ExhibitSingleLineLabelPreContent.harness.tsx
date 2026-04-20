import { View } from '@tarojs/components';

import { ExhibitSingleLineLabelPreContent } from './ExhibitSingleLineLabelPreContent';

export function ExhibitSingleLineLabelPreContentHarness() {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ExhibitSingleLineLabelPreContent
        card={false}
        label="一级标题"
        preText="预设内容"
        showAnnotation
      />
      <ExhibitSingleLineLabelPreContent card label="一级标题" preText="预设内容" showAnnotation />
      <ExhibitSingleLineLabelPreContent card={false} showIcon label="一级标题" preText="预设内容" />
    </View>
  );
}

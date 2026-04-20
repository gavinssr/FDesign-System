import { View } from '@tarojs/components';

import { ExhibitMultiLinePretext } from './ExhibitMultiLinePretext';

export function ExhibitMultiLinePretextHarness() {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ExhibitMultiLinePretext
        card={false}
        label="一级标题"
        subLabel="二级文本"
        preText="预设内容"
        showIcon
      />
      <ExhibitMultiLinePretext
        card
        label="一级标题"
        subLabel="二级文本"
        preText="预设内容"
        showIcon
        subAnnotation
      />
    </View>
  );
}

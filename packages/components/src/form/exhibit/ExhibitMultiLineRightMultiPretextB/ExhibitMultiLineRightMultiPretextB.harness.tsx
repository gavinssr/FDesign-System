import { View } from '@tarojs/components';

import { ExhibitMultiLineRightMultiPretextB } from './ExhibitMultiLineRightMultiPretextB';

export function ExhibitMultiLineRightMultiPretextBHarness() {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ExhibitMultiLineRightMultiPretextB
        card={false}
        leftPreText="预设内容"
        rightPrimary="一级文本"
        rightSecondary="二级文本"
        showIcon
      />
      <ExhibitMultiLineRightMultiPretextB
        card
        leftPreText="预设内容"
        rightPrimary="一级文本"
        rightSecondary="二级文本"
        showIcon
      />
    </View>
  );
}

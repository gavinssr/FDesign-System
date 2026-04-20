import { View } from '@tarojs/components';

import { ExhibitMultiLineNumericTitle } from './ExhibitMultiLineNumericTitle';

export function ExhibitMultiLineNumericTitleHarness() {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ExhibitMultiLineNumericTitle
        card={false}
        preLabel="二级文本"
        numericTitle="¥9294.02"
        preText="预设内容"
        showChevron
        showIcon
      />
      <ExhibitMultiLineNumericTitle
        card
        preLabel="二级文本"
        numericTitle="¥9294.02"
        showChevron
      />
    </View>
  );
}

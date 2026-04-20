import { View } from '@tarojs/components';

import { Icon } from '../../../icon';
import { ExhibitDefaultBlueTag } from '../_internal/exhibitParts';
import { ExhibitSingleLineLabel } from './ExhibitSingleLineLabel';

export function ExhibitSingleLineLabelHarness() {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ExhibitSingleLineLabel card={false} label="一级标题" showIcon />
      <ExhibitSingleLineLabel card label="一级标题" showIcon />
      <ExhibitSingleLineLabel
        card={false}
        label="一级标题"
        icon={<Icon name="security-center" size="s" tone="muted" />}
        tag={<ExhibitDefaultBlueTag>标签</ExhibitDefaultBlueTag>}
      />
      <ExhibitSingleLineLabel card label="一级标题" />
    </View>
  );
}

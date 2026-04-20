import { View } from '@tarojs/components';
import { colors, radii } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import {
  EXHIBIT_FRAME_WIDTH_CARD,
  EXHIBIT_FRAME_WIDTH_FLUSH,
} from '../_internal/ExhibitFrame';
import { GroupTitleH1 } from '../parts/GroupTitleH1';
import { SubListFlush } from '../parts/SubListFlush';
import type { ExhibitInformationListProps } from './ExhibitInformationList.types';

/** ExhibitInformationList（Figma 8275:10982）：信息列表 Tile（组标题 + 子行列表）。
 *  - card=true：外层 rounded 4 + overflow:hidden；card=false：原样 flush
 *  - 顶部 GroupTitleH1（14 Medium primary + 可选 "操作文本" 12 Medium blue）
 *  - 下接 SubListFlush（或 SubListCard，此处共用 SubListFlush + card 态） */
export function ExhibitInformationList({
  card = false,
  title,
  operation = '操作文本',
  onOperationPress,
  items,
  defaultRightKind = 'text',
}: ExhibitInformationListProps) {
  const outerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    background: colors.semantic.surface.base,
    borderRadius: card ? `${radii.default}px` : 0,
    overflow: card ? 'hidden' : undefined,
    width: `${card ? EXHIBIT_FRAME_WIDTH_CARD : EXHIBIT_FRAME_WIDTH_FLUSH}px`,
    flexShrink: 0,
    boxSizing: 'border-box',
  };

  return (
    <View
      className={`fd-form-exhibit-information-list fd-form-exhibit-information-list-${card ? 'card' : 'flush'}`}
      style={outerStyle}
    >
      <GroupTitleH1
        card={card}
        title={title}
        operation={operation ?? undefined}
        onOperationPress={onOperationPress}
        showBottomDivider
      />
      <SubListFlush card={card} items={items} defaultRightKind={defaultRightKind} />
    </View>
  );
}

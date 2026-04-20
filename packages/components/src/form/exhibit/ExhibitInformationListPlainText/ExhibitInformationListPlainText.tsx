import { View } from '@tarojs/components';
import { colors, radii } from '@fdesign/tokens';
import { useState } from 'react';
import type { CSSProperties } from 'react';

import {
  EXHIBIT_FRAME_WIDTH_CARD,
  EXHIBIT_FRAME_WIDTH_FLUSH,
} from '../_internal/ExhibitFrame';
import { FoldingPureHeader } from '../parts/FoldingPureHeader';
import { SubListFlush } from '../parts/SubListFlush';
import type { ExhibitInformationListPlainTextProps } from './ExhibitInformationListPlainText.types';

/** ExhibitInformationListPlainText（Figma 8275:8492）：折叠信息列表（纯文本）。
 *  - card + expand 双态；受控 `expanded` + 非受控 `defaultExpanded` + `onExpandChange`
 *  - 折叠态：52 高度标题行（card 无 divider；flush 有底部 hairline）
 *  - 展开态：FoldingPureHeader + SubListFlush（子行左右均为文本） */
export function ExhibitInformationListPlainText({
  card = false,
  title = '一级标题',
  rightText = '一级文本',
  items,
  expanded,
  defaultExpanded = false,
  onExpandChange,
}: ExhibitInformationListPlainTextProps) {
  const isControlled = expanded !== undefined;
  const [inner, setInner] = useState(defaultExpanded);
  const value = isControlled ? (expanded as boolean) : inner;

  const handleToggle = (next: boolean) => {
    if (!isControlled) setInner(next);
    onExpandChange?.(next);
  };

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
      className={`fd-form-exhibit-information-list-plain-text fd-form-exhibit-information-list-plain-text-${card ? 'card' : 'flush'} fd-form-exhibit-information-list-plain-text-${value ? 'expanded' : 'collapsed'}`}
      style={outerStyle}
    >
      <FoldingPureHeader
        card={card}
        title={title}
        rightText={rightText}
        expanded={value}
        onToggle={handleToggle}
        showBottomDivider={value || !card}
      />
      {value ? <SubListFlush card={card} items={items} defaultRightKind="text" /> : null}
    </View>
  );
}

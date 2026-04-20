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
import type { ExhibitInformationListAmountProps } from './ExhibitInformationListAmount.types';

/** ExhibitInformationListAmount（Figma 8275:8513）：折叠信息列表（金额）。
 *  - card + expand 双态；受控 + 非受控双模
 *  - 折叠态：52 高度标题行（card 无 divider；flush 有底部 hairline）；右侧金额 Roboto Medium 14/16 + 16px chevron
 *  - 展开态：FoldingPureHeader + SubListFlush
 *    - card=true: 子行右侧为 jump（浅色 tertiary 文本 + 12px 右箭头）
 *    - card=false: 子行右侧为 text（深色 primary 文本） */
export function ExhibitInformationListAmount({
  card = false,
  title = '一级标题',
  amount = '¥9999.99',
  items,
  expanded,
  defaultExpanded = false,
  onExpandChange,
}: ExhibitInformationListAmountProps) {
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

  const subRightKind: 'text' | 'jump' = card ? 'jump' : 'text';

  return (
    <View
      className={`fd-form-exhibit-information-list-amount fd-form-exhibit-information-list-amount-${card ? 'card' : 'flush'} fd-form-exhibit-information-list-amount-${value ? 'expanded' : 'collapsed'}`}
      style={outerStyle}
    >
      <FoldingPureHeader
        card={card}
        title={title}
        rightText={amount}
        rightNumeric
        expanded={value}
        onToggle={handleToggle}
        showBottomDivider={value || !card}
      />
      {value ? (
        <SubListFlush card={card} items={items} defaultRightKind={subRightKind} />
      ) : null}
    </View>
  );
}

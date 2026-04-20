import { View } from '@tarojs/components';
import type { CSSProperties, ReactNode } from 'react';

import { CollapseNestAmount } from '../CollapseNestAmount';
import type { SubInnercardItem } from '../SubInnercard';

export interface AmountNestListItem {
  key: string;
  title: ReactNode;
  amount: ReactNode;
  subItems: readonly SubInnercardItem[];
  /** 本项初始是否展开（非受控，默认 false；第一项建议 true） */
  defaultExpanded?: boolean;
}

export interface AmountNestListProps {
  items: readonly AmountNestListItem[];
}

const outerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  width: '100%',
};

/** AmountNestList（Figma 8987:24897）：多个 CollapseNestAmount 竖排。
 *  - 最后一项底部 hairline 关闭
 *  - 每项各自维持独立的非受控展开态（可由外层受控覆盖） */
export function AmountNestList({ items }: AmountNestListProps) {
  return (
    <View className="fd-form-exhibit-part-amount-nest-list" style={outerStyle}>
      {items.map((item, index) => (
        <CollapseNestAmount
          key={item.key}
          title={item.title}
          amount={item.amount}
          subItems={item.subItems}
          defaultExpanded={item.defaultExpanded}
          showBottomDivider={index < items.length - 1}
        />
      ))}
    </View>
  );
}

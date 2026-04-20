import { View } from '@tarojs/components';
import { colors, radii } from '@fdesign/tokens';
import type { CSSProperties, ReactNode } from 'react';

import type { TagColor } from '../../../../tag/Tag.types';
import { CellAmountTag } from '../CellAmountTag';

export interface AmountListItem {
  key: string;
  labelText: ReactNode;
  amount: ReactNode;
  tag?: ReactNode;
  tagColor?: TagColor;
}

export interface AmountListProps {
  items: readonly AmountListItem[];
}

const outerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  overflow: 'hidden',
  borderRadius: `${radii.default}px`,
  background: colors.semantic.surface.base,
  width: '100%',
};

/** AmountList（Figma 8997:28837）：rounded 4px 金额列表容器，每项 = CellAmountTag。
 *  - 外层 overflow:hidden + radius.default
 *  - 最后一行关闭 hairline */
export function AmountList({ items }: AmountListProps) {
  return (
    <View className="fd-form-exhibit-part-amount-list" style={outerStyle}>
      {items.map((item, index) => (
        <CellAmountTag
          key={item.key}
          labelText={item.labelText}
          amount={item.amount}
          tag={item.tag}
          tagColor={item.tagColor}
          showBottomDivider={index < items.length - 1}
        />
      ))}
    </View>
  );
}

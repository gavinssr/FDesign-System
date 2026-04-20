import { View } from '@tarojs/components';
import { spacing } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import { EXHIBIT_FRAME_WIDTH_CARD } from '../_internal/ExhibitFrame';
import { AmountList } from '../parts/AmountList';
import { ExternalTileAmount } from '../parts/ExternalTileAmount';
import type { ExhibitAmountListTitleExternalProps } from './ExhibitAmountListTitleExternal.types';

/** ExhibitAmountListTitleExternal（Figma 8417:9331）：外置标题 + 金额列表（固定 card）。
 *  - 外层 flex-col gap=12
 *  - 顶：ExternalTileAmount（"全部代还 ¥99999 包含以下账单"）
 *  - 底：AmountList（rounded 4，每项 CellAmountTag，末行关闭 hairline） */
export function ExhibitAmountListTitleExternal({
  prefix = '全部代还',
  amount = '¥99999',
  suffix = '包含以下账单',
  items,
}: ExhibitAmountListTitleExternalProps) {
  const outerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: `${spacing.scale[12]}px`,
    width: `${EXHIBIT_FRAME_WIDTH_CARD}px`,
    flexShrink: 0,
    boxSizing: 'border-box',
  };

  return (
    <View className="fd-form-exhibit-amount-list-title-external" style={outerStyle}>
      <ExternalTileAmount prefix={prefix} amount={amount} suffix={suffix} />
      <AmountList items={items} />
    </View>
  );
}

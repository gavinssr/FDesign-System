import type { ReactNode } from 'react';

import type { AmountListItem } from '../parts/AmountList';

export interface ExhibitAmountListTitleExternalProps {
  /** 外置标题前缀（14 Medium primary；默认 "全部代还"） */
  prefix?: ReactNode;
  /** 外置标题中部品牌色金额（BrandColor Small；默认 "¥99999"） */
  amount?: ReactNode;
  /** 外置标题后缀（14 Medium primary；默认 "包含以下账单"） */
  suffix?: ReactNode;
  /** 金额列表项集合（每项 = CellAmountTag） */
  items: readonly AmountListItem[];
}

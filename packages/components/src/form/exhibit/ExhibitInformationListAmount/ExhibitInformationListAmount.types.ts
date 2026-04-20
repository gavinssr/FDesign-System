import type { ReactNode } from 'react';

import type { SubListItem } from '../parts/SubListFlush';

export interface ExhibitInformationListAmountProps {
  card?: boolean;
  /** 主标题（14/16 Regular primary；默认 "一级标题"） */
  title?: ReactNode;
  /** 折叠行右侧金额（Roboto Medium 14/16 primary；默认 "¥9999.99"） */
  amount?: ReactNode;
  /** 展开态下的子行列表（card 态下右侧自动为 jump 类型，flush 态下为 text 类型） */
  items: readonly SubListItem[];
  /** 受控展开态 */
  expanded?: boolean;
  /** 非受控默认展开态 */
  defaultExpanded?: boolean;
  onExpandChange?: (next: boolean) => void;
}

import type { ReactNode } from 'react';

import type { SubListItem } from '../parts/SubListFlush';

export interface ExhibitInformationListPlainTextProps {
  card?: boolean;
  /** 主标题（14/16 Regular primary；默认 "一级标题"） */
  title?: ReactNode;
  /** 折叠行右侧主文本（14/16 Regular primary；默认 "一级文本"） */
  rightText?: ReactNode;
  /** 展开态下的子行列表（左右均为纯文本） */
  items: readonly SubListItem[];
  /** 受控展开态 */
  expanded?: boolean;
  /** 非受控默认展开态 */
  defaultExpanded?: boolean;
  onExpandChange?: (next: boolean) => void;
}

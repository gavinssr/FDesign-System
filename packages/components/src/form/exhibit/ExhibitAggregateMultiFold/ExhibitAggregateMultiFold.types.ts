import type { ReactNode } from 'react';

import type { AmountNestListItem } from '../parts/AmountNestList';

export interface ExhibitAggregateMultiFoldProps {
  /** 顶部主标题（16/18 Medium primary；默认 "一级标题"） */
  title?: ReactNode;
  /** 顶部右侧计数文本（12/14 Regular tertiary；默认 "共 N 笔"） */
  count?: ReactNode;
  /** 子折叠项集合；每项一个 CollapseNestAmount；第 1 项建议 defaultExpanded=true */
  items: readonly AmountNestListItem[];
  /** 顶部 jump 回调：绑定后整个顶部标题行可点击 */
  onJump?: () => void;
}

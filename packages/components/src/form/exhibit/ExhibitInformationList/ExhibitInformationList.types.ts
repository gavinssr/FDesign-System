import type { ReactNode } from 'react';

import type { SubListItem } from '../parts/SubListFlush';

export interface ExhibitInformationListProps {
  card?: boolean;
  /** 顶部组标题（14 Medium primary） */
  title: ReactNode;
  /** 右侧操作文本（默认 "操作文本"，传 `null` 关闭） */
  operation?: ReactNode | null;
  onOperationPress?: () => void;
  /** 子行列表（SubCell flush / card） */
  items: readonly SubListItem[];
  /** 子行右侧默认类型（text 或 jump），默认 text */
  defaultRightKind?: 'text' | 'jump';
}

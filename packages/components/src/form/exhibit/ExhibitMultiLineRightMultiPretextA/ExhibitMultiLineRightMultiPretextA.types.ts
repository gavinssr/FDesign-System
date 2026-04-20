import type { ReactNode } from 'react';

export interface ExhibitMultiLineRightMultiPretextAProps {
  card?: boolean;
  /** 左侧主标题（14/16 Regular primary） */
  label: ReactNode;
  /** 右侧主行文本（14 Regular primary） */
  rightPrimary: ReactNode;
  /** 右侧次行文本（12 Regular tertiary） */
  rightSecondary: ReactNode;
  /** 主动传入 leading 图标节点 */
  icon?: ReactNode;
  /** 当未传 icon 且此项为 true：渲染 24px 占位球 */
  showIcon?: boolean;
  /** 标题旁 tag slot */
  tag?: ReactNode;
}

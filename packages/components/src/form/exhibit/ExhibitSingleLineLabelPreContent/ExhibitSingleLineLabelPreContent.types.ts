import type { ReactNode } from 'react';

export interface ExhibitSingleLineLabelPreContentProps {
  card?: boolean;
  label: ReactNode;
  /** 主动传入 leading 图标节点 */
  icon?: ReactNode;
  /** 当未传 icon 且此项为 true：渲染 24px 占位球 */
  showIcon?: boolean;
  /** 标题右侧 tag slot */
  tag?: ReactNode;
  /** 右侧 preset text（预设内容） */
  preText: ReactNode;
  /** 右侧文本后是否渲染 16px supplement-annotation 注解图标 */
  showAnnotation?: boolean;
}

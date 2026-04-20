import type { ReactNode } from 'react';

export interface ExhibitMultiLineDefaultProps {
  card?: boolean;
  /** 主标题（14/16 Regular） */
  label: ReactNode;
  /** 次级副标题（12/14 Regular tertiary） */
  subLabel: ReactNode;
  /** 主动传入 leading 图标节点 */
  icon?: ReactNode;
  /** 当未传 icon 且此项为 true：渲染 24px 占位球 */
  showIcon?: boolean;
  /** 主标题旁 tag slot */
  tag?: ReactNode;
  /** 次级副标题后是否渲染 14px 注解图标（supplement-annotation） */
  subAnnotation?: boolean;
}

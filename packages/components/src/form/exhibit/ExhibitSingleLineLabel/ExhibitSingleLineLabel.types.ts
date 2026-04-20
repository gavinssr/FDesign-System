import type { ReactNode } from 'react';

export interface ExhibitSingleLineLabelProps {
  /** card=true：paddingX=10、圆角、无底部 hairline；card=false：paddingX=16、附底部 hairline */
  card?: boolean;
  /** 标题文本 */
  label: ReactNode;
  /** 主动传入 leading 图标节点（Icon / 自定义视觉） */
  icon?: ReactNode;
  /** 当未传 icon 且此项为 true：渲染 24px 占位球 */
  showIcon?: boolean;
  /** 标题右侧 tag slot（建议使用 `<Tag variant="outline" color="blue">…</Tag>`） */
  tag?: ReactNode;
}

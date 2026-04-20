import type { ReactNode } from 'react';

export interface ExhibitMultiLineNumericTitleProps {
  card?: boolean;
  /** 上方次级文本（12/14 Regular tertiary） */
  preLabel: ReactNode;
  /** 下方数字标题（Roboto Medium 18/20，带 -0.625px 紧缩字距） */
  numericTitle: ReactNode;
  /** 右侧预设内容（14 Regular secondary）；不传时不渲染右区 */
  preText?: ReactNode;
  /** 主动传入 leading 图标节点 */
  icon?: ReactNode;
  /** 当未传 icon 且此项为 true：渲染 24px 占位球 */
  showIcon?: boolean;
  /** 数字右侧是否渲染装饰 chevron（action-jump，16px，不可交互） */
  showChevron?: boolean;
}

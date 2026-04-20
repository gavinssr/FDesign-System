import type { ReactNode } from 'react';

export type NumberTitleSize = 'XL' | 'L' | 'M' | 'S';

export interface NumberTitleProps {
  size?: NumberTitleSize;
  children: ReactNode;
  /** 是否展示右侧 chevron；用于还原 Figma component properties */
  showArrow?: boolean;
}

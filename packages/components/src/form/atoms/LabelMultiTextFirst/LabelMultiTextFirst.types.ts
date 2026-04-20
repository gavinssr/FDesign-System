import type { ReactNode } from 'react';

export interface LabelMultiTextFirstProps {
  children: ReactNode;
  /** 是否展示右侧 chevron；用于对齐 Figma component properties */
  showArrow?: boolean;
}

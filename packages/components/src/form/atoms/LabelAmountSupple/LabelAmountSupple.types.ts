import type { ReactNode } from 'react';

export interface LabelAmountSuppleProps {
  /** 左侧补充说明 */
  prefix?: ReactNode;
  /** 金额内容；为兼容旧用法，未传时回退到 children */
  amount?: ReactNode;
  children?: ReactNode;
}

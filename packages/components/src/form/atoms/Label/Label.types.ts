import type { ReactNode } from 'react';

export type LabelSize = 'XL' | 'L' | 'M';

export interface LabelProps {
  size?: LabelSize;
  children: ReactNode;
}

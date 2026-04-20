import type { ReactNode } from 'react';

export type BrandColorSize = 'Large' | 'Small';

export interface BrandColorProps {
  size?: BrandColorSize;
  children: ReactNode;
}

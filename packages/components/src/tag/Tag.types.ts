import type { ReactNode } from 'react';

export type TagVariant = 'fill-primary' | 'outline' | 'fill-secondary';

export type TagColor = 'blue' | 'pink' | 'red' | 'yellow' | 'green' | 'purple' | 'grey';

export interface TagProps {
  children: ReactNode;
  variant?: TagVariant;
  color?: TagColor;
  couponPrefix?: ReactNode;
}

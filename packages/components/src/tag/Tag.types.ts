import type { ReactNode } from 'react';

export interface TagProps {
  children: ReactNode;
  tone?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  emphasis?: 'subtle' | 'solid';
}

import type { ReactNode } from 'react';

export interface TextProps {
  children: ReactNode;
  tone?: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  truncate?: boolean;
}

import type { ReactNode } from 'react';

export interface TextProps {
  children: ReactNode;
  tone?: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  weight?: 'light' | 'regular' | 'medium';
  truncate?: boolean;
}

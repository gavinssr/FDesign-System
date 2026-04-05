import type { ReactNode } from 'react';

export interface CardProps {
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  tone?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  padded?: boolean;
  interactive?: boolean;
  onPress?: () => void;
}

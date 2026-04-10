import type { ReactNode } from 'react';

export interface ButtonProps {
  variant?: 'primary-fill' | 'primary-outline' | 'secondary-outline';
  size?: 'xl' | 'l' | 'm' | 's' | 'xs' | 'mini';
  inactive?: boolean;
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
  children: ReactNode;
  onPress?: () => void;
}

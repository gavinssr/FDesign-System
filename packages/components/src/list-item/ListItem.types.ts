import type { ReactNode } from 'react';

export interface ListItemProps {
  title: string;
  description?: string;
  meta?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  disabled?: boolean;
  onPress?: () => void;
}

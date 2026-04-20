import type { ReactNode } from 'react';

export interface SelectionContentProps {
  selected: boolean;
  children?: ReactNode;
  text?: string;
  icon?: boolean;
  onChange?: (selected: boolean) => void;
}

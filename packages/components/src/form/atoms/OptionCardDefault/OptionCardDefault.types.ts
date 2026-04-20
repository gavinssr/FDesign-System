import type { ReactNode } from 'react';

export interface OptionCardDefaultProps {
  selected: boolean;
  children: ReactNode;
  onChange?: (selected: boolean) => void;
}

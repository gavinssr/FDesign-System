import type { ReactNode } from 'react';

export type TickTagStatus = 'default' | 'selected';

export interface TickTagProps {
  status?: TickTagStatus;
  children: ReactNode;
  onChange?: (selected: boolean) => void;
}

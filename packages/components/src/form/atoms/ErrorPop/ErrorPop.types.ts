import type { ReactNode } from 'react';

export interface ErrorPopProps {
  children: ReactNode;
  onClose?: () => void;
  actionLabel?: ReactNode;
}

import type { ReactNode } from 'react';

export interface OptionCardThumbProps {
  selected: boolean;
  thumbSrc?: string;
  title: ReactNode;
  description?: ReactNode;
  onChange?: (selected: boolean) => void;
}

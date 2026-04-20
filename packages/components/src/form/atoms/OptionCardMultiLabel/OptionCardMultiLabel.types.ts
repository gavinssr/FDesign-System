import type { ReactNode } from 'react';

export type OptionCardMultiLabelStatus = 'default' | 'selected';

export interface OptionCardMultiLabelProps {
  status?: OptionCardMultiLabelStatus;
  label: ReactNode;
  subLabel?: ReactNode;
  onChange?: (selected: boolean) => void;
}

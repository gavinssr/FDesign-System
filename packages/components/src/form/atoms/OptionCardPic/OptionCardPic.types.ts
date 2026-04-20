import type { ReactNode } from 'react';

export interface OptionCardPicProps {
  selected: boolean;
  imageSrc?: string;
  caption?: ReactNode;
  onChange?: (selected: boolean) => void;
}

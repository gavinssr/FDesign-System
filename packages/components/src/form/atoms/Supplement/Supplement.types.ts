export type SupplementIcon = 'annotation' | 'jump';

export interface SupplementProps {
  icon: SupplementIcon;
  onPress?: () => void;
}

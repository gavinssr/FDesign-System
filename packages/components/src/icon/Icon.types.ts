export type IconSource = 'local' | 'material';

export type IconSize = 'special-mini' | 'xxs' | 'xs' | 's' | 'm' | 'special-large';

export type IconTone = 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'danger';

export interface IconProps {
  name: string;
  source?: IconSource;
  size?: IconSize;
  tone?: IconTone;
  color?: string;
  decorative?: boolean;
  label?: string;
}

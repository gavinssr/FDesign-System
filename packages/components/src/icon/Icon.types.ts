export interface IconProps {
  name: 'search' | 'check' | 'info' | 'close' | 'chevron-right';
  size?: 'sm' | 'md' | 'lg';
  tone?: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'danger';
  decorative?: boolean;
  label?: string;
}

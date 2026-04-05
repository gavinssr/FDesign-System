export interface InputProps {
  value?: string;
  placeholder?: string;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  invalid?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onValueChange?: (value: string) => void;
}

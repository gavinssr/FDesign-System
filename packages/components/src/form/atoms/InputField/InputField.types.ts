export type InputFieldStatus = 'wait' | 'focus' | 'typing' | 'filled' | 'disabled' | 'error';

export type InputFieldAlign = 'left' | 'right';

export interface InputFieldProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  status?: InputFieldStatus;
  align?: InputFieldAlign;
  showDelete?: boolean;
  disabled?: boolean;
  maxLength?: number;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

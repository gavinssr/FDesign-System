export type SwitchSize = 'small' | 'large';

export interface SwitchProps {
  size?: SwitchSize;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

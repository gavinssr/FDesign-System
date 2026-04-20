import { View } from '@tarojs/components';

import { SelectionBox } from '../_internal/selectionBox';
import type { CheckboxProps } from './Checkbox.types';

export function Checkbox({ checked, disabled = false, onChange }: CheckboxProps) {
  return (
    <View
      className={`fd-form-checkbox${checked ? ' fd-form-checkbox-checked' : ''}${disabled ? ' fd-form-checkbox-disabled' : ''}`}
      style={{ display: 'inline-flex' }}
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : () => onChange?.(!checked)}
    >
      <SelectionBox shape="square" checked={checked} disabled={disabled} />
    </View>
  );
}

import { View } from '@tarojs/components';

import { SelectionBox } from '../_internal/selectionBox';
import type { RadioProps } from './Radio.types';

export function Radio({ checked, disabled = false, onChange }: RadioProps) {
  return (
    <View
      className={`fd-form-radio${checked ? ' fd-form-radio-checked' : ''}${disabled ? ' fd-form-radio-disabled' : ''}`}
      style={{ display: 'inline-flex' }}
      role="radio"
      aria-checked={checked}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : () => onChange?.(!checked)}
    >
      <SelectionBox shape="circle" checked={checked} disabled={disabled} />
    </View>
  );
}

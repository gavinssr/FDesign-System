import { View } from '@tarojs/components';

import { Input } from './Input';
import type { InputProps } from './Input.types';

const sizes: Array<NonNullable<InputProps['size']>> = ['sm', 'md', 'lg'];

const states = [
  { id: 'default', props: {} },
  { id: 'disabled', props: { disabled: true } },
  { id: 'invalid', props: { invalid: true, helperText: 'Value is required' } },
] as const;

export function InputHarness() {
  return (
    <View>
      {sizes.map((size) => (
        <View key={size}>
          {states.map((state) => (
            <Input
              key={`${size}-${state.id}`}
              size={size}
              label={`${size}-${state.id}`}
              placeholder="Type here"
              {...state.props}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

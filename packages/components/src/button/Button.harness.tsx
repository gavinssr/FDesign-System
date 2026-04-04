import { Text, View } from '@tarojs/components';

import { Button } from './Button';
import type { ButtonProps } from './Button.types';

const variants: Array<NonNullable<ButtonProps['variant']>> = [
  'primary',
  'secondary',
  'ghost',
  'danger',
];

const sizes: Array<NonNullable<ButtonProps['size']>> = ['sm', 'md', 'lg'];

const states = [
  { id: 'default', props: {} },
  { id: 'disabled', props: { disabled: true } },
  { id: 'loading', props: { loading: true } },
] as const;

export function ButtonHarness() {
  return (
    <View>
      {variants.map((variant) => (
        <View key={variant}>
          <Text>{variant}</Text>
          {sizes.map((size) => (
            <View key={`${variant}-${size}`}>
              {states.map((state) => (
                <Button
                  key={`${variant}-${size}-${state.id}`}
                  variant={variant}
                  size={size}
                  {...state.props}
                >
                  {`${variant}-${size}-${state.id}`}
                </Button>
              ))}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

import { Text, View } from '@tarojs/components';

import { Button } from './Button';
import type { ButtonProps } from './Button.types';

const variants: Array<NonNullable<ButtonProps['variant']>> = [
  'primary-fill',
  'primary-outline',
  'secondary-outline',
];

const sizes: Array<NonNullable<ButtonProps['size']>> = ['xl', 'l', 'm', 's', 'xs', 'mini'];

const states = [
  { id: 'default', props: {} },
  { id: 'inactive', props: { inactive: true } },
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

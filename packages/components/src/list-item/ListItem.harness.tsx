import { View } from '@tarojs/components';

import { Icon } from '../icon/Icon';
import { ListItem } from './ListItem';

const states = [
  { id: 'default', props: {} },
  { id: 'interactive', props: { onPress: () => undefined } },
  { id: 'disabled', props: { disabled: true } },
] as const;

export function ListItemHarness() {
  return (
    <View>
      {states.map((state) => (
        <ListItem
          key={state.id}
          title={`List item ${state.id}`}
          description="Supporting description"
          meta="Meta"
          leading={<Icon name="info" />}
          trailing={<Icon name="chevron-right" decorative />}
          {...state.props}
        />
      ))}
    </View>
  );
}

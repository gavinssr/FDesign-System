import { Text, View } from '@tarojs/components';

import { Card } from './Card';
import type { CardProps } from './Card.types';

const tones: Array<NonNullable<CardProps['tone']>> = [
  'default',
  'primary',
  'success',
  'warning',
  'danger',
];

export function CardHarness() {
  return (
    <View>
      {tones.map((tone) => (
        <Card
          key={tone}
          title={`${tone} card`}
          description="Card harness sample"
          tone={tone}
          interactive
        >
          <Text>{`This is the ${tone} body.`}</Text>
        </Card>
      ))}
    </View>
  );
}

import { Text, View } from '@tarojs/components';
import { Card } from '@fdesign/components';

import { StageShowcasePage } from '../../shell/StageShowcasePage';

const tones = ['default', 'primary', 'success', 'warning', 'danger'] as const;

export default function CardPage() {
  return (
    <StageShowcasePage
      heroTitle="Card 卡片"
      heroDescription="卡片用于承载一组关联信息与操作，适合在信息流、概览页和设置页中组织内容层级。"
      heroMeta={[
        { key: 'Tones', value: '5 种语气' },
        { key: 'States', value: 'default / interactive' },
        { key: 'Slots', value: 'title / description / body' },
      ]}
      sections={[
        {
          title: '语气 / Tones',
          children: (
            <View className="__stage-galleryGrid">
              {tones.map((tone) => (
                <Card
                  key={tone}
                  tone={tone}
                  title={`${tone} card`}
                  description="Card used in stage preview"
                >
                  <Text>{`Body content for ${tone}.`}</Text>
                </Card>
              ))}
            </View>
          ),
        },
        {
          title: '交互态 / Interactive',
          children: (
            <Card interactive title="Clickable card" description="Acts like a selection surface">
              <Text>Tap the card area to simulate selection.</Text>
            </Card>
          ),
        },
      ]}
    />
  );
}

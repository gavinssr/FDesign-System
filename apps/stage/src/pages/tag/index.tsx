import { Text, View } from '@tarojs/components';
import { Tag } from '@fdesign/components';

import { StageShowcasePage } from '../../shell/StageShowcasePage';

const tones = ['neutral', 'primary', 'success', 'warning', 'danger'] as const;

export default function TagPage() {
  return (
    <StageShowcasePage
      title="Tag 标签"
      heroTitle="Tag 标签"
      heroDescription="标签用于标记状态、分类和轻量信息，适合在列表、卡片和内容摘要中快速建立视觉识别。"
      heroMeta={[
        { key: 'Tones', value: '5 种语气' },
        { key: 'Emphasis', value: 'subtle / solid' },
        { key: 'Sizes', value: '2 种尺寸' },
      ]}
      sections={[
        {
          title: '语气与强调 / Tone And Emphasis',
          children: (
            <View className="__stage-overviewRow">
              {tones.map((tone) => (
                <View key={tone} className="__stage-captionedItem">
                  <View className="__stage-stack">
                    <Tag tone={tone}>{`${tone} subtle`}</Tag>
                    <Tag tone={tone} emphasis="solid">{`${tone} solid`}</Tag>
                  </View>
                  <Text className="__stage-metaKey">{tone}</Text>
                </View>
              ))}
            </View>
          ),
        },
        {
          title: '尺寸 / Sizes',
          children: (
            <View className="__stage-overviewRow">
              <View className="__stage-captionedItem">
                <Tag size="sm">small tag</Tag>
                <Text className="__stage-metaKey">SM</Text>
              </View>
              <View className="__stage-captionedItem">
                <Tag size="md">medium tag</Tag>
                <Text className="__stage-metaKey">MD</Text>
              </View>
            </View>
          ),
        },
      ]}
    />
  );
}

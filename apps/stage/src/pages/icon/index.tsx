import { Text, View } from '@tarojs/components';
import { Icon } from '@fdesign/components';

import { StageShowcasePage } from '../../shell/StageShowcasePage';

const names = ['search', 'check', 'info', 'close', 'chevron-right'] as const;
const tones = ['default', 'muted', 'primary', 'success', 'warning', 'danger'] as const;

export default function IconPage() {
  return (
    <StageShowcasePage
      title="Icon 图标"
      heroTitle="Icon 图标"
      heroDescription="图标用于补充识别、状态和方向信息，帮助用户在有限空间内更快理解交互语义。"
      heroMeta={[
        { key: 'Names', value: '5 个示例图标' },
        { key: 'Sizes', value: '3 种尺寸' },
        { key: 'Tones', value: '6 种语气' },
      ]}
      sections={[
        {
          title: '字形预览 / Glyph Preview',
          children: (
            <View className="__stage-overviewRow">
              {names.map((name) => (
                <View key={name} className="__stage-captionedItem">
                  <View className="__stage-preview">
                    <Icon name={name} size="sm" label={`${name} small`} />
                    <Icon name={name} size="md" label={`${name} medium`} />
                    <Icon name={name} size="lg" label={`${name} large`} />
                  </View>
                  <Text className="__stage-metaKey">{name}</Text>
                </View>
              ))}
            </View>
          ),
        },
        {
          title: '语气 / Tones',
          children: (
            <View className="__stage-overviewRow">
              {tones.map((tone) => (
                <View key={tone} className="__stage-captionedItem">
                  <Icon name="info" tone={tone} label={`${tone} icon`} />
                  <Text className="__stage-metaKey">{tone}</Text>
                </View>
              ))}
            </View>
          ),
        },
      ]}
    />
  );
}

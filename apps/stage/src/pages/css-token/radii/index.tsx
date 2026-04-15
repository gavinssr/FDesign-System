import { Text, View } from '@tarojs/components';
import { radii } from '@fdesign/tokens';

import { StageShowcasePage } from '../../../shell/StageShowcasePage';
import { RadiusPreview, TokenCard, flattenTokenEntries, getLeafLabel } from '../shared';

const radiiEntries = flattenTokenEntries(radii, 'radii');

export default function RadiiPage() {
  return (
    <StageShowcasePage
      title="Radii 圆角"
      heroTitle="Radii 圆角"
      heroDescription="展示当前协议中的四档圆角值，并用统一矩形容器示意不同圆角在舞台页中的实际视觉差异。"
      heroMeta={[
        { key: 'Scale', value: `${radiiEntries.length} 档` },
        { key: 'Protocol', value: '2 / 4 / 8 / 12' },
        { key: 'Preview', value: '统一矩形示意' },
        { key: 'CSS Var', value: '有镜像时一并展示' },
      ]}
      navKey="radii"
      galleryTitle="Gallery / 总览"
      galleryDescription="圆角页按协议固定四档展示，不额外扩展未确认档位。"
      sections={[
        {
          title: '视觉对照 / Usage Preview',
          children: (
            <View className="__stage-galleryCard">
              <Text className="__stage-galleryCardLabel">统一矩形示意</Text>
              <View className="__stage-overviewRow">
                {radiiEntries.map((entry) => (
                  <View key={entry.path} className="__stage-captionedItem">
                    <RadiusPreview radius={Number(entry.value)} />
                    <Text className="__stage-metaKey">{`${getLeafLabel(entry.path, 'radii.')} / ${entry.value}px`}</Text>
                  </View>
                ))}
              </View>
            </View>
          ),
        },
        {
          title: '圆角刻度 / Radius Scale',
          children: (
            <View className="__stage-galleryGrid">
              {radiiEntries.map((entry) => (
                <TokenCard
                  key={entry.path}
                  label={getLeafLabel(entry.path, 'radii.')}
                  path={entry.path}
                  value={entry.value}
                  preview={<RadiusPreview radius={Number(entry.value)} />}
                />
              ))}
            </View>
          ),
        },
      ]}
    />
  );
}

import { Text, View } from '@tarojs/components';
import { referenceColors, semanticColors } from '@fdesign/tokens';

import { StageShowcasePage } from '../../../shell/StageShowcasePage';
import { ColorSwatchPreview, TokenCard, flattenTokenEntries } from '../shared';

const referenceEntries = flattenTokenEntries(referenceColors, 'colors.reference');
const semanticEntries = flattenTokenEntries(semanticColors, 'colors.semantic');
const translucentEntries = flattenTokenEntries(semanticColors.translucent, 'colors.semantic.translucent');
const { translucent: semanticTranslucent, ...semanticWithoutTranslucent } = semanticColors;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function renderColorGroup(
  title: string,
  source: Record<string, unknown>,
  basePath: string,
  depth = 0,
): JSX.Element {
  const entries = Object.entries(source);
  const hasNestedGroup = entries.some(([, value]) => isPlainObject(value));

  if (!hasNestedGroup) {
    return (
      <View key={basePath} className="__stage-tokenGroup">
        {depth > 0 ? <Text className="__stage-tokenGroupTitle">{title}</Text> : null}
        <View className="__stage-galleryGrid">
          {entries.map(([key, value]) => {
            const path = `${basePath}.${key}`;

            return (
              <TokenCard
                key={path}
                label={key}
                path={path}
                value={value as string}
                preview={<ColorSwatchPreview color={String(value)} />}
              />
            );
          })}
        </View>
      </View>
    );
  }

  return (
    <View key={basePath} className="__stage-tokenGroup">
      {depth > 0 ? <Text className="__stage-tokenGroupTitle">{title}</Text> : null}
      <View className="__stage-tokenGroupStack">
        {entries.map(([key, value]) =>
          isPlainObject(value) ? renderColorGroup(key, value, `${basePath}.${key}`, depth + 1) : null,
        )}
      </View>
    </View>
  );
}

export default function ColorPage() {
  return (
    <StageShowcasePage
      heroTitle="Color 颜色"
      heroDescription="按 tokens 主源完整展开 reference 与 semantic 两层颜色值，并展示对应的预览色块、token 路径与实际色值。"
      heroMeta={[
        { key: 'Reference', value: `${referenceEntries.length} 项` },
        { key: 'Semantic', value: `${semanticEntries.length} 项` },
        { key: 'Translucent', value: `${translucentEntries.length} 项` },
        { key: 'Preview', value: '色块 + 值 + 路径' },
        { key: 'CSS Var', value: '有镜像时一并展示' },
      ]}
      galleryTitle="Gallery / 总览"
      sections={[
        {
          title: 'Reference',
          children: renderColorGroup('reference', referenceColors, 'colors.reference'),
        },
        {
          title: 'Semantic',
          children: renderColorGroup('semantic', semanticWithoutTranslucent, 'colors.semantic'),
        },
        {
          title: 'Translucent',
          children: renderColorGroup(
            'translucent',
            semanticTranslucent,
            'colors.semantic.translucent',
          ),
        },
      ]}
    />
  );
}

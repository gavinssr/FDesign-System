import { View } from '@tarojs/components';
import { spacingComponent, spacingScale, spacingSemantic } from '@fdesign/tokens';

import { StageShowcasePage } from '../../../shell/StageShowcasePage';
import {
  MeasurePreview,
  PaddingPreview,
  SizePreview,
  TokenCard,
  flattenTokenEntries,
  getLeafLabel,
} from '../shared';

type MeasureDirection = 'horizontal' | 'vertical';
type PaddingSides = 'all' | 'x' | 'y';

const scaleEntries = flattenTokenEntries(spacingScale, 'spacing.scale');
const semanticEntries = flattenTokenEntries(spacingSemantic, 'spacing.semantic');
const componentEntries = flattenTokenEntries(spacingComponent, 'spacing.component');

const semanticDirectionMap: Record<string, MeasureDirection> = {
  paddingPageX: 'horizontal',
  paddingCardX: 'horizontal',
  paddingFlushX: 'horizontal',
  paddingCardY: 'vertical',
  paddingModalX: 'horizontal',
  paddingModalY: 'vertical',
  gapBetweenCards: 'vertical',
  gapBetweenButtons: 'horizontal',
  gapBetweenListItems: 'vertical',
  gapBetweenFormAndButton: 'vertical',
  gapBottomNavbar: 'vertical',
  gapBetweenListSubheaderAndListItems: 'vertical',
  gapBetweenListGroups: 'vertical',
  marginListSubheader: 'vertical',
  gapCellTextY: 'vertical',
  gapCellIconLeadingY: 'vertical',
  gapRowCompactY: 'vertical',
  gapRowRegularY: 'vertical',
  borderWidthHairline: 'horizontal',
};

const componentDirectionMap: Record<string, MeasureDirection> = {
  'spacing.component.button.gap': 'horizontal',
  'spacing.component.button.paddingX.sm': 'horizontal',
  'spacing.component.button.paddingX.md': 'horizontal',
  'spacing.component.button.paddingX.lg': 'horizontal',
  'spacing.component.button.xl.paddingXFixed': 'horizontal',
  'spacing.component.button.xl.paddingXFluidMin': 'horizontal',
  'spacing.component.button.l.paddingXFixed': 'horizontal',
  'spacing.component.button.l.paddingXFluidMin': 'horizontal',
  'spacing.component.button.m.paddingXDefault': 'horizontal',
  'spacing.component.button.m.paddingXMin': 'horizontal',
  'spacing.component.button.s.paddingXDefault': 'horizontal',
  'spacing.component.button.xs.paddingXDefault': 'horizontal',
  'spacing.component.button.mini.paddingXDefault': 'horizontal',
  'spacing.component.input.paddingX.sm': 'horizontal',
  'spacing.component.input.paddingX.md': 'horizontal',
  'spacing.component.input.paddingX.lg': 'horizontal',
  'spacing.component.tag.paddingX.sm': 'horizontal',
  'spacing.component.tag.paddingX.md': 'horizontal',
  'spacing.component.card.headerGap': 'horizontal',
  'spacing.component.card.contentGap': 'vertical',
  'spacing.component.card.outerGap': 'vertical',
  'spacing.component.card.paddingX': 'horizontal',
  'spacing.component.card.paddingY': 'vertical',
  'spacing.component.modal.panelGap': 'vertical',
  'spacing.component.modal.titleBlockGap': 'vertical',
  'spacing.component.modal.headerGap': 'horizontal',
  'spacing.component.modal.paddingX': 'horizontal',
  'spacing.component.modal.paddingY': 'vertical',
  'spacing.component.listItem.gap': 'horizontal',
  'spacing.component.listItem.paddingX': 'horizontal',
  'spacing.component.listItem.paddingY': 'vertical',
  'spacing.component.formDisplay.doubleLine.contentGapY': 'vertical',
  'spacing.component.formDisplay.doubleLineNumeric.contentGapY': 'vertical',
  'spacing.component.formDisplay.face.contentGapY': 'vertical',
  'spacing.component.formDisplay.face.paddingY': 'vertical',
  'spacing.component.icon.size.specialMini.padding': 'horizontal',
  'spacing.component.icon.size.xxs.padding': 'horizontal',
  'spacing.component.icon.size.xs.padding': 'horizontal',
  'spacing.component.icon.size.s.padding': 'horizontal',
  'spacing.component.icon.size.m.padding': 'horizontal',
  'spacing.component.icon.size.specialLarge.padding': 'horizontal',
};

function isNumberEntry(value: unknown): value is number {
  return typeof value === 'number';
}

function getSemanticDirection(path: string) {
  const key = path.replace('spacing.semantic.', '');
  return semanticDirectionMap[key] ?? 'horizontal';
}

function isPaddingEntry(path: string) {
  return path.includes('.padding');
}

function getPaddingSides(path: string): PaddingSides {
  if (path.includes('paddingX')) {
    return 'x' as const;
  }

  if (path.includes('paddingY')) {
    return 'y' as const;
  }

  return 'all' as const;
}

function isComponentGapEntry(path: string) {
  return path in componentDirectionMap;
}

function getComponentDirection(path: string) {
  return componentDirectionMap[path] ?? 'horizontal';
}

function getMetricDirection(path: string): MeasureDirection {
  if (path.includes('minHeight')) {
    return 'vertical';
  }

  return 'horizontal';
}

const componentGapEntries = componentEntries.filter(
  (entry) => isComponentGapEntry(entry.path) && isNumberEntry(entry.value),
);
const componentMetricEntries = componentEntries.filter(
  (entry) => !isComponentGapEntry(entry.path) && isNumberEntry(entry.value),
);

const componentHorizontalEntries = componentGapEntries.filter(
  (entry) => getComponentDirection(entry.path) === 'horizontal',
);
const componentVerticalEntries = componentGapEntries.filter(
  (entry) => getComponentDirection(entry.path) === 'vertical',
);

export default function SpacingPage() {
  return (
    <StageShowcasePage
      heroTitle="Spacing 间距"
      heroDescription="完整展示基础刻度、语义间距与组件层空间协议。组件层不使用真实组件，而用示意矩形与浅红标注矩形表达实际间距。"
      heroMeta={[
        { key: 'Scale', value: `${scaleEntries.length} 项` },
        { key: 'Semantic', value: `${semanticEntries.length} 项` },
        { key: 'Component', value: `${componentEntries.length} 项` },
        { key: 'Preview', value: '示意矩形 + 标注值' },
      ]}
      galleryTitle="Gallery / 总览"
      sections={[
        {
          title: '基础刻度 / Scale',
          children: (
            <View className="__stage-galleryGrid">
              {scaleEntries.filter((entry) => isNumberEntry(entry.value)).map((entry) => (
                <TokenCard
                  key={entry.path}
                  label={getLeafLabel(entry.path, 'spacing.scale.')}
                  path={entry.path}
                  value={entry.value}
                  preview={<MeasurePreview value={entry.value} direction="horizontal" />}
                />
              ))}
            </View>
          ),
        },
        {
          title: '语义间距 / Semantic',
          children: (
            <View className="__stage-galleryGrid">
              {semanticEntries.filter((entry) => isNumberEntry(entry.value)).map((entry) => (
                <TokenCard
                  key={entry.path}
                  label={getLeafLabel(entry.path, 'spacing.semantic.')}
                  path={entry.path}
                  value={entry.value}
                  preview={
                    isPaddingEntry(entry.path) ? (
                      <PaddingPreview
                        value={entry.value}
                        sides={getPaddingSides(entry.path)}
                        direction={getSemanticDirection(entry.path)}
                      />
                    ) : (
                      <MeasurePreview value={entry.value} direction={getSemanticDirection(entry.path)} />
                    )
                  }
                />
              ))}
            </View>
          ),
        },
        {
          title: '组件横向间距 / Component Horizontal',
          children: (
            <View className="__stage-galleryGrid">
              {componentHorizontalEntries.map((entry) => (
                <TokenCard
                  key={entry.path}
                  label={getLeafLabel(entry.path, 'spacing.component.')}
                  path={entry.path}
                  value={entry.value}
                  preview={
                    isPaddingEntry(entry.path) ? (
                      <PaddingPreview value={entry.value} sides={getPaddingSides(entry.path)} direction="horizontal" />
                    ) : (
                      <MeasurePreview value={entry.value} direction="horizontal" />
                    )
                  }
                />
              ))}
            </View>
          ),
        },
        {
          title: '组件纵向间距 / Component Vertical',
          children: (
            <View className="__stage-galleryGrid">
              {componentVerticalEntries.map((entry) => (
                <TokenCard
                  key={entry.path}
                  label={getLeafLabel(entry.path, 'spacing.component.')}
                  path={entry.path}
                  value={entry.value}
                  preview={
                    isPaddingEntry(entry.path) ? (
                      <PaddingPreview value={entry.value} sides={getPaddingSides(entry.path)} direction="vertical" />
                    ) : (
                      <MeasurePreview value={entry.value} direction="vertical" />
                    )
                  }
                />
              ))}
            </View>
          ),
        },
        {
          title: '组件尺寸 / Component Metrics',
          children: (
            <View className="__stage-galleryGrid">
              {componentMetricEntries.map((entry) => (
                <TokenCard
                  key={entry.path}
                  label={getLeafLabel(entry.path, 'spacing.component.')}
                  path={entry.path}
                  value={entry.value}
                  preview={<SizePreview value={entry.value} direction={getMetricDirection(entry.path)} />}
                />
              ))}
            </View>
          ),
        },
      ]}
    />
  );
}

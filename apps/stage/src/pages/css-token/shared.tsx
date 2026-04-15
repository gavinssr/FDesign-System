import { Text, View } from '@tarojs/components';
import type { CSSProperties } from 'react';

type PrimitiveTokenValue = string | number | boolean | null | undefined;

export interface TokenLeafEntry {
  path: string;
  value: PrimitiveTokenValue;
}

type MeasureDirection = 'horizontal' | 'vertical';
type PaddingSides = 'all' | 'x' | 'y' | 'top' | 'right' | 'bottom' | 'left';

const CSS_VAR_BY_PATH: Record<string, string> = {
  'colors.semantic.surface.page': '--fd-color-page-background',
  'colors.semantic.surface.base': '--fd-color-surface-base',
  'colors.semantic.surface.muted': '--fd-color-surface-muted',
  'colors.semantic.surface.overlay': '--fd-color-surface-overlay',
  'colors.semantic.text.primary': '--fd-color-text-primary',
  'colors.semantic.text.secondary': '--fd-color-text-secondary',
  'colors.semantic.text.tertiary': '--fd-color-text-tertiary',
  'colors.semantic.border.subtle': '--fd-color-border-subtle',
  'colors.semantic.border.strong': '--fd-color-border-strong',
  'colors.semantic.action.primary.background': '--fd-color-primary-background',
  'colors.semantic.action.primary.subtleBackground': '--fd-color-primary-background-subtle',
  'colors.semantic.action.primary.subtleBorder': '--fd-color-primary-border',
  'colors.semantic.action.primary.outlineForeground': '--fd-color-primary-outline-foreground',
  'colors.semantic.action.primary.foreground': '--fd-color-primary-foreground-inverse',
  'colors.semantic.action.primary.inactiveBackground': '--fd-color-primary-inactive-background',
  'colors.semantic.action.primary.inactiveBorder': '--fd-color-primary-inactive-border',
  'colors.semantic.action.primary.inactiveForeground': '--fd-color-primary-inactive-foreground',
  'spacing.scale.0': '--fd-space-0',
  'spacing.scale.8': '--fd-space-8',
  'spacing.scale.10': '--fd-space-10',
  'spacing.scale.12': '--fd-space-12',
  'spacing.scale.16': '--fd-space-16',
  'spacing.scale.32': '--fd-space-32',
  'spacing.scale.40': '--fd-space-40',
  'spacing.semantic.borderWidthHairline': '--fd-border-width-hairline',
  'spacing.semantic.gapRowCompactY': '--fd-gap-row-compact',
  'spacing.semantic.gapRowRegularY': '--fd-gap-row-regular',
  'spacing.component.button.xl.minHeight': '--fd-button-xl-min-height',
  'spacing.component.button.xl.width': '--fd-button-xl-width',
  'spacing.component.button.xl.paddingXFixed': '--fd-button-xl-padding-x-fixed',
  'spacing.component.button.xl.paddingXFluidMin': '--fd-button-xl-padding-x-fluid-min',
  'spacing.component.button.xl.spinnerSize': '--fd-button-xl-spinner-size',
  'spacing.component.button.l.minHeight': '--fd-button-l-min-height',
  'spacing.component.button.l.width': '--fd-button-l-width',
  'spacing.component.button.l.paddingXFixed': '--fd-button-l-padding-x-fixed',
  'spacing.component.button.l.paddingXFluidMin': '--fd-button-l-padding-x-fluid-min',
  'spacing.component.button.l.spinnerSize': '--fd-button-l-spinner-size',
  'spacing.component.button.m.minHeight': '--fd-button-m-min-height',
  'spacing.component.button.m.paddingXDefault': '--fd-button-m-padding-x-default',
  'spacing.component.button.m.paddingXMin': '--fd-button-m-padding-x-min',
  'spacing.component.button.m.spinnerSize': '--fd-button-m-spinner-size',
  'spacing.component.button.s.minHeight': '--fd-button-s-min-height',
  'spacing.component.button.s.paddingXDefault': '--fd-button-s-padding-x-default',
  'spacing.component.button.s.spinnerSize': '--fd-button-s-spinner-size',
  'spacing.component.button.xs.minHeight': '--fd-button-xs-min-height',
  'spacing.component.button.xs.paddingXDefault': '--fd-button-xs-padding-x-default',
  'spacing.component.button.xs.spinnerSize': '--fd-button-xs-spinner-size',
  'spacing.component.button.mini.minHeight': '--fd-button-mini-min-height',
  'spacing.component.button.mini.paddingXDefault': '--fd-button-mini-padding-x-default',
  'spacing.component.button.mini.spinnerSize': '--fd-button-mini-spinner-size',
  'radii.small': '--fd-radius-small',
  'radii.default': '--fd-radius-default',
  'radii.large': '--fd-radius-large',
  'radii.xlarge': '--fd-radius-xlarge',
} as const;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function flattenTokenEntries(
  source: Record<string, unknown>,
  prefix = '',
): TokenLeafEntry[] {
  const entries: TokenLeafEntry[] = [];

  Object.entries(source).forEach(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;

    if (isPlainObject(value)) {
      entries.push(...flattenTokenEntries(value, path));
      return;
    }

    entries.push({ path, value: value as PrimitiveTokenValue });
  });

  return entries;
}

export function formatTokenValue(value: PrimitiveTokenValue) {
  if (value === null) {
    return 'null';
  }

  if (value === undefined) {
    return 'undefined';
  }

  return String(value);
}

export function getCssVarForPath(path: string) {
  return CSS_VAR_BY_PATH[path] ?? null;
}

export function getLeafLabel(path: string, prefix: string) {
  return path.startsWith(prefix) ? path.slice(prefix.length) : path;
}

interface TokenCardProps {
  label: string;
  path: string;
  value: PrimitiveTokenValue;
  preview?: JSX.Element;
}

export function TokenCard({ label, path, value, preview }: TokenCardProps) {
  const cssVar = getCssVarForPath(path);

  return (
    <View className="__stage-galleryCard">
      <View className="__stage-galleryCardHeader">
        <Text className="__stage-galleryCardLabel">{label}</Text>
      </View>
      {preview ? <View className="__stage-preview">{preview}</View> : null}
      <View className="__stage-kvList">
        <View className="__stage-kvRow">
          <Text className="__stage-kvKey">Path</Text>
          <Text className="__stage-kvValue">{path}</Text>
        </View>
        <View className="__stage-kvRow">
          <Text className="__stage-kvKey">Value</Text>
          <Text className="__stage-kvValue">{formatTokenValue(value)}</Text>
        </View>
        {cssVar ? (
          <View className="__stage-kvRow">
            <Text className="__stage-kvKey">CSS Var</Text>
            <Text className="__stage-kvValue">{cssVar}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

export function ColorSwatchPreview({ color }: { color: string }) {
  return <View className="__stage-tokenSwatch" style={{ background: color }} />;
}

export function RadiusPreview({ radius }: { radius: number }) {
  const style: CSSProperties = {
    borderRadius: `${radius}px`,
  };

  return <View className="__stage-radiusPreview" style={style} />;
}

export function SizePreview({
  value,
  direction,
}: {
  value: number;
  direction: MeasureDirection;
}) {
  const boundedValue = Math.max(2, Math.min(80, value));
  const style: CSSProperties =
    direction === 'horizontal'
      ? { width: `${boundedValue}px`, height: '24px' }
      : { width: '24px', height: `${boundedValue}px` };

  return (
    <View className="__stage-sizePreviewFrame">
      <View className="__stage-sizePreviewBlock" style={style} />
    </View>
  );
}

export function MeasurePreview({
  value,
  direction,
}: {
  value: number;
  direction: MeasureDirection;
}) {
  const blockSize = 80;
  const annotationStyle: CSSProperties =
    direction === 'horizontal'
      ? { width: `${value}px`, height: `${blockSize}px` }
      : { width: `${blockSize}px`, height: `${value}px` };

  if (direction === 'horizontal') {
    const labelStyle: CSSProperties = {
      left: `${blockSize + value / 2}px`,
      top: `${blockSize + 6}px`,
      transform: 'translateX(-50%)',
    };

    return (
      <View className="__stage-measurePreview __stage-measurePreviewHorizontal">
        <View className="__stage-measureHorizontalGroup">
          <View className="__stage-measureBlock" />
          <View className="__stage-measureAnnotation" style={annotationStyle} />
          <View className="__stage-measureBlock" />
        </View>
        <Text className="__stage-measureLabel __stage-measureLabelHorizontal" style={labelStyle}>{`${value}px`}</Text>
      </View>
    );
  }

  const labelStyle: CSSProperties = {
    left: `${blockSize + 8}px`,
    top: `${blockSize + value / 2}px`,
    transform: 'translateY(-50%)',
  };

  return (
    <View className="__stage-measurePreview __stage-measurePreviewVertical">
      <View className="__stage-measureVerticalGroup">
        <View className="__stage-measureBlock" />
        <View className="__stage-measureAnnotation __stage-measureAnnotationVertical" style={annotationStyle} />
        <View className="__stage-measureBlock" />
      </View>
      <Text className="__stage-measureLabel __stage-measureLabelVertical" style={labelStyle}>{`${value}px`}</Text>
    </View>
  );
}

export function PaddingPreview({
  value,
  sides,
  direction,
}: {
  value: number;
  sides: PaddingSides;
  direction: MeasureDirection;
}) {
  const previewStyle = {
    '--stage-padding-preview-value': `${value}px`,
  } as CSSProperties;

  const insetClassName = ['__stage-paddingPreviewInset'];

  if (sides === 'all') {
    insetClassName.push('__stage-paddingPreviewInsetAll');
  }

  if (sides === 'x') {
    insetClassName.push('__stage-paddingPreviewInsetX');
  }

  if (sides === 'y') {
    insetClassName.push('__stage-paddingPreviewInsetY');
  }

  if (sides === 'top') {
    insetClassName.push('__stage-paddingPreviewInsetTop');
  }

  if (sides === 'right') {
    insetClassName.push('__stage-paddingPreviewInsetRight');
  }

  if (sides === 'bottom') {
    insetClassName.push('__stage-paddingPreviewInsetBottom');
  }

  if (sides === 'left') {
    insetClassName.push('__stage-paddingPreviewInsetLeft');
  }

  if (direction === 'horizontal') {
    return (
      <View className="__stage-paddingPreview __stage-paddingPreviewHorizontal">
        <View className="__stage-paddingPreviewStack">
          <View className="__stage-paddingPreviewFrame" style={previewStyle}>
            <View className={insetClassName.join(' ')} />
          </View>
          <Text className="__stage-measureLabel __stage-measureLabelHorizontal">{`${value}px`}</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="__stage-paddingPreview __stage-paddingPreviewVertical">
      <View className="__stage-paddingPreviewRow">
        <View className="__stage-paddingPreviewFrame" style={previewStyle}>
          <View className={insetClassName.join(' ')} />
        </View>
        <Text className="__stage-measureLabel __stage-measureLabelVertical">{`${value}px`}</Text>
      </View>
    </View>
  );
}

import { View } from '@tarojs/components';
import { colors, spacing } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import { LocalIconRenderer } from './LocalIconRenderer';
import { MaterialIcon } from './MaterialIcon';
import type { IconProps, IconSize, IconTone } from './Icon.types';
import './Icon.module.css';
import { shouldUseCssVariables } from '../styleRuntime';
import { hasLocalIcon } from './iconRegistry';

type IconStyleVars = CSSProperties &
  Record<
    | '--icon-color'
    | '--icon-box'
    | '--icon-content-size'
    | '--icon-material-wght'
    | '--icon-material-grad',
    string
  >;

const toneStyles: Record<IconTone, Pick<IconStyleVars, '--icon-color'>> = {
  default: { '--icon-color': colors.semantic.icon.primary },
  muted: { '--icon-color': colors.semantic.text.secondary },
  primary: { '--icon-color': colors.semantic.action.primary.subtleForeground },
  success: { '--icon-color': colors.semantic.action.success.subtleForeground },
  warning: { '--icon-color': colors.semantic.action.warning.subtleForeground },
  danger: { '--icon-color': colors.semantic.action.danger.subtleForeground },
};

const sizeStyles: Record<
  IconSize,
  Pick<
    IconStyleVars,
    '--icon-box' | '--icon-content-size' | '--icon-material-wght' | '--icon-material-grad'
  > & {
    box: number;
    contentSize: number;
    strokeWidth: number;
    materialWeight: number;
    materialGrade: number;
  }
> = {
  'special-mini': {
    box: spacing.component.icon.size.specialMini.box,
    contentSize:
      spacing.component.icon.size.specialMini.box - spacing.component.icon.size.specialMini.padding * 2,
    strokeWidth: 0.8,
    materialWeight: 300,
    materialGrade: 40,
    '--icon-box': `${spacing.component.icon.size.specialMini.box}px`,
    '--icon-content-size': `${spacing.component.icon.size.specialMini.box - spacing.component.icon.size.specialMini.padding * 2}px`,
    '--icon-material-wght': '300',
    '--icon-material-grad': '40',
  },
  xxs: {
    box: spacing.component.icon.size.xxs.box,
    contentSize: spacing.component.icon.size.xxs.box - spacing.component.icon.size.xxs.padding * 2,
    strokeWidth: 1,
    materialWeight: 300,
    materialGrade: 0,
    '--icon-box': `${spacing.component.icon.size.xxs.box}px`,
    '--icon-content-size': `${spacing.component.icon.size.xxs.box - spacing.component.icon.size.xxs.padding * 2}px`,
    '--icon-material-wght': '300',
    '--icon-material-grad': '0',
  },
  xs: {
    box: spacing.component.icon.size.xs.box,
    contentSize: spacing.component.icon.size.xs.box - spacing.component.icon.size.xs.padding * 2,
    strokeWidth: 1,
    materialWeight: 240,
    materialGrade: 0,
    '--icon-box': `${spacing.component.icon.size.xs.box}px`,
    '--icon-content-size': `${spacing.component.icon.size.xs.box - spacing.component.icon.size.xs.padding * 2}px`,
    '--icon-material-wght': '240',
    '--icon-material-grad': '0',
  },
  s: {
    box: spacing.component.icon.size.s.box,
    contentSize: spacing.component.icon.size.s.box - spacing.component.icon.size.s.padding * 2,
    strokeWidth: 1.5,
    materialWeight: 300,
    materialGrade: 0,
    '--icon-box': `${spacing.component.icon.size.s.box}px`,
    '--icon-content-size': `${spacing.component.icon.size.s.box - spacing.component.icon.size.s.padding * 2}px`,
    '--icon-material-wght': '300',
    '--icon-material-grad': '0',
  },
  m: {
    box: spacing.component.icon.size.m.box,
    contentSize: spacing.component.icon.size.m.box - spacing.component.icon.size.m.padding * 2,
    strokeWidth: 1.5,
    materialWeight: 260,
    materialGrade: 0,
    '--icon-box': `${spacing.component.icon.size.m.box}px`,
    '--icon-content-size': `${spacing.component.icon.size.m.box - spacing.component.icon.size.m.padding * 2}px`,
    '--icon-material-wght': '260',
    '--icon-material-grad': '0',
  },
  'special-large': {
    box: spacing.component.icon.size.specialLarge.box,
    contentSize:
      spacing.component.icon.size.specialLarge.box - spacing.component.icon.size.specialLarge.padding * 2,
    strokeWidth: 1.5,
    materialWeight: 150,
    materialGrade: 0,
    '--icon-box': `${spacing.component.icon.size.specialLarge.box}px`,
    '--icon-content-size': `${spacing.component.icon.size.specialLarge.box - spacing.component.icon.size.specialLarge.padding * 2}px`,
    '--icon-material-wght': '150',
    '--icon-material-grad': '0',
  },
};

const legacyMaterialAliases: Record<string, string> = {
  check: 'check',
  info: 'info',
  'chevron-right': 'chevron_right',
};

function resolveSource(name: string, source?: IconProps['source']) {
  if (source) {
    return source;
  }

  return hasLocalIcon(name) ? 'local' : 'material';
}

function normalizeMaterialName(name: string) {
  return legacyMaterialAliases[name] ?? name.replace(/-/g, '_');
}

function toAriaLabel(name: string) {
  return name.replace(/[_-]/g, ' ');
}

export function Icon({
  name,
  source,
  size = 's',
  tone = 'default',
  color,
  decorative = false,
  label,
}: IconProps) {
  const useCssVariables = shouldUseCssVariables();
  const resolvedSource = resolveSource(name, source);
  const resolvedMaterialName = normalizeMaterialName(name);
  const resolvedColor = color ?? toneStyles[tone]['--icon-color'];
  const sizeStyle = sizeStyles[size];
  const className = [
    'fd-icon-root',
    `fd-icon-size-${size}`,
    `fd-icon-tone-${tone}`,
    `fd-icon-source-${resolvedSource}`,
  ].join(' ');

  const styleVars: IconStyleVars = {
    '--icon-color': resolvedColor,
    '--icon-box': sizeStyle['--icon-box'],
    '--icon-content-size': sizeStyle['--icon-content-size'],
    '--icon-material-wght': sizeStyle['--icon-material-wght'],
    '--icon-material-grad': sizeStyle['--icon-material-grad'],
  };
  const resolvedStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `${sizeStyle.box}px`,
    height: `${sizeStyle.box}px`,
    color: resolvedColor,
    lineHeight: 1,
    flexShrink: 0,
  };

  return (
    <View
      className={className}
      style={useCssVariables ? styleVars : resolvedStyle}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative}
      aria-label={decorative ? undefined : label ?? toAriaLabel(name)}
    >
      {resolvedSource === 'local' ? (
        <LocalIconRenderer
          name={name}
          contentSize={sizeStyle.contentSize}
          strokeWidth={sizeStyle.strokeWidth}
        />
      ) : (
        <MaterialIcon
          name={resolvedMaterialName}
          fontSize={sizeStyle.box}
          weight={sizeStyle.materialWeight}
          grade={sizeStyle.materialGrade}
          useCssVariables={useCssVariables}
        />
      )}
    </View>
  );
}

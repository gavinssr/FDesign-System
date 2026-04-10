import { Text, View } from '@tarojs/components';
import { colors, radii, spacing, typography } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import type { TagProps } from './Tag.types';
import './Tag.module.css';
import { shouldUseCssVariables } from '../styleRuntime';

type TagTone = NonNullable<TagProps['tone']>;
type TagSize = NonNullable<TagProps['size']>;
type TagEmphasis = NonNullable<TagProps['emphasis']>;

type TagStyleVars = CSSProperties &
  Record<
    | '--tag-bg'
    | '--tag-border'
    | '--tag-color'
    | '--tag-padding-x'
    | '--tag-min-height'
    | '--tag-font-size'
    | '--tag-radius',
    string
  >;

const tonePalette: Record<
  TagTone,
  {
    subtleBg: string;
    subtleBorder: string;
    subtleColor: string;
    solidBg: string;
    solidBorder: string;
    solidColor: string;
  }
> = {
  neutral: {
    subtleBg: colors.semantic.action.neutral.subtleBackground,
    subtleBorder: colors.semantic.action.neutral.subtleBorder,
    subtleColor: colors.semantic.text.secondary,
    solidBg: colors.semantic.text.primary,
    solidBorder: colors.semantic.text.primary,
    solidColor: colors.semantic.text.inversePrimary,
  },
  primary: {
    subtleBg: colors.semantic.action.primary.subtleBackground,
    subtleBorder: colors.semantic.action.primary.subtleBorder,
    subtleColor: colors.semantic.action.primary.subtleForeground,
    solidBg: colors.semantic.action.primary.background,
    solidBorder: colors.semantic.action.primary.border,
    solidColor: colors.semantic.action.primary.foreground,
  },
  success: {
    subtleBg: colors.semantic.action.success.subtleBackground,
    subtleBorder: colors.semantic.action.success.subtleBorder,
    subtleColor: colors.semantic.action.success.subtleForeground,
    solidBg: colors.semantic.action.success.background,
    solidBorder: colors.semantic.action.success.border,
    solidColor: colors.semantic.action.success.foreground,
  },
  warning: {
    subtleBg: colors.semantic.action.warning.subtleBackground,
    subtleBorder: colors.semantic.action.warning.subtleBorder,
    subtleColor: colors.semantic.action.warning.subtleForeground,
    solidBg: colors.semantic.action.warning.background,
    solidBorder: colors.semantic.action.warning.border,
    solidColor: colors.semantic.action.warning.foreground,
  },
  danger: {
    subtleBg: colors.semantic.action.danger.subtleBackground,
    subtleBorder: colors.semantic.action.danger.subtleBorder,
    subtleColor: colors.semantic.action.danger.subtleForeground,
    solidBg: colors.semantic.action.danger.background,
    solidBorder: colors.semantic.action.danger.border,
    solidColor: colors.semantic.action.danger.foreground,
  },
};

const sizeStyles: Record<
  TagSize,
  Pick<TagStyleVars, '--tag-padding-x' | '--tag-min-height' | '--tag-font-size'>
> = {
  sm: {
    '--tag-padding-x': `${spacing.component.tag.paddingX.sm}px`,
    '--tag-min-height': `${spacing.component.tag.minHeight.sm}px`,
    '--tag-font-size': `${typography.size.min}px`,
  },
  md: {
    '--tag-padding-x': `${spacing.component.tag.paddingX.md}px`,
    '--tag-min-height': `${spacing.component.tag.minHeight.md}px`,
    '--tag-font-size': `${typography.size.base}px`,
  },
};

function getToneStyles(tone: TagTone, emphasis: TagEmphasis): Pick<TagStyleVars, '--tag-bg' | '--tag-border' | '--tag-color'> {
  const palette = tonePalette[tone];

  if (emphasis === 'solid') {
    return {
      '--tag-bg': palette.solidBg,
      '--tag-border': palette.solidBorder,
      '--tag-color': palette.solidColor,
    };
  }

  return {
    '--tag-bg': palette.subtleBg,
    '--tag-border': palette.subtleBorder,
    '--tag-color': palette.subtleColor,
  };
}

export function Tag({
  children,
  tone = 'neutral',
  size = 'md',
  emphasis = 'subtle',
}: TagProps) {
  const useCssVariables = shouldUseCssVariables();
  const className = [
    'fd-tag-root',
    `fd-tag-tone-${tone}`,
    `fd-tag-size-${size}`,
    `fd-tag-emphasis-${emphasis}`,
  ].join(' ');

  const styleVars: TagStyleVars = {
    ...getToneStyles(tone, emphasis),
    ...sizeStyles[size],
    '--tag-radius': `${radii.small}px`,
  };
  const resolvedStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: sizeStyles[size]['--tag-min-height'],
    padding: `0 ${sizeStyles[size]['--tag-padding-x']}`,
    border: `1px solid ${getToneStyles(tone, emphasis)['--tag-border']}`,
    borderRadius: `${radii.small}px`,
    background: getToneStyles(tone, emphasis)['--tag-bg'],
  };
  const labelStyle: CSSProperties = {
    color: getToneStyles(tone, emphasis)['--tag-color'],
    fontSize: sizeStyles[size]['--tag-font-size'],
    fontWeight: typography.weight.medium,
    lineHeight: 1,
  };

  return (
    <View className={className} style={useCssVariables ? styleVars : resolvedStyle}>
      <Text className="fd-tag-label" style={useCssVariables ? undefined : labelStyle}>
        {children}
      </Text>
    </View>
  );
}

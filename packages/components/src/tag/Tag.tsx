import { Text, View } from '@tarojs/components';
import { colors, radii, spacing, typography } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import type { TagProps } from './Tag.types';
import './Tag.module.css';

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
    subtleBg: colors.neutral[100],
    subtleBorder: colors.neutral[200],
    subtleColor: colors.neutral[700],
    solidBg: colors.neutral[800],
    solidBorder: colors.neutral[800],
    solidColor: colors.neutral[0],
  },
  primary: {
    subtleBg: colors.primary[50],
    subtleBorder: colors.primary[100],
    subtleColor: colors.primary[700],
    solidBg: colors.primary[600],
    solidBorder: colors.primary[600],
    solidColor: colors.neutral[0],
  },
  success: {
    subtleBg: '#ECFDF3',
    subtleBorder: '#A6F4C5',
    subtleColor: colors.success[600],
    solidBg: colors.success[500],
    solidBorder: colors.success[500],
    solidColor: colors.neutral[0],
  },
  warning: {
    subtleBg: '#FFFAEB',
    subtleBorder: '#FDE68A',
    subtleColor: colors.warning[600],
    solidBg: colors.warning[500],
    solidBorder: colors.warning[500],
    solidColor: colors.neutral[0],
  },
  danger: {
    subtleBg: '#FEF3F2',
    subtleBorder: '#FECACA',
    subtleColor: colors.danger[600],
    solidBg: colors.danger[500],
    solidBorder: colors.danger[500],
    solidColor: colors.neutral[0],
  },
};

const sizeStyles: Record<
  TagSize,
  Pick<TagStyleVars, '--tag-padding-x' | '--tag-min-height' | '--tag-font-size'>
> = {
  sm: {
    '--tag-padding-x': `${spacing[2]}px`,
    '--tag-min-height': `${spacing[6]}px`,
    '--tag-font-size': `${typography.fontSize.xs}px`,
  },
  md: {
    '--tag-padding-x': `${spacing[3]}px`,
    '--tag-min-height': `${spacing[8]}px`,
    '--tag-font-size': `${typography.fontSize.sm}px`,
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
  const className = [
    'fd-tag-root',
    `fd-tag-tone-${tone}`,
    `fd-tag-size-${size}`,
    `fd-tag-emphasis-${emphasis}`,
  ].join(' ');

  const styleVars: TagStyleVars = {
    ...getToneStyles(tone, emphasis),
    ...sizeStyles[size],
    '--tag-radius': `${radii.full}px`,
  };

  return (
    <View className={className} style={styleVars}>
      <Text className="fd-tag-label">{children}</Text>
    </View>
  );
}

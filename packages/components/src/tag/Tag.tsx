import { Text, View } from '@tarojs/components';
import { colors, radii, spacing, typography } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import type { TagColor, TagProps, TagVariant } from './Tag.types';
import './Tag.module.css';
import { shouldUseCssVariables } from '../styleRuntime';

type TagStyleVars = CSSProperties &
  Record<
    | '--tag-bg'
    | '--tag-border'
    | '--tag-border-width'
    | '--tag-color'
    | '--tag-divider-color'
    | '--tag-coupon-gap'
    | '--tag-divider-height'
    | '--tag-padding-x'
    | '--tag-min-height'
    | '--tag-font-size'
    | '--tag-line-height'
    | '--tag-radius',
    string
  >;

const colorPalette = colors.semantic.tag;

function getVariantStyles(
  color: TagColor,
  variant: TagVariant,
): Pick<TagStyleVars, '--tag-bg' | '--tag-border' | '--tag-border-width' | '--tag-color' | '--tag-divider-color'> {
  const palette = colorPalette[color];

  if (variant === 'fill-primary') {
    return {
      '--tag-bg': palette.fillPrimaryBackground,
      '--tag-border': 'transparent',
      '--tag-border-width': '0px',
      '--tag-color': palette.fillPrimaryForeground,
      '--tag-divider-color': 'transparent',
    };
  }

  if (variant === 'fill-secondary') {
    return {
      '--tag-bg': palette.fillSecondaryBackground,
      '--tag-border': 'transparent',
      '--tag-border-width': '0px',
      '--tag-color': palette.fillSecondaryForeground,
      '--tag-divider-color': 'transparent',
    };
  }

  return {
    '--tag-bg': 'transparent',
    '--tag-border': palette.outlineBorder,
    '--tag-border-width': `${spacing.semantic.borderWidthHairline}px`,
    '--tag-color': palette.outlineForeground,
    '--tag-divider-color': palette.outlineDivider,
  };
}

export function Tag({
  children,
  variant = 'outline',
  color = 'blue',
  couponPrefix,
}: TagProps) {
  const useCssVariables = shouldUseCssVariables();
  const hasCoupon = couponPrefix !== undefined && couponPrefix !== null;
  const className = [
    'fd-tag-root',
    `fd-tag-variant-${variant}`,
    `fd-tag-color-${color}`,
    hasCoupon ? 'fd-tag-has-coupon' : '',
  ].join(' ');
  const variantStyles = getVariantStyles(color, variant);

  const styleVars: TagStyleVars = {
    ...variantStyles,
    '--tag-coupon-gap': `${spacing.component.tag.couponGap}px`,
    '--tag-divider-height': `${spacing.component.tag.couponDividerHeight}px`,
    '--tag-padding-x': `${spacing.component.tag.paddingX}px`,
    '--tag-min-height': `${spacing.component.tag.minHeight}px`,
    '--tag-font-size': `${typography.size.min}px`,
    '--tag-line-height': `${typography.lineHeight.singleLine.micro}px`,
    '--tag-radius': `${radii.small}px`,
  };
  const resolvedStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: `${spacing.component.tag.minHeight}px`,
    gap: hasCoupon ? `${spacing.component.tag.couponGap}px` : undefined,
    padding: `0 ${spacing.component.tag.paddingX}px`,
    borderStyle: 'solid',
    borderWidth: variantStyles['--tag-border-width'],
    borderColor: variantStyles['--tag-border'],
    borderRadius: `${radii.small}px`,
    background: variantStyles['--tag-bg'],
    boxSizing: 'border-box',
  };
  const labelStyle: CSSProperties = {
    color: variantStyles['--tag-color'],
    fontSize: `${typography.size.min}px`,
    fontWeight: typography.weight.regular,
    lineHeight: `${typography.lineHeight.singleLine.micro}px`,
  };
  const dividerStyle: CSSProperties = {
    height: `${spacing.component.tag.couponDividerHeight}px`,
    borderLeft: `${spacing.semantic.borderWidthHairline}px solid ${variantStyles['--tag-divider-color']}`,
    boxSizing: 'border-box',
  };

  return (
    <View className={className} style={useCssVariables ? styleVars : resolvedStyle}>
      {hasCoupon ? (
        <>
          <Text className="fd-tag-label" style={useCssVariables ? undefined : labelStyle}>
            {couponPrefix}
          </Text>
          <View className="fd-tag-divider" style={useCssVariables ? undefined : dividerStyle} />
        </>
      ) : null}
      <Text className="fd-tag-label" style={useCssVariables ? undefined : labelStyle}>
        {children}
      </Text>
    </View>
  );
}

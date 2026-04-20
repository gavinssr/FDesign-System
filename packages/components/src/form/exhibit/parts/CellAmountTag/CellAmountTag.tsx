import { View } from '@tarojs/components';
import { colors, spacing, typographyStyles } from '@fdesign/tokens';
import type { CSSProperties, ReactNode } from 'react';

import { LabelMultiTextSecondaryLightColor } from '../../../atoms/LabelMultiTextSecondaryLightColor';
import { FormText } from '../../../atoms/_internal/textPrimitive';
import { Tag } from '../../../../tag';
import type { TagColor } from '../../../../tag/Tag.types';

// Roboto 20 medium 紧缩字距（B.3 决议方案 A：局部常量）
const TIGHT_NUMERIC_LETTER_SPACING = -0.625;

export interface CellAmountTagProps {
  /** 浅色次级标签文本（12/14 tertiary） */
  labelText: ReactNode;
  /** 数字（Roboto Medium 20/22，紧缩字距） */
  amount: ReactNode;
  /** 可选标签；默认红色 outline "标签" */
  tag?: ReactNode;
  /** 当 tag 为默认时，指定 tag 颜色（blue/red/purple），默认 red */
  tagColor?: TagColor;
  /** 是否显示底部 hairline divider，默认 true（末行由父列表关闭） */
  showBottomDivider?: boolean;
}

const outerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  background: colors.semantic.surface.base,
  paddingLeft: `${spacing.semantic.paddingCardX}px`,
  paddingRight: `${spacing.semantic.paddingCardX}px`,
  width: '100%',
  position: 'relative',
};

/** CellAmountTag（Figma 8417:9026）：78 高度金额行。
 *  - paddingX=10、paddingY=16
 *  - 左：label 行（12 tertiary + 可选 outline tag gap 4）+ 数字行（Roboto Medium 20/22 primary）stack gap 8
 *  - 底部 hairline（末行由父列表关闭） */
export function CellAmountTag({
  labelText,
  amount,
  tag,
  tagColor = 'red',
  showBottomDivider = true,
}: CellAmountTagProps) {
  const innerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    paddingTop: `${spacing.component.exhibit.rowPaddingY}px`,
    paddingBottom: `${spacing.component.exhibit.rowPaddingY}px`,
    width: '100%',
    position: 'relative',
    boxShadow: showBottomDivider
      ? `inset 0 -${spacing.semantic.borderWidthHairline}px 0 0 ${colors.semantic.border.subtle}`
      : undefined,
  };
  const stackStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: `${spacing.scale[8]}px`,
  };
  const labelRowStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
  };

  return (
    <View className="fd-form-exhibit-part-cell-amount-tag" style={outerStyle}>
      <View className="fd-form-exhibit-part-cell-amount-tag-inner" style={innerStyle}>
        <View className="fd-form-exhibit-part-cell-amount-tag-stack" style={stackStyle}>
          <View className="fd-form-exhibit-part-cell-amount-tag-label" style={labelRowStyle}>
            <LabelMultiTextSecondaryLightColor>{labelText}</LabelMultiTextSecondaryLightColor>
            {tag !== undefined ? (
              tag
            ) : (
              <Tag variant="outline" color={tagColor}>
                标签
              </Tag>
            )}
          </View>
          <FormText
            spec={{
              style: typographyStyles.displayNumber20Medium,
              color: colors.semantic.text.primary,
              className: 'fd-form-exhibit-part-cell-amount-tag-amount',
            }}
            extraStyle={{ letterSpacing: `${TIGHT_NUMERIC_LETTER_SPACING}px` }}
          >
            {amount}
          </FormText>
        </View>
      </View>
    </View>
  );
}

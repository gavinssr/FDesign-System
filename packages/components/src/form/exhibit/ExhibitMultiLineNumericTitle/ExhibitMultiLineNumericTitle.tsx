import { View } from '@tarojs/components';
import { colors, spacing, typographyStyles } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import { Icon } from '../../../icon';
import { LabelMultiTextSecondaryLightColor } from '../../atoms/LabelMultiTextSecondaryLightColor';
import { FormText } from '../../atoms/_internal/textPrimitive';
import { ExhibitFrame } from '../_internal/ExhibitFrame';
import {
  ExhibitLeading,
  ExhibitLeadingTitle,
  ExhibitMultiLineStack,
  ExhibitPresetText,
} from '../_internal/exhibitParts';
import type { ExhibitMultiLineNumericTitleProps } from './ExhibitMultiLineNumericTitle.types';

// Roboto 18 medium 紧缩字距（B.3 决议方案 A：局部常量）
const TIGHT_NUMERIC_LETTER_SPACING = -0.625;

const rowStyle: CSSProperties = { justifyContent: 'space-between' };
const numericRowStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: `${spacing.component.exhibit.titleTagGap}px`,
  flexShrink: 0,
};
const infoStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  height: '16px',
  gap: `${spacing.component.exhibit.titleTagGap}px`,
  flexShrink: 0,
};

/** 多行左对齐数字标题 cell：preLabel + numericTitle（Roboto Medium 18/20，紧缩字距）+ 可选 chevron。
 *  Figma 8275:8468 */
export function ExhibitMultiLineNumericTitle({
  card = false,
  preLabel,
  numericTitle,
  preText,
  icon,
  showIcon = false,
  showChevron = false,
}: ExhibitMultiLineNumericTitleProps) {
  return (
    <ExhibitFrame
      card={card}
      className="fd-form-exhibit-multi-line-numeric-title"
      innerStyle={preText !== undefined ? rowStyle : undefined}
    >
      <ExhibitLeadingTitle>
        <ExhibitLeading icon={icon} showIcon={showIcon} />
        <ExhibitMultiLineStack align="start">
          <LabelMultiTextSecondaryLightColor>{preLabel}</LabelMultiTextSecondaryLightColor>
          <View className="fd-form-exhibit-numeric-row" style={numericRowStyle}>
            <FormText
              spec={{
                style: typographyStyles.displayNumber18Medium,
                color: colors.semantic.text.primary,
                className: 'fd-form-exhibit-numeric-value',
              }}
              extraStyle={{ letterSpacing: `${TIGHT_NUMERIC_LETTER_SPACING}px` }}
            >
              {numericTitle}
            </FormText>
            {showChevron ? (
              <Icon name="action-jump" size="xxs" tone="muted" decorative />
            ) : null}
          </View>
        </ExhibitMultiLineStack>
      </ExhibitLeadingTitle>
      {preText !== undefined ? (
        <View className="fd-form-exhibit-numeric-info" style={infoStyle}>
          <ExhibitPresetText>{preText}</ExhibitPresetText>
        </View>
      ) : null}
    </ExhibitFrame>
  );
}

import { View } from '@tarojs/components';
import { spacing } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import { LabelMultiTextSecondaryLightColor } from '../../atoms/LabelMultiTextSecondaryLightColor';
import { ExhibitFrame } from '../_internal/ExhibitFrame';
import {
  ExhibitLeading,
  ExhibitLeadingTitle,
  ExhibitMultiLineStack,
  ExhibitPresetText,
  ExhibitTitleInline,
} from '../_internal/exhibitParts';
import type { ExhibitMultiLinePretextProps } from './ExhibitMultiLinePretext.types';

const rowStyle: CSSProperties = { justifyContent: 'space-between' };
const infoStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  height: '16px',
  gap: `${spacing.component.exhibit.titleTagGap}px`,
  flexShrink: 0,
};

/** 多行左对齐（title + subLabel）+ 右侧预设内容。
 *  Figma 8275:8467 */
export function ExhibitMultiLinePretext({
  card = false,
  label,
  subLabel,
  preText,
  icon,
  showIcon = false,
  tag,
  subAnnotation = false,
}: ExhibitMultiLinePretextProps) {
  return (
    <ExhibitFrame
      card={card}
      className="fd-form-exhibit-multi-line-pretext"
      innerStyle={rowStyle}
    >
      <ExhibitLeadingTitle>
        <ExhibitLeading icon={icon} showIcon={showIcon} />
        <ExhibitMultiLineStack align="start">
          <ExhibitTitleInline tag={tag}>{label}</ExhibitTitleInline>
          <LabelMultiTextSecondaryLightColor annotation={subAnnotation}>
            {subLabel}
          </LabelMultiTextSecondaryLightColor>
        </ExhibitMultiLineStack>
      </ExhibitLeadingTitle>
      <View className="fd-form-exhibit-multi-line-pretext-info" style={infoStyle}>
        <ExhibitPresetText>{preText}</ExhibitPresetText>
      </View>
    </ExhibitFrame>
  );
}

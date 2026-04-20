import { View } from '@tarojs/components';
import { spacing } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import { Icon } from '../../../icon';
import { ExhibitFrame } from '../_internal/ExhibitFrame';
import {
  ExhibitLeading,
  ExhibitLeadingTitle,
  ExhibitPresetText,
  ExhibitTitleInline,
} from '../_internal/exhibitParts';
import type { ExhibitSingleLineLabelPreContentProps } from './ExhibitSingleLineLabelPreContent.types';

const rowStyle: CSSProperties = { justifyContent: 'space-between' };
const infoStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: `${spacing.component.exhibit.titleTagGap}px`,
  height: '16px',
  flexShrink: 0,
};

/** 单行展示类 cell（含右侧预设内容 + 可选注解图标）。
 *  Figma 8275:8466 */
export function ExhibitSingleLineLabelPreContent({
  card = false,
  label,
  icon,
  showIcon = false,
  tag,
  preText,
  showAnnotation = false,
}: ExhibitSingleLineLabelPreContentProps) {
  return (
    <ExhibitFrame
      card={card}
      className="fd-form-exhibit-single-line-precontent"
      innerStyle={rowStyle}
    >
      <ExhibitLeadingTitle>
        <ExhibitLeading icon={icon} showIcon={showIcon} />
        <ExhibitTitleInline tag={tag}>{label}</ExhibitTitleInline>
      </ExhibitLeadingTitle>
      <View className="fd-form-exhibit-single-line-precontent-info" style={infoStyle}>
        <ExhibitPresetText>{preText}</ExhibitPresetText>
        {showAnnotation ? (
          <Icon name="supplement-annotation" size="xxs" tone="muted" decorative />
        ) : null}
      </View>
    </ExhibitFrame>
  );
}

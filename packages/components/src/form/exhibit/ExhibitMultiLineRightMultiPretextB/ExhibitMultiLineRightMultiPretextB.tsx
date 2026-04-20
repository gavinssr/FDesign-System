import type { CSSProperties } from 'react';

import { ExhibitFrame } from '../_internal/ExhibitFrame';
import {
  ExhibitLeading,
  ExhibitLeadingTitle,
  ExhibitMultiLineStack,
  ExhibitPresetText,
  ExhibitRightPrimary,
  ExhibitRightSecondary,
} from '../_internal/exhibitParts';
import type { ExhibitMultiLineRightMultiPretextBProps } from './ExhibitMultiLineRightMultiPretextB.types';

const rowStyle: CSSProperties = { justifyContent: 'space-between' };

/** 多行右对齐多前置文本 B 组：左侧 icon + 预设内容，右侧两行（primary/secondary）。
 *  Figma 8275:8824 */
export function ExhibitMultiLineRightMultiPretextB({
  card = false,
  leftPreText,
  rightPrimary,
  rightSecondary,
  icon,
  showIcon = false,
}: ExhibitMultiLineRightMultiPretextBProps) {
  return (
    <ExhibitFrame
      card={card}
      className="fd-form-exhibit-multi-line-right-multi-b"
      innerStyle={rowStyle}
    >
      <ExhibitLeadingTitle>
        <ExhibitLeading icon={icon} showIcon={showIcon} />
        <ExhibitPresetText>{leftPreText}</ExhibitPresetText>
      </ExhibitLeadingTitle>
      <ExhibitMultiLineStack align="end">
        <ExhibitRightPrimary>{rightPrimary}</ExhibitRightPrimary>
        <ExhibitRightSecondary>{rightSecondary}</ExhibitRightSecondary>
      </ExhibitMultiLineStack>
    </ExhibitFrame>
  );
}

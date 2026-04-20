import type { CSSProperties } from 'react';

import { ExhibitFrame } from '../_internal/ExhibitFrame';
import {
  ExhibitLeading,
  ExhibitLeadingTitle,
  ExhibitMultiLineStack,
  ExhibitRightPrimary,
  ExhibitRightSecondary,
  ExhibitTitleInline,
} from '../_internal/exhibitParts';
import type { ExhibitMultiLineRightMultiPretextAProps } from './ExhibitMultiLineRightMultiPretextA.types';

const rowStyle: CSSProperties = { justifyContent: 'space-between' };

/** 多行右对齐多前置文本 A 组：左侧单行 title + 右侧两行（primary/secondary）。
 *  Figma 8275:8469 */
export function ExhibitMultiLineRightMultiPretextA({
  card = false,
  label,
  rightPrimary,
  rightSecondary,
  icon,
  showIcon = false,
  tag,
}: ExhibitMultiLineRightMultiPretextAProps) {
  return (
    <ExhibitFrame
      card={card}
      className="fd-form-exhibit-multi-line-right-multi-a"
      innerStyle={rowStyle}
    >
      <ExhibitLeadingTitle>
        <ExhibitLeading icon={icon} showIcon={showIcon} />
        <ExhibitTitleInline tag={tag}>{label}</ExhibitTitleInline>
      </ExhibitLeadingTitle>
      <ExhibitMultiLineStack align="end">
        <ExhibitRightPrimary>{rightPrimary}</ExhibitRightPrimary>
        <ExhibitRightSecondary>{rightSecondary}</ExhibitRightSecondary>
      </ExhibitMultiLineStack>
    </ExhibitFrame>
  );
}

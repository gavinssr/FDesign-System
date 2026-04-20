import { LabelMultiTextSecondaryLightColor } from '../../atoms/LabelMultiTextSecondaryLightColor';
import { ExhibitFrame } from '../_internal/ExhibitFrame';
import {
  ExhibitLeading,
  ExhibitLeadingTitle,
  ExhibitMultiLineStack,
  ExhibitTitleInline,
} from '../_internal/exhibitParts';
import type { ExhibitMultiLineDefaultProps } from './ExhibitMultiLineDefault.types';

/** 多行左对齐默认展示 cell：title + subLabel 两行左侧堆叠。
 *  Figma 8333:12737 */
export function ExhibitMultiLineDefault({
  card = false,
  label,
  subLabel,
  icon,
  showIcon = false,
  tag,
  subAnnotation = false,
}: ExhibitMultiLineDefaultProps) {
  return (
    <ExhibitFrame card={card} className="fd-form-exhibit-multi-line-default">
      <ExhibitLeadingTitle>
        <ExhibitLeading icon={icon} showIcon={showIcon} />
        <ExhibitMultiLineStack align="start">
          <ExhibitTitleInline tag={tag}>{label}</ExhibitTitleInline>
          <LabelMultiTextSecondaryLightColor annotation={subAnnotation}>
            {subLabel}
          </LabelMultiTextSecondaryLightColor>
        </ExhibitMultiLineStack>
      </ExhibitLeadingTitle>
    </ExhibitFrame>
  );
}

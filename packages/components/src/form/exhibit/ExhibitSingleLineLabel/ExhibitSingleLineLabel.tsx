import { ExhibitFrame } from '../_internal/ExhibitFrame';
import {
  ExhibitLeading,
  ExhibitLeadingTitle,
  ExhibitTitleInline,
} from '../_internal/exhibitParts';
import type { ExhibitSingleLineLabelProps } from './ExhibitSingleLineLabel.types';

/** 单行展示类 cell：leading icon（可选）+ title。
 *  Figma 12287:12197 */
export function ExhibitSingleLineLabel({
  card = false,
  label,
  icon,
  showIcon = false,
  tag,
}: ExhibitSingleLineLabelProps) {
  return (
    <ExhibitFrame card={card} className="fd-form-exhibit-single-line-label">
      <ExhibitLeadingTitle>
        <ExhibitLeading icon={icon} showIcon={showIcon} />
        <ExhibitTitleInline tag={tag}>{label}</ExhibitTitleInline>
      </ExhibitLeadingTitle>
    </ExhibitFrame>
  );
}

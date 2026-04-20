import { colors, fontFamilies, fontSize, fontWeight } from '@fdesign/tokens';
import { FormText } from '../_internal/textPrimitive';
import type { LabelResultSuppleProps } from './LabelResultSupple.types';

const RESULT_SUPPLE_STYLE = {
  fontFamily: fontFamilies.semantic.textChinese,
  fontSize: fontSize.min,
  lineHeight: 12,
  fontWeight: fontWeight.regular,
};

export function LabelResultSupple({ children }: LabelResultSuppleProps) {
  return (
    <FormText
      spec={{
        style: RESULT_SUPPLE_STYLE,
        color: colors.semantic.text.tertiary,
        className: 'fd-form-label-result-supple',
      }}
    >
      {children}
    </FormText>
  );
}

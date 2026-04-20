import { colors, typographyStyles } from '@fdesign/tokens';

import { FormText } from '../_internal/textPrimitive';
import type { LabelProps, LabelSize } from './Label.types';

const SPECS: Record<LabelSize, { style: typeof typographyStyles[keyof typeof typographyStyles]; color: string }> = {
  XL: { style: typographyStyles.head18Head, color: colors.semantic.text.primary },
  L: { style: typographyStyles.head16Sub, color: colors.semantic.text.primary },
  M: { style: typographyStyles.body14SingleLineStrong, color: colors.semantic.text.primary },
};

export function Label({ size = 'L', children }: LabelProps) {
  const s = SPECS[size];
  return (
    <FormText spec={{ style: s.style, color: s.color, className: `fd-form-label fd-form-label-${size}` }}>
      {children}
    </FormText>
  );
}

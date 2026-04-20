import { colors, typographyStyles } from '@fdesign/tokens';

import { FormText } from '../_internal/textPrimitive';
import type { BrandColorProps, BrandColorSize } from './BrandColor.types';

const SPECS = {
  Large: typographyStyles.displayNumber18Medium,
  Small: typographyStyles.displayNumber16Medium,
} satisfies Record<BrandColorSize, typeof typographyStyles[keyof typeof typographyStyles]>;

const TIGHT_NUMERIC_LETTER_SPACING = -0.625;

export function BrandColor({ size = 'Large', children }: BrandColorProps) {
  return (
    <FormText
      spec={{
        style: SPECS[size],
        color: colors.semantic.action.primary.background,
        className: `fd-form-brandcolor fd-form-brandcolor-${size}`,
      }}
      extraStyle={size === 'Large' ? { letterSpacing: `${TIGHT_NUMERIC_LETTER_SPACING}px` } : undefined}
    >
      {children}
    </FormText>
  );
}

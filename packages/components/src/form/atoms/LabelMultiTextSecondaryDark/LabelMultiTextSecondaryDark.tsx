import { colors, typographyStyles } from '@fdesign/tokens';
import { FormText } from '../_internal/textPrimitive';
import type { LabelMultiTextSecondaryDarkProps } from './LabelMultiTextSecondaryDark.types';

export function LabelMultiTextSecondaryDark({ children }: LabelMultiTextSecondaryDarkProps) {
  return (
    <FormText
      spec={{
        style: typographyStyles.body12SingleLine,
        color: colors.semantic.text.primary,
        className: 'fd-form-label-multi-secondary-dark',
      }}
    >
      {children}
    </FormText>
  );
}

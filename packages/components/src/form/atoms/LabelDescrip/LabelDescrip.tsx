import { colors, typographyStyles } from '@fdesign/tokens';
import { FormText } from '../_internal/textPrimitive';
import type { LabelDescripProps } from './LabelDescrip.types';

export function LabelDescrip({ children }: LabelDescripProps) {
  return (
    <FormText
      spec={{
        style: typographyStyles.body12SingleLine,
        color: colors.semantic.text.secondary,
        className: 'fd-form-label-descrip',
      }}
    >
      {children}
    </FormText>
  );
}

import { colors, typographyStyles } from '@fdesign/tokens';
import { FormText } from '../_internal/textPrimitive';
import type { OperationTextProps } from './OperationText.types';

export function TextOperator({ children }: OperationTextProps) {
  return (
    <FormText
      spec={{
        style: typographyStyles.body14SingleLineStrong,
        color: colors.semantic.text.primary,
        className: 'fd-form-operation-text',
      }}
      extraStyle={{ textAlign: 'right', whiteSpace: 'nowrap' }}
    >
      {children}
    </FormText>
  );
}

export const OperationText = TextOperator;

import { colors, typographyStyles } from '@fdesign/tokens';

import { FormText } from '../_internal/textPrimitive';
import type { WordLimitProps } from './WordLimit.types';

export function WordLimit({ current, max }: WordLimitProps) {
  const overflow = current > max;
  return (
    <FormText
      spec={{
        style: typographyStyles.body12SingleLine,
        color: overflow ? colors.semantic.action.danger.subtleForeground : colors.semantic.text.tertiary,
        className: `fd-form-word-limit${overflow ? ' fd-form-word-limit-overflow' : ''}`,
      }}
    >
      {`${current}/${max}`}
    </FormText>
  );
}

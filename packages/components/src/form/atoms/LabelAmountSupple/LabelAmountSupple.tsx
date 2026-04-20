import { View } from '@tarojs/components';
import { colors, fontFamilies, fontSize, fontWeight, lineHeight } from '@fdesign/tokens';

import { FormText } from '../_internal/textPrimitive';
import type { LabelAmountSuppleProps } from './LabelAmountSupple.types';

const AMOUNT_SUPPLE_STYLE = {
  fontFamily: fontFamilies.semantic.textChinese,
  fontSize: fontSize.min,
  lineHeight: lineHeight.singleLine.min,
  fontWeight: fontWeight.regular,
};

export function LabelAmountSupple({
  prefix,
  amount,
  children,
}: LabelAmountSuppleProps) {
  const resolvedAmount = amount ?? children;

  return (
    <View
      className="fd-form-label-amount-supple-row"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
    >
      {prefix ? (
        <FormText
          spec={{
            style: AMOUNT_SUPPLE_STYLE,
            color: colors.semantic.text.tertiary,
            className: 'fd-form-label-amount-supple-prefix',
          }}
        >
          {prefix}
        </FormText>
      ) : null}
      {resolvedAmount ? (
        <FormText
          spec={{
            style: AMOUNT_SUPPLE_STYLE,
            color: colors.semantic.text.tertiary,
            className: 'fd-form-label-amount-supple',
          }}
        >
          {resolvedAmount}
        </FormText>
      ) : null}
    </View>
  );
}

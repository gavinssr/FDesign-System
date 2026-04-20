import { View } from '@tarojs/components';
import { colors, fontFamilies, fontSize, fontWeight, spacing } from '@fdesign/tokens';

import { FormText } from '../_internal/textPrimitive';
import type { ErrorTipsProps } from './ErrorTips.types';

const ERROR_TIPS_STYLE = {
  fontFamily: fontFamilies.semantic.textChinese,
  fontSize: fontSize.min,
  lineHeight: 12,
  fontWeight: fontWeight.regular,
};

export function ErrorTips({ children, divider = false }: ErrorTipsProps) {
  return (
    <View
      className="fd-form-error-tips-wrap"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, width: '100%' }}
    >
      <FormText
        spec={{
          style: ERROR_TIPS_STYLE,
          color: colors.semantic.action.danger.subtleForeground,
          className: 'fd-form-error-tips',
        }}
      >
        {children}
      </FormText>
      {divider ? (
        <View
          className="fd-form-error-tips-divider"
          style={{
            width: '100%',
            height: spacing.semantic.borderWidthHairline,
            background: colors.semantic.action.danger.subtleBorder,
          }}
        />
      ) : null}
    </View>
  );
}

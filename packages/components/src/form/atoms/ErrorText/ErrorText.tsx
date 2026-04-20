import { View } from '@tarojs/components';
import { colors, spacing, typographyStyles } from '@fdesign/tokens';
import { FormText } from '../_internal/textPrimitive';
import type { ErrorTextProps } from './ErrorText.types';

export function ErrorText({ children, divider = false }: ErrorTextProps) {
  return (
    <View
      className="fd-form-error-text-wrap"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, width: '100%' }}
    >
      <FormText
        spec={{
          style: typographyStyles.body12Base,
          color: colors.semantic.action.danger.subtleForeground,
          className: 'fd-form-error-text',
        }}
        extraStyle={{ whiteSpace: 'pre-wrap' }}
      >
        {children}
      </FormText>
      {divider ? (
        <View
          className="fd-form-error-text-divider"
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

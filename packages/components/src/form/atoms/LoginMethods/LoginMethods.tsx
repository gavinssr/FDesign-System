import { View } from '@tarojs/components';
import { colors, spacing, typographyStyles } from '@fdesign/tokens';

import { Jump } from '../Jump';
import { FormText } from '../_internal/textPrimitive';
import type { LoginMethodsProps } from './LoginMethods.types';

export function LoginMethods({ text, onJump }: LoginMethodsProps) {
  const interactive = typeof onJump === 'function';
  return (
    <View
      className={`fd-form-login-methods${interactive ? ' fd-form-login-methods-interactive' : ''}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: spacing.scale[6] }}
      role={interactive ? 'link' : undefined}
      onClick={interactive ? () => onJump?.() : undefined}
    >
      <FormText
        spec={{
          style: typographyStyles.body14SingleLine,
          color: colors.semantic.text.secondary,
          className: 'fd-form-login-methods-text',
        }}
      >
        {text}
      </FormText>
      <Jump />
    </View>
  );
}

import { View } from '@tarojs/components';
import { colors, typographyStyles } from '@fdesign/tokens';

import { Icon } from '../../../icon';
import { FormText } from '../_internal/textPrimitive';
import type { LabelMultiTextFirstProps } from './LabelMultiTextFirst.types';

export function LabelMultiTextFirst({
  children,
  showArrow = false,
}: LabelMultiTextFirstProps) {
  return (
    <View
      className="fd-form-label-multi-first-row"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}
    >
      <FormText
        spec={{
          style: typographyStyles.body14SingleLine,
          color: colors.semantic.text.primary,
          className: 'fd-form-label-multi-first',
        }}
      >
        {children}
      </FormText>
      {showArrow ? (
        <View
          className="fd-form-label-multi-first-arrow"
          style={{ display: 'inline-flex', width: 16, height: 16, alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon name="collapse-off" size="xxs" tone="muted" decorative />
        </View>
      ) : null}
    </View>
  );
}

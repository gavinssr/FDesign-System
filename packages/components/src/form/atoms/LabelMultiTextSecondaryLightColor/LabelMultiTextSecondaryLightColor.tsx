import { View } from '@tarojs/components';
import { colors, typographyStyles } from '@fdesign/tokens';

import { Icon } from '../../../icon';
import { FormText } from '../_internal/textPrimitive';
import type { LabelMultiTextSecondaryLightColorProps } from './LabelMultiTextSecondaryLightColor.types';

export function LabelMultiTextSecondaryLightColor({
  children,
  annotation = false,
}: LabelMultiTextSecondaryLightColorProps) {
  return (
    <View
      className="fd-form-label-multi-secondary-light"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
    >
      <FormText
        spec={{
          style: typographyStyles.body12SingleLine,
          color: colors.semantic.text.tertiary,
          className: 'fd-form-label-multi-secondary-light-text',
        }}
      >
        {children}
      </FormText>
      {annotation ? (
        <View
          className="fd-form-label-multi-secondary-light-annotation"
          style={{
            display: 'inline-flex',
            width: 14,
            height: 14,
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'scale(0.875)',
            transformOrigin: 'center',
          }}
        >
          <Icon name="supplement-annotation" size="xxs" tone="muted" decorative />
        </View>
      ) : null}
    </View>
  );
}

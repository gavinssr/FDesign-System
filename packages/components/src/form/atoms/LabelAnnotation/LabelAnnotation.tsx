import { View } from '@tarojs/components';
import { colors, typographyStyles } from '@fdesign/tokens';

import { Icon } from '../../../icon';
import { FormText } from '../_internal/textPrimitive';
import type { LabelAnnotationProps } from './LabelAnnotation.types';

export function LabelAnnotation({
  children,
  showIcon = false,
}: LabelAnnotationProps) {
  return (
    <View
      className="fd-form-label-annotation-row"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}
    >
      <FormText
        spec={{
          style: typographyStyles.body14SingleLine,
          color: colors.semantic.text.secondary,
          className: 'fd-form-label-annotation',
        }}
      >
        {children}
      </FormText>
      {showIcon ? (
        <View
          className="fd-form-label-annotation-icon"
          style={{ display: 'inline-flex', width: 16, height: 16, alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon name="supplement-annotation" size="xxs" tone="muted" decorative />
        </View>
      ) : null}
    </View>
  );
}

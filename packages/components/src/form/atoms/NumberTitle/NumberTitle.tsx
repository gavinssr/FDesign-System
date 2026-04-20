import { View } from '@tarojs/components';
import { colors, typographyStyles } from '@fdesign/tokens';

import { Icon } from '../../../icon';
import { FormText } from '../_internal/textPrimitive';
import type { NumberTitleProps, NumberTitleSize } from './NumberTitle.types';

const SPECS = {
  XL: typographyStyles.displayNumber20Medium,
  L: typographyStyles.displayNumber18Medium,
  M: typographyStyles.displayNumber16Medium,
  S: typographyStyles.displayNumber14Medium,
} satisfies Record<NumberTitleSize, typeof typographyStyles[keyof typeof typographyStyles]>;

// Roboto 18/20 在 Figma 规范中带 letter-spacing: -0.625px（B.3 决议方案 A：仅在使用方组件局部常量）
const TIGHT_NUMERIC_LETTER_SPACING = -0.625;

const GAP_BY_SIZE: Record<NumberTitleSize, number> = {
  XL: 4,
  L: 2,
  M: 2,
  S: 2,
};

export function NumberTitle({ size = 'L', showArrow = false, children }: NumberTitleProps) {
  const isTight = size === 'XL' || size === 'L';
  return (
    <View
      className={`fd-form-numbertitle-row fd-form-numbertitle-row-${size}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: GAP_BY_SIZE[size] }}
    >
      <FormText
        spec={{
          style: SPECS[size],
          color: colors.semantic.text.primary,
          className: `fd-form-numbertitle fd-form-numbertitle-${size}`,
        }}
        extraStyle={isTight ? { letterSpacing: `${TIGHT_NUMERIC_LETTER_SPACING}px` } : undefined}
      >
        {children}
      </FormText>
      {showArrow ? (
        <View
          className="fd-form-numbertitle-arrow"
          style={{ display: 'inline-flex', width: 16, height: 16, alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon name="collapse-off" size="xxs" tone="muted" decorative />
        </View>
      ) : null}
    </View>
  );
}

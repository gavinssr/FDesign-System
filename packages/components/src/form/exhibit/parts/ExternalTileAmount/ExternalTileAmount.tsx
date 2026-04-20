import { View } from '@tarojs/components';
import { colors, typographyStyles } from '@fdesign/tokens';
import type { CSSProperties, ReactNode } from 'react';

import { BrandColor } from '../../../atoms/BrandColor';
import { FormText } from '../../../atoms/_internal/textPrimitive';

export interface ExternalTileAmountProps {
  /** 前缀文本（14/16 Medium primary，如 "全部代还"） */
  prefix: ReactNode;
  /** 品牌色金额（使用 BrandColor 原子，Small 档 Roboto Medium 16/18 brand.blue[8]） */
  amount?: ReactNode;
  /** 后缀文本（14/16 Medium primary，如 "包含以下账单"） */
  suffix?: ReactNode;
}

const outerStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'flex-start',
  paddingLeft: '2px',
  gap: '4px',
};

/** ExternalTileAmount（Figma 8417:8155）：AmountListTitleExternal 的外置标题行。
 *  - paddingL=2、gap=4、items-start
 *  - 左："全部代还" 14 Medium primary；中：BrandColor Small（Roboto Medium 16/18 brand.blue8）；右："包含以下账单" 14 Medium primary */
export function ExternalTileAmount({
  prefix,
  amount,
  suffix,
}: ExternalTileAmountProps) {
  return (
    <View className="fd-form-exhibit-part-external-tile-amount" style={outerStyle}>
      <FormText
        spec={{
          style: typographyStyles.body14SingleLineStrong,
          color: colors.semantic.text.primary,
          className: 'fd-form-exhibit-part-external-tile-amount-prefix',
        }}
      >
        {prefix}
      </FormText>
      {amount !== undefined ? <BrandColor size="Small">{amount}</BrandColor> : null}
      {suffix !== undefined ? (
        <FormText
          spec={{
            style: typographyStyles.body14SingleLineStrong,
            color: colors.semantic.text.primary,
            className: 'fd-form-exhibit-part-external-tile-amount-suffix',
          }}
        >
          {suffix}
        </FormText>
      ) : null}
    </View>
  );
}

import { View } from '@tarojs/components';
import { colors, radii, spacing, typographyStyles } from '@fdesign/tokens';
import type { CSSProperties, ReactNode } from 'react';

import { FormText } from '../../../atoms/_internal/textPrimitive';

export interface SubInnercardItem {
  key: string;
  /** 左侧首段（如 `第1/24期`，12 tertiary） */
  leading: ReactNode;
  /** 左侧二段描述（可溢出截断，12 tertiary） */
  description?: ReactNode;
  /** 右侧金额（12 tertiary，Roboto 非必需；接受 ReactNode） */
  amount: ReactNode;
}

export interface SubInnercardProps {
  items: readonly SubInnercardItem[];
}

const outerWrapperStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  background: colors.semantic.surface.base,
  paddingLeft: `${spacing.semantic.paddingCardX}px`,
  paddingRight: `${spacing.semantic.paddingCardX}px`,
  width: '100%',
};

/** SubInnercard（Figma 8417:3847）：AggregateMultiFold 展开态的二级单元。
 *  - 外层白底 paddingX=10（承接父 card 内部）
 *  - 每项内部：bg surface.page + rounded 4px（首/尾行对应首/尾圆角 → 简化为统一 4px 以避免跨行复杂度）
 *  - 行内 paddingX=10 paddingY=12（容器 h=36 由 line-height + padding 合成）
 *  - 左：leading (12 tertiary) + flex-1 description（12 tertiary，overflow clip），gap 8
 *  - 右：amount (12 tertiary) */
export function SubInnercard({ items }: SubInnercardProps) {
  return (
    <View className="fd-form-exhibit-part-subinnercard" style={outerWrapperStyle}>
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        const paddingTopExtra = isFirst ? 0 : 0;
        // 末行额外 paddingBottom=12 与 Figma "展示型/item/二级单元/尾部" 对齐
        const paddingBottomExtra = isLast ? `${spacing.component.exhibit.groupTitlePaddingY}px` : 0;
        const rowInnerStyle: CSSProperties = {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          height: '36px',
          background: colors.semantic.surface.page,
          paddingLeft: `${spacing.semantic.paddingCardX}px`,
          paddingRight: `${spacing.semantic.paddingCardX}px`,
          paddingTop: `${spacing.component.exhibit.groupTitlePaddingY}px`,
          paddingBottom: `${spacing.component.exhibit.groupTitlePaddingY}px`,
          boxSizing: 'border-box',
          borderTopLeftRadius: isFirst ? `${radii.default}px` : 0,
          borderTopRightRadius: isFirst ? `${radii.default}px` : 0,
          borderBottomLeftRadius: isLast ? `${radii.default}px` : 0,
          borderBottomRightRadius: isLast ? `${radii.default}px` : 0,
        };
        const rowContainerStyle: CSSProperties = {
          paddingBottom: paddingBottomExtra,
          paddingTop: paddingTopExtra,
        };
        const innerFlexStyle: CSSProperties = {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        };
        const leftGroup: CSSProperties = {
          display: 'inline-flex',
          alignItems: 'center',
          gap: `${spacing.scale[8]}px`,
          minWidth: 0,
          flex: '1 0 0',
        };
        const descStyle: CSSProperties = {
          minWidth: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        };

        return (
          <View
            key={item.key}
            className="fd-form-exhibit-part-subinnercard-row"
            style={rowContainerStyle}
          >
            <View className="fd-form-exhibit-part-subinnercard-row-inner" style={rowInnerStyle}>
              <View className="fd-form-exhibit-part-subinnercard-flex" style={innerFlexStyle}>
                <View className="fd-form-exhibit-part-subinnercard-left" style={leftGroup}>
                  <FormText
                    spec={{
                      style: typographyStyles.body12SingleLine,
                      color: colors.semantic.text.tertiary,
                      className: 'fd-form-exhibit-part-subinnercard-leading',
                    }}
                  >
                    {item.leading}
                  </FormText>
                  {item.description !== undefined ? (
                    <View className="fd-form-exhibit-part-subinnercard-description" style={descStyle}>
                      <FormText
                        spec={{
                          style: typographyStyles.body12SingleLine,
                          color: colors.semantic.text.tertiary,
                          className: 'fd-form-exhibit-part-subinnercard-description-text',
                        }}
                      >
                        {item.description}
                      </FormText>
                    </View>
                  ) : null}
                </View>
                <FormText
                  spec={{
                    style: typographyStyles.body12SingleLine,
                    color: colors.semantic.text.tertiary,
                    className: 'fd-form-exhibit-part-subinnercard-amount',
                  }}
                  extraStyle={{ textAlign: 'right' }}
                >
                  {item.amount}
                </FormText>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}

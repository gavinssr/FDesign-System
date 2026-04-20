import { View } from '@tarojs/components';
import { colors, spacing, typographyStyles } from '@fdesign/tokens';
import { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

import { Icon } from '../../../../icon';
import { FormText } from '../../../atoms/_internal/textPrimitive';
import { SubInnercard, type SubInnercardItem } from '../SubInnercard';

export interface CollapseNestAmountProps {
  title: ReactNode;
  /** 数字（Roboto Medium 16/18 primary） */
  amount: ReactNode;
  /** 展开态下渲染的二级单元项集合 */
  subItems: readonly SubInnercardItem[];
  /** 受控展开态 */
  expanded?: boolean;
  /** 非受控默认展开态 */
  defaultExpanded?: boolean;
  onToggle?: (next: boolean) => void;
  /** 是否显示底部 hairline divider，默认 true（AmountNestList 最后一项关闭） */
  showBottomDivider?: boolean;
}

const outerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  background: colors.semantic.surface.base,
  paddingLeft: `${spacing.semantic.paddingCardX}px`,
  paddingRight: `${spacing.semantic.paddingCardX}px`,
  width: '100%',
};

/** CollapseNestAmount（Figma 8417:4085）：AggregateMultiFold 展开态下的折叠金额行。
 *  - 折叠态：52 高度行 + bottom hairline
 *  - 展开态：52 高度 title 行 + SubInnercard
 *  - 标题行：14 Medium primary；数字：Roboto Medium 16/18 primary + 16px chevron
 *  - 受控 + 非受控双模 */
export function CollapseNestAmount({
  title,
  amount,
  subItems,
  expanded,
  defaultExpanded = false,
  onToggle,
  showBottomDivider = true,
}: CollapseNestAmountProps) {
  const isControlled = expanded !== undefined;
  const [inner, setInner] = useState(defaultExpanded);
  const value = isControlled ? (expanded as boolean) : inner;

  const handleToggle = () => {
    const next = !value;
    if (!isControlled) setInner(next);
    onToggle?.(next);
  };

  const headerRowStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '52px',
    paddingTop: `${spacing.component.exhibit.rowPaddingY}px`,
    paddingBottom: `${spacing.component.exhibit.rowPaddingY}px`,
    boxSizing: 'border-box',
    width: '100%',
    position: 'relative',
    boxShadow: showBottomDivider
      ? `inset 0 -${spacing.semantic.borderWidthHairline}px 0 0 ${colors.semantic.border.subtle}`
      : undefined,
  };
  const rightStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: `${spacing.component.exhibit.titleTagGap}px`,
  };

  return (
    <View className="fd-form-exhibit-part-collapse-nest-amount" style={outerStyle}>
      <View
        className="fd-form-exhibit-part-collapse-nest-amount-header"
        style={headerRowStyle}
        role="button"
        aria-expanded={value}
        onClick={handleToggle}
      >
        <FormText
          spec={{
            style: typographyStyles.body14SingleLineStrong,
            color: colors.semantic.text.primary,
            className: 'fd-form-exhibit-part-collapse-nest-amount-title',
          }}
        >
          {title}
        </FormText>
        <View className="fd-form-exhibit-part-collapse-nest-amount-right" style={rightStyle}>
          <FormText
            spec={{
              style: typographyStyles.displayNumber16Medium,
              color: colors.semantic.text.primary,
              className: 'fd-form-exhibit-part-collapse-nest-amount-amount',
            }}
          >
            {amount}
          </FormText>
          <View
            className="fd-form-exhibit-part-collapse-nest-amount-chevron"
            style={{
              display: 'inline-flex',
              width: `${spacing.component.exhibit.foldChevronSize}px`,
              height: `${spacing.component.exhibit.foldChevronSize}px`,
            }}
            aria-hidden
          >
            <Icon
              name={value ? 'collapse-on' : 'collapse-off'}
              size="xxs"
              tone="muted"
              decorative
            />
          </View>
        </View>
      </View>
      {value ? <SubInnercard items={subItems} /> : null}
    </View>
  );
}

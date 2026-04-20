import { View } from '@tarojs/components';
import { colors, radii, spacing, typographyStyles } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import { FormText } from '../../atoms/_internal/textPrimitive';
import { EXHIBIT_FRAME_WIDTH_CARD } from '../_internal/ExhibitFrame';
import { AmountNestList } from '../parts/AmountNestList';
import type { ExhibitAggregateMultiFoldProps } from './ExhibitAggregateMultiFold.types';

const outerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  background: colors.semantic.surface.base,
  borderRadius: `${radii.default}px`,
  overflow: 'hidden',
  width: `${EXHIBIT_FRAME_WIDTH_CARD}px`,
  flexShrink: 0,
  boxSizing: 'border-box',
};

/** ExhibitAggregateMultiFold（Figma 8417:5824）：聚合多折叠 cell（固定 card）。
 *  - 顶部 52px 标题行：16/18 Medium primary 主标题 + 右侧 12/14 tertiary 计数；带 bottom hairline
 *  - 标题行可选 onJump：绑定后 role="link" 点击触发
 *  - 下接 AmountNestList：N 个 CollapseNestAmount，各自非受控展开态 */
export function ExhibitAggregateMultiFold({
  title = '一级标题',
  count,
  items,
  onJump,
}: ExhibitAggregateMultiFoldProps) {
  const headerOuterStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    background: colors.semantic.surface.base,
    paddingLeft: `${spacing.semantic.paddingCardX}px`,
    paddingRight: `${spacing.semantic.paddingCardX}px`,
    width: '100%',
    position: 'relative',
  };
  const headerInnerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '52px',
    paddingTop: `${spacing.component.exhibit.rowPaddingY}px`,
    paddingBottom: `${spacing.component.exhibit.rowPaddingY}px`,
    boxSizing: 'border-box',
    width: '100%',
    position: 'relative',
    boxShadow: `inset 0 -${spacing.semantic.borderWidthHairline}px 0 0 ${colors.semantic.border.subtle}`,
  };
  const interactive = typeof onJump === 'function';
  const computedCount =
    count !== undefined ? count : items.length > 0 ? `共${items.length}笔` : undefined;

  return (
    <View className="fd-form-exhibit-aggregate-multi-fold" style={outerStyle}>
      <View className="fd-form-exhibit-aggregate-multi-fold-header" style={headerOuterStyle}>
        <View
          className="fd-form-exhibit-aggregate-multi-fold-header-inner"
          style={headerInnerStyle}
          role={interactive ? 'link' : undefined}
          onClick={interactive ? () => onJump?.() : undefined}
        >
          <FormText
            spec={{
              style: typographyStyles.head16Sub,
              color: colors.semantic.text.primary,
              className: 'fd-form-exhibit-aggregate-multi-fold-title',
            }}
          >
            {title}
          </FormText>
          {computedCount !== undefined ? (
            <FormText
              spec={{
                style: typographyStyles.body12SingleLine,
                color: colors.semantic.text.tertiary,
                className: 'fd-form-exhibit-aggregate-multi-fold-count',
              }}
            >
              {computedCount}
            </FormText>
          ) : null}
        </View>
      </View>
      <AmountNestList items={items} />
    </View>
  );
}

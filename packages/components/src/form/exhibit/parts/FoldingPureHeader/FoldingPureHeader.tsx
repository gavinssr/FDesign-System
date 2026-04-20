import { View } from '@tarojs/components';
import { colors, spacing, typographyStyles } from '@fdesign/tokens';
import type { CSSProperties, ReactNode } from 'react';

import { Icon } from '../../../../icon';
import { FormText } from '../../../atoms/_internal/textPrimitive';

export interface FoldingPureHeaderProps {
  card?: boolean;
  title: ReactNode;
  /** 右侧主文本（14/16 Regular primary）或数字（14/16 Roboto Medium primary） */
  rightText: ReactNode;
  /** 右侧文本是否为数字样式（Roboto Medium 数字），默认 false */
  rightNumeric?: boolean;
  /** 展开态 */
  expanded: boolean;
  onToggle?: (next: boolean) => void;
  /** 展开态是否仍显示底部 hairline，默认 true */
  showBottomDivider?: boolean;
  /** 标题左侧额外节点（如 tag） */
  titleTrailing?: ReactNode;
}

/** FoldingPureHeader（Figma 18707:10950）：折叠展示类 cell 头部。
 *  - 52px 高、paddingY=rowPaddingY(16)、paddingX 随 card/flush 切换
 *  - 左：Title（14/16 Regular primary）+ 可选 trailing
 *  - 右：一级文本（14/16 Regular primary，或 rightNumeric=true 时 Roboto Medium 14/16）+ chevron 16px（展开态箭头上、折叠态箭头下）
 *  - role=button，aria-expanded */
export function FoldingPureHeader({
  card = false,
  title,
  rightText,
  rightNumeric = false,
  expanded,
  onToggle,
  showBottomDivider = true,
  titleTrailing,
}: FoldingPureHeaderProps) {
  const outerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    background: colors.semantic.surface.base,
    paddingLeft: card
      ? `${spacing.semantic.paddingCardX}px`
      : `${spacing.semantic.paddingFlushX}px`,
    paddingRight: card
      ? `${spacing.semantic.paddingCardX}px`
      : `${spacing.semantic.paddingFlushX}px`,
    position: 'relative',
    width: '100%',
  };
  const innerStyle: CSSProperties = {
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
  const leftStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: `${spacing.component.exhibit.titleTagGap}px`,
  };
  const rightStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: `${spacing.component.exhibit.titleTagGap}px`,
  };

  const handleClick = () => onToggle?.(!expanded);

  return (
    <View className="fd-form-exhibit-part-fold-header" style={outerStyle}>
      <View
        className="fd-form-exhibit-part-fold-header-inner"
        style={innerStyle}
        role="button"
        aria-expanded={expanded}
        onClick={onToggle ? handleClick : undefined}
      >
        <View className="fd-form-exhibit-part-fold-header-left" style={leftStyle}>
          <FormText
            spec={{
              style: typographyStyles.body14SingleLineStrong,
              color: colors.semantic.text.primary,
              className: 'fd-form-exhibit-part-fold-header-title',
            }}
          >
            {title}
          </FormText>
          {titleTrailing}
        </View>
        <View className="fd-form-exhibit-part-fold-header-right" style={rightStyle}>
          <FormText
            spec={
              rightNumeric
                ? {
                    style: typographyStyles.displayNumber14Medium,
                    color: colors.semantic.text.primary,
                    className: 'fd-form-exhibit-part-fold-header-right-text',
                  }
                : {
                    style: typographyStyles.body14SingleLine,
                    color: colors.semantic.text.primary,
                    className: 'fd-form-exhibit-part-fold-header-right-text',
                  }
            }
          >
            {rightText}
          </FormText>
          <View
            className="fd-form-exhibit-part-fold-header-chevron"
            style={{
              display: 'inline-flex',
              width: `${spacing.component.exhibit.foldChevronSize}px`,
              height: `${spacing.component.exhibit.foldChevronSize}px`,
            }}
            aria-hidden
          >
            <Icon
              name={expanded ? 'collapse-on' : 'collapse-off'}
              size="xxs"
              tone="muted"
              decorative
            />
          </View>
        </View>
      </View>
    </View>
  );
}

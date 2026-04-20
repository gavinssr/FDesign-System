import { View } from '@tarojs/components';
import { colors, radii, spacing } from '@fdesign/tokens';
import type { CSSProperties, ReactNode } from 'react';

/** form/exhibit 内部共享：表单展示类 cell 的白底外框。
 *
 * 合同：
 * - 宽度按 Figma 设计稿固定：card=true → 355px、card=false → 375px；不跟随父容器拉伸
 * - card=true  → paddingX = paddingCardX(10)、圆角 radii.default、overflow:hidden、默认无底部 hairline
 * - card=false → paddingX = paddingFlushX(16)、无圆角、默认附加底部 hairline（通过 inset box-shadow，不占高度）
 * - 行内 paddingY 固定 spacing.component.exhibit.rowPaddingY(16)
 * - 背景固定 surface.base（白底）
 * - 可交互态由 cell 本体决定；Frame 仅负责几何与分隔线
 */
export interface ExhibitFrameProps {
  card?: boolean;
  children: ReactNode;
  /** 覆盖底部 hairline 显示策略；默认 flush=显示、card=隐藏 */
  showBottomDivider?: boolean;
  /** 附加到外层 className */
  className?: string;
  /** 附加到内部行容器 className */
  innerClassName?: string;
  /** 附加到内部行容器 style（会与默认 row 样式 shallow 合并） */
  innerStyle?: CSSProperties;
}

/** Figma 设计稿宽度：card=355 / flush=375（375 设备宽度 - 2 × 10 paddingPageX = 355） */
export const EXHIBIT_FRAME_WIDTH_CARD = 355;
export const EXHIBIT_FRAME_WIDTH_FLUSH = 375;

export function ExhibitFrame({
  card = false,
  children,
  showBottomDivider,
  className,
  innerClassName,
  innerStyle,
}: ExhibitFrameProps) {
  const paddingX = card ? spacing.semantic.paddingCardX : spacing.semantic.paddingFlushX;
  const outerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    position: 'relative',
    background: colors.semantic.surface.base,
    width: `${card ? EXHIBIT_FRAME_WIDTH_CARD : EXHIBIT_FRAME_WIDTH_FLUSH}px`,
    flexShrink: 0,
    boxSizing: 'border-box',
    paddingLeft: `${paddingX}px`,
    paddingRight: `${paddingX}px`,
    borderRadius: card ? `${radii.default}px` : 0,
    overflow: card ? 'hidden' : undefined,
  };
  const shouldShowDivider = showBottomDivider ?? !card;
  const innerCombined: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    paddingTop: `${spacing.component.exhibit.rowPaddingY}px`,
    paddingBottom: `${spacing.component.exhibit.rowPaddingY}px`,
    boxShadow: shouldShowDivider
      ? `inset 0 -${spacing.semantic.borderWidthHairline}px 0 0 ${colors.semantic.border.subtle}`
      : undefined,
    ...innerStyle,
  };
  return (
    <View
      className={`fd-form-exhibit-frame${card ? ' fd-form-exhibit-frame-card' : ' fd-form-exhibit-frame-flush'}${className ? ` ${className}` : ''}`}
      style={outerStyle}
    >
      <View
        className={`fd-form-exhibit-frame-inner${innerClassName ? ` ${innerClassName}` : ''}`}
        style={innerCombined}
      >
        {children}
      </View>
    </View>
  );
}

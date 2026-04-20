import { View } from '@tarojs/components';
import { colors, spacing, typographyStyles } from '@fdesign/tokens';
import type { CSSProperties, ReactNode } from 'react';

import { Icon } from '../../../../icon';
import { LabelMultiTextSecondaryLightColor } from '../../../atoms/LabelMultiTextSecondaryLightColor';
import { FormText } from '../../../atoms/_internal/textPrimitive';

export interface SubCellFlushProps {
  /** 外层 paddingX：card → 10，flush → 16 */
  card?: boolean;
  /** 左侧浅色次级文本 */
  leftText: ReactNode;
  /** 左侧文本后是否渲染 14px 注解图标 */
  leftAnnotation?: boolean;
  /** 右侧样式：text（深色 secondary）或 jump（浅色 secondary + 12px 右箭头 + 可点击） */
  right:
    | { kind: 'text'; text: ReactNode }
    | { kind: 'jump'; text: ReactNode; onJump?: () => void };
  /** 是否显示底部 hairline divider，默认 true（最后一行由 SubList 关闭） */
  showBottomDivider?: boolean;
}

/** SubCellFlush（Figma 8275:10360）：48px 高的子单元行。
 *  - 左：LabelMultiTextSecondaryLightColor（12/14 tertiary，可选注解）
 *  - 右：text → 12 Regular primary；jump → 12 Regular tertiary + 12px 右箭头
 *  - paddingY=16（子行固定 48 高度由 paddingY + line-height 组合达成）
 *  - card 态 paddingX=10；flush 态 paddingX=16
 *  - 底部 hairline（inset box-shadow），最后一行由外层关闭 */
export function SubCellFlush({
  card = false,
  leftText,
  leftAnnotation = false,
  right,
  showBottomDivider = true,
}: SubCellFlushProps) {
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
    height: `${spacing.component.exhibit.subCellHeight}px`,
    paddingTop: `${spacing.component.exhibit.subCellPaddingY}px`,
    paddingBottom: `${spacing.component.exhibit.subCellPaddingY}px`,
    boxSizing: 'border-box',
    width: '100%',
    position: 'relative',
    boxShadow: showBottomDivider
      ? `inset 0 -${spacing.semantic.borderWidthHairline}px 0 0 ${colors.semantic.border.subtle}`
      : undefined,
  };
  const jumpInteractive = right.kind === 'jump' && typeof right.onJump === 'function';
  const jumpGroupStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '2px',
  };

  return (
    <View className="fd-form-exhibit-part-subcell" style={outerStyle}>
      <View className="fd-form-exhibit-part-subcell-inner" style={innerStyle}>
        <LabelMultiTextSecondaryLightColor annotation={leftAnnotation}>
          {leftText}
        </LabelMultiTextSecondaryLightColor>
        {right.kind === 'text' ? (
          <FormText
            spec={{
              style: typographyStyles.body12SingleLine,
              color: colors.semantic.text.primary,
              className: 'fd-form-exhibit-part-subcell-text',
            }}
            extraStyle={{ textAlign: 'center' }}
          >
            {right.text}
          </FormText>
        ) : (
          <View
            className="fd-form-exhibit-part-subcell-jump"
            style={jumpGroupStyle}
            role={jumpInteractive ? 'link' : undefined}
            onClick={jumpInteractive ? () => right.onJump?.() : undefined}
          >
            <FormText
              spec={{
                style: typographyStyles.body12SingleLine,
                color: colors.semantic.text.tertiary,
                className: 'fd-form-exhibit-part-subcell-jump-text',
              }}
            >
              {right.text}
            </FormText>
            <Icon name="action-jump" size="special-mini" tone="muted" decorative />
          </View>
        )}
      </View>
    </View>
  );
}

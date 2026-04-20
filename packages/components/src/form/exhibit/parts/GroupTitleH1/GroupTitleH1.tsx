import { View } from '@tarojs/components';
import { colors, spacing, typographyStyles } from '@fdesign/tokens';
import type { CSSProperties, ReactNode } from 'react';

import { FormText } from '../../../atoms/_internal/textPrimitive';
import { ExhibitDefaultBlueTag } from '../../_internal/exhibitParts';

export interface GroupTitleH1Props {
  card?: boolean;
  title: ReactNode;
  showTag?: boolean;
  /** 右侧操作文本（TextButton 风格，12 Medium primary-blue）；string 时内部渲染，ReactNode 时原样 */
  operation?: ReactNode;
  onOperationPress?: () => void;
  /** 是否显示底部 hairline divider，默认 true */
  showBottomDivider?: boolean;
}

const titleInlineStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  height: '16px',
};

/** GroupTitleH1（Figma 8275:8525）：InformationList 顶部标题行。
 *  - flush: paddingX=16；card: paddingX=10
 *  - paddingY=groupTitlePaddingY(12)，内部 justify-between
 *  - 左：14 Medium primary 标题 + 可选蓝 outline tag
 *  - 右：TextButton 12 Medium primary-blue */
export function GroupTitleH1({
  card = false,
  title,
  showTag = false,
  operation,
  onOperationPress,
  showBottomDivider = true,
}: GroupTitleH1Props) {
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
    paddingTop: `${spacing.component.exhibit.groupTitlePaddingY}px`,
    paddingBottom: `${spacing.component.exhibit.groupTitlePaddingY}px`,
    width: '100%',
    position: 'relative',
    boxShadow: showBottomDivider
      ? `inset 0 -${spacing.semantic.borderWidthHairline}px 0 0 ${colors.semantic.border.subtle}`
      : undefined,
  };

  const interactive = typeof onOperationPress === 'function';

  return (
    <View className="fd-form-exhibit-part-group-title" style={outerStyle}>
      <View className="fd-form-exhibit-part-group-title-inner" style={innerStyle}>
        <View className="fd-form-exhibit-part-group-title-main" style={titleInlineStyle}>
          <FormText
            spec={{
              style: typographyStyles.body14SingleLineStrong,
              color: colors.semantic.text.primary,
              className: 'fd-form-exhibit-part-group-title-text',
            }}
          >
            {title}
          </FormText>
          {showTag ? <ExhibitDefaultBlueTag>标签</ExhibitDefaultBlueTag> : null}
        </View>
        {operation !== undefined ? (
          <View
            className="fd-form-exhibit-part-group-title-operation"
            role={interactive ? 'button' : undefined}
            onClick={interactive ? () => onOperationPress?.() : undefined}
          >
            {typeof operation === 'string' ? (
              <FormText
                spec={{
                  style: typographyStyles.body12SingleLineStrong,
                  color: colors.semantic.action.primary.background,
                  className: 'fd-form-exhibit-part-group-title-operation-text',
                }}
              >
                {operation}
              </FormText>
            ) : (
              operation
            )}
          </View>
        ) : null}
      </View>
    </View>
  );
}

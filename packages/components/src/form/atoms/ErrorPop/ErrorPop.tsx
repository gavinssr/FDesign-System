import { View } from '@tarojs/components';
import { colors, radii, spacing, typographyStyles } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import { FormText } from '../_internal/textPrimitive';
import type { ErrorPopProps } from './ErrorPop.types';

export function ErrorPop({
  children,
  onClose,
  actionLabel = '操作文本',
}: ErrorPopProps) {
  const outerStyle: CSSProperties = {
    display: 'block',
    width: '100%',
    padding: `0 ${spacing.scale[10]}px ${spacing.scale[8]}px`,
    boxSizing: 'border-box',
    background: colors.semantic.surface.base,
  };

  const bubbleStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.scale[8],
    height: 40,
    padding: `0 ${spacing.scale[10]}px`,
    borderRadius: `${radii.default}px`,
    background: colors.semantic.translucent.functionalRed.a30,
    position: 'relative',
    boxSizing: 'border-box',
  };

  const pointerStyle: CSSProperties = {
    position: 'absolute',
    top: -6,
    right: 23,
    width: 0,
    height: 0,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderBottom: `6px solid ${colors.semantic.translucent.functionalRed.a30}`,
  };

  const actionStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    padding: `0 ${spacing.scale[10]}px`,
    borderRadius: `${radii.default}px`,
    background: colors.semantic.surface.base,
    border: `${spacing.semantic.borderWidthHairline}px solid ${colors.semantic.border.subtle}`,
    flexShrink: 0,
  };

  return (
    <View className="fd-form-error-pop" style={outerStyle} role="alert">
      <View className="fd-form-error-pop-bubble" style={bubbleStyle}>
        <View className="fd-form-error-pop-pointer" style={pointerStyle} />
        <FormText
          spec={{
            style: typographyStyles.body10Min,
            color: colors.semantic.action.danger.subtleForeground,
            className: 'fd-form-error-pop-text',
          }}
          extraStyle={{ lineHeight: '10px' }}
        >
          {children}
        </FormText>
        {onClose ? (
          <View
            className="fd-form-error-pop-close"
            role="button"
            aria-label="关闭"
            onClick={() => onClose()}
            style={actionStyle}
          >
            <FormText
              spec={{
                style: typographyStyles.body12SingleLineStrong,
                color: colors.semantic.text.primary,
                className: 'fd-form-error-pop-action',
              }}
            >
              {actionLabel}
            </FormText>
          </View>
        ) : null}
      </View>
    </View>
  );
}

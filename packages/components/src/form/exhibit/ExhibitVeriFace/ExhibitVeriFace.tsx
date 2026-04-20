import { Text, View } from '@tarojs/components';
import { colors, radii, spacing, typographyStyles } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import { getDecorativeIconDefinition } from '../../../icon/iconRegistry';
import { EXHIBIT_FRAME_WIDTH_CARD } from '../_internal/ExhibitFrame';
import type { ExhibitVeriFaceProps } from './ExhibitVeriFace.types';

/* veriFace 装饰色（B.1 决议：不入 token，作为组件内部常量） */
const COLORS = {
  successAccent: '#407aff',
  successBlue: '#4d83ff',
  successCyan: '#00a9fe',
  failedPink: '#ff85e3',
  promptMuted: colors.semantic.text.tertiary,
  failTitle: colors.semantic.text.primary,
  failReason: colors.semantic.text.tertiary,
} as const;

const ICON_SIZE = 100;

function renderDecorative(name: string): JSX.Element | null {
  const def = getDecorativeIconDefinition(name);
  if (!def) return null;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={def.width}
      height={def.height}
      viewBox={def.viewBox}
      aria-hidden
      style={{ display: 'block' }}
    >
      {def.render()}
    </svg>
  );
}

/** 人脸验证 cell（固定 card）。
 *  Figma 8333:12497。
 *  装饰 SVG 走 `decorativeIconRegistry` 新分类（`veri-face-*` / `veri-frame-*` / `veri-scan-bar`），
 *  与 Icon 组件的 outline 主分类显式区分。 */
export function ExhibitVeriFace({
  veriFailed = false,
  highlightUserName = '*凯',
  promptText = '请根据提示完成刷脸操作',
  failedTitle = '验证失败',
  failedReason = '失败原因：光线不足',
}: ExhibitVeriFaceProps) {
  const frameOuterStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: colors.semantic.surface.base,
    borderRadius: `${radii.default}px`,
    width: `${EXHIBIT_FRAME_WIDTH_CARD}px`,
    flexShrink: 0,
    boxSizing: 'border-box',
    paddingLeft: `${spacing.semantic.paddingCardX}px`,
    paddingRight: `${spacing.semantic.paddingCardX}px`,
    minHeight: '220px',
  };
  const innerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: veriFailed ? '16px' : '28px',
    paddingTop: veriFailed ? '28px' : '36px',
    paddingBottom: veriFailed ? '40px' : '36px',
    width: '100%',
  };
  const iconBoxStyle: CSSProperties = {
    position: 'relative',
    width: `${ICON_SIZE}px`,
    height: `${ICON_SIZE}px`,
    flexShrink: 0,
  };
  const layerFullStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const scanLayerStyle: CSSProperties = {
    position: 'absolute',
    left: '3%',
    right: '3%',
    top: '50%',
    transform: 'translateY(-50%)',
  };
  const faceStyle: CSSProperties = {
    ...layerFullStyle,
    /* 人脸占 frame 内部约 64% */
    padding: '18%',
    boxSizing: 'border-box',
  };

  const frameName = veriFailed ? 'veri-frame-failed' : 'veri-frame-success';
  const faceName = veriFailed ? 'veri-face-failed' : 'veri-face-success';

  return (
    <View
      className={`fd-form-exhibit-veriface${veriFailed ? ' fd-form-exhibit-veriface-failed' : ' fd-form-exhibit-veriface-success'}`}
      style={frameOuterStyle}
    >
      <View className="fd-form-exhibit-veriface-inner" style={innerStyle}>
        <View className="fd-form-exhibit-veriface-graphic" style={iconBoxStyle} aria-hidden>
          <View className="fd-form-exhibit-veriface-frame" style={layerFullStyle}>
            {renderDecorative(frameName)}
          </View>
          <View className="fd-form-exhibit-veriface-scan" style={scanLayerStyle}>
            {renderDecorative('veri-scan-bar')}
          </View>
          <View className="fd-form-exhibit-veriface-face" style={faceStyle}>
            {renderDecorative(faceName)}
          </View>
        </View>

        {veriFailed ? (
          <View
            className="fd-form-exhibit-veriface-message"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Text
              style={{
                fontFamily: typographyStyles.head16Sub.fontFamily,
                fontSize: `${typographyStyles.head16Sub.fontSize}px`,
                lineHeight: `${typographyStyles.head16Sub.lineHeight}px`,
                fontWeight: typographyStyles.head16Sub.fontWeight,
                color: COLORS.failTitle,
              }}
            >
              {failedTitle}
            </Text>
            <Text
              style={{
                fontFamily: typographyStyles.body14SingleLine.fontFamily,
                fontSize: `${typographyStyles.body14SingleLine.fontSize}px`,
                lineHeight: `${typographyStyles.body14SingleLine.lineHeight}px`,
                fontWeight: typographyStyles.body14SingleLine.fontWeight,
                color: COLORS.failReason,
              }}
            >
              {failedReason}
            </Text>
          </View>
        ) : (
          <View
            className="fd-form-exhibit-veriface-prompt"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              fontFamily: typographyStyles.body14SingleLine.fontFamily,
              fontSize: `${typographyStyles.body14SingleLine.fontSize}px`,
              lineHeight: '14px',
            }}
          >
            <Text
              style={{
                color: COLORS.successBlue,
                fontWeight: 500,
              }}
            >
              {highlightUserName}
            </Text>
            <Text style={{ color: COLORS.promptMuted, fontWeight: 400 }}>{promptText}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

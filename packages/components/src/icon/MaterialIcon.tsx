import { Text as TaroText } from '@tarojs/components';
import type { CSSProperties } from 'react';

interface MaterialIconProps {
  name: string;
  fontSize: number;
  weight: number;
  grade: number;
  useCssVariables: boolean;
}

export function MaterialIcon({
  name,
  fontSize,
  weight,
  grade,
  useCssVariables,
}: MaterialIconProps) {
  const fallbackStyle: CSSProperties = useCssVariables
    ? {}
    : {
        fontSize: `${fontSize}px`,
        fontFamily: '"Material Symbols Rounded"',
        fontWeight: 'normal',
        fontStyle: 'normal',
        lineHeight: 1,
        display: 'inline-block',
        whiteSpace: 'nowrap',
        WebkitFontSmoothing: 'antialiased',
        fontVariationSettings: `'FILL' 0, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' 24`,
      };

  return (
    <TaroText className="fd-icon-glyph fd-icon-glyph-material" style={fallbackStyle} aria-hidden="true">
      {name}
    </TaroText>
  );
}

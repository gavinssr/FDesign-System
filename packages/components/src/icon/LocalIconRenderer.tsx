import { View } from '@tarojs/components';
import type { CSSProperties } from 'react';

import { getLocalIconDefinition } from './iconRegistry';

interface LocalIconRendererProps {
  name: string;
  contentSize: number;
  strokeWidth: number;
}

function MissingLocalIcon({ contentSize, strokeWidth }: Omit<LocalIconRendererProps, 'name'>) {
  const shapeStyle: CSSProperties = {
    width: `${contentSize}px`,
    height: `${contentSize}px`,
    display: 'block',
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={shapeStyle}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="4.5" y="4.5" width="15" height="15" rx="2" vectorEffect="non-scaling-stroke" />
      <path d="M8 8L16 16" vectorEffect="non-scaling-stroke" />
      <path d="M16 8L8 16" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function LocalIconRenderer({ name, contentSize, strokeWidth }: LocalIconRendererProps) {
  const iconDefinition = getLocalIconDefinition(name);
  const shapeStyle: CSSProperties = {
    width: `${contentSize}px`,
    height: `${contentSize}px`,
    display: 'block',
  };

  return (
    <View className="fd-icon-glyph fd-icon-glyph-local">
      {iconDefinition ? (
        <svg
          viewBox={iconDefinition.viewBox ?? '0 0 24 24'}
          fill="none"
          style={shapeStyle}
          aria-hidden="true"
          focusable="false"
        >
          <path
            d={iconDefinition.d}
            fill="currentColor"
            fillRule={iconDefinition.fillRule}
            clipRule={iconDefinition.clipRule}
          />
        </svg>
      ) : (
        <MissingLocalIcon contentSize={contentSize} strokeWidth={strokeWidth} />
      )}
    </View>
  );
}

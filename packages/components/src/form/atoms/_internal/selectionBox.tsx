import { View } from '@tarojs/components';
import { colors } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

export type SelectionShape = 'square' | 'circle' | 'tick';

export function SelectionBox({
  shape,
  checked,
  disabled = false,
  size = 18,
}: {
  shape: SelectionShape;
  checked: boolean;
  disabled?: boolean;
  size?: number;
}) {
  const isCircle = shape === 'circle';
  const isTick = shape === 'tick';
  const borderColor = checked
    ? colors.semantic.action.primary.background
    : colors.semantic.border.strong;
  const bg = checked && !isTick ? colors.semantic.action.primary.background : 'transparent';
  const style: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    border: isTick ? 'none' : `1px solid ${borderColor}`,
    borderRadius: isCircle ? '50%' : '4px',
    background: bg,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.4 : 1,
    flexShrink: 0,
  };
  // Inner check mark via SVG (small)
  const checkColor = isTick
    ? checked
      ? colors.semantic.action.primary.background
      : colors.semantic.text.disabled
    : colors.semantic.text.inversePrimary;
  return (
    <View className="fd-form-selection-box" style={style}>
      {checked || isTick ? (
        <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 16 16" aria-hidden>
          <path
            d="M3.5 8.5L6.8 11.5L12.5 5"
            fill="none"
            stroke={checkColor}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </View>
  );
}

import { View } from '@tarojs/components';
import { colors } from '@fdesign/tokens';
import { useState } from 'react';
import type { CSSProperties } from 'react';

import type { SwitchProps, SwitchSize } from './Switch.types';

const SIZES: Record<SwitchSize, { w: number; h: number; thumb: number; pad: number }> = {
  small: { w: 36, h: 20, thumb: 16, pad: 2 },
  large: { w: 51, h: 31, thumb: 27, pad: 2 },
};

export function Switch({
  size = 'large',
  checked,
  defaultChecked = false,
  disabled = false,
  onChange,
}: SwitchProps) {
  const isControlled = checked !== undefined;
  const [inner, setInner] = useState(defaultChecked);
  const value = isControlled ? checked : inner;
  const dim = SIZES[size];

  const handleClick = () => {
    if (disabled) return;
    const next = !value;
    if (!isControlled) setInner(next);
    onChange?.(next);
  };

  const trackStyle: CSSProperties = {
    width: `${dim.w}px`,
    height: `${dim.h}px`,
    borderRadius: `${dim.h / 2}px`,
    background: value ? colors.semantic.action.primary.background : colors.semantic.border.subtle,
    opacity: disabled ? 0.4 : 1,
    position: 'relative',
    display: 'inline-block',
    transition: 'background-color 160ms ease',
  };
  const thumbStyle: CSSProperties = {
    position: 'absolute',
    top: `${dim.pad}px`,
    left: value ? `${dim.w - dim.thumb - dim.pad}px` : `${dim.pad}px`,
    width: `${dim.thumb}px`,
    height: `${dim.thumb}px`,
    borderRadius: '50%',
    background: colors.semantic.surface.base,
    boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
    transition: 'left 160ms ease',
  };

  return (
    <View
      className={`fd-form-switch fd-form-switch-${size}${value ? ' fd-form-switch-on' : ''}${disabled ? ' fd-form-switch-disabled' : ''}`}
      style={trackStyle}
      role="switch"
      aria-checked={value}
      aria-disabled={disabled || undefined}
      onClick={handleClick}
    >
      <View className="fd-form-switch-thumb" style={thumbStyle} />
    </View>
  );
}

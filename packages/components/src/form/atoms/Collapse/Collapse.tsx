import { View } from '@tarojs/components';
import { spacing } from '@fdesign/tokens';
import { useState } from 'react';

import { Icon } from '../../../icon';
import type { CollapseProps } from './Collapse.types';

export function Collapse({ expanded, defaultExpanded = false, onToggle }: CollapseProps) {
  const isControlled = expanded !== undefined;
  const [inner, setInner] = useState(defaultExpanded);
  const value = isControlled ? expanded : inner;

  const handleClick = () => {
    const next = !value;
    if (!isControlled) setInner(next);
    onToggle?.(next);
  };

  return (
    <View
      className={`fd-form-collapse${value ? ' fd-form-collapse-on' : ' fd-form-collapse-off'}`}
      style={{
        display: 'inline-flex',
        width: spacing.component.exhibit.foldChevronSize,
        height: spacing.component.exhibit.foldChevronSize,
        transition: 'transform 160ms ease',
        transform: value ? 'rotate(180deg)' : 'rotate(0deg)',
      }}
      role="button"
      aria-expanded={value}
      onClick={handleClick}
    >
      <Icon name={value ? 'collapse-on' : 'collapse-off'} size="xxs" tone="muted" decorative />
    </View>
  );
}

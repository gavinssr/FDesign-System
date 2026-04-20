import { View } from '@tarojs/components';
import { colors, spacing, typographyStyles } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import { PlaceholderIcon } from '../PlaceholderIcon';
import { Supplement } from '../Supplement';
import { FormText } from '../_internal/textPrimitive';
import type { SelectionContentProps } from './SelectionContent.types';

export function SelectionContent({
  selected,
  children,
  text,
  icon = true,
  onChange,
}: SelectionContentProps) {
  const label = text ?? children;
  const style: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing.scale[0] + 2,
  };

  const optionStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  };

  return (
    <View
      className={`fd-form-selection-content${selected ? ' fd-form-selection-content-selected' : ''}`}
      style={style}
      role="checkbox"
      aria-checked={selected}
      onClick={() => onChange?.(!selected)}
    >
      <View className="fd-form-selection-content-option" style={optionStyle}>
        {icon ? <PlaceholderIcon size={20} /> : null}
        <FormText
          spec={{
            style: selected ? typographyStyles.body14SingleLineStrong : typographyStyles.body14SingleLine,
            color: selected ? colors.semantic.text.primary : colors.semantic.text.disabled,
            className: 'fd-form-selection-content-text',
          }}
          extraStyle={{ textAlign: 'right', whiteSpace: 'nowrap' }}
        >
          {label}
        </FormText>
      </View>
      <Supplement icon="jump" />
    </View>
  );
}

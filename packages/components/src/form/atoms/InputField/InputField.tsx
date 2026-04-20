import { Input, View } from '@tarojs/components';
import { colors, spacing, typographyStyles } from '@fdesign/tokens';
import { useState } from 'react';
import type { CSSProperties } from 'react';

import type { InputFieldProps, InputFieldStatus } from './InputField.types';

const STATUS_COLOR: Record<InputFieldStatus, string> = {
  wait: colors.semantic.text.primary,
  focus: colors.semantic.text.primary,
  typing: colors.semantic.text.primary,
  filled: colors.semantic.text.primary,
  disabled: colors.semantic.text.disabled,
  error: colors.semantic.text.primary,
};

export function InputField({
  value,
  defaultValue,
  placeholder,
  status = 'wait',
  align = 'left',
  showDelete = false,
  disabled,
  maxLength,
  onChange,
  onFocus,
  onBlur,
}: InputFieldProps) {
  const isControlled = value !== undefined;
  const [inner, setInner] = useState(defaultValue ?? '');
  // 初始 false：避免舞台/并排多个 `status="typing"` 时同时为「伪聚焦」，导致两侧都出删除钮且互相干扰
  const [isFocused, setIsFocused] = useState(false);
  const current = isControlled ? value : inner;
  const isDisabled = disabled || status === 'disabled';
  const visualStatus: InputFieldStatus = isDisabled
    ? 'disabled'
    : status === 'error'
      ? 'error'
      : isFocused
        ? (current ? 'typing' : 'focus')
        : status === 'typing' || status === 'focus'
          ? (current ? 'typing' : 'focus')
          : current
            ? 'filled'
            : 'wait';
  const shouldShowDelete = !isDisabled && showDelete && Boolean(current) && isFocused;
  const shouldStretch = align === 'right';

  const shellStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: shouldStretch ? 'flex-end' : 'flex-start',
    width: '100%',
    minWidth: 0,
    boxSizing: 'border-box',
  };

  const style: CSSProperties = {
    fontFamily: typographyStyles.body14SingleLine.fontFamily,
    fontSize: `${typographyStyles.body14SingleLine.fontSize}px`,
    lineHeight: `${typographyStyles.body14SingleLine.lineHeight}px`,
    fontWeight: typographyStyles.body14SingleLine.fontWeight,
    color: STATUS_COLOR[visualStatus],
    background: 'transparent',
    border: 'none',
    outline: 'none',
    flex: '1 1 auto',
    minWidth: 0,
    width: '100%',
    maxWidth: '100%',
    padding: 0,
    textAlign: align,
    caretColor: colors.semantic.action.primary.background,
  };

  const deleteWrapStyle: CSSProperties = {
    display: 'inline-flex',
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginLeft: shouldShowDelete ? spacing.scale[8] : 0,
  };

  const focusInput = () => {
    if (isDisabled) {
      return;
    }

    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleConfirm = () => {
    setIsFocused(false);
    onBlur?.();
  };

  return (
    <View
      className={`fd-form-input-field-shell fd-form-input-field-shell-${visualStatus}`}
      style={shellStyle}
      onClick={focusInput}
    >
      <Input
        className={`fd-form-input-field fd-form-input-field-${visualStatus}`}
        style={style}
        value={current ?? ''}
        placeholder={placeholder}
        placeholderStyle={`color:${colors.semantic.text.disabled};text-align:${align};caret-color:${colors.semantic.action.primary.background}`}
        autoFocus={status === 'focus'}
        disabled={isDisabled}
        maxlength={maxLength}
        onInput={(e) => {
          const v = e.detail.value;
          if (!isControlled) setInner(v);
          onChange?.(v);
        }}
        onFocus={() => {
          setIsFocused(true);
          onFocus?.();
        }}
        onBlur={handleBlur}
        onConfirm={handleConfirm}
      />
      {shouldShowDelete ? (
        <View
          className="fd-form-input-field-delete"
          style={deleteWrapStyle}
          role="button"
          aria-label="清空输入内容"
          onMouseDown={(event) => {
            // 避免在点击删除时先触发 input blur，保证当前输入框稳定清空。
            event.preventDefault();
            event.stopPropagation();
          }}
          onTouchStart={(event) => {
            event.stopPropagation();
          }}
          onClick={(event) => {
            event.stopPropagation();
            if (!isControlled) setInner('');
            onChange?.('');
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden focusable="false">
            <path
              d="M15.6569 15.6569C12.5327 18.781 7.46734 18.781 4.34315 15.6569C1.21895 12.5327 1.21895 7.46734 4.34315 4.34315C7.46734 1.21895 12.5327 1.21895 15.6569 4.34315C18.781 7.46734 18.781 12.5327 15.6569 15.6569Z"
              fill={colors.semantic.text.disabled}
            />
            <path
              d="M12.8282 7.50049L9.99981 10.3289M9.99981 10.3289L7.17139 13.1573M9.99981 10.3289L12.8282 13.1573M9.99981 10.3289L7.17139 7.50049"
              stroke={colors.semantic.text.inversePrimary}
              strokeLinecap="round"
            />
          </svg>
        </View>
      ) : null}
    </View>
  );
}

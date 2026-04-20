import { cleanup, fireEvent, render } from '@testing-library/react';
import type { HTMLAttributes, InputHTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  Input: ({
    onInput,
    onConfirm,
    ...p
  }: InputHTMLAttributes<HTMLInputElement> & {
    onInput?: (e: { detail: { value: string } }) => void;
    onConfirm?: () => void;
  }) => (
    <input
      {...p}
      onChange={(e) => onInput?.({ detail: { value: e.target.value } })}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onConfirm?.();
        }
      }}
    />
  ),
  View: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <div {...p}>{children}</div>,
}));

import { InputField } from './InputField';

afterEach(() => cleanup());

describe('form/atoms/InputField', () => {
  it('emits onChange in uncontrolled mode', () => {
    const onChange = vi.fn();
    const { container } = render(<InputField onChange={onChange} />);
    const el = container.querySelector('.fd-form-input-field') as HTMLInputElement;
    fireEvent.change(el, { target: { value: 'hi' } });
    expect(onChange).toHaveBeenCalledWith('hi');
  });

  it('clears content when delete icon is clicked', () => {
    const onChange = vi.fn();
    const { container } = render(
      <InputField defaultValue="输入的内容" status="typing" showDelete onChange={onChange} />,
    );
    const input = container.querySelector('.fd-form-input-field') as HTMLInputElement;
    fireEvent.focus(input);
    fireEvent.click(container.querySelector('.fd-form-input-field-delete') as HTMLDivElement);
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('clears only the current field when multiple deletes exist', () => {
    const leftOnChange = vi.fn();
    const rightOnChange = vi.fn();
    const { container } = render(
      <div>
        <InputField defaultValue="左侧内容" status="typing" showDelete onChange={leftOnChange} />
        <InputField defaultValue="右侧内容" status="typing" showDelete onChange={rightOnChange} />
      </div>,
    );

    const inputs = Array.from(container.querySelectorAll('.fd-form-input-field')) as HTMLInputElement[];
    fireEvent.focus(inputs[0]);
    fireEvent.focus(inputs[1]);

    const deleteButtons = Array.from(container.querySelectorAll('.fd-form-input-field-delete')) as HTMLDivElement[];
    fireEvent.click(deleteButtons[0]);

    expect(leftOnChange).toHaveBeenCalledWith('');
    expect(rightOnChange).not.toHaveBeenCalledWith('');
  });

  it('exits typing state on enter', () => {
    const { container } = render(<InputField defaultValue="输入的内容" status="typing" showDelete />);
    const el = container.querySelector('.fd-form-input-field') as HTMLInputElement;
    fireEvent.focus(el);
    fireEvent.keyDown(el, { key: 'Enter' });
    expect(container.querySelector('.fd-form-input-field-delete')).toBeFalsy();
  });
});

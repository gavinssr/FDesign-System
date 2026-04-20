import { cleanup, fireEvent, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  Text: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => <span {...p}>{children}</span>,
  View: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <div {...p}>{children}</div>,
}));

import { OperationButton } from './OperationButton';

afterEach(() => cleanup());

describe('form/atoms/OperationButton', () => {
  it('fires onPress when clicked', () => {
    const onPress = vi.fn();
    const { container } = render(<OperationButton type="button-bluePrimary" onPress={onPress}>x</OperationButton>);
    fireEvent.click(container.querySelector('.fd-form-operation-button') as HTMLDivElement);
    expect(onPress).toHaveBeenCalled();
  });
  it('does not fire when disabled', () => {
    const onPress = vi.fn();
    const { container } = render(<OperationButton type="textButton" disabled onPress={onPress}>x</OperationButton>);
    fireEvent.click(container.querySelector('.fd-form-operation-button') as HTMLDivElement);
    expect(onPress).not.toHaveBeenCalled();
  });
});

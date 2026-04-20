import { cleanup, fireEvent, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  Text: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => <span {...p}>{children}</span>,
  View: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <div {...p}>{children}</div>,
}));

import { ErrorPop } from './ErrorPop';

afterEach(() => cleanup());

describe('form/atoms/ErrorPop', () => {
  it('fires onClose when close button is clicked', () => {
    const onClose = vi.fn();
    const { container } = render(
      <ErrorPop onClose={onClose} actionLabel="关闭提示">
        x
      </ErrorPop>,
    );
    fireEvent.click(container.querySelector('.fd-form-error-pop-close') as HTMLDivElement);
    expect(onClose).toHaveBeenCalled();
  });
});

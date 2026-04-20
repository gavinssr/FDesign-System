import { cleanup, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  Text: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => (
    <span {...props}>{children}</span>
  ),
  View: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
    <div {...props}>{children}</div>
  ),
}));

import { Label } from './Label';

afterEach(() => cleanup());

describe('form/atoms/Label', () => {
  it('renders size class', () => {
    const { container } = render(<Label size="XL">hi</Label>);
    expect(container.querySelector('.fd-form-label-XL')).toBeTruthy();
  });
});

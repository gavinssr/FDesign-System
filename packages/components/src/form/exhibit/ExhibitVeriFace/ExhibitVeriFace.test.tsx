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

import { ExhibitVeriFace } from './ExhibitVeriFace';

afterEach(() => cleanup());

describe('form/exhibit/ExhibitVeriFace', () => {
  it('renders success state with prompt', () => {
    const { container } = render(<ExhibitVeriFace />);
    expect(container.querySelector('.fd-form-exhibit-veriface-success')).toBeTruthy();
    expect(container.querySelector('.fd-form-exhibit-veriface-prompt')).toBeTruthy();
  });

  it('renders failed state with message', () => {
    const { container } = render(<ExhibitVeriFace veriFailed />);
    expect(container.querySelector('.fd-form-exhibit-veriface-failed')).toBeTruthy();
    expect(container.querySelector('.fd-form-exhibit-veriface-message')).toBeTruthy();
  });
});

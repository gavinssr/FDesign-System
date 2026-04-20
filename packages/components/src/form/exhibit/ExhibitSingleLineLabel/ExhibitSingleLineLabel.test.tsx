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

import { ExhibitSingleLineLabel } from './ExhibitSingleLineLabel';

afterEach(() => cleanup());

describe('form/exhibit/ExhibitSingleLineLabel', () => {
  it('renders card variant class', () => {
    const { container } = render(<ExhibitSingleLineLabel card label="标题" />);
    expect(container.querySelector('.fd-form-exhibit-frame-card')).toBeTruthy();
  });

  it('renders flush variant with divider class by default', () => {
    const { container } = render(<ExhibitSingleLineLabel label="标题" />);
    expect(container.querySelector('.fd-form-exhibit-frame-flush')).toBeTruthy();
  });

  it('renders placeholder icon when showIcon is true', () => {
    const { container } = render(<ExhibitSingleLineLabel label="标题" showIcon />);
    expect(container.querySelector('.fd-form-placeholder-icon')).toBeTruthy();
  });
});

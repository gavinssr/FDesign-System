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

import { ExhibitMultiLineDefault } from './ExhibitMultiLineDefault';

afterEach(() => cleanup());

describe('form/exhibit/ExhibitMultiLineDefault', () => {
  it('renders multi-line stack', () => {
    const { container } = render(<ExhibitMultiLineDefault label="标题" subLabel="二级" />);
    expect(container.querySelector('.fd-form-exhibit-multi-stack-start')).toBeTruthy();
  });
});

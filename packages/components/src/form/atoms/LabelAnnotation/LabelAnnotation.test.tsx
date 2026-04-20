import { cleanup, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  Text: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => <span {...p}>{children}</span>,
  View: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <div {...p}>{children}</div>,
}));

import { LabelAnnotation } from './LabelAnnotation';

afterEach(() => cleanup());

describe('form/atoms/LabelAnnotation', () => {
  it('renders children', () => {
    const { getByText } = render(<LabelAnnotation>hello</LabelAnnotation>);
    expect(getByText('hello')).toBeTruthy();
  });

  it('renders optional icon', () => {
    const { container } = render(<LabelAnnotation showIcon>hello</LabelAnnotation>);
    expect(container.querySelector('.fd-form-label-annotation-icon')).toBeTruthy();
  });
});

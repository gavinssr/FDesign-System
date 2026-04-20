import { cleanup, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  Text: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => <span {...p}>{children}</span>,
  View: ({ children, ...p }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <div {...p}>{children}</div>,
}));

import { WordLimit } from './WordLimit';

afterEach(() => cleanup());

describe('form/atoms/WordLimit', () => {
  it('marks overflow class when current exceeds max', () => {
    const { container } = render(<WordLimit current={210} max={200} />);
    expect(container.querySelector('.fd-form-word-limit-overflow')).toBeTruthy();
  });
});

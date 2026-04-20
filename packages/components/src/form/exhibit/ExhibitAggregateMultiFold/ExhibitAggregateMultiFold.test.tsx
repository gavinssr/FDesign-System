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

import { ExhibitAggregateMultiFold } from './ExhibitAggregateMultiFold';

afterEach(() => cleanup());

describe('form/exhibit/ExhibitAggregateMultiFold', () => {
  it('renders count automatically from items length', () => {
    const { container } = render(
      <ExhibitAggregateMultiFold
        items={[
          { key: '1', title: 'T1', amount: '¥1', subItems: [] },
          { key: '2', title: 'T2', amount: '¥2', subItems: [] },
          { key: '3', title: 'T3', amount: '¥3', subItems: [] },
        ]}
      />,
    );
    expect(container.querySelector('.fd-form-exhibit-aggregate-multi-fold-count')?.textContent).toBe('共3笔');
  });
});

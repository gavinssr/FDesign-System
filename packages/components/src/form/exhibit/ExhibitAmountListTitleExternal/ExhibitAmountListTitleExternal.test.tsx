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

import { ExhibitAmountListTitleExternal } from './ExhibitAmountListTitleExternal';

afterEach(() => cleanup());

describe('form/exhibit/ExhibitAmountListTitleExternal', () => {
  it('renders external tile + amount list rows', () => {
    const { container } = render(
      <ExhibitAmountListTitleExternal
        items={[
          { key: 'a', labelText: 'L', amount: '¥1' },
          { key: 'b', labelText: 'L', amount: '¥2' },
        ]}
      />,
    );
    expect(container.querySelector('.fd-form-exhibit-part-external-tile-amount')).toBeTruthy();
    expect(container.querySelectorAll('.fd-form-exhibit-part-cell-amount-tag').length).toBe(2);
  });
});

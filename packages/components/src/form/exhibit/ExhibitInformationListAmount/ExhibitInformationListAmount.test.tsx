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

import { ExhibitInformationListAmount } from './ExhibitInformationListAmount';

const items = [
  { key: '1', leftText: 'L1', rightText: 'R1' },
  { key: '2', leftText: 'L2', rightText: 'R2' },
];

afterEach(() => cleanup());

describe('form/exhibit/ExhibitInformationListAmount', () => {
  it('card + expanded yields jump-style sub rows', () => {
    const { container } = render(
      <ExhibitInformationListAmount card items={items} defaultExpanded />,
    );
    expect(container.querySelectorAll('.fd-form-exhibit-part-subcell-jump').length).toBe(2);
  });

  it('flush + expanded yields text-style sub rows', () => {
    const { container } = render(
      <ExhibitInformationListAmount items={items} defaultExpanded />,
    );
    expect(container.querySelectorAll('.fd-form-exhibit-part-subcell-text').length).toBe(2);
    expect(container.querySelector('.fd-form-exhibit-part-subcell-jump')).toBeFalsy();
  });
});

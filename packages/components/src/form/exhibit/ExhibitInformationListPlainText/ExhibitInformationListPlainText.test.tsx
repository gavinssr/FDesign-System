import { cleanup, fireEvent, render } from '@testing-library/react';
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

import { ExhibitInformationListPlainText } from './ExhibitInformationListPlainText';

const items = [
  { key: '1', leftText: 'L1', rightText: 'R1' },
  { key: '2', leftText: 'L2', rightText: 'R2' },
];

afterEach(() => cleanup());

describe('form/exhibit/ExhibitInformationListPlainText', () => {
  it('renders collapsed state without sub list', () => {
    const { container } = render(<ExhibitInformationListPlainText items={items} />);
    expect(container.querySelector('.fd-form-exhibit-information-list-plain-text-collapsed')).toBeTruthy();
    expect(container.querySelector('.fd-form-exhibit-part-subcell')).toBeFalsy();
  });

  it('supports uncontrolled toggle', () => {
    const { container } = render(<ExhibitInformationListPlainText items={items} />);
    const header = container.querySelector('.fd-form-exhibit-part-fold-header-inner') as HTMLElement;
    fireEvent.click(header);
    expect(container.querySelector('.fd-form-exhibit-information-list-plain-text-expanded')).toBeTruthy();
    expect(container.querySelectorAll('.fd-form-exhibit-part-subcell').length).toBe(2);
  });
});

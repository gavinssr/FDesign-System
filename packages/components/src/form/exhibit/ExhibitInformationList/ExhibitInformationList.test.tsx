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

import { ExhibitInformationList } from './ExhibitInformationList';

const items = [
  { key: '1', leftText: '左 1', rightText: '右 1' },
  { key: '2', leftText: '左 2', rightText: '右 2' },
];

afterEach(() => cleanup());

describe('form/exhibit/ExhibitInformationList', () => {
  it('renders group title + sub rows', () => {
    const { container } = render(<ExhibitInformationList title="组标题" items={items} />);
    expect(container.querySelector('.fd-form-exhibit-part-group-title-text')?.textContent).toBe('组标题');
    expect(container.querySelectorAll('.fd-form-exhibit-part-subcell').length).toBe(2);
  });
});

import { cleanup, fireEvent, render } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tarojs/components', () => ({
  View: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
    <div {...props}>{children}</div>
  ),
  Text: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => (
    <span {...props}>{children}</span>
  ),
}));

import { ListItem } from './ListItem';

afterEach(() => {
  cleanup();
});

describe('ListItem', () => {
  it('renders content regions', () => {
    const { getByText } = render(
      <ListItem title="Profile" description="Tap to view" meta="New" />,
    );

    expect(getByText('Profile')).toBeTruthy();
    expect(getByText('Tap to view')).toBeTruthy();
    expect(getByText('New')).toBeTruthy();
  });

  it('supports interactive mode', () => {
    const onPress = vi.fn();
    const { getByRole } = render(<ListItem title="Profile" onPress={onPress} />);

    fireEvent.click(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

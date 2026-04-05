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

import { Card } from './Card';

afterEach(() => {
  cleanup();
});

describe('Card', () => {
  it('renders title and description', () => {
    const { getByText } = render(
      <Card title="Card title" description="Card description">
        Content
      </Card>,
    );

    expect(getByText('Card title')).toBeTruthy();
    expect(getByText('Card description')).toBeTruthy();
    expect(getByText('Content')).toBeTruthy();
  });

  it('triggers onPress in interactive mode', () => {
    const onPress = vi.fn();
    const { getByRole } = render(
      <Card title="Clickable" interactive onPress={onPress}>
        Body
      </Card>,
    );

    fireEvent.click(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

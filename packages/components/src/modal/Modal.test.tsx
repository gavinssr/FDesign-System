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

import { Modal } from './Modal';

afterEach(() => {
  cleanup();
});

describe('Modal', () => {
  it('does not render when closed', () => {
    const { queryByRole } = render(<Modal open={false} title="Hidden modal" />);

    expect(queryByRole('dialog')).toBeNull();
  });

  it('renders open dialog and triggers primary action', () => {
    const onPrimaryAction = vi.fn();
    const { getByRole, getByText } = render(
      <Modal open title="Visible modal" onPrimaryAction={onPrimaryAction} />,
    );

    fireEvent.click(getByText('Confirm').closest('[role="button"]') as Element);

    expect(getByRole('dialog')).toBeTruthy();
    expect(onPrimaryAction).toHaveBeenCalledTimes(1);
  });
});

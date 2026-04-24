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

vi.mock('../icon/Icon', () => ({
  Icon: ({ name }: { name: string }) => <span>{name}</span>,
}));

vi.mock('../icon/LocalIconRenderer', () => ({
  LocalIconRenderer: ({ name }: { name: string }) => <span>{name}</span>,
}));

import { FormCollapseGroup, FormGroup, FormInfoList, FormRow } from './Form';

afterEach(() => {
  cleanup();
});

describe('Form', () => {
  it('renders row content and supports row click', () => {
    const onPress = vi.fn();
    const { getByRole, getByText } = render(
      <FormRow title="Profile" trailingText="Detail" onPress={onPress} showJumpIcon />,
    );

    expect(getByText('Profile')).toBeTruthy();
    expect(getByText('Detail')).toBeTruthy();

    fireEvent.click(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders standalone card row with rounded corners and no divider', () => {
    const { container } = render(<FormRow title="Standalone" surfaceVariant="card" />);
    const row = container.querySelector('.fd-formRow');

    expect(row?.getAttribute('style')).toContain('border-radius: 4px');
    expect(row?.getAttribute('style')).not.toContain('linear-gradient');
  });

  it('lets group container own card radius and only shows divider on non-last items', () => {
    const { container } = render(
      <FormGroup surfaceVariant="card">
        <FormRow title="Row A" />
        <FormRow title="Row B" />
      </FormGroup>,
    );

    const group = container.firstElementChild;
    const rows = Array.from(container.querySelectorAll('.fd-formRow'));

    expect(group?.getAttribute('style')).toContain('border-radius: 4px');
    expect(group?.getAttribute('style')).toContain('overflow: hidden');
    expect(rows[0]?.getAttribute('style')).toContain('linear-gradient');
    expect(rows[0]?.getAttribute('style')).not.toContain('border-radius: 4px');
    expect(rows[1]?.getAttribute('style')).not.toContain('linear-gradient');
  });

  it('supports hiding leading and trailing content variants', () => {
    const { queryByText } = render(
      <FormRow
        variant="double-line-right"
        title="Profile"
        trailingText="Primary"
        trailingSecondaryText="Secondary"
        leading={<span>leading-slot</span>}
        showLeading={false}
        showTrailingContent={false}
      />,
    );

    expect(queryByText('leading-slot')).toBeNull();
    expect(queryByText('Primary')).toBeNull();
    expect(queryByText('Secondary')).toBeNull();
    expect(queryByText('Profile')).toBeTruthy();
  });

  it('toggles collapse group items', () => {
    const { getByRole, queryByText } = render(
      <FormCollapseGroup
        title="Section"
        items={[
          { label: 'Label A', value: 'Value A' },
          { label: 'Label B', value: 'Value B' },
        ]}
      />,
    );

    expect(queryByText('Value A')).toBeNull();
    fireEvent.click(getByRole('button'));
    expect(queryByText('Value A')).toBeTruthy();
  });

  it('renders jump-style collapse rows and supports child click', () => {
    const onAction = vi.fn();
    const { getAllByRole, getByText } = render(
      <FormCollapseGroup
        title="Section"
        defaultExpanded
        items={[{ label: 'Label A', value: 'Value A', onAction }]}
      />,
    );

    expect(getByText('form-jump')).toBeTruthy();
    fireEvent.click(getAllByRole('button')[1]!);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('renders info list header action', () => {
    const onAction = vi.fn();
    const { getByText } = render(
      <FormInfoList
        title="Info"
        actionLabel="More"
        onAction={onAction}
        items={[{ label: 'Label', value: 'Value' }]}
      />,
    );

    fireEvent.click(getByText('More'));
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});

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

import { NavBar } from './NavBar';

afterEach(() => {
  cleanup();
});

describe('NavBar', () => {
  it('renders a title bar and reserves back navigation', () => {
    const onBack = vi.fn();
    const { getByLabelText, getByText } = render(<NavBar title="标题文本" onBack={onBack} />);

    fireEvent.click(getByText('标题文本'));
    fireEvent.click(getByLabelText('返回上一页'));

    expect(getByText('标题文本')).toBeTruthy();
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('triggers right text action', () => {
    const onPress = vi.fn();
    const { getByText } = render(
      <NavBar title="标题文本" textAction={{ key: 'settings', label: '操作文本', onPress }} />,
    );

    fireEvent.click(getByText('操作文本'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('switches tabs and reports the active category', () => {
    const onTabChange = vi.fn();
    const { getAllByRole } = render(
      <NavBar
        tabs={[
          { key: 'one', label: '选项' },
          { key: 'two', label: '选项' },
        ]}
        onTabChange={onTabChange}
      />,
    );

    const renderedTabs = getAllByRole('tab');
    const secondTab = renderedTabs[1];

    if (!secondTab) {
      throw new Error('Expected the second tab to render');
    }

    fireEvent.click(secondTab);

    expect(secondTab.getAttribute('aria-selected')).toBe('true');
    expect(onTabChange).toHaveBeenCalledWith('two');
  });

  it('supports search input, submit, clear and tag removal', () => {
    const onValueChange = vi.fn();
    const onSubmit = vi.fn();
    const onClear = vi.fn();
    const onTagRemove = vi.fn();
    const onBack = vi.fn();
    const { getByLabelText, getByRole, rerender } = render(
      <NavBar search={{ placeholder: '输入文本', showSubmit: true, onValueChange, onSubmit }} onBack={onBack} />,
    );

    fireEvent.click(getByLabelText('返回上一页'));
    const input = getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '关键词' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onBack).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith('关键词');
    expect(onSubmit).toHaveBeenCalledWith('关键词');

    rerender(<NavBar search={{ value: '关键词', showSubmit: true, onClear }} />);
    fireEvent.click(getByLabelText('清空搜索内容'));
    expect(onClear).toHaveBeenCalledTimes(1);

    rerender(
      <NavBar
        search={{
          tags: [{ key: 'tag-1', label: '标签' }],
          onTagRemove,
        }}
      />,
    );
    fireEvent.click(getByLabelText('删除标签'));
    expect(onTagRemove).toHaveBeenCalledWith('tag-1');
  });

  it('uses the disabled text token for focused empty search placeholder', () => {
    const { getByRole } = render(<NavBar search={{ placeholder: '输入文本' }} />);

    const input = getByRole('textbox') as HTMLInputElement;
    expect(input.className).toBe('fd-navbar-searchInput');

    fireEvent.focus(input);
    expect(input.className).toBe('fd-navbar-searchInput fd-navbar-searchInputFocusedEmpty');

    fireEvent.change(input, { target: { value: '关键词' } });
    expect(input.className).toBe('fd-navbar-searchInput');
  });
});

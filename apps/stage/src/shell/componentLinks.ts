export interface ComponentNavPage {
  type: 'page';
  key: string;
  label: string;
  title: string;
  url: string;
}

export interface ComponentNavGroup {
  type: 'group';
  key: string;
  label: string;
  children: readonly ComponentNavPage[];
}

export type ComponentLink = ComponentNavPage | ComponentNavGroup;

const buttonLinks = [
  {
    type: 'page',
    key: 'button-base',
    label: 'Base 基础按钮',
    title: 'Base 基础按钮',
    url: '/pages/button/index',
  },
  {
    type: 'page',
    key: 'button-flush',
    label: 'Flush 通栏按钮',
    title: 'Flush 通栏按钮',
    url: '/pages/button-flush/index',
  },
  {
    type: 'page',
    key: 'button-griditem',
    label: 'Griditem 格子按钮',
    title: 'Griditem 格子按钮',
    url: '/pages/button-griditem/index',
  },
  {
    type: 'page',
    key: 'button-text-button',
    label: 'TextButton 文字按钮',
    title: 'TextButton 文字按钮',
    url: '/pages/button-text-button/index',
  },
  {
    type: 'page',
    key: 'button-fab',
    label: 'FAB 悬浮按钮',
    title: 'FAB 悬浮按钮',
    url: '/pages/button-fab/index',
  },
] as const satisfies readonly ComponentNavPage[];

const cssTokenLinks = [
  {
    type: 'page',
    key: 'typography',
    label: 'Typography 排版',
    title: 'Typography 排版',
    url: '/pages/typography/index',
  },
] as const satisfies readonly ComponentNavPage[];

export const componentLinks = [
  { type: 'group', key: 'css-token', label: 'CssToken 全局样式', children: cssTokenLinks },
  { type: 'group', key: 'button', label: 'Button 按钮', children: buttonLinks },
  { type: 'page', key: 'icon', label: 'Icon 图标', title: 'Icon 图标', url: '/pages/icon/index' },
  { type: 'page', key: 'tag', label: 'Tag 标签', title: 'Tag 标签', url: '/pages/tag/index' },
  { type: 'page', key: 'input', label: 'Input 输入框', title: 'Input 输入框', url: '/pages/input/index' },
  { type: 'page', key: 'card', label: 'Card 卡片', title: 'Card 卡片', url: '/pages/card/index' },
  {
    type: 'page',
    key: 'list-item',
    label: 'List Item 列表项',
    title: 'List Item 列表项',
    url: '/pages/list-item/index',
  },
  { type: 'page', key: 'modal', label: 'Modal 弹窗', title: 'Modal 弹窗', url: '/pages/modal/index' },
] as const satisfies readonly ComponentLink[];

export const componentPages = componentLinks.flatMap((item) =>
  item.type === 'group' ? item.children : [item],
);

export function getNavPageByTitle(title: string) {
  return componentPages.find((item) => item.title === title);
}

export function getParentGroupByChildKey(childKey: string) {
  return componentLinks.find(
    (item): item is ComponentNavGroup =>
      item.type === 'group' && item.children.some((child) => child.key === childKey),
  );
}

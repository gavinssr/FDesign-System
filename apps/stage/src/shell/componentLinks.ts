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
    url: '/pages/css-token/typography/index',
  },
  {
    type: 'page',
    key: 'color',
    label: 'Color 颜色',
    title: 'Color 颜色',
    url: '/pages/css-token/color/index',
  },
  {
    type: 'page',
    key: 'radii',
    label: 'Radii 圆角',
    title: 'Radii 圆角',
    url: '/pages/css-token/radii/index',
  },
  {
    type: 'page',
    key: 'spacing',
    label: 'Spacing 间距',
    title: 'Spacing 间距',
    url: '/pages/css-token/spacing/index',
  },
] as const satisfies readonly ComponentNavPage[];

const formLinks = [
  {
    type: 'page',
    key: 'form-display',
    label: '展示类',
    title: 'Form 表单 / 展示类',
    url: '/pages/form-display/index',
  },
  {
    type: 'page',
    key: 'form-input',
    label: '输入类',
    title: 'Form 表单 / 输入类',
    url: '/pages/form-input/index',
  },
  {
    type: 'page',
    key: 'form-action',
    label: '行动类',
    title: 'Form 表单 / 行动类',
    url: '/pages/form-action/index',
  },
] as const satisfies readonly ComponentNavPage[];

export const componentLinks = [
  { type: 'group', key: 'css-token', label: 'CssToken 全局样式', children: cssTokenLinks },
  { type: 'group', key: 'button', label: 'Button 按钮', children: buttonLinks },
  { type: 'group', key: 'form', label: 'Form 表单', children: formLinks },
  { type: 'page', key: 'icon', label: 'Icon 图标', title: 'Icon 图标', url: '/pages/icon/index' },
  { type: 'page', key: 'tag', label: 'Tag 标签', title: 'Tag 标签', url: '/pages/tag/index' },
  { type: 'page', key: 'navbar', label: 'NavBar 标题栏', title: 'NavBar 标题栏', url: '/pages/navbar/index' },
] as const satisfies readonly ComponentLink[];

export const componentPages = componentLinks.flatMap((item) =>
  item.type === 'group' ? item.children : [item],
);

export function getNavPageByTitle(title: string) {
  return componentPages.find((item) => item.title === title);
}

export function getNavPageByUrl(rawUrl: string): ComponentNavPage | undefined {
  if (typeof rawUrl !== 'string' || rawUrl.length === 0) {
    return undefined;
  }

  const normalized = rawUrl
    .replace(/^#/, '')
    .replace(/\?.*$/, '')
    .replace(/\.html$/, '')
    .replace(/\/$/, '');

  return componentPages.find((page) => normalized.endsWith(page.url));
}

export function getParentGroupByChildKey(childKey: string) {
  return componentLinks.find(
    (item): item is ComponentNavGroup =>
      item.type === 'group' && item.children.some((child) => child.key === childKey),
  );
}

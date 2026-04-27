import { View } from '@tarojs/components';
import { NavBar, type NavBarSearchTag } from '@fdesign/components';
import { useState } from 'react';

import { StageShowcasePage } from '../../shell/StageShowcasePage';
import './index.css';

const iconActions = [
  { key: 'customer-service', label: '文本', icon: 'customer-service' as const },
  { key: 'bill', label: '文本', icon: 'bill' as const },
  { key: 'credit-increase', label: '文本', icon: 'credit-increase' as const },
];

const compactActions = [
  { key: 'search', icon: 'search' as const },
  { key: 'cart', icon: 'cart' as const },
  { key: 'more', icon: 'more' as const },
];

const tabs = [
  { key: 'all', label: '选项' },
  { key: 'active', label: '选项' },
  { key: 'done', label: '选项' },
];

export default function NavBarPage() {
  const [activeTabKey, setActiveTabKey] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [searchWithActionValue, setSearchWithActionValue] = useState('');
  const [tags, setTags] = useState<NavBarSearchTag[]>([
    { key: 'tag-1', label: '标签' },
    { key: 'tag-2', label: '标签' },
    { key: 'tag-3', label: '标签' },
  ]);

  const removeTag = (key: string) => {
    setTags((currentTags) => currentTags.filter((tag) => tag.key !== key));
  };

  return (
    <StageShowcasePage
      heroTitle="NavBar 标题栏"
      heroDescription="标题栏承载二级页返回、页面标题、右侧操作、分类切换与搜索入口。"
      heroMeta={[
        { key: 'Figma', value: '二级页标题栏' },
        { key: 'Size', value: '375 × 44' },
        { key: 'Interaction', value: '返回 / 操作 / Tabs / 搜索' },
      ]}
      sections={[
        {
          title: '基础标题栏 / Title Bars',
          children: (
            <View className="__stage-stack">
              <View className="__stage-navbarFrame">
                <NavBar title="标题文本" />
              </View>
              <View className="__stage-navbarFrame">
                <NavBar title="标题文本" actions={iconActions} />
              </View>
              <View className="__stage-navbarFrame">
                <NavBar
                  title="标题文本"
                  textAction={{
                    key: 'action',
                    label: '操作文本',
                    onPress: () => undefined,
                  }}
                />
              </View>
              <View className="__stage-navbarFrame">
                <NavBar actions={compactActions} />
              </View>
            </View>
          ),
        },
        {
          title: 'Tabs 分类切换 / Tabs',
          children: (
            <View className="__stage-stack">
              <View className="__stage-navbarFrame">
                <NavBar
                  tabs={tabs}
                  activeTabKey={activeTabKey}
                  actions={compactActions}
                  onTabChange={setActiveTabKey}
                />
              </View>
            </View>
          ),
        },
        {
          title: '搜索输入 / Search',
          children: (
            <View className="__stage-stack">
              <View className="__stage-navbarFrame">
                <NavBar
                  search={{
                    value: searchValue,
                    placeholder: '输入文本',
                    showSubmit: true,
                    onValueChange: setSearchValue,
                    onSubmit: () => undefined,
                    onClear: () => setSearchValue(''),
                  }}
                />
              </View>
              <View className="__stage-navbarFrame">
                <NavBar
                  search={{
                    value: searchWithActionValue,
                    placeholder: '输入文本',
                    onValueChange: setSearchWithActionValue,
                    onSubmit: () => undefined,
                    onClear: () => setSearchWithActionValue(''),
                  }}
                  searchExtraAction={{ key: 'cart', icon: 'cart' }}
                />
              </View>
            </View>
          ),
        },
        {
          title: '关键词标签 / Search Tags',
          children: (
            <View className="__stage-stack">
              <View className="__stage-navbarFrame">
                <NavBar
                  search={{
                    tags,
                    onTagRemove: removeTag,
                    onClear: () => setTags([]),
                  }}
                />
              </View>
            </View>
          ),
        },
      ]}
    />
  );
}

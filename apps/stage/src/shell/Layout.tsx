import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useState } from 'react';

import { componentLinks, getNavPageByTitle, getParentGroupByChildKey } from './componentLinks';

type LayoutChildren = JSX.Element | JSX.Element[] | string | number | null;

interface LayoutProps {
  title: string;
  children: LayoutChildren;
  showPageTitle?: boolean;
  navKey?: string;
}

export function Layout({ title, children, showPageTitle = true, navKey }: LayoutProps) {
  const stopSidebarWheel: JSX.GenericEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const activeNavKey = navKey ?? getNavPageByTitle(title)?.key;
  const activeGroupKey = activeNavKey ? getParentGroupByChildKey(activeNavKey)?.key : undefined;
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() =>
    activeGroupKey ? { [activeGroupKey]: true } : {},
  );

  const handleNavigate = (url: string, isActive: boolean) => {
    if (isActive) {
      return;
    }

    void Taro.reLaunch({ url });
  };

  return (
    <View className="__stage-layout">
      <View className="__stage-header">
        <Text className="__stage-headerTitle">FenQiLe Components Preview</Text>
      </View>
      <View className="__stage-sidebar" onWheel={stopSidebarWheel}>
        <View className="__stage-navList">
          {componentLinks.map((item) => {
            if (item.type === 'group') {
              const isExpanded = expandedGroups[item.key] ?? item.key === activeGroupKey;
              const isGroupActive = item.key === activeGroupKey;
              const isGroupHighlighted = isExpanded || isGroupActive;

              return (
                <View key={item.key} className="__stage-navGroup">
                  <View
                    className={`__stage-navLink __stage-navLinkGroup ${isGroupHighlighted ? '__stage-navLinkActive' : ''}`}
                    role="button"
                    onClick={() => {
                      setExpandedGroups((prev) => ({
                        ...prev,
                        [item.key]: !isExpanded,
                      }));
                    }}
                  >
                    <View className="__stage-navLinkText">
                      <Text className="__stage-navLinkLabelSizer">{item.label}</Text>
                      <Text className="__stage-navLinkLabel">{item.label}</Text>
                    </View>
                    <View
                      className={`__stage-navArrow ${isExpanded ? '__stage-navArrowExpanded' : ''}`}
                    />
                  </View>
                  <View
                    className={`__stage-navSubList ${isExpanded ? '' : '__stage-navSubListCollapsed'}`}
                  >
                    {item.children.map((child) => {
                      const isActive = child.key === activeNavKey;

                      return (
                        <View
                          key={child.key}
                          className={`__stage-navLink __stage-navSubLink ${isActive ? '__stage-navLinkActive' : ''}`}
                          role="link"
                          onClick={() => {
                            handleNavigate(child.url, isActive);
                          }}
                        >
                          <View className="__stage-navLinkText">
                            <Text className="__stage-navLinkLabelSizer">{child.label}</Text>
                            <Text className="__stage-navLinkLabel">{child.label}</Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            }

            const isActive = item.key === activeNavKey;

            return (
              <View
                key={item.key}
                className={`__stage-navLink ${isActive ? '__stage-navLinkActive' : ''}`}
                role="link"
                onClick={() => {
                  handleNavigate(item.url, isActive);
                }}
              >
              <View className="__stage-navLinkText">
                <Text className="__stage-navLinkLabelSizer">{item.label}</Text>
                <Text className="__stage-navLinkLabel">{item.label}</Text>
              </View>
              </View>
            );
          })}
        </View>
      </View>
      <View className="__stage-main">
        {showPageTitle ? (
          <View className="__stage-pageHeader">
            <Text className="__stage-title">{title}</Text>
          </View>
        ) : null}
        {children}
      </View>
    </View>
  );
}

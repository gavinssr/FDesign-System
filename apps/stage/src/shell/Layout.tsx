import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import { componentLinks } from './componentLinks';

type LayoutChildren = JSX.Element | JSX.Element[] | string | number | null;

interface LayoutProps {
  title: string;
  children: LayoutChildren;
  showPageTitle?: boolean;
}

export function Layout({ title, children, showPageTitle = true }: LayoutProps) {
  const stopSidebarWheel: JSX.GenericEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <View className="__stage-layout">
      <View className="__stage-header">
        <Text className="__stage-headerTitle">FenQiLe Components Preview</Text>
      </View>
      <View className="__stage-sidebar" onWheel={stopSidebarWheel}>
        <View className="__stage-navList">
          {componentLinks.map((item) => {
            const isActive = item.title === title;

            return (
              <View
                key={item.key}
                className={`__stage-navLink ${isActive ? '__stage-navLinkActive' : ''}`}
                role="link"
                onClick={() => {
                  if (isActive) {
                    return;
                  }

                  void Taro.reLaunch({ url: item.url });
                }}
              >
                {item.label}
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

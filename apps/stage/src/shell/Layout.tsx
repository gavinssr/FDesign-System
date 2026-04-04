import { Navigator, Text, View } from '@tarojs/components';

type LayoutChildren = JSX.Element | JSX.Element[] | string | number | null;

interface LayoutProps {
  title: string;
  children: LayoutChildren;
}

export function Layout({ title, children }: LayoutProps) {
  return (
    <View className="__stage-layout">
      <View className="__stage-sidebar">
        <Text className="__stage-sidebarTitle">FDesign Stage</Text>
        <Navigator className="__stage-navLink" openType="navigate" url="/pages/index/index">
          首页
        </Navigator>
        <Navigator className="__stage-navLink" openType="navigate" url="/pages/button/index">
          Button
        </Navigator>
      </View>
      <View className="__stage-main">
        <Text className="__stage-title">{title}</Text>
        {children}
      </View>
    </View>
  );
}

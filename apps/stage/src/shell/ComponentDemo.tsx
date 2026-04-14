import { Text, View } from '@tarojs/components';

type StageNode = JSX.Element | JSX.Element[] | string | number | null;

interface ComponentDemoProps {
  title: string;
  description?: string;
  controls?: StageNode;
  children: StageNode;
}

export function ComponentDemo({
  title,
  controls,
  children,
}: ComponentDemoProps) {
  return (
    <View className="__stage-demoCard">
      <View className="__stage-demoHeader">
        <Text className="__stage-sectionTitle">{title}</Text>
      </View>
      {controls ? <View className="__stage-controlPanel">{controls}</View> : null}
      <View className="__stage-demoBody">{children}</View>
    </View>
  );
}

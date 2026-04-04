import { Navigator, Text, View } from '@tarojs/components';
import { Phase1Probe } from '@fdesign/components';

export default function IndexPage() {
  return (
    <View className="__stage-page">
      <View className="__stage-homeCard">
        <Text className="__stage-title">FDesign Stage</Text>
        <Text className="__stage-description">
          Stage 首页用于验证 workspace 组件链路。下面的 probe 来自 @fdesign/components。
        </Text>
        <View className="__stage-probe">
          <Phase1Probe />
        </View>
        <Navigator className="__stage-link" openType="navigate" url="/pages/button/index">
          查看 Button 展示页
        </Navigator>
      </View>
    </View>
  );
}

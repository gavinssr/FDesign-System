import { Navigator, Text, View } from '@tarojs/components';
import { Phase1Probe } from '@fdesign/components';

import { componentLinks } from '../../shell/componentLinks';

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
        <View className="__stage-chipRow">
          {componentLinks.map((item) => (
            <Navigator
              key={item.url}
              className="__stage-link"
              openType="navigate"
              url={item.url}
            >
              {`查看 ${item.label} 展示页`}
            </Navigator>
          ))}
        </View>
      </View>
    </View>
  );
}

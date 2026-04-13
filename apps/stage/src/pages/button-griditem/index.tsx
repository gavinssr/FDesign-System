import { Text, View } from '@tarojs/components';

import { ComponentDemo } from '../../shell/ComponentDemo';
import { Layout } from '../../shell/Layout';

export default function ButtonGriditemPage() {
  return (
    <Layout title="Griditem / 格子按钮" navKey="button-griditem">
      <ComponentDemo
        title="Coming Soon / 待补充"
        description="当前先补齐 stage 导航结构，后续会在这里补充格子按钮的完整展示。"
      >
        <View className="__stage-demoBody">
          <Text className="__stage-description">
            Griditem / 格子按钮页面已预留，后续会补充真实示例、状态矩阵和使用说明。
          </Text>
        </View>
      </ComponentDemo>
    </Layout>
  );
}

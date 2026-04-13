import { Text, View } from '@tarojs/components';

import { ComponentDemo } from '../../shell/ComponentDemo';
import { Layout } from '../../shell/Layout';

export default function ButtonTextButtonPage() {
  return (
    <Layout title="TextButton / 文字按钮" navKey="button-text-button">
      <ComponentDemo
        title="Coming Soon / 待补充"
        description="当前先补齐 stage 导航结构，后续会在这里补充文字按钮的完整展示。"
      >
        <View className="__stage-demoBody">
          <Text className="__stage-description">
            TextButton / 文字按钮页面已预留，后续会补充真实示例、状态矩阵和使用说明。
          </Text>
        </View>
      </ComponentDemo>
    </Layout>
  );
}

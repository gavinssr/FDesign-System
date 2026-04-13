import { Text, View } from '@tarojs/components';

import { ComponentDemo } from '../../shell/ComponentDemo';
import { Layout } from '../../shell/Layout';

export default function ButtonFlushPage() {
  return (
    <Layout title="Flush / 通栏按钮" navKey="button-flush">
      <ComponentDemo
        title="Coming Soon / 待补充"
        description="当前先补齐 stage 导航结构，后续会在这里补充通栏按钮的完整展示。"
      >
        <View className="__stage-demoBody">
          <Text className="__stage-description">
            Flush / 通栏按钮页面已预留，后续会补充真实示例、状态矩阵和使用说明。
          </Text>
        </View>
      </ComponentDemo>
    </Layout>
  );
}

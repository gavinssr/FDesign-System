import { Text, View } from '@tarojs/components';

import { StageShowcasePage } from '../../shell/StageShowcasePage';

export default function ButtonGriditemPage() {
  return (
    <StageShowcasePage
      heroTitle="Griditem 格子按钮"
      heroDescription="格子按钮通常用于宫格入口和功能分发，当前页面先按统一样板预留结构。"
      heroMeta={[
        { key: 'Status', value: '待补充' },
        { key: 'States', value: '待梳理' },
        { key: 'Examples', value: '已占位' },
      ]}
      sections={[
        {
          title: '组件概览 / Overview',
          children: (
            <View className="__stage-galleryCard">
              <Text className="__stage-description">
                Griditem 格子按钮的图标、文案和宫格布局示例后续补充。
              </Text>
            </View>
          ),
        },
        {
          title: '状态矩阵 / State Matrix',
          children: (
            <View className="__stage-galleryCard">
              <Text className="__stage-description">选中、禁用和角标等状态内容待补充。</Text>
            </View>
          ),
        },
        {
          title: '使用说明 / Guidelines',
          children: (
            <View className="__stage-galleryCard">
              <Text className="__stage-description">适用场景、间距规则和信息层级待补充。</Text>
            </View>
          ),
        },
      ]}
    />
  );
}

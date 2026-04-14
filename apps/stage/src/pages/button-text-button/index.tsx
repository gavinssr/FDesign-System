import { Text, View } from '@tarojs/components';

import { StageShowcasePage } from '../../shell/StageShowcasePage';

export default function ButtonTextButtonPage() {
  return (
    <StageShowcasePage
      title="TextButton 文字按钮"
      navKey="button-text-button"
      heroTitle="TextButton 文字按钮"
      heroDescription="文字按钮通常用于轻量次级操作或上下文链接，当前页面先按统一样板预留结构。"
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
                TextButton 文字按钮的层级、尺寸和色彩规范后续补充。
              </Text>
            </View>
          ),
        },
        {
          title: '状态矩阵 / State Matrix',
          children: (
            <View className="__stage-galleryCard">
              <Text className="__stage-description">默认、悬停、禁用和加载态内容待补充。</Text>
            </View>
          ),
        },
        {
          title: '使用说明 / Guidelines',
          children: (
            <View className="__stage-galleryCard">
              <Text className="__stage-description">和主按钮的搭配方式与使用边界待补充。</Text>
            </View>
          ),
        },
      ]}
    />
  );
}

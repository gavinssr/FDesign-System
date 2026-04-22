import { Text, View } from '@tarojs/components';

import { StageShowcasePage } from '../../shell/StageShowcasePage';

export default function ButtonFabPage() {
  return (
    <StageShowcasePage
      heroTitle="FAB 悬浮按钮"
      heroDescription="悬浮按钮通常承载页面中的高优先级快捷操作，当前页面先按统一样板预留结构。"
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
                FAB 悬浮按钮的尺寸、图标和吸附位置示例后续补充。
              </Text>
            </View>
          ),
        },
        {
          title: '状态矩阵 / State Matrix',
          children: (
            <View className="__stage-galleryCard">
              <Text className="__stage-description">默认、展开、禁用等状态内容待补充。</Text>
            </View>
          ),
        },
        {
          title: '使用说明 / Guidelines',
          children: (
            <View className="__stage-galleryCard">
              <Text className="__stage-description">遮挡规避、定位规则和滚动行为待补充。</Text>
            </View>
          ),
        },
      ]}
    />
  );
}

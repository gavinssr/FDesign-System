import { Text, View } from '@tarojs/components';

import { StageShowcasePage } from '../../shell/StageShowcasePage';

export default function ButtonFlushPage() {
  return (
    <StageShowcasePage
      title="Flush 通栏按钮"
      navKey="button-flush"
      heroTitle="Flush 通栏按钮"
      heroDescription="通栏按钮通常用于表单提交或页面底部主操作，当前页面先按统一样板预留结构。"
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
                Flush 通栏按钮的真实示例、尺寸和布局约束后续补充。
              </Text>
            </View>
          ),
        },
        {
          title: '状态矩阵 / State Matrix',
          children: (
            <View className="__stage-galleryCard">
              <Text className="__stage-description">默认、禁用、加载等状态内容待补充。</Text>
            </View>
          ),
        },
        {
          title: '使用说明 / Guidelines',
          children: (
            <View className="__stage-galleryCard">
              <Text className="__stage-description">适用场景、布局边界和交互规则待补充。</Text>
            </View>
          ),
        },
      ]}
    />
  );
}

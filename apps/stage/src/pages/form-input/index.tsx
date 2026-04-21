import { Text, View } from '@tarojs/components';

import { StageShowcasePage } from '../../shell/StageShowcasePage';

export default function FormInputPage() {
  return (
    <StageShowcasePage
      title="Form 表单 / 输入类"
      navKey="form-input"
      heroTitle="Form 表单 / 输入类"
      heroDescription="输入类表单本轮只保留导航与页面占位，后续会按 Figma 输入类节点继续补齐。"
      heroMeta={[
        { key: 'Status', value: '待补充' },
        { key: 'Scope', value: '输入控件 / 校验 / 状态' },
        { key: 'Plan', value: '已占位' },
      ]}
      sections={[
        {
          title: '组件概览 / Overview',
          children: (
            <View className="__stage-galleryCard">
              <Text className="__stage-description">
                输入类表单的字段结构、辅助文案和状态组合将放在后续批次中实现。
              </Text>
            </View>
          ),
        },
      ]}
    />
  );
}

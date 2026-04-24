import { Text, View } from '@tarojs/components';

import { StageShowcasePage } from '../../shell/StageShowcasePage';

export default function FormActionPage() {
  return (
    <StageShowcasePage
      heroTitle="Form 表单行动类"
      heroDescription="行动类表单本轮只建立 stage 导航入口，后续会补动作组、说明区和确认反馈等形态。"
      heroMeta={[
        { key: 'Status', value: '待补充' },
        { key: 'Scope', value: '动作组、反馈、确认态' },
        { key: 'Plan', value: '已占位' },
      ]}
      sections={[
        {
          title: '组件概览 Overview',
          children: (
            <View className="__stage-galleryCard">
              <Text className="__stage-description">
                行动类表单将在后续批次中补齐，当前页面用于验证导航分层与占位结构。
              </Text>
            </View>
          ),
        },
      ]}
    />
  );
}

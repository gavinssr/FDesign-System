import { Text, View } from '@tarojs/components';
import { Button, Modal } from '@fdesign/components';
import { useState } from 'react';

import { StageShowcasePage } from '../../shell/StageShowcasePage';

export default function ModalPage() {
  const [open, setOpen] = useState(false);

  return (
    <StageShowcasePage
      heroTitle="Modal 弹窗"
      heroDescription="弹窗用于承载需要打断当前流程的重要确认或补充信息，引导用户聚焦处理单一任务。"
      heroMeta={[
        { key: 'Actions', value: '主按钮 / 次按钮' },
        { key: 'States', value: 'open / close' },
        { key: 'Layout', value: '标题 / 描述 / 内容 / 操作区' },
      ]}
      sections={[
        {
          title: '结构说明 / Anatomy',
          children: (
            <View className="__stage-galleryGrid">
              <View className="__stage-galleryCard">
                <Text className="__stage-galleryCardLabel">Header</Text>
                <Text className="__stage-description">标题与描述用于明确当前打断的原因和预期结果。</Text>
              </View>
              <View className="__stage-galleryCard">
                <Text className="__stage-galleryCardLabel">Actions</Text>
                <Text className="__stage-description">底部支持主按钮和次按钮组合，也支持单按钮配置。</Text>
              </View>
            </View>
          ),
        },
        {
          title: '交互预览 / Interactive Preview',
          children: (
            <>
              <Button size="m" onPress={() => setOpen(true)}>
                Open modal
              </Button>
              <Modal
                open={open}
                title="Confirm action"
                description="This modal is rendered inside the stage page."
                primaryActionLabel="Confirm"
                secondaryActionLabel="Cancel"
                onPrimaryAction={() => setOpen(false)}
                onSecondaryAction={() => setOpen(false)}
                onClose={() => setOpen(false)}
              >
                <Text>Review the content and confirm to close the preview.</Text>
              </Modal>
            </>
          ),
        },
      ]}
    />
  );
}

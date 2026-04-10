import { Text } from '@tarojs/components';
import { Button, Modal, ModalHarness } from '@fdesign/components';
import { useState } from 'react';

import { ComponentDemo } from '../../shell/ComponentDemo';
import { Layout } from '../../shell/Layout';

export default function ModalPage() {
  const [open, setOpen] = useState(false);

  return (
    <Layout title="Modal">
      <ComponentDemo
        title="Interactive Preview"
        description="用最小状态控制验证 open / close 和 action 行为。"
      >
        <Button size="m" onPress={() => setOpen(true)}>Open modal</Button>
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
      </ComponentDemo>

      <ComponentDemo
        title="Harness Matrix"
        description="固定展示双按钮和单按钮两种模态配置。"
      >
        <ModalHarness />
      </ComponentDemo>
    </Layout>
  );
}

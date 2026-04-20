import { Text, View } from '@tarojs/components';
import {
  Button,
  Card,
  Icon,
  Input,
  Modal,
  Tag,
} from '@fdesign/components';
import { useState } from 'react';

export default function IndexPage() {
  const [value, setValue] = useState('workspace@fdesign.dev');
  const [open, setOpen] = useState(false);

  return (
    <View className="__consumer-page">
      <View className="__consumer-hero">
        <Text className="__consumer-title">FDesign Example Consumer</Text>
        <Text className="__consumer-description">
          这是一个独立于 stage 的最小消费样板，只通过 @fdesign/components 使用设计系统组件。
        </Text>
        <View className="__consumer-row">
          <Tag variant="fill-primary" color="blue">
            consumer
          </Tag>
          <Tag variant="fill-secondary" color="green">workspace package</Tag>
          <Button size="m" onPress={() => setOpen(true)}>Open modal</Button>
        </View>
      </View>

      <View className="__consumer-grid">
        <Card
          title="Profile form"
          description="Consumer page composes Input, token-styled copy and Button without stage shell."
        >
          <View className="__consumer-stack">
            <Text className="__consumer-copy __consumer-copyMuted">
              The current input value is managed locally inside the consumer page.
            </Text>
            <Input
              label="Contact email"
              value={value}
              helperText="This value is controlled by the consumer app."
              onValueChange={setValue}
            />
            <View className="__consumer-row">
              <Button size="m">Save changes</Button>
              <Button size="m" variant="secondary-outline">Cancel</Button>
            </View>
          </View>
        </Card>

        <Card title="Settings list" description="List composition with leading and trailing icons.">
          <View className="__consumer-stack">
            <View className="__consumer-row">
              <Icon name="info" label="Notifications" />
              <View className="__consumer-stack" style={{ flex: 1, gap: 4 }}>
                <Text className="__consumer-copy">Notifications</Text>
                <Text className="__consumer-copy __consumer-copyMuted">
                  Push and email preferences · 2 new
                </Text>
              </View>
              <Icon name="chevron-right" decorative />
            </View>
            <View className="__consumer-row">
              <Icon name="check" label="Security" />
              <View className="__consumer-stack" style={{ flex: 1, gap: 4 }}>
                <Text className="__consumer-copy">Security</Text>
                <Text className="__consumer-copy __consumer-copyMuted">
                  Passkeys and recovery methods
                </Text>
              </View>
              <Icon name="chevron-right" decorative />
            </View>
          </View>
        </Card>
      </View>

      <Modal
        open={open}
        title="Consumer modal"
        description="This modal is rendered from apps/example-consumer, not from apps/stage."
        primaryActionLabel="Close"
        secondaryActionLabel="Keep open"
        onPrimaryAction={() => setOpen(false)}
        onSecondaryAction={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <Text className="__consumer-copy">
          Consumer apps can compose design-system primitives directly while staying isolated from
          the stage shell.
        </Text>
      </Modal>
    </View>
  );
}

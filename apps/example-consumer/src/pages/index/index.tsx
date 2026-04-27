import { Text, View } from '@tarojs/components';
import {
  Button,
  FormRow,
  Icon,
  Tag,
} from '@fdesign/components';

export default function IndexPage() {
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
          <Button size="m">Browse components</Button>
        </View>
      </View>

      <View className="__consumer-grid">
        <View className="__consumer-section">
          <Text className="__consumer-title">Profile actions</Text>
          <Text className="__consumer-description">
            Consumer page now demonstrates composition with the retained primitives only.
          </Text>
          <View className="__consumer-stack">
            <Text className="__consumer-copy __consumer-copyMuted">
              Form-like layout and action rhythm stay available without relying on the removed Input,
              Card, or Modal components.
            </Text>
            <View className="__consumer-row">
              <Button size="m">Save changes</Button>
              <Button size="m" variant="secondary-outline">Cancel</Button>
            </View>
          </View>
        </View>

        <View className="__consumer-section">
          <Text className="__consumer-title">Settings list</Text>
          <Text className="__consumer-description">
            List composition with leading and trailing icons.
          </Text>
          <View className="__consumer-stack">
            <FormRow
              title="Notifications"
              trailingText="2 new"
              leading={<Icon name="info" label="Notifications" />}
              secondaryText="Push and email preferences"
              variant="double-line"
              showJumpIcon
              onPress={() => undefined}
            />
            <FormRow
              title="Security"
              secondaryText="Passkeys and recovery methods"
              leading={<Icon name="check" label="Security" />}
              variant="double-line"
              showJumpIcon
            />
          </View>
        </View>
      </View>
    </View>
  );
}

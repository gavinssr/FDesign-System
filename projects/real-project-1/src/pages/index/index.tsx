import { Text, View } from '@tarojs/components';
import {
  Button,
  Card,
  Icon,
  Input,
  ListItem,
  Modal,
  Tag,
} from '@fdesign/components';
import { colors } from '@fdesign/tokens';
import { useState } from 'react';

const launchChecklist = [
  {
    title: '落地页素材已齐备',
    description: '主视觉、活动规则和 CTA 文案都已进入本次交付包。',
    meta: 'ready',
    icon: 'check',
  },
  {
    title: '投放链接待复核',
    description: '确认 H5 域名、监测参数和静态资源路径。',
    meta: 'review',
    icon: 'info',
  },
];

export default function IndexPage() {
  const [ownerEmail, setOwnerEmail] = useState('growth-team@fdesign.dev');
  const [publishOpen, setPublishOpen] = useState(false);

  const campaignStatus = ownerEmail.includes('@')
    ? {
        tagColor: 'green',
        label: '可发布',
        description: '联系人信息完整，交付链路可继续推进。',
      }
    : {
        tagColor: 'yellow',
        label: '待补充',
        description: '请补充有效联系邮箱，避免交付后无人接手。',
      };

  const campaignStatusDescriptionStyle = {
    color:
      campaignStatus.tagColor === 'green'
        ? colors.semantic.tag.green.fillSecondaryForeground
        : colors.semantic.tag.yellow.fillSecondaryForeground,
  } as const;

  return (
    <View className="__realProject-page">
      <View className="__realProject-hero">
        <View className="__realProject-row">
          <Tag variant="fill-primary" color="blue">
            growth campaign
          </Tag>
          <Tag variant="fill-secondary" color="green">h5 deliverable</Tag>
          <Tag variant="outline" color="grey">real-project-1</Tag>
        </View>
        <Text className="__realProject-title">Campaign Launch Console</Text>
        <Text className="__realProject-description">
          这是一个面向增长活动的最小真实业务页面，用于验证业务项目在 monorepo
          内消费设计系统、独立构建，并整理为可交付产物的完整闭环。
        </Text>
        <View className="__realProject-actions">
          <Button size="m" onPress={() => setPublishOpen(true)}>生成交付确认</Button>
          <Button size="m" variant="secondary-outline">查看投放排期</Button>
        </View>
      </View>

      <View className="__realProject-kpis">
        <Card title="预计曝光" description="首波投放资源预估" tone="primary">
          <View className="__realProject-stack">
            <Text className="__realProject-kpiValue">128k</Text>
            <Text className="__realProject-copy __realProject-copyMuted">
              覆盖 3 个流量入口，首日峰值预计在 10:00-14:00。
            </Text>
          </View>
        </Card>
        <Card title="目标转化" description="报名或加购行为" tone="success">
          <View className="__realProject-stack">
            <Text className="__realProject-kpiValue">8.4%</Text>
            <Text className="__realProject-copy __realProject-copyMuted">
              基于上一轮活动数据，作为本次冒烟验收的观察基线。
            </Text>
          </View>
        </Card>
      </View>

      <View className="__realProject-grid">
        <Card
          title="交付负责人"
          description="业务项目独立维护自己的联系人与发布说明，不复用 stage 壳层。"
        >
          <View className="__realProject-stack">
            <Input
              label="负责人邮箱"
              value={ownerEmail}
              helperText="交付 README 与 smoke report 会引用该联系人。"
              onValueChange={setOwnerEmail}
            />
            <View className="__realProject-row">
              <Tag variant="fill-secondary" color={campaignStatus.tagColor}>{campaignStatus.label}</Tag>
              <Text className="__realProject-copy" style={campaignStatusDescriptionStyle}>
                {campaignStatus.description}
              </Text>
            </View>
          </View>
        </Card>

        <Card
          title="发布前检查"
          description="用设计系统组件组合业务区域，而不是展示组件矩阵。"
        >
          <View className="__realProject-stack">
            {launchChecklist.map((item) => (
              <ListItem
                key={item.title}
                title={item.title}
                description={item.description}
                meta={item.meta}
                leading={<Icon name={item.icon} label={item.title} />}
                trailing={<Icon name="chevron-right" decorative />}
                onPress={() => undefined}
              />
            ))}
          </View>
        </Card>
      </View>

      <Modal
        open={publishOpen}
        title="交付确认"
        description="本弹窗用于模拟活动页发布前的业务确认动作。"
        primaryActionLabel="确认发布"
        secondaryActionLabel="返回检查"
        onPrimaryAction={() => setPublishOpen(false)}
        onSecondaryAction={() => setPublishOpen(false)}
        onClose={() => setPublishOpen(false)}
      >
        <View className="__realProject-stack">
          <Text className="__realProject-copy">
            当前联系人：{ownerEmail || '未填写'}。交付脚本会根据 `project.yaml`
            输出独立产物目录，并生成部署说明与最小 smoke report。
          </Text>
          <Text className="__realProject-copy __realProject-copyMuted">
            这一步证明业务项目只通过 `@fdesign/components`
            组织页面，不依赖 `apps/stage` 或其私有 shell。
          </Text>
        </View>
      </Modal>
    </View>
  );
}

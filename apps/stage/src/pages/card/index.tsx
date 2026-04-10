import { Text } from '@tarojs/components';
import { Card, CardHarness } from '@fdesign/components';

import { ComponentDemo } from '../../shell/ComponentDemo';
import { Layout } from '../../shell/Layout';

const tones = ['default', 'primary', 'success', 'warning', 'danger'] as const;

export default function CardPage() {
  return (
    <Layout title="Card / 卡片">
      <ComponentDemo
        title="Tone Preview"
        description="展示不同 tone 的容器表现。"
      >
        {tones.map((tone) => (
          <Card
            key={tone}
            tone={tone}
            title={`${tone} card`}
            description="Card used in stage preview"
          >
            <Text>{`Body content for ${tone}.`}</Text>
          </Card>
        ))}
      </ComponentDemo>

      <ComponentDemo
        title="Interactive Preview"
        description="验证 interactive 模式的点击语义。"
      >
        <Card interactive title="Clickable card" description="Acts like a selection surface">
          <Text>Tap the card area to simulate selection.</Text>
        </Card>
      </ComponentDemo>

      <ComponentDemo
        title="Harness Matrix"
        description="矩阵化输出 tone 与 interactive 状态。"
      >
        <CardHarness />
      </ComponentDemo>
    </Layout>
  );
}

import { View } from '@tarojs/components';
import { Text as FText, TextHarness } from '@fdesign/components';

import { ComponentDemo } from '../../shell/ComponentDemo';
import { Layout } from '../../shell/Layout';

const tones = ['default', 'muted', 'primary', 'success', 'warning', 'danger'] as const;
const weights = ['light', 'regular', 'medium'] as const;

export default function TextPage() {
  return (
    <Layout title="Text 文本">
      <ComponentDemo
        title="Tone And Size"
        description="覆盖常用 tone 和 size 组合，确认基础文案样式可用。"
      >
        {tones.map((tone) => (
          <View key={tone} className="__stage-demoBody">
            <FText tone={tone} size="sm">{`${tone} sm text`}</FText>
            <FText tone={tone} size="md">{`${tone} md text`}</FText>
            <FText tone={tone} size="lg">{`${tone} lg text`}</FText>
          </View>
        ))}
      </ComponentDemo>

      <ComponentDemo
        title="Weight And Truncate"
        description="验证字重切换与截断模式。"
      >
        {weights.map((weight) => (
          <FText key={weight} weight={weight}>
            {`${weight} weight sample`}
          </FText>
        ))}
        <View style={{ width: '200px' }}>
          <FText truncate>
            This is a long sentence used to validate truncate behaviour in stage.
          </FText>
        </View>
      </ComponentDemo>

      <ComponentDemo
        title="Harness Matrix"
        description="矩阵化输出 tone、size 和截断状态。"
      >
        <TextHarness />
      </ComponentDemo>
    </Layout>
  );
}

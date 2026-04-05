import { View } from '@tarojs/components';
import { Tag, TagHarness } from '@fdesign/components';

import { ComponentDemo } from '../../shell/ComponentDemo';
import { Layout } from '../../shell/Layout';

const tones = ['neutral', 'primary', 'success', 'warning', 'danger'] as const;

export default function TagPage() {
  return (
    <Layout title="Tag">
      <ComponentDemo
        title="Tone Preview"
        description="覆盖 subtle 和 solid 两种强调方式。"
      >
        {tones.map((tone) => (
          <View key={tone} className="__stage-preview">
            <Tag tone={tone}>{`${tone} subtle`}</Tag>
            <Tag tone={tone} emphasis="solid">{`${tone} solid`}</Tag>
          </View>
        ))}
      </ComponentDemo>

      <ComponentDemo
        title="Size Preview"
        description="展示 sm / md 两个尺寸。"
      >
        <View className="__stage-preview">
          <Tag size="sm">small tag</Tag>
          <Tag size="md">medium tag</Tag>
        </View>
      </ComponentDemo>

      <ComponentDemo
        title="Harness Matrix"
        description="矩阵化输出所有 tone 与 emphasis 组合。"
      >
        <TagHarness />
      </ComponentDemo>
    </Layout>
  );
}

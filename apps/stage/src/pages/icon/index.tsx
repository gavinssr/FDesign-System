import { View } from '@tarojs/components';
import { Icon, IconHarness } from '@fdesign/components';

import { ComponentDemo } from '../../shell/ComponentDemo';
import { Layout } from '../../shell/Layout';

const names = ['search', 'check', 'info', 'close', 'chevron-right'] as const;
const tones = ['default', 'muted', 'primary', 'success', 'warning', 'danger'] as const;

export default function IconPage() {
  return (
    <Layout title="Icon / 图标">
      <ComponentDemo
        title="Glyph Preview"
        description="当前用字符型占位 glyph 验证 API 和视觉节奏。"
      >
        {names.map((name) => (
          <View key={name} className="__stage-preview">
            <Icon name={name} size="sm" label={`${name} small`} />
            <Icon name={name} size="md" label={`${name} medium`} />
            <Icon name={name} size="lg" label={`${name} large`} />
          </View>
        ))}
      </ComponentDemo>

      <ComponentDemo
        title="Tone Preview"
        description="验证 tone 颜色切换。"
      >
        <View className="__stage-preview">
          {tones.map((tone) => (
            <Icon key={tone} name="info" tone={tone} label={`${tone} icon`} />
          ))}
        </View>
      </ComponentDemo>

      <ComponentDemo
        title="Harness Matrix"
        description="矩阵化输出 name 与 tone 组合。"
      >
        <IconHarness />
      </ComponentDemo>
    </Layout>
  );
}

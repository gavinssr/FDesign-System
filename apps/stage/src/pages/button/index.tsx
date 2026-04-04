import { Text, View } from '@tarojs/components';
import { Button, ButtonHarness } from '@fdesign/components';
import { useMemo, useState } from 'react';

import { ComponentDemo } from '../../shell/ComponentDemo';
import { Layout } from '../../shell/Layout';
import { PropControl } from '../../shell/PropControl';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';
type PreviewButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
  children: string;
  onPress?: () => void;
};

const variantOrder: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'danger'];
const sizeOrder: ButtonSize[] = ['sm', 'md', 'lg'];

export default function ButtonPage() {
  const [variant, setVariant] = useState<ButtonVariant>('primary');
  const [size, setSize] = useState<ButtonSize>('md');
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [block, setBlock] = useState(false);

  const currentProps = useMemo<PreviewButtonProps>(
    () => ({
      variant,
      size,
      disabled,
      loading,
      block,
      children: 'Preview button',
    }),
    [block, disabled, loading, size, variant],
  );

  return (
    <Layout title="Button">
      <ComponentDemo
        title="Interactive Preview"
        description="先用实时控件验证 Button 本体，再通过矩阵视图检查所有变体和状态。"
        controls={
          <PropControl
            variant={variant}
            size={size}
            disabled={disabled}
            loading={loading}
            block={block}
            onVariantChange={setVariant}
            onSizeChange={setSize}
            onDisabledChange={setDisabled}
            onLoadingChange={setLoading}
            onBlockChange={setBlock}
          />
        }
      >
        <View className="__stage-preview">
          <Button {...currentProps} />
        </View>
        <View className="__stage-blockPreview">
          <Button {...currentProps} block>
            Block button
          </Button>
        </View>
      </ComponentDemo>

      <ComponentDemo
        title="Variant Snapshot"
        description="展示所有 variant、size 与关键状态，确认 provisional 视觉模式稳定。"
      >
        {variantOrder.map((item) => (
          <View key={item}>
            <Text className="__stage-sectionTitle">{item}</Text>
            {sizeOrder.map((itemSize) => (
              <View key={`${item}-${itemSize}`} className="__stage-preview">
                <Button variant={item} size={itemSize}>
                  {`${item}-${itemSize}`}
                </Button>
                <Button variant={item} size={itemSize} disabled>
                  disabled
                </Button>
                <Button variant={item} size={itemSize} loading>
                  loading
                </Button>
              </View>
            ))}
          </View>
        ))}
      </ComponentDemo>

      <ComponentDemo
        title="Harness Matrix"
        description="渲染 36 种组合，作为状态矩阵的人工核对视图。"
      >
        <ButtonHarness />
      </ComponentDemo>
    </Layout>
  );
}

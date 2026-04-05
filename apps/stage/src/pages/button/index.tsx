import { Text, View } from '@tarojs/components';
import { getReactNativeButtonRenderSpec } from '@fdesign/adapters';
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
const mappedProps = [
  'variant',
  'size',
  'disabled',
  'loading',
  'block',
  'onPress',
] as const;

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
  const reactNativeSpec = useMemo(() => getReactNativeButtonRenderSpec(currentProps), [currentProps]);

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
        title="Phase 4 Cross-platform Mapping"
        description="当前页仍以 H5 Button 为主验证入口，同时展示 RN adapter 的最小映射结果，确保 props 语义与平台差异治理保持同步。"
      >
        <View className="__stage-compareGrid">
          <View className="__stage-compareCard">
            <Text className="__stage-sectionTitle">Scope</Text>
            <View className="__stage-kvList">
              <View className="__stage-kvRow">
                <Text className="__stage-kvKey">当前阶段</Text>
                <Text className="__stage-kvValue">Phase 4 第二段起点</Text>
              </View>
              <View className="__stage-kvRow">
                <Text className="__stage-kvKey">H5 侧</Text>
                <Text className="__stage-kvValue">继续直接渲染 @fdesign/components/Button</Text>
              </View>
              <View className="__stage-kvRow">
                <Text className="__stage-kvKey">RN 侧</Text>
                <Text className="__stage-kvValue">通过 @fdesign/adapters 注入 primitives 做最小闭环</Text>
              </View>
              <View className="__stage-kvRow">
                <Text className="__stage-kvKey">非目标</Text>
                <Text className="__stage-kvValue">本页不追求 RN 视觉 1:1，只验证结构与状态映射</Text>
              </View>
            </View>
          </View>

          <View className="__stage-compareCard">
            <Text className="__stage-sectionTitle">Mapped Props</Text>
            <View className="__stage-kvList">
              {mappedProps.map((propName) => (
                <View key={propName} className="__stage-kvRow">
                  <Text className="__stage-kvKey">{propName}</Text>
                  <Text className="__stage-kvValue">
                    {`${JSON.stringify(currentProps[propName] ?? 'interactive')} -> RN adapter`}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className="__stage-compareCard">
            <Text className="__stage-sectionTitle">RN Render Spec</Text>
            <View className="__stage-kvList">
              <View className="__stage-kvRow">
                <Text className="__stage-kvKey">disabled</Text>
                <Text className="__stage-kvValue">{String(reactNativeSpec.disabled)}</Text>
              </View>
              <View className="__stage-kvRow">
                <Text className="__stage-kvKey">spinnerSize</Text>
                <Text className="__stage-kvValue">{reactNativeSpec.spinnerSize}</Text>
              </View>
              <View className="__stage-kvRow">
                <Text className="__stage-kvKey">width</Text>
                <Text className="__stage-kvValue">
                  {String(reactNativeSpec.containerStyle[0]?.width ?? 'auto')}
                </Text>
              </View>
              <View className="__stage-kvRow">
                <Text className="__stage-kvKey">alignSelf</Text>
                <Text className="__stage-kvValue">
                  {String(reactNativeSpec.containerStyle[0]?.alignSelf ?? 'flex-start')}
                </Text>
              </View>
              <View className="__stage-kvRow">
                <Text className="__stage-kvKey">labelColor</Text>
                <Text className="__stage-kvValue">
                  {String((reactNativeSpec.labelStyle[1]?.color as string | undefined) ?? 'n/a')}
                </Text>
              </View>
            </View>
          </View>
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

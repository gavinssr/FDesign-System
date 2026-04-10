import { Text, View } from '@tarojs/components';
import { getReactNativeButtonRenderSpec } from '@fdesign/adapters';
import { Button, ButtonHarness } from '@fdesign/components';
import { useMemo, useState } from 'react';

import { ComponentDemo } from '../../shell/ComponentDemo';
import { Layout } from '../../shell/Layout';
import { PropControl } from '../../shell/PropControl';

type ButtonVariant = 'primary-fill' | 'primary-outline' | 'secondary-outline';
type ButtonSize = 'xl' | 'l' | 'm' | 's' | 'xs' | 'mini';
type PreviewButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  inactive?: boolean;
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
  children: string;
  onPress?: () => void;
};

const variantOrder: ButtonVariant[] = ['primary-fill', 'primary-outline', 'secondary-outline'];
const sizeOrder: ButtonSize[] = ['xl', 'l', 'm', 's', 'xs', 'mini'];
const mappedProps = [
  'variant',
  'size',
  'inactive',
  'disabled',
  'loading',
  'block',
  'onPress',
] as const;
const variantLabels: Record<ButtonVariant, string> = {
  'primary-fill': 'Primary Fill / 主按钮填充',
  'primary-outline': 'Primary Outline / 主按钮描边',
  'secondary-outline': 'Secondary Outline / 次按钮描边',
};
const sizeLabels: Record<ButtonSize, string> = {
  xl: 'XL',
  l: 'L',
  m: 'M',
  s: 'S',
  xs: 'XS',
  mini: 'Mini',
};

export default function ButtonPage() {
  const [variant, setVariant] = useState<ButtonVariant>('primary-fill');
  const [size, setSize] = useState<ButtonSize>('m');
  const [inactive, setInactive] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [block, setBlock] = useState(false);

  const currentProps = useMemo<PreviewButtonProps>(
    () => ({
      variant,
      size,
      inactive,
      disabled,
      loading,
      block,
      children: 'Preview button',
    }),
    [block, disabled, inactive, loading, size, variant],
  );
  const reactNativeSpec = useMemo(() => getReactNativeButtonRenderSpec(currentProps), [currentProps]);

  return (
    <Layout title="Button / 按钮" showPageTitle={false}>
      <View className="__stage-demoCard">
        <View className="__stage-hero">
          <View className="__stage-heroBody">
            <Text className="__stage-heroLabel">Component Preview</Text>
            <Text className="__stage-heroTitle">Button / 按钮</Text>
            <Text className="__stage-heroDescription">
              Button 页用于核对设计系统按钮本体的视觉、状态和交互表现。当前主视区只展示组件本体能力，工程映射信息下沉到底部辅助验证区。
            </Text>
            <View className="__stage-heroMeta">
              <View className="__stage-metaItem">
                <Text className="__stage-metaKey">Variants</Text>
                <Text className="__stage-metaValue">3 种类型</Text>
              </View>
              <View className="__stage-metaItem">
                <Text className="__stage-metaKey">Sizes</Text>
                <Text className="__stage-metaValue">6 种尺寸</Text>
              </View>
              <View className="__stage-metaItem">
                <Text className="__stage-metaKey">States</Text>
                <Text className="__stage-metaValue">4 种状态</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <ComponentDemo
        title="Playground / 实时预览"
        description="通过最常用的属性组合直接查看按钮本体，右侧展示区只承载组件真实视觉和交互。"
        controls={
          <PropControl
            variant={variant}
            size={size}
            inactive={inactive}
            disabled={disabled}
            loading={loading}
            block={block}
            onVariantChange={setVariant}
            onSizeChange={setSize}
            onInactiveChange={setInactive}
            onDisabledChange={setDisabled}
            onLoadingChange={setLoading}
            onBlockChange={setBlock}
          />
        }
      >
        <View className="__stage-playgroundCanvas">
          <View className="__stage-preview">
            <Button {...currentProps} />
          </View>
        </View>
      </ComponentDemo>

      <ComponentDemo
        title="Gallery / 变体总览"
        description="按设计语义读取按钮规格，优先看得懂各类型、尺寸与关键状态，而不是直接看工程矩阵。"
      >
        <View className="__stage-galleryStack">
          {variantOrder.map((item) => (
            <View key={item} className="__stage-gallerySection">
              <Text className="__stage-subsectionTitle">{variantLabels[item]}</Text>
              <View className="__stage-galleryGrid">
                {sizeOrder.map((itemSize) => (
                  <View key={`${item}-${itemSize}`} className="__stage-galleryCard">
                    <View className="__stage-galleryCardHeader">
                      <Text className="__stage-galleryCardLabel">{sizeLabels[itemSize]}</Text>
                      <Text className="__stage-galleryCardHint">{itemSize}</Text>
                    </View>
                    <View className="__stage-stack">
                      <Button variant={item} size={itemSize}>
                        Default
                      </Button>
                      <Button variant={item} size={itemSize} inactive>
                        inactive
                      </Button>
                      <Button variant={item} size={itemSize} disabled>
                        disabled
                      </Button>
                      <Button variant={item} size={itemSize} loading>
                        loading
                      </Button>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ComponentDemo>

      <ComponentDemo
        title="Verification / 辅助验证"
        description="工程核对信息保留在页面底部，便于确认跨端映射与状态矩阵，但不再占据主展示区。"
      >
        <View className="__stage-verificationNote">
          <Text className="__stage-caption">
            当前页主验证目标仍是 H5 Button 本体；下列信息用于辅助核对 RN adapter 映射与状态覆盖范围。
          </Text>
        </View>
        <View className="__stage-compareGrid">
          <View className="__stage-compareCard">
            <Text className="__stage-sectionTitle">Scope</Text>
            <View className="__stage-kvList">
              <View className="__stage-kvRow">
                <Text className="__stage-kvKey">当前阶段</Text>
                <Text className="__stage-kvValue">Phase 5 Button Figma 对齐</Text>
              </View>
              <View className="__stage-kvRow">
                <Text className="__stage-kvKey">H5 侧</Text>
                <Text className="__stage-kvValue">继续直接渲染 @fdesign/components/Button</Text>
              </View>
              <View className="__stage-kvRow">
                <Text className="__stage-kvKey">RN 侧</Text>
                <Text className="__stage-kvValue">通过 @fdesign/adapters 注入 primitives 映射真实按钮 token</Text>
              </View>
              <View className="__stage-kvRow">
                <Text className="__stage-kvKey">非目标</Text>
                <Text className="__stage-kvValue">不覆盖业务场景排版，只核对组件本体与状态语义</Text>
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
        <ButtonHarness />
      </ComponentDemo>
    </Layout>
  );
}

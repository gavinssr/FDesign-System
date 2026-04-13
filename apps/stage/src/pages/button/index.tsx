import { Text, View } from '@tarojs/components';
import { Button } from '@fdesign/components';

import { ComponentDemo } from '../../shell/ComponentDemo';
import { Layout } from '../../shell/Layout';

type ButtonVariant = 'primary-fill' | 'primary-outline' | 'secondary-outline';
type ButtonSize = 'xl' | 'l' | 'm' | 's' | 'xs' | 'mini';

const variantOrder: ButtonVariant[] = ['primary-fill', 'primary-outline', 'secondary-outline'];
const sizeOrder: ButtonSize[] = ['xl', 'l', 'm', 's', 'xs', 'mini'];
const stateOrder = ['default', 'inactive', 'disabled', 'loading'] as const;
const variantLabels: Record<ButtonVariant, string> = {
  'primary-fill': 'Primary Fill / 主按钮填充',
  'primary-outline': 'Primary Outline / 主按钮描边',
  'secondary-outline': 'Secondary Outline / 次按钮描边',
};
const variantLabelShort: Record<ButtonVariant, string> = {
  'primary-fill': 'Primary Fill',
  'primary-outline': 'Primary Outline',
  'secondary-outline': 'Secondary Outline',
};
const sizeLabels: Record<ButtonSize, string> = {
  xl: 'XL',
  l: 'L',
  m: 'M',
  s: 'S',
  xs: 'XS',
  mini: 'Mini',
};
const buttonText = '操作文本';

export default function ButtonPage() {
  return (
    <Layout title="Base / 基础按钮" navKey="button-base" showPageTitle={false}>
      <View className="__stage-demoCard">
        <View className="__stage-hero">
          <View className="__stage-heroBody">
            <Text className="__stage-heroTitle">Button / 按钮</Text>
            <Text className="__stage-heroDescription">
              按钮用于执行用户在交互流程中触发指令、提交更改或完成的即时操作。
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
        title="Gallery / 变体总览"
      >
        <View className="__stage-galleryStack">
          <View className="__stage-gallerySection">
            <Text className="__stage-subsectionTitle">类型 / Variants</Text>
            <View className="__stage-overviewRow">
              {variantOrder.map((variant) => (
                <View key={`variant-${variant}`} className="__stage-captionedItem">
                  <Button variant={variant} size="l">
                    {buttonText}
                  </Button>
                  <Text className="__stage-metaKey">{variantLabelShort[variant]}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className="__stage-gallerySection">
            <Text className="__stage-subsectionTitle">尺寸 / Sizes</Text>
            <View className="__stage-overviewRow">
              {sizeOrder.map((size) => (
                <View key={`size-${size}`} className="__stage-captionedItem">
                  <Button variant="primary-fill" size={size}>
                    {buttonText}
                  </Button>
                  <Text className="__stage-metaKey">{sizeLabels[size]}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className="__stage-gallerySection">
            <Text className="__stage-subsectionTitle">状态矩阵 / State Matrix</Text>
            <View className="__stage-matrixGrid">
              {variantOrder.map((variant) => (
                <View key={`matrix-${variant}`} className="__stage-galleryCard">
                  <View className="__stage-galleryCardHeader">
                    <Text className="__stage-galleryCardLabel">{variantLabels[variant]}</Text>
                  </View>
                  <View className="__stage-matrixStack">
                    {stateOrder.map((state) => {
                      const stateProps =
                        state === 'inactive'
                          ? { inactive: true }
                          : state === 'disabled'
                            ? { disabled: true }
                            : state === 'loading'
                              ? { loading: true }
                              : {};

                      return (
                        <View key={`${variant}-${state}`} className="__stage-matrixRow">
                          <Text className="__stage-metaKey">{state}</Text>
                          <View className="__stage-matrixButton">
                            <Button variant={variant} size="m" {...stateProps}>
                              {buttonText}
                            </Button>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View className="__stage-gallerySection">
            <Text className="__stage-subsectionTitle">不同尺寸 Loading / Primary Outline</Text>
            <View className="__stage-overviewRow">
              {sizeOrder.map((size) => (
                <View key={`loading-${size}`} className="__stage-captionedItem">
                  <Button variant="primary-outline" size={size} loading>
                    {buttonText}
                  </Button>
                  <Text className="__stage-metaKey">{sizeLabels[size]}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ComponentDemo>
    </Layout>
  );
}

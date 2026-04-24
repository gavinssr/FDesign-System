import { Text, View } from '@tarojs/components';
import { Button } from '@fdesign/components';

import { StageShowcasePage } from '../../shell/StageShowcasePage';

type ButtonVariant = 'primary-fill' | 'primary-outline' | 'secondary-outline';
type ButtonSize = 'xl' | 'l' | 'm' | 's' | 'xs' | 'mini';

const variantOrder: ButtonVariant[] = ['primary-fill', 'primary-outline', 'secondary-outline'];
const sizeOrder: ButtonSize[] = ['xl', 'l', 'm', 's', 'xs', 'mini'];
const stateOrder = ['default', 'inactive', 'disabled', 'loading'] as const;
const variantLabels: Record<ButtonVariant, string> = {
  'primary-fill': 'Primary Fill 主按钮填充',
  'primary-outline': 'Primary Outline 主按钮描边',
  'secondary-outline': 'Secondary Outline 次按钮描边',
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
    <StageShowcasePage
      heroTitle="Base 基础按钮"
      heroDescription="按钮用于执行用户在交互流程中触发指令、提交更改或完成的即时操作。"
      heroMeta={[
        { key: 'Variants', value: '3 种类型' },
        { key: 'Sizes', value: '6 种尺寸' },
        { key: 'States', value: '4 种状态' },
      ]}
      galleryTitle="Gallery / 变体总览"
      sections={[
        {
          key: 'variants',
          title: '类型 / Variants',
          children: (
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
          ),
        },
        {
          key: 'sizes',
          title: '尺寸 / Sizes',
          children: (
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
          ),
        },
        {
          key: 'state-matrix',
          title: '状态矩阵 / State Matrix',
          children: (
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
          ),
        },
        {
          key: 'outline-loading',
          title: '不同尺寸 Loading / Primary Outline',
          children: (
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
          ),
        },
      ]}
    />
  );
}

import { Text, View } from '@tarojs/components';
import { Tag } from '@fdesign/components';

import { StageShowcasePage } from '../../shell/StageShowcasePage';
import './index.css';

const variants = ['fill-primary', 'outline', 'fill-secondary'] as const;
const colors = ['blue', 'pink', 'red', 'yellow', 'green', 'purple', 'grey'] as const;

const variantLabels: Record<(typeof variants)[number], string> = {
  'fill-primary': 'Fill Primary',
  outline: 'Outline',
  'fill-secondary': 'Fill Secondary',
};

const colorLabels: Record<(typeof colors)[number], string> = {
  blue: 'Blue',
  pink: 'Pink',
  red: 'Red',
  yellow: 'Yellow',
  green: 'Green',
  purple: 'Purple',
  grey: 'Grey',
};

export default function TagPage() {
  return (
    <StageShowcasePage
      heroTitle="Tag 标签"
      heroDescription="标签用于呈现轻量分类与状态信息，当前已按 Figma 对齐为三种样式变体、七种颜色与券式前缀结构。"
      heroMeta={[
        { key: 'Variants', value: '3 种样式' },
        { key: 'Colors', value: '7 种颜色' },
        { key: 'Coupon', value: '支持前缀券样式' },
      ]}
      sections={[
        {
          title: '样式类型 / Variants',
          children: (
            <View className="__stage-overviewRow">
              {variants.map((variant) => (
                <View key={variant} className="__stage-captionedItem">
                  <Tag variant={variant} color="blue">
                    标签
                  </Tag>
                  <Text className="__stage-metaKey">{variantLabels[variant]}</Text>
                </View>
              ))}
            </View>
          ),
        },
        {
          title: '颜色 / Colors',
          children: (
            <View className="__stage-tagFlow">
              {colors.map((color) => (
                <View key={color} className="__stage-tagCard">
                  <Text className="__stage-galleryCardLabel">{colorLabels[color]}</Text>
                  <View className="__stage-stack">
                    {variants.map((variant) => (
                      <Tag key={`${color}-${variant}`} variant={variant} color={color}>
                        标签
                      </Tag>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          ),
        },
        {
          title: '券式标签 / Coupon',
          children: (
            <View className="__stage-tagFlow">
              {colors.map((color) => (
                <View key={`coupon-${color}`} className="__stage-tagCard">
                  <Text className="__stage-galleryCardLabel">{colorLabels[color]}</Text>
                  <Tag variant="outline" color={color} couponPrefix="券">
                    满300减30
                  </Tag>
                </View>
              ))}
            </View>
          ),
        },
      ]}
    />
  );
}

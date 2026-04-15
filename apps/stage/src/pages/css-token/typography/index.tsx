import { Text, View } from '@tarojs/components';
import { colors, fontFamilies, fontSize, fontWeight, lineHeight, typography } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import { StageShowcasePage } from '../../../shell/StageShowcasePage';

const familySamples = [
  {
    key: 'textChinese',
    label: 'Text Chinese',
    value: fontFamilies.semantic.textChinese,
    sample: '中文正文字体示例，用于验证常规信息阅读场景。',
  },
  {
    key: 'textLatin',
    label: 'Text Latin',
    value: fontFamilies.semantic.textLatin,
    sample: 'Latin body sample for everyday product copy.',
  },
  {
    key: 'displayChinese',
    label: 'Display Chinese',
    value: fontFamilies.semantic.displayChinese,
    sample: '中文展示字体示例，用于较强层级标题。',
  },
  {
    key: 'displayLatin',
    label: 'Display Latin',
    value: fontFamilies.semantic.displayLatin,
    sample: 'Display sample for headline-oriented content.',
  },
] as const;

const fontSizeScale = [
  { key: 'min', label: '10', value: fontSize.min, lineHeight: lineHeight.body.min },
  { key: 'base', label: '12', value: fontSize.base, lineHeight: lineHeight.body.base },
  { key: 'further', label: '14', value: fontSize.further, lineHeight: lineHeight.body.further },
  { key: 'increase', label: '16', value: fontSize.increase, lineHeight: lineHeight.body.increase },
  { key: 'head', label: '18', value: fontSize.head, lineHeight: lineHeight.body.head },
  {
    key: 'displayNormal',
    label: '22',
    value: fontSize.displayNormal,
    lineHeight: lineHeight.singleLine.displayNormal,
  },
  {
    key: 'displayLarge',
    label: '26',
    value: fontSize.displayLarge,
    lineHeight: lineHeight.singleLine.displayLarge,
  },
  {
    key: 'displayXLarge',
    label: '36',
    value: fontSize.displayXLarge,
    lineHeight: lineHeight.singleLine.displayXLarge,
  },
  {
    key: 'displayXXLarge',
    label: '44',
    value: fontSize.displayXXLarge,
    lineHeight: lineHeight.singleLine.displayXXLarge,
  },
] as const;

const fontWeightScale = [
  { key: 'light', label: 'Light 300', value: fontWeight.light },
  { key: 'regular', label: 'Regular 400', value: fontWeight.regular },
  { key: 'medium', label: 'Medium 500', value: fontWeight.medium },
] as const;

const singleLineScale = [
  { key: 'min', label: '10 / 11', fontSize: fontSize.min, lineHeight: lineHeight.singleLine.min },
  { key: 'base', label: '12 / 14', fontSize: fontSize.base, lineHeight: lineHeight.singleLine.base },
  {
    key: 'further',
    label: '14 / 16',
    fontSize: fontSize.further,
    lineHeight: lineHeight.singleLine.further,
  },
  {
    key: 'increase',
    label: '16 / 18',
    fontSize: fontSize.increase,
    lineHeight: lineHeight.singleLine.increase,
  },
  { key: 'head', label: '18 / 20', fontSize: fontSize.head, lineHeight: lineHeight.singleLine.head },
  {
    key: 'displayNormal',
    label: '22 / 24',
    fontSize: fontSize.displayNormal,
    lineHeight: lineHeight.singleLine.displayNormal,
  },
  {
    key: 'displayLarge',
    label: '26 / 28',
    fontSize: fontSize.displayLarge,
    lineHeight: lineHeight.singleLine.displayLarge,
  },
  {
    key: 'displayXLarge',
    label: '36 / 38',
    fontSize: fontSize.displayXLarge,
    lineHeight: lineHeight.singleLine.displayXLarge,
  },
  {
    key: 'displayXXLarge',
    label: '44 / 46',
    fontSize: fontSize.displayXXLarge,
    lineHeight: lineHeight.singleLine.displayXXLarge,
  },
] as const;

const bodyScale = [
  { key: 'min', label: '10 / 16', fontSize: fontSize.min, lineHeight: lineHeight.body.min },
  { key: 'base', label: '12 / 18', fontSize: fontSize.base, lineHeight: lineHeight.body.base },
  { key: 'further', label: '14 / 22', fontSize: fontSize.further, lineHeight: lineHeight.body.further },
  { key: 'increase', label: '16 / 24', fontSize: fontSize.increase, lineHeight: lineHeight.body.increase },
  { key: 'head', label: '18 / 28', fontSize: fontSize.head, lineHeight: lineHeight.body.head },
] as const;

function getTextStyle(style: CSSProperties): CSSProperties {
  return {
    fontFamily: typography.family.semantic.textChinese,
    color: colors.semantic.text.primary,
    ...style,
  };
}

export default function TypographyPage() {
  return (
    <StageShowcasePage
      title="Typography 排版"
      heroTitle="Typography 排版"
      heroDescription="用于验证全局字体族、字号、字重、行高与基础文本行为在 stage 中的实际映射效果。"
      heroMeta={[
        { key: 'Families', value: '4 组语义字体族' },
        { key: 'Sizes', value: '9 档字号' },
        { key: 'Weights', value: '3 档字重' },
        { key: 'Rules', value: 'singleLine / body' },
      ]}
      navKey="typography"
      galleryTitle="Gallery / 总览"
      galleryDescription="按全局 typography token 组织展示。"
      sections={[
        {
          title: '字体族 / Font Family',
          children: (
            <View className="__stage-galleryGrid">
              {familySamples.map((item) => (
                <View key={item.key} className="__stage-galleryCard">
                  <Text className="__stage-galleryCardLabel">{item.label}</Text>
                  <View className="__stage-stack">
                    <Text style={getTextStyle({ fontFamily: item.value, fontSize: 16, lineHeight: '24px' })}>
                      {item.sample}
                    </Text>
                    <Text className="__stage-metaKey">{item.value}</Text>
                  </View>
                </View>
              ))}
            </View>
          ),
        },
        {
          title: '字号体系 / Font Size Scale',
          children: (
            <View className="__stage-overviewRow">
              {fontSizeScale.map((item) => (
                <View key={item.key} className="__stage-captionedItem">
                  <Text
                    style={getTextStyle({
                      fontSize: `${item.value}px`,
                      lineHeight: `${item.lineHeight}px`,
                      fontWeight: typography.weight.medium,
                    })}
                  >
                    Ag
                  </Text>
                  <Text className="__stage-metaKey">{`${item.label}px`}</Text>
                </View>
              ))}
            </View>
          ),
        },
        {
          title: '字重体系 / Font Weight',
          children: (
            <View className="__stage-galleryGrid">
              {fontWeightScale.map((item) => (
                <View key={item.key} className="__stage-galleryCard">
                  <Text className="__stage-galleryCardLabel">{item.label}</Text>
                  <Text
                    style={getTextStyle({
                      fontSize: `${fontSize.further}px`,
                      lineHeight: `${lineHeight.body.further}px`,
                      fontWeight: item.value,
                    })}
                  >
                    字重验证示例 Typography weight sample
                  </Text>
                </View>
              ))}
            </View>
          ),
        },
        {
          title: '行高规则 / Line Height',
          children: (
            <View className="__stage-galleryGrid">
              <View className="__stage-galleryCard">
                <Text className="__stage-galleryCardLabel">Single Line</Text>
                <View className="__stage-stack">
                  {singleLineScale.map((item) => (
                    <View key={item.key} className="__stage-captionedItem __stage-captionedItemStart">
                      <Text
                        style={getTextStyle({
                          fontSize: `${item.fontSize}px`,
                          lineHeight: `${item.lineHeight}px`,
                          fontWeight: typography.weight.medium,
                        })}
                      >
                        单行标题
                      </Text>
                      <Text className="__stage-metaKey">{item.label}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View className="__stage-galleryCard">
                <Text className="__stage-galleryCardLabel">Body</Text>
                <View className="__stage-stack">
                  {bodyScale.map((item) => (
                    <View key={item.key} className="__stage-captionedItem __stage-captionedItemStart">
                      <Text
                        style={getTextStyle({
                          fontSize: `${item.fontSize}px`,
                          lineHeight: `${item.lineHeight}px`,
                        })}
                      >
                        正文段落用于验证多行阅读时的节奏与呼吸感。
                      </Text>
                      <Text className="__stage-metaKey">{item.label}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ),
        },
        {
          title: '基础行为 / Text Behaviour',
          children: (
            <View className="__stage-galleryGrid">
              <View className="__stage-galleryCard">
                <Text className="__stage-galleryCardLabel">Truncate</Text>
                <View style={{ width: '220px' }}>
                  <Text
                    style={getTextStyle({
                      display: 'block',
                      fontSize: `${fontSize.further}px`,
                      lineHeight: `${lineHeight.body.further}px`,
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    })}
                  >
                    This is a long sentence used to validate truncation without relying on a Text component wrapper.
                  </Text>
                </View>
              </View>
              <View className="__stage-galleryCard">
                <Text className="__stage-galleryCardLabel">Body Paragraph</Text>
                <Text
                  style={getTextStyle({
                    fontSize: `${fontSize.further}px`,
                    lineHeight: `${lineHeight.body.further}px`,
                    color: colors.semantic.text.secondary,
                  })}
                >
                  Typography 页面只验证 token 协议与排版结果。真实业务页面中的文字来自业务文案、
                  接口数据或状态映射，再由页面结构按需组合字体、字号、字重、行高与颜色。
                </Text>
              </View>
            </View>
          ),
        },
      ]}
    />
  );
}

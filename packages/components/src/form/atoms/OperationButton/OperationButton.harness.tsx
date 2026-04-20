import { Text, View } from '@tarojs/components';
import { colors, typographyStyles } from '@fdesign/tokens';

import { Tag } from '../../../tag';
import { OperationButton } from './OperationButton';

const helperTextStyle = {
  fontFamily: typographyStyles.body12SingleLine.fontFamily,
  fontSize: `${typographyStyles.body12SingleLine.fontSize}px`,
  lineHeight: `${typographyStyles.body12SingleLine.lineHeight}px`,
  fontWeight: typographyStyles.body12SingleLine.fontWeight,
  color: colors.semantic.text.tertiary,
  whiteSpace: 'nowrap' as const,
};

export function OperationButtonHarness() {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <View style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
        <OperationButton type="button-bluePrimary">操作文本</OperationButton>
        <OperationButton type="button-blueSecondary">操作文本</OperationButton>
        <OperationButton type="button-blueOutline">操作文本</OperationButton>
        <OperationButton type="preContent">预设内容</OperationButton>
        <View style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
          <Text style={helperTextStyle}>二级文本</Text>
          <OperationButton type="plusCount">+9,000</OperationButton>
        </View>
      </View>
      <View style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
        <OperationButton type="button-pinkPrimary">操作文本</OperationButton>
        <OperationButton type="button-pinkSecondary">操作文本</OperationButton>
        <OperationButton type="button-pinkOutline">操作文本</OperationButton>
        <OperationButton type="subText">二级描述文案</OperationButton>
        <View style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <Tag variant="outline" color="blue">标签</Tag>
          <OperationButton type="tagAmount">¥5,000</OperationButton>
        </View>
        <OperationButton type="textButton">操作文本</OperationButton>
      </View>
    </View>
  );
}

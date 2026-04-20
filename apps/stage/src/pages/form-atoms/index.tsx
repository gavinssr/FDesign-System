import { Text, View } from '@tarojs/components';
import {
  BrandColor,
  CheckboxHarness,
  CollapseHarness,
  Divider,
  ErrorPop,
  ErrorTips,
  InputField,
  JumpHarness,
  LabelAmountSupple,
  LabelAnnotation,
  LabelDescrip,
  LabelMultiTextFirst,
  LabelMultiTextSecondaryDark,
  LabelMultiTextSecondaryLightColor,
  LabelResultSupple,
  Label,
  LoginMethodsHarness,
  NumberTitle,
  OperationButtonHarness,
  TextOperatorHarness,
  OptionCardDefaultHarness,
  OptionCardMultiLabelHarness,
  OptionCardPicHarness,
  OptionCardThumbHarness,
  PlaceholderIconHarness,
  RadioHarness,
  SelectionContentHarness,
  SupplementHarness,
  SwitchHarness,
  TickHarness,
  TickTagHarness,
  WordLimitHarness,
} from '@fdesign/components';

import { StageShowcasePage } from '../../shell/StageShowcasePage';
import './index.css';

interface AtomEntry {
  key: string;
  title: string;
  render: () => JSX.Element;
}

function StageLabeledDemoItem({
  label,
  children,
}: {
  label: string;
  children: JSX.Element;
}) {
  return (
    <View className="__stage-formAtomDemoItem">
      <Text className="__stage-formAtomDemoProp">{label}</Text>
      <View className="__stage-formAtomDemoBody">{children}</View>
    </View>
  );
}

function StageLabeledColumn({
  title,
  align = 'start',
  children,
}: {
  title: string;
  align?: 'start' | 'end';
  children: JSX.Element[];
}) {
  return (
    <View
      className={`__stage-formAtomDemoColumn${align === 'end' ? ' __stage-formAtomDemoColumnAlignEnd' : ''}`}
    >
      <Text className="__stage-formAtomDemoColumnTitle">{title}</Text>
      <View className="__stage-formAtomDemoStack">{children}</View>
    </View>
  );
}

function LabelShowcase() {
  return (
    <View className="__stage-formAtomDemoStack">
      <StageLabeledDemoItem label="XL">
        <Label size="XL">主标题 XL</Label>
      </StageLabeledDemoItem>
      <StageLabeledDemoItem label="L">
        <Label size="L">主标题 L</Label>
      </StageLabeledDemoItem>
      <StageLabeledDemoItem label="M">
        <Label size="M">主标题 M</Label>
      </StageLabeledDemoItem>
    </View>
  );
}

function NumberTitleShowcase() {
  return (
    <View className="__stage-formAtomDemoStack">
      <StageLabeledDemoItem label="XL">
        <NumberTitle size="XL">12,345.67</NumberTitle>
      </StageLabeledDemoItem>
      <StageLabeledDemoItem label="L">
        <NumberTitle size="L">12,345.67</NumberTitle>
      </StageLabeledDemoItem>
      <StageLabeledDemoItem label="M">
        <NumberTitle size="M">12,345.67</NumberTitle>
      </StageLabeledDemoItem>
      <StageLabeledDemoItem label="S">
        <NumberTitle size="S">12,345.67</NumberTitle>
      </StageLabeledDemoItem>
      <StageLabeledDemoItem label="XL + arrow">
        <NumberTitle size="XL" showArrow>
          12,345.67
        </NumberTitle>
      </StageLabeledDemoItem>
      <StageLabeledDemoItem label="L + arrow">
        <NumberTitle size="L" showArrow>
          12,345.67
        </NumberTitle>
      </StageLabeledDemoItem>
      <StageLabeledDemoItem label="M + arrow">
        <NumberTitle size="M" showArrow>
          12,345.67
        </NumberTitle>
      </StageLabeledDemoItem>
      <StageLabeledDemoItem label="S + arrow">
        <NumberTitle size="S" showArrow>
          12,345.67
        </NumberTitle>
      </StageLabeledDemoItem>
    </View>
  );
}

function BrandColorShowcase() {
  return (
    <View className="__stage-formAtomDemoStack">
      <StageLabeledDemoItem label="Large">
        <BrandColor size="Large">¥1,288.00</BrandColor>
      </StageLabeledDemoItem>
      <StageLabeledDemoItem label="Small">
        <BrandColor size="Small">¥1,288.00</BrandColor>
      </StageLabeledDemoItem>
    </View>
  );
}

function InputFieldShowcase() {
  const leftColumn = (
    <StageLabeledColumn title="left">
      {[
        <StageLabeledDemoItem key="left-wait" label="wait">
          <View style={{ width: 286 }}>
            <InputField placeholder="占位(请输入)" status="wait" />
          </View>
        </StageLabeledDemoItem>,
        <StageLabeledDemoItem key="left-typing" label="typing">
          <View style={{ width: 286 }}>
            <InputField defaultValue="输入的内容" status="typing" showDelete />
          </View>
        </StageLabeledDemoItem>,
        <StageLabeledDemoItem key="left-filled" label="filled">
          <View style={{ width: 286 }}>
            <InputField defaultValue="输入的内容" status="filled" />
          </View>
        </StageLabeledDemoItem>,
        <StageLabeledDemoItem key="left-disabled" label="disabled">
          <View style={{ width: 286 }}>
            <InputField placeholder="占位(请输入)" defaultValue="输入的内容" status="disabled" />
          </View>
        </StageLabeledDemoItem>,
      ]}
    </StageLabeledColumn>
  );

  const rightColumn = (
    <StageLabeledColumn title="right" align="end">
      {[
        <StageLabeledDemoItem key="right-wait" label="wait">
          <View style={{ width: 286 }}>
            <InputField placeholder="占位(请输入)" status="wait" align="right" />
          </View>
        </StageLabeledDemoItem>,
        <StageLabeledDemoItem key="right-typing" label="typing">
          <View style={{ width: 286 }}>
            <InputField defaultValue="输入的内容" status="typing" showDelete align="right" />
          </View>
        </StageLabeledDemoItem>,
        <StageLabeledDemoItem key="right-filled" label="filled">
          <View style={{ width: 286 }}>
            <InputField defaultValue="输入的内容" status="filled" align="right" />
          </View>
        </StageLabeledDemoItem>,
        <StageLabeledDemoItem key="right-disabled" label="disabled">
          <View style={{ width: 286 }}>
            <InputField placeholder="占位(请输入)" defaultValue="输入的内容" status="disabled" align="right" />
          </View>
        </StageLabeledDemoItem>,
      ]}
    </StageLabeledColumn>
  );

  return <View className="__stage-formAtomDemoColumns">{leftColumn}{rightColumn}</View>;
}

function ErrorTipsShowcase() {
  return (
    <View className="__stage-formAtomDemoStack">
      <StageLabeledDemoItem label="plain">
        <View style={{ width: 355 }}>
          <ErrorTips>错误提示文案不超过20个字</ErrorTips>
        </View>
      </StageLabeledDemoItem>
      <StageLabeledDemoItem label="divider on">
        <View style={{ width: 355 }}>
          <ErrorTips divider>错误提示文案不超过20个字</ErrorTips>
        </View>
      </StageLabeledDemoItem>
    </View>
  );
}

function ErrorPopShowcase() {
  return (
    <View className="__stage-formAtomDemoStack">
      <StageLabeledDemoItem label="closable">
        <View style={{ width: 355 }}>
          <ErrorPop onClose={() => undefined} actionLabel="操作文本">
            错误提示文案不超过20个字符
          </ErrorPop>
        </View>
      </StageLabeledDemoItem>
    </View>
  );
}

function DividerShowcase() {
  return (
    <View className="__stage-formAtomDemoStack">
      <StageLabeledDemoItem label="default">
        <View style={{ width: 375 }}>
          <Divider />
        </View>
      </StageLabeledDemoItem>
      <StageLabeledDemoItem label="retract">
        <View style={{ width: 375 }}>
          <Divider retract />
        </View>
      </StageLabeledDemoItem>
    </View>
  );
}

function LabelMultiTextGroupShowcase() {
  return (
    <View className="__stage-formAtomDemoStack">
      <StageLabeledDemoItem label="First">
        <LabelMultiTextFirst>一级文本</LabelMultiTextFirst>
      </StageLabeledDemoItem>
      <StageLabeledDemoItem label="First + chevron">
        <LabelMultiTextFirst showArrow>一级文本</LabelMultiTextFirst>
      </StageLabeledDemoItem>
      <StageLabeledDemoItem label="Secondary / Dark">
        <LabelMultiTextSecondaryDark>二级文本</LabelMultiTextSecondaryDark>
      </StageLabeledDemoItem>
      <StageLabeledDemoItem label="Secondary / Light">
        <LabelMultiTextSecondaryLightColor>二级文本</LabelMultiTextSecondaryLightColor>
      </StageLabeledDemoItem>
      <StageLabeledDemoItem label="Secondary / Light + annotation">
        <LabelMultiTextSecondaryLightColor annotation>二级文本</LabelMultiTextSecondaryLightColor>
      </StageLabeledDemoItem>
    </View>
  );
}

function LabelAnnotationShowcase() {
  return (
    <View className="__stage-formAtomDemoStack">
      <StageLabeledDemoItem label="text">
        <LabelAnnotation>预设内容</LabelAnnotation>
      </StageLabeledDemoItem>
      <StageLabeledDemoItem label="text + icon">
        <LabelAnnotation showIcon>预设内容</LabelAnnotation>
      </StageLabeledDemoItem>
    </View>
  );
}

function LabelDescripShowcase() {
  return (
    <View className="__stage-formAtomDemoStack">
      <StageLabeledDemoItem label="default">
        <LabelDescrip>描述文案</LabelDescrip>
      </StageLabeledDemoItem>
    </View>
  );
}

function LabelResultSuppleShowcase() {
  return (
    <View className="__stage-formAtomDemoStack">
      <StageLabeledDemoItem label="default">
        <LabelResultSupple>｜结果辅助描述文案</LabelResultSupple>
      </StageLabeledDemoItem>
    </View>
  );
}

function LabelAmountSuppleShowcase() {
  return (
    <View className="__stage-formAtomDemoStack">
      <StageLabeledDemoItem label="amount">
        <LabelAmountSupple>¥3000</LabelAmountSupple>
      </StageLabeledDemoItem>
      <StageLabeledDemoItem label="prefix + amount">
        <LabelAmountSupple prefix="补充信息" amount="¥3000" />
      </StageLabeledDemoItem>
    </View>
  );
}

const sections: { title: string; atoms: AtomEntry[] }[] = [
  {
    title: 'Label 家族 / Labels',
    atoms: [
      { key: 'Label', title: 'Label 主标签', render: () => <LabelShowcase /> },
      { key: 'NumberTitle', title: 'NumberTitle 数字标题', render: () => <NumberTitleShowcase /> },
      { key: 'BrandColor', title: 'BrandColor 品牌色数字', render: () => <BrandColorShowcase /> },
      {
        key: 'LabelMultiTextFamily',
        title: 'LabelMultiText 多行标签组',
        render: () => <LabelMultiTextGroupShowcase />,
      },
      { key: 'LabelAnnotation', title: 'LabelAnnotation 注释', render: () => <LabelAnnotationShowcase /> },
      { key: 'LabelDescrip', title: 'LabelDescrip 描述', render: () => <LabelDescripShowcase /> },
      { key: 'LabelResultSupple', title: 'LabelResultSupple 结果补充', render: () => <LabelResultSuppleShowcase /> },
      { key: 'LabelAmountSupple', title: 'LabelAmountSupple 金额补充', render: () => <LabelAmountSuppleShowcase /> },
    ],
  },
  {
    title: 'Input / Error 家族 / Input & Error',
    atoms: [
      { key: 'InputField', title: 'InputField 输入字段', render: () => <InputFieldShowcase /> },
      { key: 'ErrorTips', title: 'ErrorTips 错误单行提示', render: () => <ErrorTipsShowcase /> },
      { key: 'ErrorPop', title: 'ErrorPop 错误气泡', render: () => <ErrorPopShowcase /> },
      { key: 'WordLimit', title: 'WordLimit 字数统计', render: () => <WordLimitHarness /> },
    ],
  },
  {
    title: 'Action 操作家族 / Action',
    atoms: [
      { key: 'TextOperator', title: 'TextOperator 文字按钮', render: () => <TextOperatorHarness /> },
      { key: 'OperationButton', title: 'OperationButton 操作按钮', render: () => <OperationButtonHarness /> },
      { key: 'Jump', title: 'Jump 跳转箭头', render: () => <JumpHarness /> },
      { key: 'Collapse', title: 'Collapse 折叠 chevron', render: () => <CollapseHarness /> },
      { key: 'Supplement', title: 'Supplement 辅助说明', render: () => <SupplementHarness /> },
      { key: 'LoginMethods', title: 'LoginMethods 登录方式入口', render: () => <LoginMethodsHarness /> },
    ],
  },
  {
    title: 'Selection 选择家族 / Selection',
    atoms: [
      { key: 'SelectionContent', title: 'SelectionContent 选择内容片段', render: () => <SelectionContentHarness /> },
      { key: 'Checkbox', title: 'Checkbox 复选框', render: () => <CheckboxHarness /> },
      { key: 'Radio', title: 'Radio 单选框', render: () => <RadioHarness /> },
      { key: 'Tick', title: 'Tick 对勾标记', render: () => <TickHarness /> },
      { key: 'TickTag', title: 'TickTag 标签式选择', render: () => <TickTagHarness /> },
      { key: 'OptionCardDefault', title: 'OptionCardDefault 默认选项卡', render: () => <OptionCardDefaultHarness /> },
      { key: 'OptionCardMultiLabel', title: 'OptionCardMultiLabel 多行标签选项卡', render: () => <OptionCardMultiLabelHarness /> },
      { key: 'OptionCardPic', title: 'OptionCardPic 图片选项卡', render: () => <OptionCardPicHarness /> },
      { key: 'OptionCardThumb', title: 'OptionCardThumb 缩略图选项卡', render: () => <OptionCardThumbHarness /> },
    ],
  },
  {
    title: 'Misc 通用家族 / Misc',
    atoms: [
      { key: 'Switch', title: 'Switch 开关', render: () => <SwitchHarness /> },
      { key: 'Divider', title: 'Divider 分割线', render: () => <DividerShowcase /> },
      { key: 'PlaceholderIcon', title: 'PlaceholderIcon 占位球', render: () => <PlaceholderIconHarness /> },
    ],
  },
];

export default function FormAtomsPage() {
  return (
    <StageShowcasePage
      title="Atoms 原子组件"
      heroTitle="Form 表单单元 / Atoms 原子组件"
      heroDescription="Round 1 落地的 33 个原子组件，按 Label / Input & Error / Action / Selection / Misc 五组展示。容器背景统一使用 surface.page；所有可交互原子遵循移动端协议：无 hover 态、无默认 cursor: pointer。"
      heroMeta={[
        { key: 'Atoms', value: '33 个原子' },
        { key: 'Families', value: '5 个分组' },
        { key: 'Interaction', value: 'Mobile-only (no hover / no pointer)' },
      ]}
      sections={sections.map((section) => ({
        title: section.title,
        children: (
          <View className="__stage-formAtomsSectionGrid">
            {section.atoms.map((atom) => (
              <View key={atom.key} className="__stage-formAtomRow">
                <View className="__stage-formAtomMeta">
                  <Text className="__stage-formAtomLabel">{atom.title}</Text>
                </View>
                <View className="__stage-formAtomDemo">{atom.render()}</View>
              </View>
            ))}
          </View>
        ),
      }))}
    />
  );
}

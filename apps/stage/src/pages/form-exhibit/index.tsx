import { Text, View } from '@tarojs/components';
import {
  ExhibitAggregateMultiFold,
  ExhibitAmountListTitleExternal,
  ExhibitInformationList,
  ExhibitInformationListAmount,
  ExhibitInformationListPlainText,
  ExhibitMultiLineDefault,
  ExhibitMultiLineNumericTitle,
  ExhibitMultiLinePretext,
  ExhibitMultiLineRightMultiPretextA,
  ExhibitMultiLineRightMultiPretextB,
  ExhibitSingleLineLabel,
  ExhibitSingleLineLabelPreContent,
  ExhibitVeriFace,
  Tag,
} from '@fdesign/components';
import type { ReactNode } from 'react';

import { StageShowcasePage } from '../../shell/StageShowcasePage';
import './index.css';

interface CellEntry {
  key: string;
  label: string;
  renderFlush: () => ReactNode;
  renderCard: () => ReactNode;
}

const SingleLineEntries: CellEntry[] = [
  {
    key: 'ExhibitSingleLineLabel',
    label: 'ExhibitSingleLineLabel 单行 label（含可选 leading icon / tag）',
    renderFlush: () => (
      <ExhibitSingleLineLabel
        label="一级标题"
        showIcon
        tag={<Tag variant="outline" color="blue">标签</Tag>}
      />
    ),
    renderCard: () => (
      <ExhibitSingleLineLabel
        card
        label="一级标题"
        showIcon
        tag={<Tag variant="outline" color="blue">标签</Tag>}
      />
    ),
  },
  {
    key: 'ExhibitSingleLineLabelPreContent',
    label: 'ExhibitSingleLineLabelPreContent 单行 label + 预设内容（含可选注解）',
    renderFlush: () => (
      <ExhibitSingleLineLabelPreContent
        label="一级标题"
        preText="预设内容"
        showAnnotation
      />
    ),
    renderCard: () => (
      <ExhibitSingleLineLabelPreContent
        card
        label="一级标题"
        preText="预设内容"
        showAnnotation
      />
    ),
  },
];

const MultiLineEntries: CellEntry[] = [
  {
    key: 'ExhibitMultiLineDefault',
    label: 'ExhibitMultiLineDefault 多行默认（title + subLabel）',
    renderFlush: () => (
      <ExhibitMultiLineDefault label="一级标题" subLabel="二级文本" showIcon />
    ),
    renderCard: () => (
      <ExhibitMultiLineDefault card label="一级标题" subLabel="二级文本" showIcon />
    ),
  },
  {
    key: 'ExhibitMultiLinePretext',
    label: 'ExhibitMultiLinePretext 多行 + 右侧预设内容',
    renderFlush: () => (
      <ExhibitMultiLinePretext
        label="一级标题"
        subLabel="二级文本"
        preText="预设内容"
        showIcon
      />
    ),
    renderCard: () => (
      <ExhibitMultiLinePretext
        card
        label="一级标题"
        subLabel="二级文本"
        preText="预设内容"
        showIcon
      />
    ),
  },
  {
    key: 'ExhibitMultiLineNumericTitle',
    label: 'ExhibitMultiLineNumericTitle 多行数字标题（带 chevron 装饰）',
    renderFlush: () => (
      <ExhibitMultiLineNumericTitle
        preLabel="二级文本"
        numericTitle="¥9294.02"
        preText="预设内容"
        showChevron
        showIcon
      />
    ),
    renderCard: () => (
      <ExhibitMultiLineNumericTitle
        card
        preLabel="二级文本"
        numericTitle="¥9294.02"
        showChevron
      />
    ),
  },
  {
    key: 'ExhibitMultiLineRightMultiPretextA',
    label: 'ExhibitMultiLineRightMultiPretextA 右对齐多前置文本 A',
    renderFlush: () => (
      <ExhibitMultiLineRightMultiPretextA
        label="一级标题"
        tag={<Tag variant="outline" color="blue">标签</Tag>}
        rightPrimary="一级文本"
        rightSecondary="二级文本"
        showIcon
      />
    ),
    renderCard: () => (
      <ExhibitMultiLineRightMultiPretextA
        card
        label="一级标题"
        tag={<Tag variant="outline" color="blue">标签</Tag>}
        rightPrimary="一级文本"
        rightSecondary="二级文本"
      />
    ),
  },
  {
    key: 'ExhibitMultiLineRightMultiPretextB',
    label: 'ExhibitMultiLineRightMultiPretextB 右对齐多前置文本 B（左侧预设内容）',
    renderFlush: () => (
      <ExhibitMultiLineRightMultiPretextB
        leftPreText="预设内容"
        rightPrimary="一级文本"
        rightSecondary="二级文本"
        showIcon
      />
    ),
    renderCard: () => (
      <ExhibitMultiLineRightMultiPretextB
        card
        leftPreText="预设内容"
        rightPrimary="一级文本"
        rightSecondary="二级文本"
        showIcon
      />
    ),
  },
];

const subItemsForInformationList = [
  { key: '1', leftText: '二级文本', rightText: '二级文本' },
  { key: '2', leftText: '二级文本', rightText: '二级文本' },
];

const amountListItems = [
  { key: '1', labelText: '二级文本', amount: '¥9294.02', tagColor: 'red' as const },
  { key: '2', labelText: '二级文本', amount: '¥9294.02', tagColor: 'red' as const },
  { key: '3', labelText: '二级文本', amount: '¥9294.02', tagColor: 'red' as const },
];

const aggregateItems = [
  {
    key: '1',
    title: '一级标题',
    amount: '¥9999.99',
    defaultExpanded: true,
    subItems: [
      { key: 's1', leading: '第1/24期', description: '二级描述文案二级描述文案二级…', amount: '¥9999.99' },
      { key: 's2', leading: '第2/24期', description: '二级描述文案二级描述文案二级…', amount: '¥9999.99' },
    ],
  },
  {
    key: '2',
    title: '一级标题',
    amount: '¥9999.99',
    subItems: [
      { key: 's3', leading: '第3/24期', description: '二级描述文案', amount: '¥9999.99' },
    ],
  },
  {
    key: '3',
    title: '一级标题',
    amount: '¥9999.99',
    subItems: [
      { key: 's4', leading: '第4/24期', description: '二级描述文案', amount: '¥9999.99' },
    ],
  },
];

const CombinedEntries: CellEntry[] = [
  {
    key: 'ExhibitInformationList',
    label: 'ExhibitInformationList 信息列表（组标题 + 子行）',
    renderFlush: () => (
      <ExhibitInformationList title="一级标题" items={subItemsForInformationList} />
    ),
    renderCard: () => (
      <ExhibitInformationList card title="一级标题" items={subItemsForInformationList} />
    ),
  },
];

function CellPair({ entry }: { entry: CellEntry }) {
  return (
    <View className="__stage-formExhibitRow" key={entry.key}>
      <Text className="__stage-formExhibitRowLabel">{entry.label}</Text>
      <View className="__stage-formExhibitPair">
        <View className="__stage-formExhibitPairItem">
          <Text className="__stage-formExhibitPairCaption">card = false（flush）</Text>
          {entry.renderFlush()}
        </View>
        <View className="__stage-formExhibitPairItem">
          <Text className="__stage-formExhibitPairCaption">card = true</Text>
          {entry.renderCard()}
        </View>
      </View>
    </View>
  );
}

const sections = [
  {
    title: '单行展示类 / Single Line',
    children: (
      <View className="__stage-formExhibitFrame">
        {SingleLineEntries.map((entry) => (
          <CellPair key={entry.key} entry={entry} />
        ))}
      </View>
    ),
  },
  {
    title: '多行展示类 / Multi Line',
    children: (
      <View className="__stage-formExhibitFrame">
        {MultiLineEntries.map((entry) => (
          <CellPair key={entry.key} entry={entry} />
        ))}
      </View>
    ),
  },
  {
    title: '人脸验证 / Verification',
    children: (
      <View className="__stage-formExhibitFrame">
        <View className="__stage-formExhibitRow">
          <Text className="__stage-formExhibitRowLabel">
            ExhibitVeriFace 固定 card；veriFailed=false / true 两态
          </Text>
          <View className="__stage-formExhibitPair">
            <View className="__stage-formExhibitPairItem">
              <Text className="__stage-formExhibitPairCaption">veriFailed = false</Text>
              <ExhibitVeriFace />
            </View>
            <View className="__stage-formExhibitPairItem">
              <Text className="__stage-formExhibitPairCaption">veriFailed = true</Text>
              <ExhibitVeriFace veriFailed />
            </View>
          </View>
        </View>
      </View>
    ),
  },
  {
    title: '组合展示类 / Combined',
    children: (
      <View className="__stage-formExhibitFrame">
        {CombinedEntries.map((entry) => (
          <CellPair key={entry.key} entry={entry} />
        ))}
        <View className="__stage-formExhibitRow">
          <Text className="__stage-formExhibitRowLabel">
            ExhibitAmountListTitleExternal 外置标题 + 金额列表（固定 card）
          </Text>
          <ExhibitAmountListTitleExternal items={amountListItems} />
        </View>
        <View className="__stage-formExhibitRow">
          <Text className="__stage-formExhibitRowLabel">
            ExhibitAggregateMultiFold 聚合多折叠（固定 card；首项非受控默认展开）
          </Text>
          <ExhibitAggregateMultiFold items={aggregateItems} />
        </View>
      </View>
    ),
  },
  {
    title: '折叠展示类 / Foldable',
    children: (
      <View className="__stage-formExhibitFrame">
        <View className="__stage-formExhibitRow">
          <Text className="__stage-formExhibitRowLabel">
            ExhibitInformationListPlainText 折叠信息列表（纯文本；非受控 defaultExpanded；点击可切换）
          </Text>
          <View className="__stage-formExhibitPair">
            <View className="__stage-formExhibitPairItem">
              <Text className="__stage-formExhibitPairCaption">card = false · defaultExpanded</Text>
              <ExhibitInformationListPlainText items={subItemsForInformationList} defaultExpanded />
            </View>
            <View className="__stage-formExhibitPairItem">
              <Text className="__stage-formExhibitPairCaption">card = true · defaultExpanded</Text>
              <ExhibitInformationListPlainText card items={subItemsForInformationList} defaultExpanded />
            </View>
            <View className="__stage-formExhibitPairItem">
              <Text className="__stage-formExhibitPairCaption">card = false · collapsed</Text>
              <ExhibitInformationListPlainText items={subItemsForInformationList} />
            </View>
            <View className="__stage-formExhibitPairItem">
              <Text className="__stage-formExhibitPairCaption">card = true · collapsed</Text>
              <ExhibitInformationListPlainText card items={subItemsForInformationList} />
            </View>
          </View>
        </View>
        <View className="__stage-formExhibitRow">
          <Text className="__stage-formExhibitRowLabel">
            ExhibitInformationListAmount 折叠信息列表（金额；card 展开态子行为 jump，flush 展开态子行为 text）
          </Text>
          <View className="__stage-formExhibitPair">
            <View className="__stage-formExhibitPairItem">
              <Text className="__stage-formExhibitPairCaption">card = false · defaultExpanded</Text>
              <ExhibitInformationListAmount items={subItemsForInformationList} defaultExpanded />
            </View>
            <View className="__stage-formExhibitPairItem">
              <Text className="__stage-formExhibitPairCaption">card = true · defaultExpanded（jump）</Text>
              <ExhibitInformationListAmount card items={subItemsForInformationList} defaultExpanded />
            </View>
            <View className="__stage-formExhibitPairItem">
              <Text className="__stage-formExhibitPairCaption">card = false · collapsed</Text>
              <ExhibitInformationListAmount items={subItemsForInformationList} />
            </View>
            <View className="__stage-formExhibitPairItem">
              <Text className="__stage-formExhibitPairCaption">card = true · collapsed</Text>
              <ExhibitInformationListAmount card items={subItemsForInformationList} />
            </View>
          </View>
        </View>
      </View>
    ),
  },
];

export default function FormExhibitPage() {
  return (
    <StageShowcasePage
      title="Exhibit 展示类"
      heroTitle="Form 表单单元 / Exhibit 展示类"
      heroDescription="Round 1 / Wave 2 + Wave 3 落地的 13 个展示类 cell（简单结构 8 + 组合/折叠结构 5）。每个 cell 同时渲染 card=false（flush 列表行）与 card=true（独立卡片）两态（固定 card 除外）；折叠类可点击切换。移动端协议：无 hover、无默认 cursor: pointer；人脸验证装饰图走 Icon decorativeIconRegistry 新分类。parts/* 内部嵌套原子不对外、不上舞台。"
      heroMeta={[
        { key: 'Cells', value: '13 个展示类' },
        { key: 'Parts', value: '11 个内部嵌套原子（不对外）' },
        { key: 'Interaction', value: 'controlled / uncontrolled fold + onJump' },
      ]}
      sections={sections}
    />
  );
}

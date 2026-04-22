import { Text, View } from '@tarojs/components';
import {
  FormAggregateCollapseGroup,
  FormAmountList,
  FormCollapseGroup,
  FormFaceStatus,
  FormInfoList,
  FormRow,
  Icon,
} from '@fdesign/components';
import { useState } from 'react';

import { StageCardModeToggle } from '../../shell/StageCardModeToggle';
import { StageShowcasePage } from '../../shell/StageShowcasePage';
import { StageVisibilitySwitch } from '../../shell/StageVisibilitySwitch';

function ShowcaseCard({
  label,
  width,
  variant = 'flush',
  surfaceBackground = 'transparent',
  children,
}: {
  label?: string;
  width: number;
  variant?: 'flush' | 'card';
  surfaceBackground?: string;
  children: JSX.Element;
}) {
  return (
    <View className="__stage-galleryCard" data-stage-variant={variant}>
      {label ? <Text className="__stage-galleryCardLabel">{label}</Text> : null}
      <View
        style={{
          background: 'var(--stage-surface-muted)',
          padding: '10px',
        }}
      >
        <View
          style={{
            width: `${width}px`,
            background: surfaceBackground,
          }}
        >
          {children}
        </View>
      </View>
    </View>
  );
}

function PlaceholderLeadingIcon({ label }: { label: string }) {
  return <Icon name="form-leading-placeholder" source="local" label={label} size="s" />;
}

function VariantShowcase({
  name,
  children,
}: {
  name: string;
  children: JSX.Element;
}) {
  return (
    <View className="__stage-formVariantShowcase">
      <Text className="__stage-formVariantName">{name}</Text>
      <View>{children}</View>
    </View>
  );
}

type FormDisplaySectionKey =
  | 'singleLine'
  | 'multiLine'
  | 'faceStatus'
  | 'flatInfoList'
  | 'externalAmountTitle'
  | 'aggregateCollapse'
  | 'collapseText'
  | 'collapseAmount';

type FormDisplayVariant = 'flush' | 'card';
type FormDisplayRowControlKey = 'singleLine' | 'multiLine';

export default function FormDisplayPage() {
  const [, setLastInteraction] = useState('未触发');
  const [sectionVariants, setSectionVariants] = useState<Record<FormDisplaySectionKey, FormDisplayVariant>>({
    singleLine: 'card',
    multiLine: 'card',
    faceStatus: 'card',
    flatInfoList: 'card',
    externalAmountTitle: 'card',
    aggregateCollapse: 'card',
    collapseText: 'card',
    collapseAmount: 'card',
  });
  const [rowVisibility, setRowVisibility] = useState<
    Record<FormDisplayRowControlKey, { showLeading: boolean; showTrailingContent: boolean }>
  >({
    singleLine: {
      showLeading: true,
      showTrailingContent: true,
    },
    multiLine: {
      showLeading: true,
      showTrailingContent: true,
    },
  });
  const [faceStatusSuccess, setFaceStatusSuccess] = useState(true);
  const buildAmountCollapseItems = (groupLabel: string) => [
    {
      label: '二级文本',
      value: '二级文本',
      onAction: () => setLastInteraction(`${groupLabel}-第一行 jump`),
    },
    {
      label: '二级文本',
      value: '二级文本',
      onAction: () => setLastInteraction(`${groupLabel}-第二行 jump`),
    },
  ];
  const renderVariantToggle = (sectionKey: FormDisplaySectionKey) => (
    <StageCardModeToggle
      variant={sectionVariants[sectionKey]}
      onChange={(variant) => {
        setSectionVariants((prev) => ({
          ...prev,
          [sectionKey]: variant,
        }));
      }}
    />
  );
  const renderRowControls = (sectionKey: FormDisplayRowControlKey) => (
    <View className="__stage-gallerySectionControlGroup">
      <StageVisibilitySwitch
        label="icon"
        checked={rowVisibility[sectionKey].showLeading}
        onChange={(checked) =>
          setRowVisibility((prev) => ({
            ...prev,
            [sectionKey]: {
              ...prev[sectionKey],
              showLeading: checked,
            },
          }))
        }
      />
      <StageVisibilitySwitch
        label="预设内容"
        checked={rowVisibility[sectionKey].showTrailingContent}
        onChange={(checked) =>
          setRowVisibility((prev) => ({
            ...prev,
            [sectionKey]: {
              ...prev[sectionKey],
              showTrailingContent: checked,
            },
          }))
        }
      />
      {renderVariantToggle(sectionKey)}
    </View>
  );
  const renderFaceStatusControls = () => (
    <View className="__stage-gallerySectionControlGroup">
      <StageVisibilitySwitch
        label="刷脸成功"
        checked={faceStatusSuccess}
        onChange={setFaceStatusSuccess}
      />
      {renderVariantToggle('faceStatus')}
    </View>
  );

  return (
    <StageShowcasePage
      heroTitle="展示类"
      heroDescription="按 Figma 展示类节点实现单行、多行、刷脸、平铺列表、金额列表、折叠组与聚合多折叠，并保留折叠和 jump 的真实交互。"
      heroMeta={[
        { key: 'Groups', value: '8 组形态' },
        { key: 'Surface', value: '2 种容器' },
        { key: 'States', value: '4 种状态' },
      ]}
      sections={[
        {
          title: '单行 Single Line',
          controls: renderRowControls('singleLine'),
          children: (
            <View className="__stage-galleryGrid">
              {sectionVariants.singleLine === 'card' ? (
                <ShowcaseCard width={355} variant="card">
                  <FormRow
                    title="一级标题"
                    tag={{ label: '标签' }}
                    presetText="预设内容"
                    leading={<PlaceholderLeadingIcon label="一级标题" />}
                    showLeading={rowVisibility.singleLine.showLeading}
                    showTrailingContent={rowVisibility.singleLine.showTrailingContent}
                    surfaceVariant="card"
                  />
                </ShowcaseCard>
              ) : (
                <ShowcaseCard width={375} variant="flush">
                  <FormRow
                    title="一级标题"
                    tag={{ label: '标签' }}
                    presetText="预设内容"
                    leading={<PlaceholderLeadingIcon label="一级标题" />}
                    showLeading={rowVisibility.singleLine.showLeading}
                    showTrailingContent={rowVisibility.singleLine.showTrailingContent}
                    surfaceVariant="flush"
                  />
                </ShowcaseCard>
              )}
            </View>
          ),
        },
        {
          title: '多行 Multi Line',
          controls: renderRowControls('multiLine'),
          children: (
            <View className="__stage-galleryGrid">
              {sectionVariants.multiLine === 'card' ? (
                <ShowcaseCard width={355} variant="card" surfaceBackground="transparent">
                  <View className="__stage-formVariantStack">
                    <VariantShowcase name="double-line">
                      <FormRow
                        variant="double-line"
                        title="一级标题"
                        secondaryText="二级文本"
                        trailingText="预设内容"
                        leading={<PlaceholderLeadingIcon label="一级标题" />}
                        showLeading={rowVisibility.multiLine.showLeading}
                        showTrailingContent={rowVisibility.multiLine.showTrailingContent}
                        tag={{ label: '标签' }}
                        surfaceVariant="card"
                      />
                    </VariantShowcase>
                    <VariantShowcase name="double-line-numeric">
                      <FormRow
                        variant="double-line-numeric"
                        title="¥9294.02"
                        secondaryText="二级文本"
                        trailingText="预设内容"
                        leading={<PlaceholderLeadingIcon label="金额" />}
                        showLeading={rowVisibility.multiLine.showLeading}
                        showTrailingContent={rowVisibility.multiLine.showTrailingContent}
                        surfaceVariant="card"
                        showInfoIcon
                      />
                    </VariantShowcase>
                    <VariantShowcase name="double-line-right">
                      <FormRow
                        variant="double-line-right"
                        title="一级标题"
                        trailingText="一级文本"
                        trailingSecondaryText="二级文本"
                        leading={<PlaceholderLeadingIcon label="一级标题" />}
                        showLeading={rowVisibility.multiLine.showLeading}
                        showTrailingContent={rowVisibility.multiLine.showTrailingContent}
                        tag={{ label: '标签' }}
                        surfaceVariant="card"
                      />
                    </VariantShowcase>
                    <VariantShowcase name="double-line-preset">
                      <FormRow
                        variant="double-line-preset"
                        title="一级标题"
                        secondaryText="二级文本"
                        presetText="预设内容"
                        leading={<PlaceholderLeadingIcon label="预设内容" />}
                        showLeading={rowVisibility.multiLine.showLeading}
                        showTrailingContent={rowVisibility.multiLine.showTrailingContent}
                        surfaceVariant="card"
                      />
                    </VariantShowcase>
                  </View>
                </ShowcaseCard>
              ) : (
                <ShowcaseCard width={375} variant="flush" surfaceBackground="transparent">
                  <View className="__stage-formVariantStack">
                    <VariantShowcase name="double-line">
                      <FormRow
                        variant="double-line"
                        title="一级标题"
                        secondaryText="二级文本"
                        trailingText="预设内容"
                        leading={<PlaceholderLeadingIcon label="一级标题" />}
                        showLeading={rowVisibility.multiLine.showLeading}
                        showTrailingContent={rowVisibility.multiLine.showTrailingContent}
                        tag={{ label: '标签' }}
                        surfaceVariant="flush"
                      />
                    </VariantShowcase>
                    <VariantShowcase name="double-line-numeric">
                      <FormRow
                        variant="double-line-numeric"
                        title="¥9294.02"
                        secondaryText="二级文本"
                        trailingText="预设内容"
                        leading={<PlaceholderLeadingIcon label="金额" />}
                        showLeading={rowVisibility.multiLine.showLeading}
                        showTrailingContent={rowVisibility.multiLine.showTrailingContent}
                        surfaceVariant="flush"
                        showInfoIcon
                      />
                    </VariantShowcase>
                    <VariantShowcase name="double-line-right">
                      <FormRow
                        variant="double-line-right"
                        title="一级标题"
                        trailingText="一级文本"
                        trailingSecondaryText="二级文本"
                        leading={<PlaceholderLeadingIcon label="一级标题" />}
                        showLeading={rowVisibility.multiLine.showLeading}
                        showTrailingContent={rowVisibility.multiLine.showTrailingContent}
                        tag={{ label: '标签' }}
                        surfaceVariant="flush"
                      />
                    </VariantShowcase>
                    <VariantShowcase name="double-line-preset">
                      <FormRow
                        variant="double-line-preset"
                        title="一级标题"
                        secondaryText="二级文本"
                        presetText="预设内容"
                        leading={<PlaceholderLeadingIcon label="预设内容" />}
                        showLeading={rowVisibility.multiLine.showLeading}
                        showTrailingContent={rowVisibility.multiLine.showTrailingContent}
                        surfaceVariant="flush"
                      />
                    </VariantShowcase>
                  </View>
                </ShowcaseCard>
              )}
            </View>
          ),
        },
        {
          title: '刷脸 Face Status',
          controls: renderFaceStatusControls(),
          children: (
            <View className="__stage-galleryGrid">
              {sectionVariants.faceStatus === 'card' ? (
                <ShowcaseCard width={355} variant="card">
                  <FormFaceStatus
                    status={faceStatusSuccess ? 'success' : 'failure'}
                    maskedName="*凯"
                    description={faceStatusSuccess ? '请根据提示完成刷脸操作' : '请根据提示重新完成刷脸操作'}
                    surfaceVariant="card"
                  />
                </ShowcaseCard>
              ) : (
                <ShowcaseCard width={375} variant="flush">
                  <FormFaceStatus
                    status={faceStatusSuccess ? 'success' : 'failure'}
                    maskedName="*凯"
                    description={faceStatusSuccess ? '请根据提示完成刷脸操作' : '请根据提示重新完成刷脸操作'}
                    surfaceVariant="flush"
                  />
                </ShowcaseCard>
              )}
            </View>
          ),
        },
        {
          title: '平铺信息列表 Flat Info List',
          controls: renderVariantToggle('flatInfoList'),
          children: (
            <View className="__stage-galleryGrid">
              {sectionVariants.flatInfoList === 'card' ? (
                <ShowcaseCard width={355} variant="card">
                  <FormInfoList
                    title="一级标题"
                    tag={{ label: '标签' }}
                    actionLabel="操作文本"
                    onAction={() => setLastInteraction('卡片信息列表操作文本')}
                    surfaceVariant="card"
                    items={[
                      { label: '二级文本', value: '二级文本' },
                      { label: '二级文本', value: '二级文本' },
                    ]}
                  />
                </ShowcaseCard>
              ) : (
                <ShowcaseCard width={375} variant="flush">
                  <FormInfoList
                    title="一级标题"
                    tag={{ label: '标签' }}
                    actionLabel="操作文本"
                    onAction={() => setLastInteraction('信息列表操作文本')}
                    surfaceVariant="flush"
                    items={[
                      { label: '二级文本', value: '二级文本' },
                      { label: '二级文本', value: '二级文本' },
                    ]}
                  />
                </ShowcaseCard>
              )}
            </View>
          ),
        },
        {
          title: '金额列表标题外置 External Amount Title',
          controls: renderVariantToggle('externalAmountTitle'),
          children: (
            <View className="__stage-galleryGrid">
              {sectionVariants.externalAmountTitle === 'card' ? (
                <ShowcaseCard width={355} variant="card">
                  <FormAmountList
                    title="全部代还"
                    highlightAmount="¥99999"
                    surfaceVariant="card"
                    items={Array.from({ length: 6 }).map(() => ({
                      label: '二级文本',
                      amount: '¥9294.02',
                      tag: { label: '标签', color: 'red' as const },
                    }))}
                  />
                </ShowcaseCard>
              ) : (
                <ShowcaseCard width={375} variant="flush">
                  <FormAmountList
                    title="全部代还"
                    highlightAmount="¥99999"
                    surfaceVariant="flush"
                    items={Array.from({ length: 6 }).map(() => ({
                      label: '二级文本',
                      amount: '¥9294.02',
                      tag: { label: '标签', color: 'red' as const },
                    }))}
                  />
                </ShowcaseCard>
              )}
            </View>
          ),
        },
        {
          title: '聚合多折叠 Aggregate Collapse',
          controls: renderVariantToggle('aggregateCollapse'),
          children: (
            <View className="__stage-galleryGrid">
              {sectionVariants.aggregateCollapse === 'card' ? (
                <ShowcaseCard width={355} variant="card">
                  <FormAggregateCollapseGroup
                    title="一级标题"
                    summary="共3笔"
                    surfaceVariant="card"
                    items={[
                      {
                        title: '一级标题',
                        amount: '¥9999.99',
                        defaultExpanded: true,
                        items: [
                          {
                            periodLabel: '第1/24期',
                            description: '二级描述文案二级描述文案二级描述文案',
                            amount: '¥9999.99',
                          },
                          {
                            periodLabel: '第1/24期',
                            description: '二级描述文案二级描述文案二级描述文案',
                            amount: '¥9999.99',
                          },
                        ],
                      },
                      {
                        title: '一级标题',
                        amount: '¥9999.99',
                        items: [
                          {
                            periodLabel: '第1/24期',
                            description: '二级描述文案二级描述文案二级描述文案',
                            amount: '¥9999.99',
                          },
                        ],
                      },
                      {
                        title: '一级标题',
                        amount: '¥9999.99',
                        items: [
                          {
                            periodLabel: '第1/24期',
                            description: '二级描述文案二级描述文案二级描述文案',
                            amount: '¥9999.99',
                          },
                        ],
                      },
                    ]}
                  />
                </ShowcaseCard>
              ) : (
                <ShowcaseCard width={375} variant="flush">
                  <FormAggregateCollapseGroup
                    title="一级标题"
                    summary="共3笔"
                    surfaceVariant="flush"
                    items={[
                      {
                        title: '一级标题',
                        amount: '¥9999.99',
                        defaultExpanded: true,
                        onExpandedChange: (expanded) =>
                          setLastInteraction(expanded ? '聚合多折叠-第一组展开' : '聚合多折叠-第一组折叠'),
                        items: [
                          {
                            periodLabel: '第1/24期',
                            description: '二级描述文案二级描述文案二级描述文案',
                            amount: '¥9999.99',
                          },
                          {
                            periodLabel: '第1/24期',
                            description: '二级描述文案二级描述文案二级描述文案',
                            amount: '¥9999.99',
                          },
                        ],
                      },
                      {
                        title: '一级标题',
                        amount: '¥9999.99',
                        items: [
                          {
                            periodLabel: '第1/24期',
                            description: '二级描述文案二级描述文案二级描述文案',
                            amount: '¥9999.99',
                          },
                        ],
                      },
                      {
                        title: '一级标题',
                        amount: '¥9999.99',
                        items: [
                          {
                            periodLabel: '第1/24期',
                            description: '二级描述文案二级描述文案二级描述文案',
                            amount: '¥9999.99',
                          },
                        ],
                      },
                    ]}
                  />
                </ShowcaseCard>
              )}
            </View>
          ),
        },
        {
          title: '折叠信息列表纯文本 Collapsible Text List',
          controls: renderVariantToggle('collapseText'),
          children: (
            <View className="__stage-galleryGrid">
              {sectionVariants.collapseText === 'card' ? (
                <ShowcaseCard width={355} variant="card">
                  <FormCollapseGroup
                    title="一级标题"
                    tag={{ label: '标签' }}
                    surfaceVariant="card"
                    items={[
                      { label: '二级文本', value: '二级文本' },
                      { label: '二级文本', value: '二级文本' },
                    ]}
                  />
                </ShowcaseCard>
              ) : (
                <ShowcaseCard width={375} variant="flush">
                  <FormCollapseGroup
                    title="一级标题"
                    tag={{ label: '标签' }}
                    surfaceVariant="flush"
                    items={[
                      { label: '二级文本', value: '二级文本' },
                      { label: '二级文本', value: '二级文本' },
                    ]}
                  />
                </ShowcaseCard>
              )}
            </View>
          ),
        },
        {
          title: '折叠信息列表金额 Collapsible Amount List',
          controls: renderVariantToggle('collapseAmount'),
          children: (
            <View className="__stage-galleryGrid">
              {sectionVariants.collapseAmount === 'card' ? (
                <ShowcaseCard width={355} variant="card">
                  <FormCollapseGroup
                    variant="amount"
                    title="一级标题"
                    tag={{ label: '标签' }}
                    summary="¥9999.99"
                    surfaceVariant="card"
                    onExpandedChange={(expanded) =>
                      setLastInteraction(expanded ? '金额折叠-展开=false卡片=true-展开' : '金额折叠-展开=false卡片=true-收起')
                    }
                    items={buildAmountCollapseItems('金额折叠-展开=false卡片=true')}
                  />
                </ShowcaseCard>
              ) : (
                <ShowcaseCard width={375} variant="flush">
                  <FormCollapseGroup
                    variant="amount"
                    title="一级标题"
                    tag={{ label: '标签' }}
                    summary="¥9999.99"
                    surfaceVariant="flush"
                    onExpandedChange={(expanded) =>
                      setLastInteraction(expanded ? '金额折叠-展开=false卡片=false-展开' : '金额折叠-展开=false卡片=false-收起')
                    }
                    items={buildAmountCollapseItems('金额折叠-展开=false卡片=false')}
                  />
                </ShowcaseCard>
              )}
            </View>
          ),
        },
      ]}
    />
  );
}

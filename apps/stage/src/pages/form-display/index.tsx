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

import { StageShowcasePage } from '../../shell/StageShowcasePage';

function ShowcaseCard({
  label,
  width,
  carded = false,
  surfaceBackground = 'var(--stage-surface)',
  children,
}: {
  label: string;
  width: number;
  carded?: boolean;
  surfaceBackground?: string;
  children: JSX.Element;
}) {
  return (
    <View className="__stage-galleryCard">
      <Text className="__stage-galleryCardLabel">{label}</Text>
      <View
        style={
          carded
            ? {
                background: 'var(--stage-surface-muted)',
                padding: '10px',
                borderRadius: '8px',
              }
            : {
                background: 'var(--stage-surface-muted)',
                padding: '10px',
              }
        }
      >
        <View
          style={{
            width: `${width}px`,
            overflow: 'hidden',
            background: surfaceBackground,
            borderRadius: carded ? '4px' : undefined,
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
      {children}
    </View>
  );
}

export default function FormDisplayPage() {
  const [lastInteraction, setLastInteraction] = useState('未触发');
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

  return (
    <StageShowcasePage
      title="Form 表单 / 展示类"
      navKey="form-display"
      heroTitle="Form 表单 / 展示类"
      heroDescription="按 Figma 展示类节点实现单行、多行、刷脸、平铺列表、金额列表、折叠组与聚合多折叠，并保留折叠和 jump 的真实交互。"
      heroMeta={[
        { key: 'Groups', value: '8 组' },
        { key: 'States', value: '默认 / 展开 / 折叠 / jump' },
        { key: 'Tokens', value: 'formDisplay spacing + typography + colors' },
        { key: 'Interaction', value: lastInteraction },
      ]}
      sections={[
        {
          title: '单行 / Single Line',
          children: (
            <View className="__stage-galleryGrid">
              <ShowcaseCard label="卡片式=false" width={375}>
                <FormRow
                  title="一级标题"
                  tag={{ label: '标签' }}
                  presetText="预设内容"
                  leading={<PlaceholderLeadingIcon label="一级标题" />}
                  carded={false}
                />
              </ShowcaseCard>
              <ShowcaseCard label="卡片式=true" width={355} carded>
                <FormRow
                  title="一级标题"
                  tag={{ label: '标签' }}
                  presetText="预设内容"
                  leading={<PlaceholderLeadingIcon label="一级标题" />}
                  carded
                />
              </ShowcaseCard>
            </View>
          ),
        },
        {
          title: '多行 / Multi Line',
          children: (
            <View className="__stage-galleryGrid">
              <ShowcaseCard label="卡片式=false" width={375} surfaceBackground="transparent">
                <View className="__stage-formVariantStack">
                  <VariantShowcase name="double-line">
                    <FormRow
                      variant="double-line"
                      title="一级标题"
                      secondaryText="二级文本"
                      trailingText="预设内容"
                      leading={<PlaceholderLeadingIcon label="一级标题" />}
                      tag={{ label: '标签' }}
                      carded={false}
                    />
                  </VariantShowcase>
                  <VariantShowcase name="double-line-numeric">
                    <FormRow
                      variant="double-line-numeric"
                      title="¥9294.02"
                      secondaryText="二级文本"
                      trailingText="预设内容"
                      leading={<PlaceholderLeadingIcon label="金额" />}
                      carded={false}
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
                      tag={{ label: '标签' }}
                      carded={false}
                    />
                  </VariantShowcase>
                  <VariantShowcase name="double-line-preset">
                    <FormRow
                      variant="double-line-preset"
                      title="一级标题"
                      secondaryText="二级文本"
                      presetText="预设内容"
                      leading={<PlaceholderLeadingIcon label="预设内容" />}
                      carded={false}
                    />
                  </VariantShowcase>
                </View>
              </ShowcaseCard>
              <ShowcaseCard
                label="卡片式=true"
                width={355}
                carded
                surfaceBackground="transparent"
              >
                <View className="__stage-formVariantStack">
                  <VariantShowcase name="double-line">
                    <FormRow
                      variant="double-line"
                      title="一级标题"
                      secondaryText="二级文本"
                      trailingText="预设内容"
                      leading={<PlaceholderLeadingIcon label="一级标题" />}
                      tag={{ label: '标签' }}
                      carded
                    />
                  </VariantShowcase>
                  <VariantShowcase name="double-line-numeric">
                    <FormRow
                      variant="double-line-numeric"
                      title="¥9294.02"
                      secondaryText="二级文本"
                      trailingText="预设内容"
                      leading={<PlaceholderLeadingIcon label="金额" />}
                      carded
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
                      tag={{ label: '标签' }}
                      carded
                    />
                  </VariantShowcase>
                  <VariantShowcase name="double-line-preset">
                    <FormRow
                      variant="double-line-preset"
                      title="一级标题"
                      secondaryText="二级文本"
                      presetText="预设内容"
                      leading={<PlaceholderLeadingIcon label="预设内容" />}
                      carded
                    />
                  </VariantShowcase>
                </View>
              </ShowcaseCard>
            </View>
          ),
        },
        {
          title: '刷脸 / Face Status',
          children: (
            <View className="__stage-galleryGrid">
              <ShowcaseCard label="卡片式=false / 成功" width={375}>
                <FormFaceStatus maskedName="*凯" description="请根据提示完成刷脸操作" carded={false} />
              </ShowcaseCard>
              <ShowcaseCard label="卡片式=true / 失败" width={355} carded>
                <FormFaceStatus
                  status="failure"
                  maskedName="*凯"
                  description="请根据提示重新完成刷脸操作"
                  carded
                />
              </ShowcaseCard>
            </View>
          ),
        },
        {
          title: '平铺信息列表 / Flat Info List',
          children: (
            <View className="__stage-galleryGrid">
              <ShowcaseCard label="卡片式=false" width={375}>
                <FormInfoList
                  title="一级标题"
                  tag={{ label: '标签' }}
                  actionLabel="操作文本"
                  onAction={() => setLastInteraction('信息列表操作文本')}
                  carded={false}
                  items={[
                    { label: '二级文本', value: '二级文本' },
                    { label: '二级文本', value: '二级文本' },
                  ]}
                />
              </ShowcaseCard>
              <ShowcaseCard label="卡片式=true" width={355} carded>
                <FormInfoList
                  title="一级标题"
                  tag={{ label: '标签' }}
                  actionLabel="操作文本"
                  onAction={() => setLastInteraction('卡片信息列表操作文本')}
                  carded
                  items={[
                    { label: '二级文本', value: '二级文本' },
                    { label: '二级文本', value: '二级文本' },
                  ]}
                />
              </ShowcaseCard>
            </View>
          ),
        },
        {
          title: '金额列表标题外置 / External Amount Title',
          children: (
            <View className="__stage-galleryGrid">
              <ShowcaseCard label="卡片式=false" width={375}>
                <FormAmountList
                  title="全部代还"
                  highlightAmount="¥99999"
                  carded={false}
                  items={Array.from({ length: 6 }).map(() => ({
                    label: '二级文本',
                    amount: '¥9294.02',
                    tag: { label: '标签', color: 'red' as const },
                  }))}
                />
              </ShowcaseCard>
              <ShowcaseCard label="卡片式=true" width={355} carded>
                <FormAmountList
                  title="全部代还"
                  highlightAmount="¥99999"
                  carded
                  items={Array.from({ length: 6 }).map(() => ({
                    label: '二级文本',
                    amount: '¥9294.02',
                    tag: { label: '标签', color: 'red' as const },
                  }))}
                />
              </ShowcaseCard>
            </View>
          ),
        },
        {
          title: '聚合多折叠 / Aggregate Collapse',
          children: (
            <View className="__stage-galleryGrid">
              <ShowcaseCard label="卡片式=false" width={375}>
                <FormAggregateCollapseGroup
                  title="一级标题"
                  summary="共3笔"
                  carded={false}
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
              <ShowcaseCard label="卡片式=true" width={355} carded>
                <FormAggregateCollapseGroup
                  title="一级标题"
                  summary="共3笔"
                  carded
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
            </View>
          ),
        },
        {
          title: '折叠信息列表-纯文本 / Collapsible Text List',
          children: (
            <View className="__stage-galleryGrid">
              <ShowcaseCard label="展开=false / 卡片式=false" width={375}>
                <FormCollapseGroup
                  title="一级标题"
                  tag={{ label: '标签' }}
                  carded={false}
                  items={[
                    { label: '二级文本', value: '二级文本' },
                    { label: '二级文本', value: '二级文本' },
                  ]}
                />
              </ShowcaseCard>
              <ShowcaseCard label="展开=false / 卡片式=true" width={355} carded>
                <FormCollapseGroup
                  title="一级标题"
                  tag={{ label: '标签' }}
                  carded
                  items={[
                    { label: '二级文本', value: '二级文本' },
                    { label: '二级文本', value: '二级文本' },
                  ]}
                />
              </ShowcaseCard>
            </View>
          ),
        },
        {
          title: '折叠信息列表-金额 / Collapsible Amount List',
          children: (
            <View className="__stage-galleryGrid">
              <ShowcaseCard label="展开=false / 卡片式=false" width={375}>
                <FormCollapseGroup
                  variant="amount"
                  title="一级标题"
                  tag={{ label: '标签' }}
                  summary="¥9999.99"
                  carded={false}
                  onExpandedChange={(expanded) =>
                    setLastInteraction(expanded ? '金额折叠-展开=false卡片=false-展开' : '金额折叠-展开=false卡片=false-收起')
                  }
                  items={buildAmountCollapseItems('金额折叠-展开=false卡片=false')}
                />
              </ShowcaseCard>
              <ShowcaseCard label="展开=false / 卡片式=true" width={355} carded>
                <FormCollapseGroup
                  variant="amount"
                  title="一级标题"
                  tag={{ label: '标签' }}
                  summary="¥9999.99"
                  carded
                  onExpandedChange={(expanded) =>
                    setLastInteraction(expanded ? '金额折叠-展开=false卡片=true-展开' : '金额折叠-展开=false卡片=true-收起')
                  }
                  items={buildAmountCollapseItems('金额折叠-展开=false卡片=true')}
                />
              </ShowcaseCard>
            </View>
          ),
        },
      ]}
    />
  );
}

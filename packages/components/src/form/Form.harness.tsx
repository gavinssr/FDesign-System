import { View } from '@tarojs/components';

import {
  FormAggregateCollapseGroup,
  FormAmountList,
  FormCollapseGroup,
  FormFaceStatus,
  FormInfoList,
  FormRow,
} from './Form';
import { Icon } from '../icon/Icon';

export function FormHarness() {
  return (
    <View>
      <FormRow
        title="一级标题"
        tag={{ label: '标签' }}
        presetText="预设内容"
        leading={<Icon name="info" label="提示" />}
      />
      <FormRow
        variant="double-line"
        title="一级标题"
        secondaryText="二级文本"
        trailingText="预设内容"
        leading={<Icon name="info" label="提示" />}
      />
      <FormFaceStatus maskedName="*凯" description="请根据提示完成刷脸操作" />
      <FormInfoList
        title="一级标题"
        tag={{ label: '标签' }}
        actionLabel="操作文本"
        items={[
          { label: '二级文本', value: '二级文本' },
          { label: '二级文本', value: '二级文本' },
        ]}
      />
      <FormAmountList
        title="全部代还"
        highlightAmount="¥99999"
        items={[
          { label: '二级文本', amount: '¥9294.02', tag: { label: '标签', color: 'red' } },
          { label: '二级文本', amount: '¥9294.02', tag: { label: '标签', color: 'red' } },
        ]}
      />
      <FormCollapseGroup
        title="一级标题"
        tag={{ label: '标签' }}
        defaultExpanded
        items={[
          { label: '二级文本', value: '二级文本' },
          { label: '二级文本', value: '二级文本' },
        ]}
      />
      <FormAggregateCollapseGroup
        title="一级标题"
        summary="共3笔"
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
            ],
          },
        ]}
      />
    </View>
  );
}

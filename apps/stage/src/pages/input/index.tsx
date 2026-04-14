import { Text, View } from '@tarojs/components';
import { Input } from '@fdesign/components';
import { useState } from 'react';

import { StageShowcasePage } from '../../shell/StageShowcasePage';

export default function InputPage() {
  const [value, setValue] = useState('hello@fdesign.dev');

  return (
    <StageShowcasePage
      title="Input 输入框"
      heroTitle="Input 输入框"
      heroDescription="输入框用于采集用户填写的信息，覆盖基础录入、校验提示和不可编辑等常见表单场景。"
      heroMeta={[
        { key: 'Sizes', value: '3 种尺寸' },
        { key: 'States', value: 'default / invalid / disabled' },
        { key: 'Interaction', value: '实时回显' },
      ]}
      sections={[
        {
          title: '交互预览 / Interactive Preview',
          children: (
            <View className="__stage-stack">
              <View className="__stage-blockPreview">
                <Input
                  label="Email"
                  value={value}
                  placeholder="name@example.com"
                  helperText="Use a workspace email."
                  onValueChange={setValue}
                />
              </View>
              <Text className="__stage-description">{`Current value: ${value}`}</Text>
            </View>
          ),
        },
        {
          title: '尺寸 / Sizes',
          children: (
            <View className="__stage-galleryGrid">
              <View className="__stage-galleryCard">
                <Text className="__stage-galleryCardLabel">Small</Text>
                <Input label="Small" size="sm" placeholder="small input" />
              </View>
              <View className="__stage-galleryCard">
                <Text className="__stage-galleryCardLabel">Medium</Text>
                <Input label="Medium" size="md" placeholder="medium input" />
              </View>
              <View className="__stage-galleryCard">
                <Text className="__stage-galleryCardLabel">Large</Text>
                <Input label="Large" size="lg" placeholder="large input" />
              </View>
            </View>
          ),
        },
        {
          title: '状态 / States',
          children: (
            <View className="__stage-galleryGrid">
              <View className="__stage-galleryCard">
                <Text className="__stage-galleryCardLabel">Invalid</Text>
                <Input
                  label="Invalid"
                  invalid
                  placeholder="required field"
                  helperText="This field is required."
                />
              </View>
              <View className="__stage-galleryCard">
                <Text className="__stage-galleryCardLabel">Disabled</Text>
                <Input disabled label="Disabled" value="readonly value" />
              </View>
            </View>
          ),
        },
      ]}
    />
  );
}

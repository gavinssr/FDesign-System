import { Text, View } from '@tarojs/components';
import { Input, InputHarness } from '@fdesign/components';
import { useState } from 'react';

import { ComponentDemo } from '../../shell/ComponentDemo';
import { Layout } from '../../shell/Layout';

export default function InputPage() {
  const [value, setValue] = useState('hello@fdesign.dev');

  return (
    <Layout title="Input 输入框">
      <ComponentDemo
        title="Interactive Preview"
        description="通过统一的 onValueChange 验证最小输入链路。"
      >
        <Input
          label="Email"
          value={value}
          placeholder="name@example.com"
          helperText="Use a workspace email."
          onValueChange={setValue}
        />
        <Text className="__stage-description">{`Current value: ${value}`}</Text>
      </ComponentDemo>

      <ComponentDemo
        title="State Preview"
        description="覆盖 disabled、invalid 与尺寸变化。"
      >
        <Input label="Small" size="sm" placeholder="small input" />
        <Input label="Medium" size="md" placeholder="medium input" />
        <Input label="Large" size="lg" placeholder="large input" />
        <Input
          label="Invalid"
          invalid
          placeholder="required field"
          helperText="This field is required."
        />
        <Input disabled label="Disabled" value="readonly value" />
      </ComponentDemo>

      <ComponentDemo
        title="Harness Matrix"
        description="矩阵化输出尺寸与关键状态组合。"
      >
        <InputHarness />
      </ComponentDemo>
    </Layout>
  );
}

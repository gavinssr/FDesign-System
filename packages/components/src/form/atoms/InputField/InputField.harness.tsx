import { View } from '@tarojs/components';

import { InputField } from './InputField';

export function InputFieldHarness() {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 286 }}>
      <InputField placeholder="占位(请输入)" status="wait" />
      <InputField placeholder="占位(请输入)" status="focus" />
      <InputField defaultValue="输入的内容" status="typing" showDelete />
      <InputField defaultValue="输入的内容" status="filled" />
      <InputField defaultValue="输入的内容" status="filled" align="right" />
      <InputField defaultValue="输入的内容" status="disabled" />
    </View>
  );
}

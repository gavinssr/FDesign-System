import { View } from '@tarojs/components';

import { NumberTitle } from './NumberTitle';

export function NumberTitleHarness() {
  const columnStyle = { display: 'flex', flexDirection: 'column' as const, gap: 8 };

  return (
    <View style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
      <View style={columnStyle}>
        <NumberTitle size="XL">12,345.67</NumberTitle>
        <NumberTitle size="L">12,345.67</NumberTitle>
        <NumberTitle size="M">12,345.67</NumberTitle>
        <NumberTitle size="S">12,345.67</NumberTitle>
      </View>
      <View style={columnStyle}>
        <NumberTitle size="XL" showArrow>
          12,345.67
        </NumberTitle>
        <NumberTitle size="L" showArrow>
          12,345.67
        </NumberTitle>
        <NumberTitle size="M" showArrow>
          12,345.67
        </NumberTitle>
        <NumberTitle size="S" showArrow>
          12,345.67
        </NumberTitle>
      </View>
    </View>
  );
}

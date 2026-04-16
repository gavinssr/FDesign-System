export const fontFamilies = {
  platform: {
    iosChinese: 'PingFang SC',
    iosLatin: 'Roboto',
    androidChinese: 'Noto Sans SC',
    androidLatin: 'Roboto',
    windowsChinese: 'Microsoft YaHei',
    windowsLatin: 'Segoe UI',
  },
  semantic: {
    textChinese: 'PingFang SC, Noto Sans SC, Microsoft YaHei, sans-serif',
    textLatin: 'Roboto, Segoe UI, sans-serif',
    displayChinese: 'PingFang SC, Noto Sans SC, Microsoft YaHei, sans-serif',
    displayLatin: 'Roboto, Segoe UI, sans-serif',
  },
} as const;

export const fontSize = {
  min: 10,
  base: 12,
  further: 14,
  increase: 16,
  head: 18,
  displayNormal: 22,
  displayLarge: 26,
  displayXLarge: 36,
  displayXXLarge: 44,
} as const;

export const fontWeight = {
  light: '300',
  regular: '400',
  medium: '500',
} as const;

export const lineHeight = {
  singleLine: {
    micro: 9,
    min: 11,
    base: 14,
    further: 16,
    increase: 18,
    head: 20,
    displayNormal: 24,
    displayLarge: 28,
    displayXLarge: 38,
    displayXXLarge: 46,
  },
  body: {
    min: 16,
    base: 18,
    further: 22,
    increase: 24,
    head: 28,
  },
} as const;

export const typography = {
  family: fontFamilies,
  size: fontSize,
  weight: fontWeight,
  lineHeight,
} as const;

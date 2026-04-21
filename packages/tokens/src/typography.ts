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
  displaySmall: 20,
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
    displaySmall: 22,
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

export const typographyStyles = {
  head18Head: {
    fontFamily: fontFamilies.semantic.textChinese,
    fontSize: fontSize.head,
    lineHeight: lineHeight.singleLine.head,
    fontWeight: fontWeight.medium,
  },
  head16Sub: {
    fontFamily: fontFamilies.semantic.textChinese,
    fontSize: fontSize.increase,
    lineHeight: lineHeight.singleLine.increase,
    fontWeight: fontWeight.medium,
  },
  body10Min: {
    fontFamily: fontFamilies.semantic.textChinese,
    fontSize: fontSize.min,
    lineHeight: lineHeight.body.min,
    fontWeight: fontWeight.regular,
  },
  body10Strong: {
    fontFamily: fontFamilies.semantic.textChinese,
    fontSize: fontSize.min,
    lineHeight: lineHeight.body.min,
    fontWeight: fontWeight.medium,
  },
  body12Base: {
    fontFamily: fontFamilies.semantic.textChinese,
    fontSize: fontSize.base,
    lineHeight: lineHeight.body.base,
    fontWeight: fontWeight.regular,
  },
  body12Strong: {
    fontFamily: fontFamilies.semantic.textChinese,
    fontSize: fontSize.base,
    lineHeight: lineHeight.body.base,
    fontWeight: fontWeight.medium,
  },
  body14Further: {
    fontFamily: fontFamilies.semantic.textChinese,
    fontSize: fontSize.further,
    lineHeight: lineHeight.body.further,
    fontWeight: fontWeight.regular,
  },
  body16Increase: {
    fontFamily: fontFamilies.semantic.textChinese,
    fontSize: fontSize.increase,
    lineHeight: lineHeight.body.increase,
    fontWeight: fontWeight.regular,
  },
  link12Base: {
    fontFamily: fontFamilies.semantic.textChinese,
    fontSize: fontSize.base,
    lineHeight: lineHeight.body.base,
    fontWeight: fontWeight.regular,
  },
  link14Further: {
    fontFamily: fontFamilies.semantic.textChinese,
    fontSize: fontSize.further,
    lineHeight: lineHeight.body.further,
    fontWeight: fontWeight.regular,
  },
  link16Increase: {
    fontFamily: fontFamilies.semantic.textChinese,
    fontSize: fontSize.increase,
    lineHeight: lineHeight.body.increase,
    fontWeight: fontWeight.regular,
  },
  displayNumber44XXLarge: {
    fontFamily: fontFamilies.semantic.displayLatin,
    fontSize: fontSize.displayXXLarge,
    lineHeight: lineHeight.singleLine.displayXXLarge,
    fontWeight: fontWeight.medium,
  },
  displayNumber36XLarge: {
    fontFamily: fontFamilies.semantic.displayLatin,
    fontSize: fontSize.displayXLarge,
    lineHeight: lineHeight.singleLine.displayXLarge,
    fontWeight: fontWeight.medium,
  },
  displayNumber26Large: {
    fontFamily: fontFamilies.semantic.displayLatin,
    fontSize: fontSize.displayLarge,
    lineHeight: lineHeight.singleLine.displayLarge,
    fontWeight: fontWeight.medium,
  },
  displayNumber22Normal: {
    fontFamily: fontFamilies.semantic.displayLatin,
    fontSize: fontSize.displayNormal,
    lineHeight: lineHeight.singleLine.displayNormal,
    fontWeight: fontWeight.medium,
  },
  displayNumber20Small: {
    fontFamily: fontFamilies.semantic.displayLatin,
    fontSize: fontSize.displaySmall,
    lineHeight: lineHeight.singleLine.displaySmall,
    fontWeight: fontWeight.medium,
  },
  displayChinese26Large: {
    fontFamily: fontFamilies.semantic.displayChinese,
    fontSize: fontSize.displayLarge,
    lineHeight: lineHeight.singleLine.displayLarge,
    fontWeight: fontWeight.medium,
  },
} as const;

export type TypographyStyleKey = keyof typeof typographyStyles;
export type TypographyStyleSpec = (typeof typographyStyles)[TypographyStyleKey];

const typographyStyleSignatureMap = new Map<string, TypographyStyleKey>(
  Object.entries(typographyStyles).map(([key, style]) => [
    `${style.fontFamily}|${style.fontSize}|${style.lineHeight}|${style.fontWeight}`,
    key as TypographyStyleKey,
  ]),
);

export function matchTypographyStyleKey(spec: TypographyStyleSpec): TypographyStyleKey | null {
  const signature = `${spec.fontFamily}|${spec.fontSize}|${spec.lineHeight}|${spec.fontWeight}`;
  return typographyStyleSignatureMap.get(signature) ?? null;
}

export function resolveTypographyStyle(spec: TypographyStyleSpec): TypographyStyleSpec | null {
  const matchedKey = matchTypographyStyleKey(spec);
  if (!matchedKey) {
    return null;
  }

  return typographyStyles[matchedKey];
}

export const typography = {
  family: fontFamilies,
  size: fontSize,
  weight: fontWeight,
  lineHeight,
  styles: typographyStyles,
} as const;

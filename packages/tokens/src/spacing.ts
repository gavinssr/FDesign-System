export const spacingScale = {
  0: 0,
  8: 8,
  10: 10,
  12: 12,
  16: 16,
  32: 32,
  40: 40,
} as const;

export const spacingSemantic = {
  gapBetweenCards: spacingScale[8],
  gapBetweenButtons: spacingScale[8],
  gapBetweenListItems: spacingScale[8],
  gapBetweenFormAndButton: spacingScale[40],
  gapBottomNavbar: spacingScale[12],
  gapBetweenListSubheaderAndListItems: spacingScale[12],
  gapBetweenListGroups: spacingScale[32],
  marginListSubheader: spacingScale[12],
  paddingPageX: 10,
  paddingCardX: 10,
  paddingFlushX: 16,
  paddingCardY: 10,
  paddingModalX: 10,
  paddingModalY: 10,
  gapCellTextY: 18,
  gapCellIconLeadingY: 14,
  gapRowCompactY: 12,
  gapRowRegularY: 14,
} as const;

export const spacingComponent = {
  button: {
    gap: spacingSemantic.gapBetweenButtons,
    paddingX: {
      sm: spacingScale[10],
      md: spacingScale[12],
      lg: spacingScale[16],
    },
    minHeight: {
      sm: spacingScale[32],
      md: spacingScale[40],
      lg: spacingScale[40],
    },
  },
  input: {
    paddingX: {
      sm: spacingScale[10],
      md: spacingScale[10],
      lg: spacingScale[12],
    },
    minHeight: {
      sm: spacingScale[32],
      md: spacingScale[40],
      lg: spacingScale[40],
    },
  },
  tag: {
    paddingX: {
      sm: spacingScale[8],
      md: spacingScale[10],
    },
    minHeight: {
      sm: 18,
      md: 22,
    },
  },
  card: {
    headerGap: spacingScale[8],
    contentGap: spacingScale[8],
    outerGap: spacingScale[16],
    paddingX: spacingSemantic.paddingCardX,
    paddingY: spacingSemantic.paddingCardY,
  },
  modal: {
    panelGap: spacingScale[16],
    titleBlockGap: spacingScale[8],
    headerGap: spacingScale[16],
    paddingX: spacingSemantic.paddingModalX,
    paddingY: spacingSemantic.paddingModalY,
  },
  listItem: {
    gap: spacingScale[12],
    paddingX: spacingScale[10],
    paddingY: spacingSemantic.gapRowCompactY,
  },
} as const;

export const spacing = {
  scale: spacingScale,
  semantic: spacingSemantic,
  component: spacingComponent,
} as const;

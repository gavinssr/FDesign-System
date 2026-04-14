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
  borderWidthHairline: 0.5,
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
    xl: {
      minHeight: 48,
      width: 355,
      paddingXFixed: spacingScale[0],
      paddingXFluidMin: spacingScale[16],
      spinnerSize: 20,
    },
    l: {
      minHeight: 44,
      width: 327,
      paddingXFixed: spacingScale[0],
      paddingXFluidMin: spacingScale[16],
      spinnerSize: 20,
    },
    m: {
      minHeight: 36,
      paddingXDefault: 38,
      paddingXMin: spacingScale[12],
      spinnerSize: 18,
    },
    s: {
      minHeight: 28,
      paddingXDefault: spacingScale[12],
      spinnerSize: 16,
    },
    xs: {
      minHeight: 24,
      paddingXDefault: spacingScale[10],
      spinnerSize: 16,
    },
    mini: {
      minHeight: 16,
      paddingXDefault: 6,
      spinnerSize: 12,
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
  icon: {
    size: {
      specialMini: {
        box: 12,
        padding: 1,
      },
      xxs: {
        box: 16,
        padding: 1,
      },
      xs: {
        box: 20,
        padding: 2,
      },
      s: {
        box: 24,
        padding: 2,
      },
      m: {
        box: 28,
        padding: 2,
      },
      specialLarge: {
        box: 48,
        padding: 8,
      },
    },
  },
} as const;

export const spacing = {
  scale: spacingScale,
  semantic: spacingSemantic,
  component: spacingComponent,
} as const;

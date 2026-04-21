import type { ReactNode } from 'react';

export interface FormTagData {
  label: string;
  color?: 'blue' | 'red';
}

export type FormRowVariant =
  | 'single-line'
  | 'double-line'
  | 'double-line-right'
  | 'double-line-numeric'
  | 'double-line-preset';

export interface FormRowProps {
  variant?: FormRowVariant;
  title: string;
  secondaryText?: string;
  trailingText?: string;
  trailingSecondaryText?: string;
  presetText?: string;
  leading?: ReactNode;
  tag?: FormTagData;
  carded?: boolean;
  showDivider?: boolean;
  showInfoIcon?: boolean;
  showJumpIcon?: boolean;
  onPress?: () => void;
  onJump?: () => void;
}

export interface FormFaceStatusProps {
  status?: 'success' | 'failure';
  maskedName?: string;
  description: string;
  carded?: boolean;
}

export interface FormInfoListItem {
  label: string;
  value: string;
}

export interface FormInfoListProps {
  title: string;
  tag?: FormTagData;
  actionLabel?: string;
  onAction?: () => void;
  items: readonly FormInfoListItem[];
  carded?: boolean;
}

export interface FormAmountListItem {
  label: string;
  amount: string;
  tag?: FormTagData;
}

export interface FormAmountListProps {
  title: string;
  highlightAmount?: string;
  titleSuffix?: string;
  items: readonly FormAmountListItem[];
  carded?: boolean;
}

export interface FormCollapseGroupItem {
  label: string;
  value: string;
  actionLabel?: string;
  onAction?: () => void;
}

export interface FormCollapseGroupProps {
  variant?: 'text' | 'amount';
  title: string;
  tag?: FormTagData;
  summary?: string;
  items: readonly FormCollapseGroupItem[];
  carded?: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

export interface FormAggregateCollapseChildItem {
  periodLabel: string;
  description: string;
  amount: string;
}

export interface FormAggregateCollapseItem {
  title: string;
  amount: string;
  items: readonly FormAggregateCollapseChildItem[];
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

export interface FormAggregateCollapseGroupProps {
  title: string;
  summary?: string;
  items: readonly FormAggregateCollapseItem[];
  carded?: boolean;
}

export interface FormNamespace {
  Row: typeof import('./Form').FormRow;
  FaceStatus: typeof import('./Form').FormFaceStatus;
  InfoList: typeof import('./Form').FormInfoList;
  AmountList: typeof import('./Form').FormAmountList;
  CollapseGroup: typeof import('./Form').FormCollapseGroup;
  AggregateCollapseGroup: typeof import('./Form').FormAggregateCollapseGroup;
}

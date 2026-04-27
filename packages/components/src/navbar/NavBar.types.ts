import type { ReactNode } from 'react';

export interface NavBarAction {
  key: string;
  label?: string;
  icon?:
    | 'search'
    | 'cart'
    | 'more'
    | 'customer-service'
    | 'bill'
    | 'credit-increase'
    | 'calendar'
    | 'wallet'
    | 'support';
  onPress?: () => void;
}

export interface NavBarTab {
  key: string;
  label: string;
  badge?: number | string;
}

export interface NavBarSearchTag {
  key: string;
  label: string;
}

export interface NavBarSearchProps {
  value?: string;
  placeholder?: string;
  tags?: NavBarSearchTag[];
  autoFocus?: boolean;
  showSubmit?: boolean;
  onValueChange?: (value: string) => void;
  onFocus?: () => void;
  onSubmit?: (value: string) => void;
  onClear?: () => void;
  onTagRemove?: (key: string) => void;
}

export interface NavBarProps {
  title?: string;
  actions?: NavBarAction[];
  textAction?: NavBarAction;
  tabs?: NavBarTab[];
  activeTabKey?: string;
  defaultActiveTabKey?: string;
  search?: NavBarSearchProps;
  searchExtraAction?: NavBarAction;
  onBack?: () => void;
  onTabChange?: (key: string) => void;
  children?: ReactNode;
}

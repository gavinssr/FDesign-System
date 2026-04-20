import type { ReactNode } from 'react';

/**
 * 11 种 type 字段保留 Figma 原命名（决议总览 5），不重命名。
 */
export type OperationButtonType =
  | 'button-bluePrimary'
  | 'button-pinkPrimary'
  | 'button-blueSecondary'
  | 'button-pinkSecondary'
  | 'button-blueOutline'
  | 'button-pinkOutline'
  | 'preContent'
  | 'subText'
  | 'tagAmount'
  | 'plusCount'
  | 'textButton';

export interface OperationButtonProps {
  type: OperationButtonType;
  children: ReactNode;
  disabled?: boolean;
  onPress?: () => void;
}

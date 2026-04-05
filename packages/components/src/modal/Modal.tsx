import { Text, View } from '@tarojs/components';
import { colors, radii, spacing } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import { Button } from '../button/Button';

import type { ModalProps } from './Modal.types';
import './Modal.module.css';

type ModalStyleVars = CSSProperties &
  Record<
    | '--modal-backdrop'
    | '--modal-surface'
    | '--modal-border'
    | '--modal-close-bg'
    | '--modal-title'
    | '--modal-description'
    | '--modal-radius'
    | '--modal-padding',
    string
  >;

export function Modal({
  open,
  title,
  description,
  children,
  primaryActionLabel = 'Confirm',
  secondaryActionLabel,
  onPrimaryAction,
  onSecondaryAction,
  onClose,
}: ModalProps) {
  if (!open) {
    return null;
  }

  const styleVars: ModalStyleVars = {
    '--modal-backdrop': colors.neutral[900],
    '--modal-surface': colors.neutral[0],
    '--modal-border': colors.neutral[200],
    '--modal-close-bg': colors.neutral[100],
    '--modal-title': colors.neutral[900],
    '--modal-description': colors.neutral[600],
    '--modal-radius': `${radii.xl}px`,
    '--modal-padding': `${spacing[6]}px`,
  };

  return (
    <View className="fd-modal-root" style={styleVars}>
      <View className="fd-modal-backdrop" onClick={onClose} />
      <View className="fd-modal-panel" role="dialog" aria-modal="true" aria-label={title}>
        <View className="fd-modal-header">
          <View className="fd-modal-titleBlock">
            <Text className="fd-modal-title">{title}</Text>
            {description ? <Text className="fd-modal-description">{description}</Text> : null}
          </View>
          <View className="fd-modal-close" role="button" onClick={onClose}>
            <Text>x</Text>
          </View>
        </View>
        {children ? <View className="fd-modal-body">{children}</View> : null}
        <View className="fd-modal-footer">
          {secondaryActionLabel ? (
            <Button variant="secondary" onPress={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          ) : null}
          <Button onPress={onPrimaryAction}>{primaryActionLabel}</Button>
        </View>
      </View>
    </View>
  );
}

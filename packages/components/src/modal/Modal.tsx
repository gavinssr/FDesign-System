import { Text, View } from '@tarojs/components';
import { colors, radii, spacing } from '@fdesign/tokens';
import type { CSSProperties } from 'react';

import { Button } from '../button/Button';
import { shouldUseCssVariables } from '../styleRuntime';

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

  const useCssVariables = shouldUseCssVariables();
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
  const backdropStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: colors.neutral[900],
    opacity: 0.56,
    borderRadius: `${radii.xl}px`,
  };
  const panelStyle: CSSProperties = {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    width: '100%',
    maxWidth: '520px',
    flexDirection: 'column',
    gap: '20px',
    padding: `${spacing[6]}px`,
    border: `1px solid ${colors.neutral[200]}`,
    borderRadius: `${radii.xl}px`,
    background: colors.neutral[0],
  };
  const titleStyle: CSSProperties = {
    color: colors.neutral[900],
    fontSize: '20px',
    fontWeight: 700,
  };
  const descriptionStyle: CSSProperties = {
    color: colors.neutral[600],
    fontSize: '14px',
  };
  const closeStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '32px',
    minHeight: '32px',
    borderRadius: '999px',
    background: colors.neutral[100],
  };

  return (
    <View className="fd-modal-root" style={useCssVariables ? styleVars : undefined}>
      <View className="fd-modal-backdrop" style={useCssVariables ? undefined : backdropStyle} onClick={onClose} />
      <View
        className="fd-modal-panel"
        style={useCssVariables ? undefined : panelStyle}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <View className="fd-modal-header">
          <View className="fd-modal-titleBlock">
            <Text className="fd-modal-title" style={useCssVariables ? undefined : titleStyle}>{title}</Text>
            {description ? (
              <Text className="fd-modal-description" style={useCssVariables ? undefined : descriptionStyle}>
                {description}
              </Text>
            ) : null}
          </View>
          <View className="fd-modal-close" style={useCssVariables ? undefined : closeStyle} role="button" onClick={onClose}>
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

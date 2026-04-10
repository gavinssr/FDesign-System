import { Text, View } from '@tarojs/components';
import { colors, radii, spacing, typography } from '@fdesign/tokens';
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
    | '--modal-close-radius'
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
    '--modal-backdrop': colors.semantic.surface.overlay,
    '--modal-surface': colors.semantic.surface.base,
    '--modal-border': colors.semantic.border.subtle,
    '--modal-close-bg': colors.semantic.surface.muted,
    '--modal-close-radius': `${radii.default}px`,
    '--modal-title': colors.semantic.text.primary,
    '--modal-description': colors.semantic.text.secondary,
    '--modal-radius': `${radii.large}px`,
    '--modal-padding': `${spacing.component.modal.paddingY}px ${spacing.component.modal.paddingX}px`,
  };
  const backdropStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: colors.semantic.surface.overlay,
    opacity: 0.56,
    borderRadius: `${radii.large}px`,
  };
  const panelStyle: CSSProperties = {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    width: '100%',
    maxWidth: '520px',
    flexDirection: 'column',
    gap: `${spacing.component.modal.panelGap}px`,
    padding: `${spacing.component.modal.paddingY}px ${spacing.component.modal.paddingX}px`,
    border: `1px solid ${colors.semantic.border.subtle}`,
    borderRadius: `${radii.large}px`,
    background: colors.semantic.surface.base,
  };
  const titleStyle: CSSProperties = {
    color: colors.semantic.text.primary,
    fontSize: `${typography.size.head}px`,
    fontWeight: typography.weight.medium,
  };
  const descriptionStyle: CSSProperties = {
    color: colors.semantic.text.secondary,
    fontSize: `${typography.size.further}px`,
  };
  const closeStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '32px',
    minHeight: '32px',
    borderRadius: `${radii.default}px`,
    background: colors.semantic.surface.muted,
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
            <Button variant="secondary-outline" size="m" onPress={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          ) : null}
          <Button size="m" onPress={onPrimaryAction}>{primaryActionLabel}</Button>
        </View>
      </View>
    </View>
  );
}

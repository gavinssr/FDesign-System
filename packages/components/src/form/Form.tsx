import { Text, View } from '@tarojs/components';
import { colors, spacing, typography } from '@fdesign/tokens';
import type { CSSProperties, ReactNode } from 'react';
import { useState } from 'react';

import { Icon } from '../icon/Icon';
import { LocalIconRenderer } from '../icon/LocalIconRenderer';
import { Tag } from '../tag/Tag';
import type {
  FormAggregateCollapseGroupProps,
  FormAggregateCollapseItem,
  FormAmountListItem,
  FormAmountListProps,
  FormCollapseGroupItem,
  FormCollapseGroupProps,
  FormFaceStatusProps,
  FormInfoListItem,
  FormInfoListProps,
  FormNamespace,
  FormRowProps,
  FormTagData,
} from './Form.types';
import './Form.module.css';

const dividerColor = colors.semantic.border.subtle;
const dividerThickness = spacing.semantic.borderWidthHairline;
const flushPaddingX = spacing.semantic.paddingFlushX;
const cardPaddingX = spacing.semantic.paddingCardX;
const innerCardPaddingX = spacing.semantic.paddingCardX;
const amountListTitleEdgeGapX = spacing.scale[12];
const amountListTitleCardInsetX = Math.max(
  amountListTitleEdgeGapX - spacing.semantic.paddingPageX,
  0,
);

function getFormSurfacePaddingX(carded = false) {
  return carded ? cardPaddingX : flushPaddingX;
}

function getAmountListTitlePaddingX(carded = false) {
  return carded ? amountListTitleCardInsetX : amountListTitleEdgeGapX;
}

function buildInsetDividerStyle(showDivider: boolean, paddingX: number): CSSProperties {
  if (!showDivider) {
    return {};
  }

  return {
    backgroundImage: `linear-gradient(${dividerColor}, ${dividerColor})`,
    backgroundSize: `calc(100% - ${paddingX * 2}px) ${dividerThickness}px`,
    backgroundPosition: 'bottom center',
    backgroundRepeat: 'no-repeat',
  };
}

function useControllableExpandedState(
  expanded: boolean | undefined,
  defaultExpanded: boolean | undefined,
  onExpandedChange: ((expanded: boolean) => void) | undefined,
) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded ?? false);
  const resolvedExpanded = expanded ?? internalExpanded;

  const setExpanded = (nextExpanded: boolean) => {
    if (expanded === undefined) {
      setInternalExpanded(nextExpanded);
    }

    onExpandedChange?.(nextExpanded);
  };

  return [resolvedExpanded, setExpanded] as const;
}

function renderTag(tag?: FormTagData) {
  if (!tag) {
    return null;
  }

  return (
    <Tag variant="outline" color={tag.color ?? 'blue'}>
      {tag.label}
    </Tag>
  );
}

function renderJumpIcon(size: 'special-mini' | 'xxxs' | 'xxs' = 'xxs') {
  return <Icon name="form-jump" source="local" decorative size={size} tone="muted" />;
}

function renderCollapseIcon(expanded: boolean) {
  return (
    <View
      className="fd-formCollapseIcon"
      aria-hidden
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '16px',
        height: '16px',
        flexShrink: 0,
      }}
    >
      <LocalIconRenderer
        name={expanded ? 'form-collapse-expand' : 'form-collapse-fold'}
        contentSize={16}
        strokeWidth={1}
      />
    </View>
  );
}

function renderInfoIcon() {
  return (
    <Icon
      name="form-info"
      source="local"
      decorative
      size="xxxs"
      tone="default"
      color={colors.semantic.text.tertiary}
    />
  );
}

function renderPresetContent(text: string) {
  return (
    <View
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '2px',
        flexShrink: 0,
      }}
    >
      <Text
        style={{
          color: colors.semantic.text.secondary,
          fontSize: `${typography.size.further}px`,
          lineHeight: `${typography.lineHeight.singleLine.further}px`,
          fontWeight: typography.weight.regular,
        }}
      >
        {text}
      </Text>
      <Icon
        name="form-preset"
        source="local"
        decorative
        size="xxs"
        color={colors.semantic.text.tertiary}
      />
    </View>
  );
}

function renderLeading(leading?: ReactNode) {
  if (!leading) {
    return null;
  }

  return (
    <View
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {leading}
    </View>
  );
}

function buildRowSurfaceStyle(
  height: number,
  showDivider: boolean,
  interactive: boolean,
  carded = false,
  background = colors.semantic.surface.base,
): CSSProperties {
  const paddingX = getFormSurfacePaddingX(carded);

  return {
    minHeight: `${height}px`,
    padding: `0 ${paddingX}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: `${spacing.semantic.paddingCardX}px`,
    boxSizing: 'border-box',
    background,
    cursor: interactive ? 'pointer' : undefined,
    ...buildInsetDividerStyle(showDivider, paddingX),
  };
}

function buildHeaderStyle(
  showDivider = true,
  carded = false,
  background = colors.semantic.surface.base,
): CSSProperties {
  const paddingX = getFormSurfacePaddingX(carded);

  return {
    minHeight: '40px',
    padding: `12px ${paddingX}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    boxSizing: 'border-box',
    background,
    ...buildInsetDividerStyle(showDivider, paddingX),
  };
}

function FormActionText({
  children,
  onPress,
  muted = false,
  showJump = false,
}: {
  children: string;
  onPress?: () => void;
  muted?: boolean;
  showJump?: boolean;
}) {
  const interactive = typeof onPress === 'function';

  return (
    <View
      role={interactive ? 'button' : undefined}
      onClick={
        interactive
          ? (event) => {
              event.stopPropagation();
              onPress?.();
            }
          : undefined
      }
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '2px',
        cursor: interactive ? 'pointer' : undefined,
        flexShrink: 0,
      }}
    >
      <Text
        style={{
          color: muted ? colors.semantic.text.secondary : colors.semantic.action.primary.subtleForeground,
          fontSize: muted ? `${typography.size.further}px` : `${typography.size.base}px`,
          lineHeight: muted
            ? `${typography.lineHeight.singleLine.further}px`
            : `${typography.lineHeight.singleLine.base}px`,
          fontWeight: muted ? typography.weight.regular : typography.weight.medium,
          textAlign: 'right',
        }}
      >
        {children}
      </Text>
      {showJump ? renderJumpIcon('special-mini') : null}
    </View>
  );
}

function FormHeaderLabel({
  title,
  tag,
  medium = false,
}: {
  title: string;
  tag?: FormTagData;
  medium?: boolean;
}) {
  return (
    <View
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        minWidth: 0,
        flexShrink: 1,
      }}
    >
      <Text
        style={{
          color: colors.semantic.text.primary,
          fontSize: medium ? `${typography.size.increase}px` : `${typography.size.further}px`,
          lineHeight: medium
            ? `${typography.lineHeight.singleLine.increase}px`
            : `${typography.lineHeight.singleLine.further}px`,
          fontWeight: medium ? typography.weight.medium : typography.weight.regular,
          whiteSpace: 'nowrap',
        }}
      >
        {title}
      </Text>
      {renderTag(tag)}
    </View>
  );
}

function FormNumericText({
  value,
  size = 'normal',
  tone = 'default',
}: {
  value: string;
  size?: 'small' | 'normal';
  tone?: 'default' | 'primary';
}) {
  const styleKey =
    size === 'small' ? typography.styles.displayNumber20Small : typography.styles.head16Sub;

  return (
    <Text
      style={{
        color:
          tone === 'primary'
            ? colors.semantic.action.primary.subtleForeground
            : colors.semantic.text.primary,
        fontFamily: size === 'small' ? typography.styles.displayNumber20Small.fontFamily : styleKey.fontFamily,
        fontSize: size === 'small' ? `${typography.styles.displayNumber20Small.fontSize}px` : '16px',
        lineHeight: size === 'small' ? `${typography.styles.displayNumber20Small.lineHeight}px` : '18px',
        fontWeight: typography.weight.medium,
        whiteSpace: 'nowrap',
      }}
    >
      {value}
    </Text>
  );
}

export function FormRow({
  variant = 'single-line',
  title,
  secondaryText,
  trailingText,
  trailingSecondaryText,
  presetText,
  leading,
  tag,
  carded = false,
  showDivider = false,
  showInfoIcon = false,
  showJumpIcon = false,
  onPress,
  onJump,
}: FormRowProps) {
  const rowPressHandler = onPress ?? onJump;
  const interactive = typeof rowPressHandler === 'function';
  const rowHeight =
    variant === 'single-line'
      ? spacing.component.formDisplay.singleLine.height
      : variant === 'double-line-numeric'
        ? spacing.component.formDisplay.doubleLineNumeric.height
        : spacing.component.formDisplay.doubleLine.height;

  const leftTextStackStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: `${
      variant === 'double-line-numeric'
        ? spacing.component.formDisplay.doubleLineNumeric.contentGapY
        : spacing.component.formDisplay.doubleLine.contentGapY
    }px`,
    minWidth: 0,
    flex: 1,
  };

  const rightTextStackStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: `${spacing.component.formDisplay.doubleLine.contentGapY}px`,
    flexShrink: 0,
  };

  const mainLabel = (
    <FormHeaderLabel title={title} tag={tag} />
  );

  let rightContent: ReactNode = null;
  let leftContent: ReactNode = null;

  if (variant === 'single-line') {
    leftContent = (
      <View style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
        {renderLeading(leading)}
        {mainLabel}
      </View>
    );
    rightContent = (
      <View style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', flexShrink: 0 }}>
        {presetText ? renderPresetContent(presetText) : null}
        {trailingText ? (
          <FormActionText muted={!showJumpIcon} onPress={onJump} showJump={showJumpIcon}>
            {trailingText}
          </FormActionText>
        ) : null}
        {!trailingText && showJumpIcon ? renderJumpIcon() : null}
      </View>
    );
  }

  if (variant === 'double-line') {
    leftContent = (
      <View style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
        {renderLeading(leading)}
        <View style={leftTextStackStyle}>
          {mainLabel}
          {secondaryText ? (
            <Text
              style={{
                color: colors.semantic.text.tertiary,
                fontSize: `${typography.size.base}px`,
                lineHeight: `${typography.lineHeight.singleLine.base}px`,
              }}
            >
              {secondaryText}
            </Text>
          ) : null}
        </View>
      </View>
    );
    rightContent = trailingText ? (
      <FormActionText muted onPress={onJump} showJump={showJumpIcon}>
        {trailingText}
      </FormActionText>
    ) : showJumpIcon ? (
      renderJumpIcon()
    ) : null;
  }

  if (variant === 'double-line-right') {
    leftContent = (
      <View style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
        {renderLeading(leading)}
        {mainLabel}
      </View>
    );
    rightContent = (
      <View style={rightTextStackStyle}>
        {trailingText ? (
          <Text
            style={{
              color: colors.semantic.text.primary,
              fontSize: `${typography.size.further}px`,
              lineHeight: `${typography.lineHeight.singleLine.further}px`,
              fontWeight: typography.weight.regular,
            }}
          >
            {trailingText}
          </Text>
        ) : null}
        {trailingSecondaryText ? (
          <Text
            style={{
              color: colors.semantic.text.tertiary,
              fontSize: `${typography.size.base}px`,
              lineHeight: `${typography.lineHeight.singleLine.base}px`,
            }}
          >
            {trailingSecondaryText}
          </Text>
        ) : null}
      </View>
    );
  }

  if (variant === 'double-line-numeric') {
    leftContent = (
      <View style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
        {renderLeading(leading)}
        <View style={leftTextStackStyle}>
          {secondaryText ? (
            <View style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
              <Text
                style={{
                  color: colors.semantic.text.tertiary,
                  fontSize: `${typography.size.base}px`,
                  lineHeight: `${typography.lineHeight.singleLine.base}px`,
                }}
              >
                {secondaryText}
              </Text>
              {showInfoIcon ? (
                renderInfoIcon()
              ) : null}
            </View>
          ) : null}
          <FormNumericText value={title} size="small" />
        </View>
      </View>
    );
    rightContent = trailingText ? <FormActionText muted>{trailingText}</FormActionText> : null;
  }

  if (variant === 'double-line-preset') {
    leftContent = (
      <View style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
        {renderLeading(leading)}
        {presetText ? renderPresetContent(presetText) : null}
      </View>
    );
    rightContent = (
      <View style={rightTextStackStyle}>
        <Text
          style={{
            color: colors.semantic.text.primary,
            fontSize: `${typography.size.further}px`,
            lineHeight: `${typography.lineHeight.singleLine.further}px`,
          }}
        >
          {title}
        </Text>
        {secondaryText ? (
          <Text
            style={{
              color: colors.semantic.text.tertiary,
              fontSize: `${typography.size.base}px`,
              lineHeight: `${typography.lineHeight.singleLine.base}px`,
            }}
          >
            {secondaryText}
          </Text>
        ) : null}
      </View>
    );
  }

  return (
    <View
      className={`fd-formRow ${interactive ? 'fd-formInteractive' : ''}`}
      role={interactive ? 'button' : undefined}
      onClick={interactive ? () => rowPressHandler?.() : undefined}
      style={buildRowSurfaceStyle(rowHeight, showDivider, interactive, carded)}
    >
      {leftContent}
      {rightContent}
    </View>
  );
}

export function FormFaceStatus({
  status = 'success',
  maskedName = '*凯',
  description,
  carded = false,
}: FormFaceStatusProps) {
  return (
    <View
      style={{
        background: colors.semantic.surface.base,
        padding: `${spacing.component.formDisplay.face.paddingY}px ${getFormSurfacePaddingX(carded)}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: `${spacing.component.formDisplay.face.contentGapY}px`,
        boxSizing: 'border-box',
      }}
    >
      <LocalIconRenderer
        name={status === 'success' ? 'face-status-success' : 'face-status-failure'}
        contentSize={spacing.component.formDisplay.face.iconBox}
        strokeWidth={1.5}
      />
      <View style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
        <Text
          style={{
            color: colors.semantic.action.primary.subtleForeground,
            fontSize: `${typography.size.further}px`,
            lineHeight: `${typography.lineHeight.singleLine.further}px`,
            fontWeight: typography.weight.medium,
          }}
        >
          {maskedName}
        </Text>
        <Text
          style={{
            color: colors.semantic.formDisplay.faceScanAccent,
            fontSize: `${typography.size.further}px`,
            lineHeight: `${typography.lineHeight.singleLine.further}px`,
          }}
        >
          {' '}
        </Text>
        <Text
          style={{
            color: colors.semantic.text.tertiary,
            fontSize: `${typography.size.further}px`,
            lineHeight: `${typography.lineHeight.singleLine.further}px`,
          }}
        >
          {description}
        </Text>
      </View>
    </View>
  );
}

function FormInfoListRow({
  item,
  showDivider,
  carded,
}: {
  item: FormInfoListItem;
  showDivider: boolean;
  carded: boolean;
}) {
  const paddingX = getFormSurfacePaddingX(carded);

  return (
    <View
      style={{
        minHeight: `${spacing.component.formDisplay.infoListItem.height}px`,
        padding: `0 ${paddingX}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        boxSizing: 'border-box',
        background: colors.semantic.surface.base,
        ...buildInsetDividerStyle(showDivider, paddingX),
      }}
    >
      <Text
        style={{
          color: colors.semantic.text.tertiary,
          fontSize: `${typography.size.base}px`,
          lineHeight: `${typography.lineHeight.singleLine.base}px`,
        }}
      >
        {item.label}
      </Text>
      <Text
        style={{
          color: colors.semantic.text.primary,
          fontSize: `${typography.size.base}px`,
          lineHeight: `${typography.lineHeight.singleLine.base}px`,
        }}
      >
        {item.value}
      </Text>
    </View>
  );
}

export function FormInfoList({
  title,
  tag,
  actionLabel,
  onAction,
  items,
  carded = false,
}: FormInfoListProps) {
  return (
    <View style={{ background: colors.semantic.surface.base }}>
      <View style={buildHeaderStyle(items.length > 0, carded)}>
        <FormHeaderLabel title={title} tag={tag} />
        {actionLabel ? (
          <FormActionText onPress={onAction}>
            {actionLabel}
          </FormActionText>
        ) : null}
      </View>
      {items.map((item, index) => (
        <FormInfoListRow
          key={`${item.label}-${item.value}-${index}`}
          item={item}
          showDivider={index < items.length - 1}
          carded={carded}
        />
      ))}
    </View>
  );
}

function FormAmountListRow({
  item,
  showDivider,
  carded,
}: {
  item: FormAmountListItem;
  showDivider: boolean;
  carded: boolean;
}) {
  const paddingX = getFormSurfacePaddingX(carded);

  return (
    <View
      style={{
        minHeight: `${spacing.component.formDisplay.amountListItem.height}px`,
        padding: `0 ${paddingX}px`,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxSizing: 'border-box',
        background: 'transparent',
        ...buildInsetDividerStyle(showDivider, paddingX),
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          minWidth: 0,
          flex: 1,
        }}
      >
        <View style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Text
            style={{
              color: colors.semantic.text.tertiary,
              fontSize: `${typography.size.base}px`,
              lineHeight: `${typography.lineHeight.singleLine.base}px`,
            }}
          >
            {item.label}
          </Text>
          {renderTag(item.tag)}
        </View>
        <FormNumericText value={item.amount} size="small" />
      </View>
    </View>
  );
}

export function FormAmountList({
  title,
  highlightAmount,
  titleSuffix = '包含以下账单',
  items,
  carded = false,
}: FormAmountListProps) {
  const titlePaddingX = getAmountListTitlePaddingX(carded);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        background: colors.semantic.surface.page,
      }}
    >
      <View
        style={{
          padding: `0 ${titlePaddingX}px`,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          flexWrap: 'wrap',
        }}
      >
        <Text
          style={{
            color: colors.semantic.text.primary,
            fontSize: `${typography.size.further}px`,
            lineHeight: `${typography.lineHeight.singleLine.further}px`,
            fontWeight: typography.weight.medium,
          }}
        >
          {title}
        </Text>
        {highlightAmount ? <FormNumericText value={highlightAmount} tone="primary" /> : null}
        <Text
          style={{
            color: colors.semantic.text.primary,
            fontSize: `${typography.size.further}px`,
            lineHeight: `${typography.lineHeight.singleLine.further}px`,
            fontWeight: typography.weight.medium,
          }}
        >
          {titleSuffix}
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: colors.semantic.surface.base,
          borderRadius: carded ? '4px' : undefined,
          overflow: 'hidden',
        }}
      >
        {items.map((item, index) => (
          <FormAmountListRow
            key={`${item.label}-${item.amount}-${index}`}
            item={item}
            showDivider={index < items.length - 1}
            carded={carded}
          />
        ))}
      </View>
    </View>
  );
}

function FormCollapseGroupItemRow({
  item,
  variant,
  showDivider,
  carded,
}: {
  item: FormCollapseGroupItem;
  variant: 'text' | 'amount';
  showDivider: boolean;
  carded: boolean;
}) {
  const paddingX = getFormSurfacePaddingX(carded);
  const showImplicitJump = Boolean(item.onAction) && !item.actionLabel;

  return (
    <View
      role={item.onAction ? 'button' : undefined}
      onClick={item.onAction}
      style={{
        minHeight:
          variant === 'amount'
            ? `${spacing.component.formDisplay.infoListItem.height}px`
            : `${spacing.component.formDisplay.infoListItem.height}px`,
        padding: `0 ${paddingX}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
        boxSizing: 'border-box',
        background: 'transparent',
        cursor: item.onAction ? 'pointer' : undefined,
        ...buildInsetDividerStyle(showDivider, paddingX),
      }}
    >
      <Text
        style={{
          color: colors.semantic.text.tertiary,
          fontSize: `${typography.size.base}px`,
          lineHeight: `${typography.lineHeight.singleLine.base}px`,
          minWidth: 0,
          flex: 1,
        }}
      >
        {item.label}
      </Text>
      <View style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', flexShrink: 0 }}>
        <Text
          style={{
            color: showImplicitJump ? colors.semantic.text.tertiary : colors.semantic.text.primary,
            fontSize: `${typography.size.base}px`,
            lineHeight: `${typography.lineHeight.singleLine.base}px`,
            textAlign: 'right',
          }}
        >
          {item.value}
        </Text>
        {item.actionLabel ? (
          <FormActionText onPress={item.onAction} showJump>
            {item.actionLabel}
          </FormActionText>
        ) : null}
        {showImplicitJump ? renderJumpIcon('xxxs') : null}
      </View>
    </View>
  );
}

export function FormCollapseGroup({
  variant = 'text',
  title,
  tag,
  summary,
  items,
  carded = false,
  expanded,
  defaultExpanded,
  onExpandedChange,
}: FormCollapseGroupProps) {
  const [resolvedExpanded, setResolvedExpanded] = useControllableExpandedState(
    expanded,
    defaultExpanded,
    onExpandedChange,
  );

  return (
    <View style={{ background: colors.semantic.surface.base }}>
      <View
        className="fd-formInteractive"
        role="button"
        onClick={() => setResolvedExpanded(!resolvedExpanded)}
        style={buildRowSurfaceStyle(
          spacing.component.formDisplay.singleLine.height,
          resolvedExpanded,
          true,
          carded,
        )}
      >
        <View style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
          <FormHeaderLabel title={title} tag={tag} />
        </View>
        <View style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
          {variant === 'amount' && summary ? (
            <Text
              style={{
                color: colors.semantic.text.primary,
                fontFamily: typography.styles.head16Sub.fontFamily,
                fontSize: `${typography.size.further}px`,
                lineHeight: `${typography.lineHeight.singleLine.further}px`,
                fontWeight: typography.weight.medium,
              }}
            >
              {summary}
            </Text>
          ) : null}
          {renderCollapseIcon(resolvedExpanded)}
        </View>
      </View>
      {resolvedExpanded
        ? items.map((item, index) => (
            <FormCollapseGroupItemRow
              key={`${item.label}-${item.value}-${index}`}
              item={item}
              variant={variant}
              showDivider={index < items.length - 1}
              carded={carded}
            />
          ))
        : null}
    </View>
  );
}

function FormAggregateDetailRow({
  item,
}: {
  item: FormAggregateCollapseItem['items'][number];
}) {
  return (
    <View
      style={{
        minHeight: `${spacing.component.formDisplay.aggregateDetailItem.height}px`,
        padding: `0 ${innerCardPaddingX}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
        background: colors.semantic.surface.page,
        boxSizing: 'border-box',
        width: '100%',
      }}
    >
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          minWidth: 0,
          flex: 1,
        }}
      >
        <Text
          style={{
            color: colors.semantic.text.tertiary,
            fontSize: `${typography.size.base}px`,
            lineHeight: `${typography.lineHeight.singleLine.base}px`,
            whiteSpace: 'nowrap',
          }}
        >
          {item.periodLabel}
        </Text>
        <Text
          style={{
            color: colors.semantic.text.tertiary,
            fontSize: `${typography.size.base}px`,
            lineHeight: `${typography.lineHeight.singleLine.base}px`,
            minWidth: 0,
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {item.description}
        </Text>
      </View>
      <Text
        style={{
          color: colors.semantic.text.tertiary,
          fontSize: `${typography.size.base}px`,
          lineHeight: `${typography.lineHeight.singleLine.base}px`,
          whiteSpace: 'nowrap',
        }}
      >
        {item.amount}
      </Text>
    </View>
  );
}

function FormAggregateCollapseItemBlock({
  item,
  carded,
}: {
  item: FormAggregateCollapseItem;
  carded: boolean;
}) {
  const [resolvedExpanded, setResolvedExpanded] = useControllableExpandedState(
    item.expanded,
    item.defaultExpanded,
    item.onExpandedChange,
  );

  return (
    <View
      style={{
        background: colors.semantic.surface.base,
      }}
    >
      <View
        style={{
          margin: `0 ${getFormSurfacePaddingX(carded)}px`,
          boxSizing: 'border-box',
        }}
      >
        <View
          className="fd-formInteractive"
          role="button"
          onClick={() => setResolvedExpanded(!resolvedExpanded)}
          style={{
            minHeight: `${spacing.component.formDisplay.singleLine.height}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            boxSizing: 'border-box',
            cursor: 'pointer',
          }}
        >
          <Text
            style={{
              color: colors.semantic.text.primary,
              fontSize: `${typography.size.further}px`,
              lineHeight: `${typography.lineHeight.singleLine.further}px`,
              fontWeight: typography.weight.medium,
            }}
          >
            {item.title}
          </Text>
          <View style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
            <FormNumericText value={item.amount} />
            {renderCollapseIcon(resolvedExpanded)}
          </View>
        </View>
        {resolvedExpanded ? (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
              borderRadius: '4px',
              overflow: 'hidden',
              background: colors.semantic.surface.page,
            }}
          >
            {item.items.map((child, index) => (
              <FormAggregateDetailRow
                key={`${child.periodLabel}-${child.amount}-${index}`}
                item={child}
              />
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );
}

export function FormAggregateCollapseGroup({
  title,
  summary,
  items,
  carded = false,
}: FormAggregateCollapseGroupProps) {
  return (
    <View
      style={{
        background: colors.semantic.surface.base,
        paddingBottom: `${spacing.scale[16]}px`,
      }}
    >
      <View
        style={buildRowSurfaceStyle(
          spacing.component.formDisplay.singleLine.height,
          true,
          false,
          carded,
        )}
      >
        <Text
          style={{
            color: colors.semantic.text.primary,
            fontSize: `${typography.size.increase}px`,
            lineHeight: `${typography.lineHeight.singleLine.increase}px`,
            fontWeight: typography.weight.medium,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: colors.semantic.text.tertiary,
            fontSize: `${typography.size.base}px`,
            lineHeight: `${typography.lineHeight.singleLine.base}px`,
          }}
        >
          {summary ?? `共${items.length}笔`}
        </Text>
      </View>
      {items.map((item, index) => (
        <FormAggregateCollapseItemBlock
          key={`${item.title}-${item.amount}-${index}`}
          item={item}
          carded={carded}
        />
      ))}
    </View>
  );
}

export const Form: FormNamespace = {
  Row: FormRow,
  FaceStatus: FormFaceStatus,
  InfoList: FormInfoList,
  AmountList: FormAmountList,
  CollapseGroup: FormCollapseGroup,
  AggregateCollapseGroup: FormAggregateCollapseGroup,
};

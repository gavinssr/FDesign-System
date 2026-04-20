import { View } from '@tarojs/components';
import { colors, spacing, typographyStyles } from '@fdesign/tokens';
import type { CSSProperties, ReactNode } from 'react';

import { Tag } from '../../../tag';
import { FormText } from '../../atoms/_internal/textPrimitive';
import { PlaceholderIcon } from '../../atoms/PlaceholderIcon';

/** 展示类 cell 通用标题：14/16 Regular text.primary，可附带蓝色 outline tag（10/9 micro） */
export function ExhibitTitleInline({
  children,
  tag,
}: {
  children: ReactNode;
  tag?: ReactNode;
}) {
  const style: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: `${spacing.component.exhibit.titleTagGap}px`,
  };
  return (
    <View className="fd-form-exhibit-title-inline" style={style}>
      <FormText
        spec={{
          style: typographyStyles.body14SingleLine,
          color: colors.semantic.text.primary,
          className: 'fd-form-exhibit-title-text',
        }}
      >
        {children}
      </FormText>
      {tag ? (
        <View className="fd-form-exhibit-title-tag" style={{ display: 'inline-flex' }}>
          {tag}
        </View>
      ) : null}
    </View>
  );
}

/** 常用默认蓝色 outline 10/9 tag，供 cell 消费方快速构造标题旁 tag */
export function ExhibitDefaultBlueTag({ children = '标签' }: { children?: ReactNode }) {
  return (
    <Tag variant="outline" color="blue">
      {children}
    </Tag>
  );
}

/** 展示类 cell 左侧 leading slot：优先使用传入 icon 节点；否则（showIcon=true）渲染占位球 */
export function ExhibitLeading({
  icon,
  showIcon,
}: {
  icon?: ReactNode;
  showIcon?: boolean;
}) {
  if (icon) return <>{icon}</>;
  if (showIcon) return <PlaceholderIcon />;
  return null;
}

/** 展示类 cell 右侧 14 regular secondary 文本（"预设内容"风格） */
export function ExhibitPresetText({ children }: { children: ReactNode }) {
  return (
    <FormText
      spec={{
        style: typographyStyles.body14SingleLine,
        color: colors.semantic.text.secondary,
        className: 'fd-form-exhibit-preset-text',
      }}
      extraStyle={{ textAlign: 'right' }}
    >
      {children}
    </FormText>
  );
}

/** 展示类 cell 多行右对齐主行文本（14 regular primary） */
export function ExhibitRightPrimary({ children }: { children: ReactNode }) {
  return (
    <FormText
      spec={{
        style: typographyStyles.body14SingleLine,
        color: colors.semantic.text.primary,
        className: 'fd-form-exhibit-right-primary',
      }}
    >
      {children}
    </FormText>
  );
}

/** 展示类 cell 多行右对齐次行文本（12 regular tertiary） */
export function ExhibitRightSecondary({ children }: { children: ReactNode }) {
  return (
    <FormText
      spec={{
        style: typographyStyles.body12SingleLine,
        color: colors.semantic.text.tertiary,
        className: 'fd-form-exhibit-right-secondary',
      }}
    >
      {children}
    </FormText>
  );
}

/** 展示类 cell 左侧 leading icon + title block 横向容器（gap 8） */
export function ExhibitLeadingTitle({ children }: { children: ReactNode }) {
  const style: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: `${spacing.component.exhibit.iconGap}px`,
    flexShrink: 0,
  };
  return (
    <View className="fd-form-exhibit-leading-title" style={style}>
      {children}
    </View>
  );
}

/** 多行 label 垂直堆叠（gap 6，来自 spacingSemantic.gapLabelToSubLabel） */
export function ExhibitMultiLineStack({
  children,
  align = 'start',
}: {
  children: ReactNode;
  align?: 'start' | 'end';
}) {
  const style: CSSProperties = {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: align === 'end' ? 'flex-end' : 'flex-start',
    justifyContent: 'center',
    gap: `${spacing.component.exhibit.multiLineLabelGap}px`,
    flexShrink: 0,
  };
  return (
    <View className={`fd-form-exhibit-multi-stack fd-form-exhibit-multi-stack-${align}`} style={style}>
      {children}
    </View>
  );
}

import { Text } from '@tarojs/components';
import type { CSSProperties, ReactNode } from 'react';

interface FormTypographyStyle {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  fontWeight: string;
}

export interface FormTextSpec {
  style: FormTypographyStyle;
  color: string;
  className: string;
}

/** form/atoms 内部共享：把 typographyStyles 中的复合样式 + 颜色 token 渲染为一个 Text 节点。
 *  各 Label 原子统一通过此原语输出，避免重复样板。 */
export function FormText({
  spec,
  children,
  extraStyle,
}: {
  spec: FormTextSpec;
  children: ReactNode;
  extraStyle?: CSSProperties;
}) {
  const style: CSSProperties = {
    fontFamily: spec.style.fontFamily,
    fontSize: `${spec.style.fontSize}px`,
    lineHeight: `${spec.style.lineHeight}px`,
    fontWeight: spec.style.fontWeight,
    color: spec.color,
    ...extraStyle,
  };
  return (
    <Text className={spec.className} style={style}>
      {children}
    </Text>
  );
}

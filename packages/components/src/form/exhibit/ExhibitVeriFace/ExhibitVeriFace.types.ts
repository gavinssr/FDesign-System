import type { ReactNode } from 'react';

export interface ExhibitVeriFaceProps {
  /** 验证失败态 */
  veriFailed?: boolean;
  /** 成功态下的高亮用户名文本（例如 "*凯"）；默认 `*凯` */
  highlightUserName?: ReactNode;
  /** 成功态下的提示文本；默认 `请根据提示完成刷脸操作` */
  promptText?: ReactNode;
  /** 失败态下的标题文本；默认 `验证失败` */
  failedTitle?: ReactNode;
  /** 失败态下的原因文本；默认 `失败原因：光线不足` */
  failedReason?: ReactNode;
}

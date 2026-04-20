import { View } from '@tarojs/components';
import type { CSSProperties, ReactNode } from 'react';

import { SubCellFlush } from '../SubCellFlush';

export type SubListItem =
  | { key: string; leftText: ReactNode; leftAnnotation?: boolean; rightText: ReactNode }
  | { key: string; leftText: ReactNode; leftAnnotation?: boolean; rightJumpText: ReactNode; onJump?: () => void };

export interface SubListFlushProps {
  /** 外层 paddingX：card → 10，flush → 16 */
  card?: boolean;
  /** 子行列表；每行右侧可以是 text（深色）或 jump（浅色+箭头） */
  items: readonly SubListItem[];
  /** 右侧整体 kind（若 items 未指定，则按此值决定 right kind）；默认 text */
  defaultRightKind?: 'text' | 'jump';
  /** 是否隐藏最后一行底部 hairline，默认 true */
  hideLastDivider?: boolean;
}

const outerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  width: '100%',
};

/** SubListFlush（Figma 8275:9193）/ SubListCard（Figma 15875:9901）统一实现。
 *  - 根据 `card` 控制内部 SubCellFlush 的 paddingX
 *  - 末行默认关闭 hairline（hideLastDivider=true） */
export function SubListFlush({
  card = false,
  items,
  defaultRightKind = 'text',
  hideLastDivider = true,
}: SubListFlushProps) {
  return (
    <View className={`fd-form-exhibit-part-sublist fd-form-exhibit-part-sublist-${card ? 'card' : 'flush'}`} style={outerStyle}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const showDivider = !(isLast && hideLastDivider);
        if ('rightJumpText' in item) {
          return (
            <SubCellFlush
              key={item.key}
              card={card}
              leftText={item.leftText}
              leftAnnotation={item.leftAnnotation}
              right={{ kind: 'jump', text: item.rightJumpText, onJump: item.onJump }}
              showBottomDivider={showDivider}
            />
          );
        }
        return (
          <SubCellFlush
            key={item.key}
            card={card}
            leftText={item.leftText}
            leftAnnotation={item.leftAnnotation}
            right={
              defaultRightKind === 'jump'
                ? { kind: 'jump', text: item.rightText }
                : { kind: 'text', text: item.rightText }
            }
            showBottomDivider={showDivider}
          />
        );
      })}
    </View>
  );
}

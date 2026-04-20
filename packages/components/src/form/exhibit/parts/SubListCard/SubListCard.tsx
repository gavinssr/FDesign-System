import { SubListFlush } from '../SubListFlush';
import type { SubListFlushProps } from '../SubListFlush';

/** SubListCard（Figma 15875:9901）：与 SubListFlush 视觉结构同构，仅 card 语境不同。
 *  保留独立导出以对应 Figma 节点与「parts 映射表」命名；内部完全复用 SubListFlush 并固定 card=true。 */
export type SubListCardProps = Omit<SubListFlushProps, 'card'>;

export function SubListCard(props: SubListCardProps) {
  return <SubListFlush {...props} card />;
}

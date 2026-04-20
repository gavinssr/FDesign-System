import { SelectionBox } from '../_internal/selectionBox';
import type { TickProps } from './Tick.types';

export function Tick({ disabled = false }: TickProps) {
  return <SelectionBox shape="tick" checked disabled={disabled} />;
}

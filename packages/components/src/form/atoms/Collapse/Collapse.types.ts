export interface CollapseProps {
  /** 受控 expanded；未传时按 defaultExpanded 走非受控 */
  expanded?: boolean;
  defaultExpanded?: boolean;
  onToggle?: (expanded: boolean) => void;
}

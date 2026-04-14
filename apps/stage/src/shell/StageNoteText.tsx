import { Text } from '@tarojs/components';

interface StageNoteTextProps {
  text?: string;
}

export function StageNoteText({ text = '备注文案' }: StageNoteTextProps) {
  return <Text className="__stage-noteText">{text}</Text>;
}

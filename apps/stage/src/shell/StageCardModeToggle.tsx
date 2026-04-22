import { View } from '@tarojs/components';

type StageSurfaceVariant = 'flush' | 'card';

interface StageCardModeToggleProps {
  variant: StageSurfaceVariant;
  onChange: (variant: StageSurfaceVariant) => void;
}

export function StageCardModeToggle({ variant, onChange }: StageCardModeToggleProps) {
  return (
    <View className="__stage-segmentedToggle">
      <button
        className="__stage-segmentedToggleOption"
        data-active={variant === 'flush'}
        aria-pressed={variant === 'flush'}
        onClick={() => onChange('flush')}
        type="button"
      >
        通栏
      </button>
      <button
        className="__stage-segmentedToggleOption"
        data-active={variant === 'card'}
        aria-pressed={variant === 'card'}
        onClick={() => onChange('card')}
        type="button"
      >
        卡片
      </button>
    </View>
  );
}

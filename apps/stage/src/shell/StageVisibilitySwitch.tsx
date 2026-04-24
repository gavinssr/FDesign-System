import { Text, View } from '@tarojs/components';

interface StageVisibilitySwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function StageVisibilitySwitch({
  label,
  checked,
  onChange,
}: StageVisibilitySwitchProps) {
  return (
    <View className="__stage-visibilitySwitch">
      <Text className="__stage-visibilitySwitchLabel">{label}</Text>
      <button
        className="__stage-visibilitySwitchControl"
        data-checked={checked}
        aria-checked={checked}
        role="switch"
        onClick={() => onChange(!checked)}
        type="button"
      >
        <span className="__stage-visibilitySwitchTrack">
          <span className="__stage-visibilitySwitchThumb" />
        </span>
      </button>
    </View>
  );
}

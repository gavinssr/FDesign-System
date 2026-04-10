import { Text, View } from '@tarojs/components';

type ButtonVariant = 'primary-fill' | 'primary-outline' | 'secondary-outline';
type ButtonSize = 'xl' | 'l' | 'm' | 's' | 'xs' | 'mini';

interface PropControlProps {
  variant: ButtonVariant;
  size: ButtonSize;
  inactive: boolean;
  disabled: boolean;
  loading: boolean;
  block: boolean;
  onVariantChange: (variant: ButtonVariant) => void;
  onSizeChange: (size: ButtonSize) => void;
  onInactiveChange: (inactive: boolean) => void;
  onDisabledChange: (disabled: boolean) => void;
  onLoadingChange: (loading: boolean) => void;
  onBlockChange: (block: boolean) => void;
}

const variants: ButtonVariant[] = ['primary-fill', 'primary-outline', 'secondary-outline'];
const sizes: ButtonSize[] = ['xl', 'l', 'm', 's', 'xs', 'mini'];

export function PropControl({
  variant,
  size,
  inactive,
  disabled,
  loading,
  block,
  onVariantChange,
  onSizeChange,
  onInactiveChange,
  onDisabledChange,
  onLoadingChange,
  onBlockChange,
}: PropControlProps) {
  return (
    <View className="__stage-controls">
      <View className="__stage-controlGroup">
        <Text className="__stage-controlLabel">Variant / 类型</Text>
        <View className="__stage-chipRow">
          {variants.map((item) => (
            <button
              key={item}
              className="__stage-toggle"
              data-active={variant === item}
              onClick={() => onVariantChange(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </View>
      </View>

      <View className="__stage-controlGroup">
        <Text className="__stage-controlLabel">Size / 尺寸</Text>
        <View className="__stage-chipRow">
          {sizes.map((item) => (
            <button
              key={item}
              className="__stage-toggle"
              data-active={size === item}
              onClick={() => onSizeChange(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </View>
      </View>

      <View className="__stage-controlGroup">
        <Text className="__stage-controlLabel">State / 状态</Text>
        <View className="__stage-chipRow">
          <button
            className="__stage-toggle"
            data-active={inactive}
            onClick={() => onInactiveChange(!inactive)}
            type="button"
          >
            inactive
          </button>
          <button
            className="__stage-toggle"
            data-active={disabled}
            onClick={() => onDisabledChange(!disabled)}
            type="button"
          >
            disabled
          </button>
          <button
            className="__stage-toggle"
            data-active={loading}
            onClick={() => onLoadingChange(!loading)}
            type="button"
          >
            loading
          </button>
          <button
            className="__stage-toggle"
            data-active={block}
            onClick={() => onBlockChange(!block)}
            type="button"
          >
            block
          </button>
        </View>
      </View>
    </View>
  );
}

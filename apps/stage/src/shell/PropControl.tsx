import { Text, View } from '@tarojs/components';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface PropControlProps {
  variant: ButtonVariant;
  size: ButtonSize;
  disabled: boolean;
  loading: boolean;
  block: boolean;
  onVariantChange: (variant: ButtonVariant) => void;
  onSizeChange: (size: ButtonSize) => void;
  onDisabledChange: (disabled: boolean) => void;
  onLoadingChange: (loading: boolean) => void;
  onBlockChange: (block: boolean) => void;
}

const variants: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'danger'];
const sizes: ButtonSize[] = ['sm', 'md', 'lg'];

export function PropControl({
  variant,
  size,
  disabled,
  loading,
  block,
  onVariantChange,
  onSizeChange,
  onDisabledChange,
  onLoadingChange,
  onBlockChange,
}: PropControlProps) {
  return (
    <View className="__stage-controls">
      <View className="__stage-controlGroup">
        <Text className="__stage-controlLabel">Variant</Text>
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
        <Text className="__stage-controlLabel">Size</Text>
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
        <Text className="__stage-controlLabel">State</Text>
        <View className="__stage-chipRow">
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

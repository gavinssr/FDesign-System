import { Text, View } from '@tarojs/components';
import { Icon } from '@fdesign/components';

import { StageNoteText } from '../../shell/StageNoteText';
import { StageShowcasePage } from '../../shell/StageShowcasePage';

const localIcons = [
  { name: 'wallet' },
  { name: 'bank-card', legacyName: 'credit-card' },
  { name: 'bank-card-list', legacyName: 'cards-1' },
  { name: 'bank-cards', legacyName: 'cards' },
  { name: 'collections' },
  { name: 'appointment' },
  { name: 'support', legacyName: 'help-center' },
  { name: 'settings' },
  { name: 'dislike' },
  { name: 'complaint', legacyName: 'i-want-to-complain' },
  { name: 'amount-increase', legacyName: 'increase-amount' },
  { name: 'credit-report', legacyName: 'credit-reporting' },
  { name: 'profile' },
  { name: 'contacts' },
  { name: 'encryption', legacyName: 'security-encryption' },
  { name: 'instructions' },
  { name: 'billing-reminder', legacyName: 'bill-reminder' },
  { name: 'repayment-history', legacyName: 'repayment-record' },
  { name: 'auto-deduction', legacyName: 'automatic-deduction' },
  { name: 'reminder' },
  { name: 'app-grid', legacyName: 'home-waterfall' },
  { name: 'app-menu', legacyName: 'home-page-sorting' },
  { name: 'refresh' },
  { name: 'scan' },
  { name: 'cart', legacyName: 'cart-2' },
  { name: 'pending-payment', legacyName: 'pending-payment-2' },
  { name: 'wechat', legacyName: 'we-chat' },
  { name: 'search' },
  { name: 'close' },
  { name: 'delete' },
  { name: 'shield' },
  { name: 'account-security', legacyName: 'security-center' },
  { name: 'location' },
  { name: 'calendar' },
  { name: 'mobile', legacyName: 'mobile-phone' },
  { name: 'shopping-cart' },
  { name: 'housing-fund', legacyName: 'provident-fund' },
  { name: 'document-details', legacyName: 'details' },
  { name: 'red-envelope-cashout', legacyName: 'red-envelope-withdrawal' },
  { name: 'red-envelope-cashout-alt', legacyName: 'red-envelope-withdrawal-2' },
] as const;

const materialIcons = [
  'info',
  'check',
  'chevron_right',
  'shopping_cart_checkout',
  'credit_card',
  'account_balance_wallet',
] as const;

const sizes = ['special-mini', 'xxs', 'xs', 's', 'm', 'special-large'] as const;
const tones = ['default', 'muted', 'primary', 'success', 'warning', 'danger'] as const;

const sizeDisplayLabels: Record<(typeof sizes)[number], string> = {
  'special-mini': 'mini',
  xxs: 'xxs',
  xs: 'xs',
  s: 's',
  m: 'm',
  'special-large': 'large',
};

function toDisplayLabel(name: string) {
  return name.replace(/[_-]+/g, ' ');
}

interface IconGalleryItemProps {
  name: string;
  source: 'local' | 'material';
}

function IconGalleryItem({ name, source }: IconGalleryItemProps) {
  const displayLabel = toDisplayLabel(name);

  return (
    <View className="__stage-captionedItem __stage-iconTile">
      <View className="__stage-preview __stage-iconTilePreview">
        <Icon name={name} size="s" source={source} label={displayLabel} />
      </View>
      <Text className="__stage-metaKey __stage-iconTileLabel">{displayLabel}</Text>
    </View>
  );
}

export default function IconPage() {
  return (
    <StageShowcasePage
      heroTitle="Icon 图标"
      heroDescription="图标用于补充识别、状态和方向信息；当前组件统一支持自有 SVG 图标与 Google Material Symbols 两种来源。"
      heroMeta={[
        { key: 'Sources', value: '2 种图标源' },
        { key: 'Local', value: '40 个导出 SVG' },
        { key: 'Sizes', value: '6 种尺寸协议' },
        { key: 'Tones', value: '6 种语气' },
      ]}
      sections={[
        {
          title: '自有图标 / Local Icons',
          children: (
            <View className="__stage-overviewRow __stage-iconTileGrid">
              {localIcons.map(({ name }) => (
                <IconGalleryItem key={name} name={name} source="local" />
              ))}
            </View>
          ),
        },
        {
          title: '线上图标 / Material Symbols',
          children: (
            <View className="__stage-overviewRow __stage-iconTileGrid">
              {materialIcons.map((name) => (
                <IconGalleryItem key={name} name={name} source="material" />
              ))}
            </View>
          ),
        },
        {
          title: '尺寸 / Sizes',
          children: (
            <View className="__stage-galleryGrid">
              <View className="__stage-galleryCard">
                <Text className="__stage-galleryCardLabel">Local / wallet</Text>
                <View className="__stage-overviewRow">
                  {sizes.map((size) => (
                    <View key={`wallet-${size}`} className="__stage-captionedItem">
                      <View className="__stage-preview __stage-iconSizePreview">
                        <Icon name="wallet" size={size} source="local" label={`wallet ${sizeDisplayLabels[size]}`} />
                      </View>
                      <Text className="__stage-metaKey">{sizeDisplayLabels[size]}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View className="__stage-galleryCard">
                <View className="__stage-galleryCardHeader">
                  <Text className="__stage-galleryCardLabel">Material / info</Text>
                  <StageNoteText text="外部组件绘图区不受控" />
                </View>
                <View className="__stage-overviewRow">
                  {sizes.map((size) => (
                    <View key={`info-${size}`} className="__stage-captionedItem">
                      <View className="__stage-preview __stage-iconSizePreview">
                        <Icon name="info" size={size} source="material" label={`info ${sizeDisplayLabels[size]}`} />
                      </View>
                      <Text className="__stage-metaKey">{sizeDisplayLabels[size]}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ),
        },
        {
          title: '语气色 / Tones',
          children: (
            <View className="__stage-overviewRow">
              {tones.map((tone) => (
                <View key={tone} className="__stage-captionedItem">
                  <View className="__stage-preview">
                    <Icon name="info" tone={tone} source="material" label={`info ${tone}`} />
                  </View>
                  <Text className="__stage-metaKey">{tone}</Text>
                </View>
              ))}
            </View>
          ),
        },
      ]}
    />
  );
}

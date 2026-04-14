import { Text, View } from '@tarojs/components';
import { ListItem, Icon } from '@fdesign/components';

import { StageShowcasePage } from '../../shell/StageShowcasePage';

export default function ListItemPage() {
  return (
    <StageShowcasePage
      title="List Item 列表项"
      heroTitle="List Item 列表项"
      heroDescription="列表项用于承载一行结构化信息，可组合图标、描述、附加信息与跳转反馈。"
      heroMeta={[
        { key: 'Slots', value: 'leading / content / trailing' },
        { key: 'States', value: 'default / interactive / disabled' },
        { key: 'Usage', value: '信息行与导航行' },
      ]}
      sections={[
        {
          title: '结构预览 / Basic Preview',
          children: (
            <View className="__stage-galleryGrid">
              <View className="__stage-galleryCard">
                <Text className="__stage-galleryCardLabel">Rich Row</Text>
                <ListItem
                  title="Notifications"
                  description="Manage push and email settings"
                  meta="2 new"
                  leading={<Icon name="info" label="Notifications" />}
                  trailing={<Icon name="chevron-right" decorative />}
                />
              </View>
              <View className="__stage-galleryCard">
                <Text className="__stage-galleryCardLabel">Simple Row</Text>
                <ListItem
                  title="Security"
                  description="Password and device settings"
                  trailing={<Icon name="chevron-right" decorative />}
                />
              </View>
            </View>
          ),
        },
        {
          title: '状态 / States',
          children: (
            <View className="__stage-galleryGrid">
              <View className="__stage-galleryCard">
                <Text className="__stage-galleryCardLabel">Interactive</Text>
                <ListItem
                  title="Interactive item"
                  description="Clickable state"
                  onPress={() => undefined}
                />
              </View>
              <View className="__stage-galleryCard">
                <Text className="__stage-galleryCardLabel">Disabled</Text>
                <ListItem title="Disabled item" description="Unavailable action" disabled />
              </View>
            </View>
          ),
        },
      ]}
    />
  );
}

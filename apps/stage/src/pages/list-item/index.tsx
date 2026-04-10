import { ListItem, ListItemHarness, Icon } from '@fdesign/components';

import { ComponentDemo } from '../../shell/ComponentDemo';
import { Layout } from '../../shell/Layout';

export default function ListItemPage() {
  return (
    <Layout title="List Item / 列表项">
      <ComponentDemo
        title="Basic Preview"
        description="验证 leading、trailing、description 和 meta 区域。"
      >
        <ListItem
          title="Notifications"
          description="Manage push and email settings"
          meta="2 new"
          leading={<Icon name="info" label="Notifications" />}
          trailing={<Icon name="chevron-right" decorative />}
        />
      </ComponentDemo>

      <ComponentDemo
        title="State Preview"
        description="覆盖 interactive 与 disabled 两个关键状态。"
      >
        <ListItem title="Interactive item" description="Clickable state" onPress={() => undefined} />
        <ListItem title="Disabled item" description="Unavailable action" disabled />
      </ComponentDemo>

      <ComponentDemo
        title="Harness Matrix"
        description="矩阵化输出默认、交互和禁用状态。"
      >
        <ListItemHarness />
      </ComponentDemo>
    </Layout>
  );
}

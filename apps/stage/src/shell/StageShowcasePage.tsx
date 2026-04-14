import { Text, View } from '@tarojs/components';

import { ComponentDemo } from './ComponentDemo';
import { Layout } from './Layout';

type StageNode = JSX.Element | JSX.Element[] | string | number | null;

interface StageMetaItem {
  key: string;
  value: string;
}

interface StageSection {
  title: string;
  children: StageNode;
}

interface StageShowcasePageProps {
  title: string;
  heroTitle: string;
  heroDescription: string;
  heroMeta: readonly StageMetaItem[];
  sections: readonly StageSection[];
  navKey?: string;
  galleryTitle?: string;
  galleryDescription?: string;
}

export function StageShowcasePage({
  title,
  heroTitle,
  heroDescription,
  heroMeta,
  sections,
  navKey,
  galleryTitle = 'Gallery / 组件总览',
  galleryDescription = '统一使用与 Base 基础按钮页一致的英雄区与分节展示结构。',
}: StageShowcasePageProps) {
  return (
    <Layout title={title} navKey={navKey} showPageTitle={false}>
      <View className="__stage-demoCard">
        <View className="__stage-hero">
          <View className="__stage-heroBody">
            <Text className="__stage-heroTitle">{heroTitle}</Text>
            <Text className="__stage-heroDescription">{heroDescription}</Text>
            <View className="__stage-heroMeta">
              {heroMeta.map((item) => (
                <View key={item.key} className="__stage-metaItem">
                  <Text className="__stage-metaKey">{item.key}</Text>
                  <Text className="__stage-metaValue">{item.value}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      <ComponentDemo title={galleryTitle} description={galleryDescription}>
        <View className="__stage-galleryStack">
          {sections.map((section) => (
            <View key={section.title} className="__stage-gallerySection">
              <Text className="__stage-subsectionTitle">{section.title}</Text>
              {section.children}
            </View>
          ))}
        </View>
      </ComponentDemo>
    </Layout>
  );
}

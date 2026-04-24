import { Text, View } from '@tarojs/components';

type StageNode = JSX.Element | JSX.Element[] | string | number | null;

interface StageMetaItem {
  key: string;
  value: string;
}

interface StageSection {
  key?: string;
  title: string;
  controls?: StageNode;
  children: StageNode;
}

interface StageShowcasePageProps {
  heroTitle: string;
  heroDescription: string;
  heroMeta: readonly StageMetaItem[];
  sections: readonly StageSection[];
  galleryTitle?: string;
}

export function StageShowcasePage({
  heroTitle,
  heroDescription,
  heroMeta,
  sections,
  galleryTitle = 'Gallery / 组件总览',
}: StageShowcasePageProps) {
  return (
    <>
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

      <View className="__stage-demoCard">
        <View className="__stage-demoHeader">
          <Text className="__stage-sectionTitle">{galleryTitle}</Text>
        </View>
        <View className="__stage-demoBody">
          <View className="__stage-galleryStack">
            {sections.map((section) => (
              <View key={section.key ?? section.title} className="__stage-gallerySection">
                {section.controls ? (
                  <View className="__stage-gallerySectionHeader">
                    <Text className="__stage-subsectionTitle">{section.title}</Text>
                    <View className="__stage-gallerySectionControls">{section.controls}</View>
                  </View>
                ) : (
                  <Text className="__stage-subsectionTitle">{section.title}</Text>
                )}
                {section.children}
              </View>
            ))}
          </View>
        </View>
      </View>
    </>
  );
}

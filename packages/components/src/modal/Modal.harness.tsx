import { Text, View } from '@tarojs/components';

import { Modal } from './Modal';

export function ModalHarness() {
  return (
    <View>
      <Modal
        open
        title="Default modal"
        description="Used to validate title, body and actions."
        secondaryActionLabel="Cancel"
      >
        <Text>Body content for the default modal state.</Text>
      </Modal>
      <Modal open title="Primary only modal" primaryActionLabel="Done">
        <Text>Single-action modal.</Text>
      </Modal>
    </View>
  );
}

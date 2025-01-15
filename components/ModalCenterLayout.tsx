import React from 'react';

import { Modal, StyleSheet, type ViewProps } from 'react-native';
import ThemedPressable from './ThemedComponents/ThemedPressable';
import ThemedView from './ThemedComponents/ThemedView';
import ThemedIconSymbol from './ThemedComponents/ThemedIconSymbol';

export type ModalCenterLayoutProps = ViewProps & {
  isVisible: boolean;
  dismiss: () => void;
};

const ModalCenterLayout: React.FC<ModalCenterLayoutProps> = ({ isVisible, dismiss, ...rest }) => {
  return (
    <Modal visible={isVisible} transparent={true}>
      <ThemedPressable
        style={styles.background}
        onPress={dismiss}
        themeColor="background_transparent"
      >
        <ThemedView
          safeArea
          style={styles.modalContainer}
          onStartShouldSetResponder={() => true}
          themeColor="modal_bottom_color"
        >
          <ThemedView style={styles.barClose} themeColor="transparent">
            <ThemedPressable themeColor="transparent" onPress={dismiss}>
              <ThemedIconSymbol size={30} name="cross.fill" />
            </ThemedPressable>
          </ThemedView>
          <ThemedView {...rest} />
        </ThemedView>
      </ThemedPressable>
    </Modal>
  );
};

export default ModalCenterLayout;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  barClose: {
    flexDirection: 'row-reverse',
  },
  modalContainer: {
    borderRadius: 15,
    opacity: 1,
    padding: 20,
  },
});

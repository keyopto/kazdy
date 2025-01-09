import React, { type ReactNode } from 'react';
import ThemedView from './ThemedComponents/ThemedView';
import { Modal, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ThemedPressable from './ThemedComponents/ThemedPressable';
import ThemedIconSymbol from './ThemedComponents/ThemedIconSymbol';

export type ModalBottomLayoutProps = {
  isVisible: boolean;
  dismiss: () => void;
  children?: ReactNode;
};

const ModalBottomLayout: React.FC<ModalBottomLayoutProps> = ({ isVisible, dismiss, children }) => {
  const { bottom, right, left } = useSafeAreaInsets();

  return (
    <Modal visible={isVisible} transparent={true}>
      <ThemedPressable style={styles.background} onPress={dismiss}>
        <ThemedView
          style={[
            {
              paddingBottom: 20 + bottom,
              paddingLeft: 20 + left,
              paddingRight: 20 + right,
            },
            styles.modalContainer,
          ]}
          onStartShouldSetResponder={() => true}
          themeColor="modal_bottom_color"
        >
          <ThemedView style={styles.barClose} themeColor="transparent">
            <ThemedPressable themeColor="transparent" onPress={dismiss}>
              <ThemedIconSymbol size={30} name="cross.fill" />
            </ThemedPressable>
          </ThemedView>
          {children}
        </ThemedView>
      </ThemedPressable>
    </Modal>
  );
};

export default ModalBottomLayout;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'column-reverse',
    opacity: 0.7,
  },
  barClose: {
    flexDirection: 'row-reverse',
  },
  modalContainer: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
  },
});

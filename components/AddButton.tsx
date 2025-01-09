import React from 'react';
import { StyleSheet } from 'react-native';
import ThemedPressable from './ThemedComponents/ThemedPressable';
import ThemedIconSymbol from './ThemedComponents/ThemedIconSymbol';

export type AddButtonProps = {
  onPress: () => void;
};

const AddButton: React.FC<AddButtonProps> = ({ onPress }) => {
  return (
    <ThemedPressable onPress={onPress} themeColor="button" style={styles.container}>
      <ThemedIconSymbol name="plus" />
    </ThemedPressable>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    bottom: 10,
    padding: 20,
    position: 'absolute',
    right: 10,
  },
});

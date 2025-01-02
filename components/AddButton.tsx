import React from 'react';
import ThemedText from './ThemedText';
import { StyleSheet } from 'react-native';
import ThemedPressable from './ThemedPressable';

export type AddButtonProps = {
  onPress: () => void;
};

const AddButton: React.FC<AddButtonProps> = ({ onPress }) => {
  return (
    <ThemedPressable onPress={onPress} style={styles.container}>
      <ThemedText style={styles.text}>+</ThemedText>
    </ThemedPressable>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 10,
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  text: {
    fontSize: 30,
  },
});

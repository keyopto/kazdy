import React from 'react';
import ThemedText from './ThemedText';
import { StyleSheet } from 'react-native';
import ThemedPressable from './ThemedPressable';
import Colors from '@/constants/Colors';

export type AddButtonProps = {
  onPress: () => void;
};

const AddButton: React.FC<AddButtonProps> = ({ onPress }) => {
  return (
    <ThemedPressable
      onPress={onPress}
      lightColor={Colors.light.add_button}
      darkColor={Colors.dark.add_button}
      style={styles.container}
    >
      <ThemedText style={styles.text}>+</ThemedText>
    </ThemedPressable>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    bottom: 10,
    padding: 20,
    position: 'absolute',
    right: 10,
  },
  text: {
    fontSize: 30,
  },
});

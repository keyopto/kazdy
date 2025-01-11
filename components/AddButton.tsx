import React from 'react';
import { StyleSheet, type PressableProps } from 'react-native';
import ThemedIconButton from './ThemedComponents/ThemedIconButton';

export type AddButtonProps = PressableProps;

const AddButton: React.FC<AddButtonProps> = ({ ...rest }) => {
  return <ThemedIconButton style={styles.container} iconName="plus" {...rest} />;
};

export default AddButton;

const styles = StyleSheet.create({
  container: {
    bottom: 10,
    position: 'absolute',
    right: 10,
  },
});

import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import ThemedView from './ThemedView';
import useThemeColor from '@/hooks/useThemeColor';

export type CustomTextInputProps = {
  value: string;
  setValue: (newValue: string) => void;
  placeholder?: string;
  multiline?: boolean;
  isError?: boolean;
};

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  setValue,
  placeholder = '',
  multiline = false,
  isError = false,
}) => {
  const borderColor = useThemeColor({}, isError ? 'border_error_input' : 'border_input');
  const placeholderColor = useThemeColor({}, 'placeholder_color');
  const cursorColor = useThemeColor({}, 'text');
  const color = useThemeColor({}, 'text');

  return (
    <ThemedView style={[{ borderColor }, styles.container]}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        cursorColor={cursorColor}
        style={[{ color }, styles.input]}
        multiline={multiline}
      />
    </ThemedView>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 2,
    gap: 10,
    padding: 10,
  },
  input: {
    margin: 0,
    padding: 0,
  },
});

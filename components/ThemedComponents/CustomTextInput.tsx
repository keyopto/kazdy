import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import ThemedView from './ThemedView';
import useThemeColor from '@/hooks/useThemeColor';
import ThemedText from './ThemedText';

export type CustomTextInputProps = {
  value: string;
  setValue: (newValue: string) => void;
  placeholder?: string;
  multiline?: boolean;
  isError?: boolean;
  label?: string;
};

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  setValue,
  placeholder = '',
  multiline = false,
  isError = false,
  label,
}) => {
  const borderColor = useThemeColor({}, isError ? 'border_error_input' : 'border_input');
  const placeholderColor = useThemeColor({}, 'placeholder_color');
  const cursorColor = useThemeColor({}, 'text');
  const color = useThemeColor({}, 'text');

  const getLabel = () => {
    if (!label) {
      return;
    }

    return <ThemedText> {label} </ThemedText>;
  };

  return (
    <ThemedView style={styles.container}>
      {getLabel()}
      <ThemedView style={[{ borderColor }, styles.containerInput]}>
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
    </ThemedView>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  containerInput: {
    borderRadius: 8,
    borderWidth: 2,
    gap: 10,
  },
  input: {
    margin: 0,
    padding: 10,
  },
});

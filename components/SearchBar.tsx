import React, { useRef } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import useThemeColor from '@/hooks/useThemeColor';
import ThemedIconSymbol from './ThemedComponents/ThemedIconSymbol';
import ThemedPressable from './ThemedComponents/ThemedPressable';

export type SearchBarProps = {
  value: string;
  setValue: (newValue: string) => void;
  placeholder?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ value, setValue, placeholder = '' }) => {
  const borderColor = useThemeColor({}, 'border_input');
  const placeholderColor = useThemeColor({}, 'placeholder_color');
  const cursorColor = useThemeColor({}, 'text');
  const color = useThemeColor({}, 'text');

  const inputRef = useRef<TextInput>(null);

  const onPress = () => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current?.focus();
  };

  return (
    <ThemedPressable onPress={onPress} style={[{ borderColor }, styles.containerInput]}>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        cursorColor={cursorColor}
        style={[{ color }, styles.input]}
      />
      <ThemedIconSymbol name="magnifyingglass" style={styles.icon} />
    </ThemedPressable>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  containerInput: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    flexDirection: 'row',
    gap: 10,
  },
  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    margin: 0,
    padding: 10,
  },
});

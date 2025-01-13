import React from 'react';
import { Picker } from '@react-native-picker/picker';
import useThemeColor from '@/hooks/useThemeColor';
import ThemedView from './ThemedView';
import { StyleSheet } from 'react-native';

export type CustomPickerProps<T extends { value: string; label: string }> = {
  data: T[];
  selectedValue: T['value'];
  onValueChange: (newValue: T['value']) => void;
};

const CustomPicker = <T extends { value: string; label: string }>({
  data,
  selectedValue,
  onValueChange,
}: CustomPickerProps<T>) => {
  const color = useThemeColor({}, 'text');

  return (
    <ThemedView
      style={[
        {
          borderColor: color,
        },
        styles.container,
      ]}
    >
      <Picker
        style={{
          color,
        }}
        dropdownIconColor={color}
        onValueChange={onValueChange}
        selectedValue={selectedValue}
      >
        {data.map((value) => {
          return <Picker.Item label={value.label} value={value.value} key={value.value} />;
        })}
      </Picker>
    </ThemedView>
  );
};

export default CustomPicker;

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    borderWidth: 1,
  },
});

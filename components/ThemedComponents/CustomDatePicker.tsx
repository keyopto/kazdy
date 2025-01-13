import React, { useState } from 'react';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import ThemedPressable from './ThemedPressable';
import ThemedText from './ThemedText';
import { StyleSheet } from 'react-native';
import useThemeColor from '@/hooks/useThemeColor';
import ThemedIconSymbol from './ThemedIconSymbol';
import ThemedView from './ThemedView';

export type CustomDatePickerProps = {
  date: Date | undefined;
  defaultDate?: Date;
  setDate: (newDate: Date) => void;
  mode: 'date' | 'time';
  placeholder?: string;
  isError?: boolean;
  label?: string;
};

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  date,
  defaultDate = new Date(),
  setDate,
  mode,
  placeholder = '',
  isError,
  label,
}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const borderColor = useThemeColor({}, isError ? 'border_error_input' : 'border_input');

  const color = useThemeColor({}, date ? 'text' : 'placeholder_color');

  const onChangeDate = (_event: DateTimePickerEvent, newDate?: Date) => {
    setIsModalVisible(false);

    if (!newDate) {
      return;
    }
    setDate(newDate || date);
  };

  const getModalPicker = () => {
    if (!isModalVisible) {
      return null;
    }

    return (
      <DateTimePicker
        value={date || defaultDate}
        mode={mode}
        onChange={onChangeDate}
        is24Hour={true}
      />
    );
  };

  const formatDate = (dateToFormat: Date | undefined) => {
    if (!dateToFormat) {
      return placeholder;
    }

    return dateToFormat.toLocaleDateString('fr-fr');
  };

  const onPress = () => {
    setIsModalVisible(true);
  };

  const getLabel = () => {
    if (!label) {
      return;
    }

    return <ThemedText> {label} </ThemedText>;
  };

  return (
    <ThemedView style={styles.container}>
      {getLabel()}
      <ThemedPressable onPress={onPress} style={[{ borderColor }, styles.containerInput]}>
        <ThemedIconSymbol name="calendar" size={18} />
        <ThemedText lightColor={color} darkColor={color}>
          {formatDate(date)}
        </ThemedText>
        {getModalPicker()}
      </ThemedPressable>
    </ThemedView>
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  containerInput: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    flexDirection: 'row',
    gap: 10,
    padding: 10,
  },
});

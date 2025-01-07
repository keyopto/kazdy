import React, { useState } from 'react';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import ThemedPressable from './ThemedPressable';
import ThemedText from './ThemedText';
import { StyleSheet } from 'react-native';
import useThemeColor from '@/hooks/useThemeColor';
import ThemedIconSymbol from './ThemedIconSymbol';

export type CustomDatePickerProps = {
  date: Date | undefined;
  defaultDate?: Date;
  setDate: (newDate: Date) => void;
  mode: 'date' | 'time';
  placeholder?: string;
};

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  date,
  defaultDate = new Date(),
  setDate,
  mode,
  placeholder = '',
}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const borderColor = useThemeColor({}, 'border_input');

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

  return (
    <ThemedPressable onPress={onPress} style={[{ borderColor }, styles.container]}>
      <ThemedIconSymbol name="calendar" size={18} />
      <ThemedText lightColor={color} darkColor={color}>
        {formatDate(date)}
      </ThemedText>
      {getModalPicker()}
    </ThemedPressable>
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    flexDirection: 'row',
    gap: 10,
    padding: 10,
  },
});

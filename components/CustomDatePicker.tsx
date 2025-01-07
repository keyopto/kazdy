import React, { useState } from 'react';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import ThemedPressable from './ThemedPressable';
import ThemedText from './ThemedText';
import { StyleSheet } from 'react-native';
import useThemeColor from '@/hooks/useThemeColor';
import ThemedIconSymbol from './ThemedIconSymbol';

export type CustomDatePickerProps = {
  date: Date;
  setDate: (newDate: Date) => void;
  mode: 'date' | 'time';
};

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ date, setDate, mode }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const borderColor = useThemeColor({}, 'border_input');

  const color = useThemeColor({}, !!date ? 'text' : 'placeholder_color');

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

    return <DateTimePicker value={date} mode={mode} onChange={onChangeDate} is24Hour={true} />;
  };

  const formatDate = (dateToFormat: Date) => {
    return dateToFormat.toLocaleDateString('fr-fr');
  };

  const onPress = () => {
    setIsModalVisible(true);
  };

  return (
    <ThemedPressable onPress={onPress} style={[{ borderColor }, styles.container]}>
      <ThemedIconSymbol name="calendar" size={18} />
      <ThemedText lightColor={color} darkColor={color}>
        {formatDate(date)}{' '}
      </ThemedText>
      {getModalPicker()}
    </ThemedPressable>
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    gap: 10,
    borderWidth: 2,
    borderRadius: 8,
  },
  calendarIcon: {
    height: 25,
    width: 25,
  },
});

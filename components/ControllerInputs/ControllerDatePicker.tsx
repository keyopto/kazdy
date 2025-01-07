import React from 'react';
import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import ErrorMessage from '../ThemedComponents/ErrorMessage';
import { View } from 'react-native';
import CustomDatePicker from '../ThemedComponents/CustomDatePicker';

export type ControllerDatePickerProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  error: FieldError | undefined;
  mode: 'date' | 'time';
  placeholder?: string;
  defaultDate?: Date;
};

const ControllerDatePicker = <TFieldValues extends FieldValues>({
  control,
  name,
  error,
  placeholder,
  mode,
  defaultDate,
}: ControllerDatePickerProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <View>
            <CustomDatePicker
              date={value}
              setDate={onChange}
              placeholder={placeholder}
              isError={!!error}
              mode={mode}
              defaultDate={defaultDate}
            />
            <ErrorMessage message={error?.message || undefined} />
          </View>
        );
      }}
    />
  );
};

export default ControllerDatePicker;

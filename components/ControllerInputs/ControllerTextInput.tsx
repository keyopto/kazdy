import React from 'react';
import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import CustomTextInput from '../ThemedComponents/CustomTextInput';
import ErrorMessage from '../ThemedComponents/ErrorMessage';
import { View } from 'react-native';

export type ControllerTextInputProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  error: FieldError | undefined;
  placeholder?: string;
  label?: string;
  multiline?: boolean;
};

const ControllerTextInput = <TFieldValues extends FieldValues>({
  control,
  name,
  error,
  placeholder,
  label,
  multiline,
}: ControllerTextInputProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <View>
            <CustomTextInput
              value={value}
              setValue={onChange}
              placeholder={placeholder}
              isError={!!error}
              label={label}
              multiline={multiline}
            />
            <ErrorMessage message={error?.message || undefined} />
          </View>
        );
      }}
    />
  );
};

export default ControllerTextInput;

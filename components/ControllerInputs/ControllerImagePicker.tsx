import React from 'react';
import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { View } from 'react-native';
import CustomImagePicker from '../ThemedComponents/CustomImagePicker';
import ErrorMessage from '../ThemedComponents/ErrorMessage';

export type ControllerImagePickerProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  error: FieldError | undefined;
};

const ControllerImagePicker = <TFieldValues extends FieldValues>({
  control,
  name,
  error,
}: ControllerImagePickerProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <View>
            <CustomImagePicker image={value} setImage={onChange} />
            <ErrorMessage message={error?.message || undefined} />
          </View>
        );
      }}
    />
  );
};

export default ControllerImagePicker;

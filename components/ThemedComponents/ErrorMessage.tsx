import React from 'react';
import ThemedText from './ThemedText';
import Colors from '@/constants/Colors';

export type ErrorMessageProps = {
  message: string | undefined;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) {
    return null;
  }
  return <ThemedText darkColor={Colors.dark.text_error}>{message}</ThemedText>;
};

export default ErrorMessage;

import useThemeColor from '@/hooks/useThemeColor';
import React from 'react';
import { Text, type TextProps, StyleSheet } from 'react-native';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default';
};

const ThemedText: React.FC<ThemedTextProps> = ({
  type = 'default',
  lightColor,
  darkColor,
  style,
  ...rest
}) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text style={[{ color }, type === 'default' ? styles.default : undefined, style]} {...rest} />
  );
};

export default ThemedText;

const styles = StyleSheet.create({
  default: {},
});

import React from 'react';
import type { IconSymbolName } from './IconSymbol';
import type { StyleProp, TextStyle } from 'react-native';
import type { SymbolWeight } from 'expo-symbols';
import IconSymbol from './IconSymbol';
import useThemeColor from '@/hooks/useThemeColor';

export type ThemedIconSymbolProps = {
  name: IconSymbolName;
  size?: number;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
  lightColor?: string;
  darkColor?: string;
};

const ThemedIconSymbol: React.FC<ThemedIconSymbolProps> = ({
  name,
  size,
  style,
  weight,
  lightColor,
  darkColor,
}) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <IconSymbol name={name} color={color} size={size} weight={weight} style={style} />;
};

export default ThemedIconSymbol;

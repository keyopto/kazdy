import type { ColorType } from '@/constants/Colors';
import useThemeColor from '@/hooks/useThemeColor';
import React from 'react';
import { ActivityIndicator, type ActivityIndicatorProps } from 'react-native';

export type ThemedLoaderProps = ActivityIndicatorProps & {
  themeColor?: ColorType;
};

const ThemedLoader: React.FC<ThemedLoaderProps> = ({ themeColor = 'text', size = 40, ...rest }) => {
  const color = useThemeColor({}, themeColor);

  return <ActivityIndicator color={color} size={size} {...rest} />;
};

export default ThemedLoader;

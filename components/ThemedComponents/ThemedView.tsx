import React from 'react';
import { View, type ViewProps } from 'react-native';

import useThemeColor from '@/hooks/useThemeColor';
import { SafeAreaView } from 'react-native-safe-area-context';
import type Colors from '@/constants/Colors';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  safeArea?: boolean;
  themeColor?: keyof typeof Colors.light & keyof typeof Colors.dark;
};

const ThemedView = ({
  style,
  themeColor = 'transparent',
  lightColor,
  darkColor,
  safeArea,
  ...otherProps
}: ThemedViewProps) => {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, themeColor);

  const ViewComponent = safeArea ? SafeAreaView : View;

  return <ViewComponent style={[{ backgroundColor }, style]} {...otherProps} />;
};

export default ThemedView;

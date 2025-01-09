import type Colors from '@/constants/Colors';
import useThemeColor from '@/hooks/useThemeColor';
import React from 'react';
import { Pressable, type PressableProps } from 'react-native';

export type ThemedPressableProps = PressableProps & {
  lightColor?: string;
  darkColor?: string;
  themeColor?: keyof typeof Colors.light & keyof typeof Colors.dark;
};

const ThemedPressable: React.FC<ThemedPressableProps> = ({
  lightColor,
  darkColor,
  themeColor = 'background',
  style,
  ...rest
}) => {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, themeColor);

  return (
    <Pressable
      style={(props) => [
        { backgroundColor },
        { opacity: props.pressed ? 0.5 : 1 },
        typeof style === 'function' ? style(props) : style,
      ]}
      {...rest}
    />
  );
};

export default ThemedPressable;

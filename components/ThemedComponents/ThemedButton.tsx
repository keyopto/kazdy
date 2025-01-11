import React from 'react';
import { StyleSheet, type PressableProps } from 'react-native';
import ThemedPressable from './ThemedPressable';
import useThemeColor from '@/hooks/useThemeColor';
import ThemedText from './ThemedText';
import type { ColorType } from '@/constants/Colors';
import type { IconSymbolName } from './IconSymbol';
import ThemedIconSymbol from './ThemedIconSymbol';

export type ThemedButtonProps = PressableProps & {
  title: string;
  type?: 'default' | 'submit';
  themeTextColor?: ColorType;
  iconName?: IconSymbolName;
};

const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  type = 'default',
  themeTextColor = 'text',
  style,
  iconName,
  ...rest
}) => {
  const getBackgroundColorFromType = (): ColorType => {
    switch (type) {
      case 'default':
        return 'transparent';
      case 'submit':
        return 'primary';
    }
  };

  const getStyleFromType = () => {
    switch (type) {
      case 'default':
        return styles.default;
      case 'submit':
        return styles.submit;
    }
  };

  const getIcon = () => {
    if (!iconName) {
      return null;
    }

    return <ThemedIconSymbol name={iconName} themeColor={themeTextColor} />;
  };

  const backgroundColor = useThemeColor({}, getBackgroundColorFromType());

  return (
    <ThemedPressable
      style={(props) => [
        { backgroundColor },
        getStyleFromType(),
        typeof style === 'function' ? style(props) : style,
      ]}
      {...rest}
    >
      {getIcon()}
      <ThemedText themeColor={themeTextColor}>{title}</ThemedText>
    </ThemedPressable>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  default: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    minHeight: 50,
  },
  submit: {
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    textAlign: 'center',
  },
});

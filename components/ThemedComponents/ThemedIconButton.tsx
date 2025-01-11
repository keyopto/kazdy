import React from 'react';
import { StyleSheet, type PressableProps } from 'react-native';
import ThemedPressable from './ThemedPressable';
import ThemedIconSymbol from './ThemedIconSymbol';
import type { IconSymbolName } from './IconSymbol';
import type { ColorType } from '@/constants/Colors';

export type ThemedIconButtonProps = PressableProps & {
  iconName: IconSymbolName;
  themeColor?: ColorType;
};

const ThemedIconButton: React.FC<ThemedIconButtonProps> = ({
  style,
  iconName,
  themeColor = 'primary',
  ...rest
}) => {
  return (
    <ThemedPressable
      themeColor={themeColor}
      style={(props) => [styles.container, typeof style === 'function' ? style(props) : style]}
      {...rest}
    >
      <ThemedIconSymbol name={iconName} />
    </ThemedPressable>
  );
};

export default ThemedIconButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 20,
    padding: 20,
  },
});

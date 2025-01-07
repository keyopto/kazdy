import React from 'react';
import { StyleSheet, type PressableProps } from 'react-native';
import ThemedPressable from './ThemedPressable';
import useThemeColor from '@/hooks/useThemeColor';
import ThemedText from './ThemedText';

export type ThemedButtonProps = PressableProps & {
  title: string;
};

const ThemedButton: React.FC<ThemedButtonProps> = ({ title, style, ...rest }) => {
  const backgroundColor = useThemeColor({}, 'button');

  return (
    <ThemedPressable
      style={(props) => [
        { backgroundColor },
        styles.button,
        typeof style === 'function' ? style(props) : style,
      ]}
      {...rest}
    >
      <ThemedText style={styles.title}>{title}</ThemedText>
    </ThemedPressable>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  title: {
    textAlign: 'center',
  },
});

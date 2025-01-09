import React from 'react';
import { StyleSheet, type PressableProps } from 'react-native';
import ThemedIconSymbol from './ThemedComponents/ThemedIconSymbol';
import ThemedPressable from './ThemedComponents/ThemedPressable';
import ThemedText from './ThemedComponents/ThemedText';
import { useTranslation } from 'react-i18next';

export type DeleteButtonProps = PressableProps;

const DeleteButton: React.FC<DeleteButtonProps> = ({ style, ...rest }) => {
  const { t } = useTranslation();

  return (
    <ThemedPressable
      style={(props) => [styles.container, typeof style === 'function' ? style(props) : style]}
      themeColor="transparent"
      {...rest}
    >
      <ThemedIconSymbol name="bin.xmark.fill" themeColor="text_error" size={26} />
      <ThemedText themeColor="text_error">{t('general.delete')}</ThemedText>
    </ThemedPressable>
  );
};

export default DeleteButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
});

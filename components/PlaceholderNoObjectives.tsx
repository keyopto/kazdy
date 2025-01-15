import React from 'react';
import ThemedView from './ThemedComponents/ThemedView';
import ThemedIconSymbol from './ThemedComponents/ThemedIconSymbol';
import { StyleSheet } from 'react-native';
import ThemedText from './ThemedComponents/ThemedText';
import { useTranslation } from 'react-i18next';

export type PlaceholderNoObjectivesProps = {
  __placeholder?: never;
};

const PlaceholderNoObjectives: React.FC<PlaceholderNoObjectivesProps> = () => {
  const { t } = useTranslation();

  return (
    <ThemedView style={styles.container}>
      <ThemedIconSymbol themeColor="placeholder_color" name="nosign" size={50} />
      <ThemedText themeColor="placeholder_color" style={styles.text}>
        {' '}
        {t('home.no_goal')}
      </ThemedText>
    </ThemedView>
  );
};

export default PlaceholderNoObjectives;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 20,
    paddingVertical: 40,
  },
  text: {
    fontSize: 20,
  },
});

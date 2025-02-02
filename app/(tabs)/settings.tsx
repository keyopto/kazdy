import LanguagePicker from '@/components/Settings/LanguagePicker';
import ThemedText from '@/components/ThemedComponents/ThemedText';
import ThemedView from '@/components/ThemedComponents/ThemedView';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

export type SettingsScreenParams = {
  __placeholder?: never;
};

const Settings = () => {
  const { t } = useTranslation();

  return (
    <ThemedView themeColor="background" safeArea style={styles.container}>
      <ThemedText type="title"> {t('settings.title')} </ThemedText>
      <LanguagePicker />
    </ThemedView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    padding: 10,
  },
});

import React from 'react';
import { Stack } from 'expo-router';
import { Screen } from 'expo-router/build/views/Screen';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '@/i18';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const { t } = useTranslation();

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Screen
            name="index"
            options={{
              headerShown: false,
              title: t('home.title'),
            }}
          />
          <Screen
            name="add_goal"
            options={{
              presentation: 'modal',
              title: t('add_goal.title'),
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </I18nextProvider>
  );
}

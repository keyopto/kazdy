import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { Screen } from 'expo-router/build/views/Screen';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18';
import { SQLiteProvider } from 'expo-sqlite';
import migrateDbIfNeeded from '@/migrations/_migrate';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import * as Notifications from 'expo-notifications';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    (async () => {
      await Notifications.requestPermissionsAsync();
    })();

    const responseListener = Notifications.addNotificationResponseReceivedListener(() => {});

    return () => {
      responseListener.remove();
    };
  }, []);

  const getStack = () => {
    return (
      <Stack>
        <Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name="goal"
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name="milestone"
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name="pep_talk"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    );
  };

  return (
    <Provider store={store}>
      <SQLiteProvider databaseName="kazdy.db" onInit={migrateDbIfNeeded}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            {getStack()}
            <StatusBar style="auto" />
          </ThemeProvider>
        </I18nextProvider>
      </SQLiteProvider>
    </Provider>
  );
}

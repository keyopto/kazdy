import React from 'react';
import ThemedIconSymbol from '@/components/ThemedComponents/ThemedIconSymbol';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarIconStyle: {
          alignItems: 'center',
          flex: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: () => <ThemedIconSymbol size={30} name="house" />,
          headerShown: false,
          tabBarShowLabel: false,
          title: t('home.title'),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: () => <ThemedIconSymbol size={30} name="gear" />,
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
}

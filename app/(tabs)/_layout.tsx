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
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: () => <ThemedIconSymbol size={30} name="house" />,
          tabBarShowLabel: false,
          title: t('home.title'),
        }}
      />
      <Tabs.Screen
        name="list_goals"
        options={{
          tabBarIcon: () => <ThemedIconSymbol size={30} name="list.dash" />,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: () => <ThemedIconSymbol size={30} name="gear" />,
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
}

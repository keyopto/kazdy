import React from 'react';
import { Stack } from 'expo-router';
import { Screen } from 'expo-router/build/views/Screen';
import { useTranslation } from 'react-i18next';

const GoalLayout = () => {
  const { t } = useTranslation();

  return (
    <Stack>
      <Screen
        name="[id]"
        options={{
          presentation: 'modal',
          title: t('goal_details.title'),
        }}
      />
      <Screen
        name="add"
        options={{
          presentation: 'modal',
          title: t('add_goal.title'),
        }}
      />
      <Screen
        name="modify"
        options={{
          presentation: 'modal',
          title: t('add_goal.title'),
        }}
      />
    </Stack>
  );
};

export default GoalLayout;

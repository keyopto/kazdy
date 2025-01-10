import React from 'react';
import { Stack } from 'expo-router';
import { Screen } from 'expo-router/build/views/Screen';
import { useTranslation } from 'react-i18next';

const MilestoneLayout = () => {
  const { t } = useTranslation();

  return (
    <Stack>
      <Screen
        name="add"
        options={{
          presentation: 'modal',
          title: t('add_milestone.title'),
        }}
      />
    </Stack>
  );
};

export default MilestoneLayout;

import React from 'react';
import { Stack } from 'expo-router';
import { Screen } from 'expo-router/build/views/Screen';
import { useTranslation } from 'react-i18next';

const PepTalkLayout = () => {
  const { t } = useTranslation();

  return (
    <Stack>
      <Screen
        name="index"
        options={{
          presentation: 'modal',
          title: t('pep_talk_list.title'),
        }}
      />
    </Stack>
  );
};

export default PepTalkLayout;

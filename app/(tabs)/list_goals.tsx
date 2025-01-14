import SummaryGoal from '@/components/Home/SummaryGoal';
import ThemedText from '@/components/ThemedComponents/ThemedText';
import ThemedView from '@/components/ThemedComponents/ThemedView';
import useGoals from '@/hooks/useGoals';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet } from 'react-native';

export type ListGoalsScreenParams = {
  __placeholder?: never;
};

const ListGoals = () => {
  const { goals } = useGoals({});
  const { t } = useTranslation();

  return (
    <ThemedView safeArea style={styles.container}>
      <ThemedText type="title"> {t('list_goals.title')}</ThemedText>
      <FlatList
        data={goals}
        contentContainerStyle={styles.flatList}
        keyExtractor={(goal) => goal.id.toString()}
        renderItem={({ item }) => {
          return <SummaryGoal key={item.id} goal={item} />;
        }}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
};

export default ListGoals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
    padding: 10,
  },
  flatList: {
    gap: 15,
  },
});

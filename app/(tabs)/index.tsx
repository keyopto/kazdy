import AddButton from '@/components/AddButton';
import SummaryGoal from '@/components/Home/SummaryGoal';
import PlaceholderNoObjectives from '@/components/PlaceholderNoObjectives';
import ThemedIconSymbol from '@/components/ThemedComponents/ThemedIconSymbol';
import ThemedLoader from '@/components/ThemedComponents/ThemedLoader';
import ThemedText from '@/components/ThemedComponents/ThemedText';
import ThemedView from '@/components/ThemedComponents/ThemedView';
import GoalStatus from '@/enums/GoalStatus';
import useGoals from '@/hooks/useGoals';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet } from 'react-native';

export default function Index() {
  const { goals, loading } = useGoals({ status: GoalStatus.ON_GOING });

  const { t } = useTranslation();

  const router = useRouter();

  const onPressAdd = () => {
    router.push('/goal/add');
  };

  const getHeader = () => {
    return (
      <ThemedView style={styles.header}>
        <ThemedIconSymbol name="calendar.circle.fill" size={155} themeColor="button" />
        <ThemedText themeColor="button" style={styles.title}>
          Kazdy
        </ThemedText>
        <ThemedText style={styles.catchphrase}>{t('home.catchphrase')} </ThemedText>
      </ThemedView>
    );
  };

  if (loading) {
    return (
      <ThemedView>
        <ThemedLoader />
      </ThemedView>
    );
  }

  return (
    <ThemedView themeColor="background" safeArea style={styles.container}>
      <FlatList
        data={goals}
        contentContainerStyle={styles.flatList}
        keyExtractor={(goal) => goal.id.toString()}
        renderItem={({ item }) => {
          return <SummaryGoal key={item.id} goal={item} />;
        }}
        ListHeaderComponent={getHeader()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={PlaceholderNoObjectives}
      />
      <AddButton onPress={onPressAdd} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  catchphrase: {
    fontSize: 30,
  },
  container: {
    flex: 1,
    gap: 10,
    padding: 10,
  },
  flatList: {
    gap: 15,
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});

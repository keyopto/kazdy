import AddButton from '@/components/AddButton';
import SummaryGoal from '@/components/Home/SummaryGoal';
import ThemedIconSymbol from '@/components/ThemedComponents/ThemedIconSymbol';
import ThemedText from '@/components/ThemedComponents/ThemedText';
import ThemedView from '@/components/ThemedComponents/ThemedView';
import useGoals from '@/hooks/useGoals';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet } from 'react-native';

export default function Index() {
  const { goals } = useGoals();

  const { t } = useTranslation();

  const router = useRouter();

  const onPressAdd = () => {
    router.push('/add_goal');
  };

  const getHeader = () => {
    return (
      <ThemedView style={styles.header}>
        <ThemedIconSymbol name="calendar.circle.fill" size={155} themeColor="button" />
        <ThemedText style={styles.title}>{t('home.catchphrase')} </ThemedText>
      </ThemedView>
    );
  };

  return (
    <ThemedView safeArea style={styles.container}>
      <FlatList
        data={goals}
        contentContainerStyle={styles.flatList}
        keyExtractor={(goal) => goal.id.toString()}
        renderItem={({ item }) => {
          return <SummaryGoal key={item.id} goal={item} />;
        }}
        ListHeaderComponent={getHeader()}
        showsVerticalScrollIndicator={false}
      />
      <AddButton onPress={onPressAdd} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
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
  },
});

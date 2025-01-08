import AddButton from '@/components/AddButton';
import SummaryGoal from '@/components/Home/SummaryGoal';
import ThemedView from '@/components/ThemedComponents/ThemedView';
import useGoals from '@/hooks/useGoals';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function Index() {
  const { goals } = useGoals();

  const router = useRouter();

  const onPressAdd = () => {
    router.push('/add_goal');
  };

  return (
    <ThemedView safeArea style={styles.container}>
      {goals.map((goal) => {
        return <SummaryGoal key={goal.id} goal={goal} />;
      })}
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
});

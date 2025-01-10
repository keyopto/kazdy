import ModalBottom from '@/components/GoalDetails/ModalBottom';
import MoreButton from '@/components/MoreButton';
import ThemedText from '@/components/ThemedComponents/ThemedText';
import ThemedView from '@/components/ThemedComponents/ThemedView';
import useGoals from '@/hooks/useGoals';
import type { Goal } from '@/types/Goal';
import { router, type UnknownOutputParams } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import AddButton from '@/components/AddButton';
import useMilestones from '@/hooks/useMilestones';
import SummaryMilestone from '@/components/GoalDetails/SummaryMilestone';
import HeaderGoalDetails from '@/components/GoalDetails/HeaderGoalDetails';

export interface GoalDetailsScreenParams extends UnknownOutputParams {
  id: string;
}

const GoalDetails = () => {
  const { id } = useLocalSearchParams<GoalDetailsScreenParams>();
  const { getGoalById } = useGoals();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const { milestones } = useMilestones(Number(id));

  const [goal, setGoal] = useState<Goal>();

  const openModal = () => {
    setIsModalVisible(true);
  };

  const dismissModal = () => {
    setIsModalVisible(false);
  };

  const setup = async () => {
    const goalFromDB = await getGoalById(Number(id));

    if (!goalFromDB) {
      throw new Error('goal not found in db');
    }

    setGoal(goalFromDB);
  };

  useEffect(() => {
    setup();
  }, [id]);

  if (!goal) {
    //TODO loading
    return <ThemedView />;
  }

  const onAddMilestone = () => {
    router.push({
      pathname: '/milestone/add',
      params: {
        goalId: goal.id.toString(),
      },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}> {goal.title}</ThemedText>
        <MoreButton onPress={openModal} />
      </ThemedView>

      <FlatList
        data={milestones}
        contentContainerStyle={styles.flatList}
        keyExtractor={(goal) => goal.id.toString()}
        renderItem={({ item }) => {
          return <SummaryMilestone key={item.id} milestone={item} />;
        }}
        ListHeaderComponent={<HeaderGoalDetails goal={goal} />}
        showsVerticalScrollIndicator={false}
      />
      <AddButton onPress={onAddMilestone} />
      <ModalBottom isVisible={isModalVisible} dismiss={dismissModal} goal={goal} />
    </ThemedView>
  );
};

export default GoalDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    gap: 15,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
  },
});

import ModalBottom from '@/components/GoalDetails/ModalBottom';
import MoreButton from '@/components/MoreButton';
import ThemedText from '@/components/ThemedComponents/ThemedText';
import ThemedView from '@/components/ThemedComponents/ThemedView';
import useGoals from '@/hooks/useGoals';
import type { Goal } from '@/types/Goal';
import formatDate from '@/utils/formatDate';
import type { UnknownOutputParams } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

export interface GoalDetailsScreenParams extends UnknownOutputParams {
  goalId: string;
}

const GoalDetails = () => {
  const { goalId } = useLocalSearchParams<GoalDetailsScreenParams>();
  const { getGoalById } = useGoals();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [goal, setGoal] = useState<Goal>();

  const openModal = () => {
    setIsModalVisible(true);
  };

  const dismissModal = () => {
    setIsModalVisible(false);
  };

  const setup = async () => {
    const goalFromDB = await getGoalById(Number(goalId));

    if (!goalFromDB) {
      throw new Error('goal not found in db');
    }

    setGoal(goalFromDB);
  };

  useEffect(() => {
    setup();
  }, [goalId]);

  if (!goal) {
    //TODO loading
    return <ThemedView />;
  }

  return (
    <ThemedView style={styles.container}>
      <MoreButton onPress={openModal} />
      <ThemedText> {goal.title} </ThemedText>
      <ThemedText> {formatDate(goal.date)} </ThemedText>
      <ThemedText> {goal.description} </ThemedText>
      <ModalBottom isVisible={isModalVisible} dismiss={dismissModal} goal={goal} />
    </ThemedView>
  );
};

export default GoalDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

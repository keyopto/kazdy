import type { Goal } from '@/types/Goal';
import React from 'react';
import ThemedText from '../ThemedComponents/ThemedText';
import ThemedPressable from '../ThemedComponents/ThemedPressable';
import { router } from 'expo-router';

export type SummaryGoalProps = {
  goal: Goal;
};

const SummaryGoal: React.FC<SummaryGoalProps> = ({ goal }) => {
  const formatDate = () => {
    return goal.date.toLocaleDateString('fr-fr');
  };

  const goToDetails = () => {
    router.push({
      pathname: '/goal_details',
      params: {
        goalId: goal.id.toString(),
      },
    });
  };

  return (
    <ThemedPressable onPress={goToDetails}>
      <ThemedText>{goal.title}</ThemedText>
      <ThemedText>{formatDate()}</ThemedText>
      <ThemedText>{goal.description}</ThemedText>
    </ThemedPressable>
  );
};

export default SummaryGoal;

import type { Goal } from '@/types/Goal';
import React from 'react';
import ThemedView from '../ThemedComponents/ThemedView';
import ThemedText from '../ThemedComponents/ThemedText';

export type SummaryGoalProps = {
  goal: Goal;
};

const SummaryGoal: React.FC<SummaryGoalProps> = ({ goal }) => {
  const formatDate = () => {
    return goal.date.toLocaleDateString('fr-fr');
  };

  return (
    <ThemedView>
      <ThemedText>{goal.title}</ThemedText>
      <ThemedText>{formatDate()}</ThemedText>
      <ThemedText>{goal.description}</ThemedText>
    </ThemedView>
  );
};

export default SummaryGoal;

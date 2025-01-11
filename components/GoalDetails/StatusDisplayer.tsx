import GoalStatus from '@/enums/GoalStatus';
import type { Goal } from '@/types/Goal';
import React from 'react';
import ThemedView from '../ThemedComponents/ThemedView';
import ThemedIconSymbol from '../ThemedComponents/ThemedIconSymbol';
import type { IconSymbolName } from '../ThemedComponents/IconSymbol';
import { StyleSheet } from 'react-native';

export type StatusDisplayerProps = {
  goal: Goal;
};

const StatusDisplayer: React.FC<StatusDisplayerProps> = ({ goal }) => {
  const status = goal.status;

  const getIconName = (): IconSymbolName => {
    switch (goal.status) {
      case GoalStatus.COMPLETED:
        return 'checklist';
      case GoalStatus.GIVEN_UP:
        return 'cross.fill';
      default:
        throw new Error(`Status not recognized: ${goal.status}`);
    }
  };

  if (status === GoalStatus.ON_GOING) {
    return null;
  }

  return (
    <ThemedView style={styles.container} themeColor="transparent">
      <ThemedIconSymbol name={getIconName()} size={40} />
    </ThemedView>
  );
};

export default StatusDisplayer;

const styles = StyleSheet.create({
  container: {
    bottom: 10,
    position: 'absolute',
    right: 10,
  },
});

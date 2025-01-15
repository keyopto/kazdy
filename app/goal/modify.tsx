import { Redirect, useLocalSearchParams } from 'expo-router';
import React from 'react';

export type ModifyGoalScreenParams = {
  goalId: string;
};

const ModifyGoal = () => {
  const { goalId } = useLocalSearchParams<ModifyGoalScreenParams>();

  return (
    <Redirect
      href={{
        pathname: '/goal/add',
        params: { goalId },
      }}
    />
  );
};

export default ModifyGoal;

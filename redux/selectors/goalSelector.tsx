import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export const selectorGoals = (goalId: number | undefined) => {
  return createSelector(
    (state: RootState) => state.goals.list,
    (goals) => {
      const goalsFiltered = !goalId ? goals : goals.filter((goal) => goal.id === goalId);

      return goalsFiltered.map((goal) => {
        return {
          ...goal,
          date: new Date(goal.date),
        };
      });
    }
  );
};

export const selectorAllGoals = createSelector(
  (state: RootState) => state.goals.list,
  (goals) =>
    goals.map((goal) => {
      return {
        ...goal,
        date: new Date(goal.date),
      };
    })
);

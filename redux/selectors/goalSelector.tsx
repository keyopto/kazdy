import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

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

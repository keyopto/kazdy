import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { GoalFilters } from '@/types/GoalFilters';
import type { GoalRedux } from '@/types/Goal';

const getGoalsFiltered = (goals: GoalRedux[], filters: GoalFilters): GoalRedux[] => {
  let goalsFiltered = goals;

  if (filters.id) {
    goalsFiltered = goalsFiltered.filter((goal) => goal.id === filters.id);
  }

  if (filters.status !== undefined) {
    goalsFiltered = goalsFiltered.filter((goal) => goal.status === filters.status);
  }

  return goalsFiltered;
};

export const selectorGoals = (filters: GoalFilters) => {
  return createSelector(
    (state: RootState) => state.goals.list,
    (goals) => {
      const goalsFiltered = getGoalsFiltered(goals, filters);

      return goalsFiltered
        .map((goal) => {
          return {
            ...goal,
            date: new Date(goal.date),
          };
        })
        .sort((a, b) => {
          return a.date.getTime() - b.date.getTime();
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

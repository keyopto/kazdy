import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export const selectorMilestonesFromGoalId = (goalId: number) => {
  return createSelector(
    (state: RootState) => state.milestones.list,
    (milestones) =>
      milestones
        .filter((milestone) => {
          return milestone.goalId === goalId;
        })
        .map((milestone) => {
          return {
            ...milestone,
            date: new Date(milestone.date),
          };
        })
  );
};

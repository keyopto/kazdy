import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export const selectorMilestonesFromGoalId = (goalId: number | undefined) => {
  return createSelector(
    (state: RootState) => state.milestones.list,
    (milestones) => {
      if (!goalId) {
        return milestones;
      }
      return milestones
        .filter((milestone) => {
          return milestone.goalId === goalId;
        })
        .map((milestone) => {
          return {
            ...milestone,
            date: new Date(milestone.date),
          };
        });
    }
  );
};

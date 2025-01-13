import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export const selectorMilestonesFromGoalId = (goalId: number | undefined) => {
  return createSelector(
    (state: RootState) => state.milestones.list,
    (milestones) => {
      const milestonesFiltered = !goalId
        ? milestones
        : milestones.filter((milestone) => milestone.goalId === goalId);

      return milestonesFiltered
        .map((milestone) => {
          return {
            ...milestone,
            date: new Date(milestone.date),
          };
        })
        .sort((a, b) => {
          return a.date.getTime() - b.date.getTime();
        });
    }
  );
};

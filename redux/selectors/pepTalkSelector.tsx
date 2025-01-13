import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export const selectorPepTalksFromGoalId = (goalId: number | undefined) => {
  return createSelector(
    (state: RootState) => state.pepTalks.list,
    (pepTalks) => {
      const filteredPepTalks = !goalId
        ? pepTalks
        : pepTalks.filter((pepTalk) => {
            return pepTalk.goalId === goalId;
          });

      return filteredPepTalks
        .map((pepTalk) => {
          return {
            ...pepTalk,
            date: new Date(pepTalk.date),
          };
        })
        .sort((a, b) => {
          return a.date.getTime() - b.date.getTime();
        });
    }
  );
};

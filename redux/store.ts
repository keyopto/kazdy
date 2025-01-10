import { configureStore, type ThunkDispatch } from '@reduxjs/toolkit';
import goalsReducer from './goalsSlice';
import milestonesReducer from './milestonesSlice';

export const store = configureStore({
  reducer: {
    goals: goalsReducer,
    milestones: milestonesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppDispatch = typeof store.dispatch & ThunkDispatch<RootState, undefined, any>;

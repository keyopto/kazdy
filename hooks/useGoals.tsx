import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { addGoalRedux, fetchGoals } from '@/redux/goalsSlice';
import type { Goal } from '@/types/Goal';
import type { FormDataAddGoalForm } from '@/types/forms/AddGoalForm';
import { insertGoal, selectGoalFromId } from '@/db/goalsDB';
import { selectorAllGoals } from '@/redux/selectors/goalSelector';

export type useGoalsType = {
  goals: Goal[];
  loading: boolean;
  error: string | null;
  addGoal: (goal: FormDataAddGoalForm) => Promise<void>;
};

const useGoals = (): useGoalsType => {
  const dispatch = useAppDispatch();
  const goals = useAppSelector(selectorAllGoals);
  const loading = useAppSelector((state) => state.goals.loading);
  const error = useAppSelector((state) => state.goals.error);

  useEffect(() => {
    if (goals.length === 0) {
      dispatch(fetchGoals());
    }
  }, [goals.length, dispatch]);

  const addGoal = async (goal: FormDataAddGoalForm) => {
    const idInserted = await insertGoal(goal);
    const goalAdded = await selectGoalFromId(idInserted);
    if (!goalAdded) {
      throw new Error('Goal was not inserted');
    }
    dispatch(addGoalRedux(goalAdded));
  };

  return { goals, loading, error, addGoal };
};

export default useGoals;

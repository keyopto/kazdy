import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { addGoalRedux, fetchGoals, removeGoalRedux } from '@/redux/goalsSlice';
import type { Goal } from '@/types/Goal';
import type { FormDataAddGoalForm } from '@/types/forms/AddGoalForm';
import { deleteGoal, insertGoal, selectGoalFromId } from '@/db/goalsDB';
import { selectorAllGoals } from '@/redux/selectors/goalSelector';

export type useGoalsType = {
  goals: Goal[];
  loading: boolean;
  error: string | null;
  addGoal: (goal: FormDataAddGoalForm) => Promise<void>;
  getGoalById: (id: number) => Promise<Goal | null>;
  removeGoal: (id: number) => Promise<void>;
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

  const removeGoal = async (goalId: number) => {
    await deleteGoal(goalId);
    dispatch(removeGoalRedux(goalId));
  };

  const getGoalById = async (id: number) => {
    const goal = await selectGoalFromId(id);

    if (!goal) {
      return null;
    }

    return {
      ...goal,
      date: new Date(goal.date),
    };
  };

  return { goals, loading, error, addGoal, getGoalById, removeGoal };
};

export default useGoals;

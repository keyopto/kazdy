import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { addGoalRedux, fetchGoals, modifyGoalRedux, removeGoalRedux } from '@/redux/goalsSlice';
import type { Goal } from '@/types/Goal';
import type { FormDataAddGoal } from '@/types/forms/AddGoalForm';
import { deleteGoal, insertGoal, selectGoalFromId, updateStatus } from '@/db/goalsDB';
import { selectorGoals } from '@/redux/selectors/goalSelector';
import type GoalStatus from '@/enums/GoalStatus';

export type useGoalsType = {
  goals: Goal[];
  loading: boolean;
  error: string | null;
  addGoal: (goal: FormDataAddGoal) => Promise<void>;
  getGoalById: (id: number) => Promise<Goal | null>;
  removeGoal: (id: number) => Promise<void>;
  changeStatusGoal: (goal: Goal, status: GoalStatus) => Promise<void>;
};

const useGoals = ({ id }: { id?: number }): useGoalsType => {
  const dispatch = useAppDispatch();
  const goals = useAppSelector(selectorGoals(id));
  const loading = useAppSelector((state) => state.goals.loading);
  const error = useAppSelector((state) => state.goals.error);

  useEffect(() => {
    if (goals.length === 0) {
      dispatch(fetchGoals());
    }
  }, [goals.length, dispatch]);

  const addGoal = async (goal: FormDataAddGoal) => {
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

  const changeStatusGoal = async (goal: Goal, status: GoalStatus) => {
    await updateStatus(goal.id, status);
    dispatch(modifyGoalRedux({ ...goal, status, date: goal.date.toISOString() }));
  };

  return { goals, loading, error, addGoal, getGoalById, removeGoal, changeStatusGoal };
};

export default useGoals;

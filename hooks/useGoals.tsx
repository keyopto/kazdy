import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { addGoalRedux, fetchGoals, modifyGoalRedux, removeGoalRedux } from '@/redux/goalsSlice';
import type { Goal } from '@/types/Goal';
import type { FormDataAddGoal } from '@/types/forms/AddGoalForm';
import {
  deleteGoal,
  insertGoal,
  selectGoalFromId,
  updateGoal,
  updateGoalNotification,
  updateStatus,
} from '@/db/goalsDB';
import { selectorGoals } from '@/redux/selectors/goalSelector';
import type GoalStatus from '@/enums/GoalStatus';
import useNotifications from './useNotifications';
import NotificationType from '@/enums/NotificationType';
import type { GoalFilters } from '@/types/GoalFilters';

export type useGoalsType = {
  goals: Goal[];
  loading: boolean;
  error: string | null;
  addGoal: (goal: FormDataAddGoal) => Promise<void>;
  modifyGoal: (id: number, goal: FormDataAddGoal) => Promise<void>;
  removeGoal: (id: number) => Promise<void>;
  changeStatusGoal: (goal: Goal, status: GoalStatus) => Promise<void>;
};

const useGoals = (filters: GoalFilters): useGoalsType => {
  const { scheduleNewNotification } = useNotifications();

  const dispatch = useAppDispatch();
  const goals = useAppSelector(selectorGoals(filters));
  const loading = useAppSelector((state) => state.goals.loading);
  const error = useAppSelector((state) => state.goals.error);

  useEffect(() => {
    if (goals.length === 0) {
      dispatch(fetchGoals());
    }
  }, [goals.length, dispatch]);

  const addGoal = async (goal: FormDataAddGoal) => {
    const idInserted = await insertGoal(goal);

    const idNotification = await scheduleNewNotification(
      NotificationType.GOAL,
      idInserted,
      goal.date
    );

    if (idNotification) {
      await updateGoalNotification(idInserted, idNotification);
    }

    const goalAdded = await selectGoalFromId(idInserted);
    if (!goalAdded) {
      throw new Error('Goal was not inserted');
    }
    dispatch(addGoalRedux(goalAdded));
  };

  const modifyGoal = async (id: number, goal: FormDataAddGoal) => {
    await updateGoal(id, goal);
    const goalModified = await selectGoalFromId(id);
    if (!goalModified) {
      throw new Error('Goal was not inserted');
    }
    dispatch(modifyGoalRedux(goalModified));
  };

  const removeGoal = async (goalId: number) => {
    await deleteGoal(goalId);
    dispatch(removeGoalRedux(goalId));
  };

  const changeStatusGoal = async (goal: Goal, status: GoalStatus) => {
    await updateStatus(goal.id, status);
    dispatch(modifyGoalRedux({ ...goal, status, date: goal.date.toISOString() }));
  };

  return { goals, loading, error, addGoal, modifyGoal, removeGoal, changeStatusGoal };
};

export default useGoals;

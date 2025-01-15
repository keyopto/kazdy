import db from '@/constants/db';
import type GoalStatus from '@/enums/GoalStatus';
import type { FormDataAddGoal } from '@/types/forms/AddGoalForm';
import type { GoalRedux } from '@/types/Goal';

export const selectGoalFromId = async (id: number) => {
  return await db.getFirstAsync<GoalRedux>('SELECT * FROM goal WHERE id = ?', id);
};

export const selectAllGoals = async () => {
  return await db.getAllAsync<GoalRedux>('SELECT * FROM goal');
};

export const insertGoal = async (goal: FormDataAddGoal): Promise<number> => {
  const result = await db.runAsync(
    `
  INSERT INTO goal (title, date, description, image) 
  VALUES (?, ?, ?, ?)`,
    goal.title,
    goal.date.toISOString(),
    goal.description,
    goal.image ? goal.image : null
  );

  return result.lastInsertRowId;
};

export const deleteGoal = async (goalId: number): Promise<void> => {
  await db.runAsync(`DELETE FROM goal WHERE id = ?`, goalId);
};

export const updateGoal = async (goalId: number, goal: FormDataAddGoal): Promise<void> => {
  await db.runAsync(
    `
  UPDATE goal
  SET title = ?, date = ?, description = ?, image=?
  WHERE id = ?
  `,
    goal.title,
    goal.date.toISOString(),
    goal.description,
    goal.image ? goal.image : null,
    goalId
  );
};

export const updateStatus = async (goalId: number, status: GoalStatus) => {
  await db.runAsync(
    `
  UPDATE goal
  SET status = ?
  WHERE id = ?
  `,
    status,
    goalId
  );
};

export const updateGoalNotification = async (goalId: number, idNotification: string | null) => {
  await db.runAsync(
    `
  UPDATE goal
  SET notificationId = ?
  WHERE id = ?
  `,
    idNotification,
    goalId
  );
};

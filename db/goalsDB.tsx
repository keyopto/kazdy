import db from '@/constants/db';
import type { FormDataAddGoalForm } from '@/types/forms/AddGoalForm';
import type { Goal } from '@/types/Goal';

export const selectGoalFromId = async (id: number) => {
  return await db.getFirstAsync<Goal>('SELECT * FROM goal WHERE id = ?', id);
};

export const selectAllGoals = async () => {
  return await db.getAllAsync<Goal>('SELECT * FROM goal');
};

export const insertGoal = async (goal: FormDataAddGoalForm): Promise<number> => {
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

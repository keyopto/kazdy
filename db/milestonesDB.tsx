import db from '@/constants/db';
import type { FormDataAddMilestone } from '@/types/forms/AddMilestoneForm';
import { type Milestone } from '@/types/Milestone';

export const selectMilestoneFromId = async (id: number) => {
  return await db.getFirstAsync<Milestone>('SELECT * FROM milestone WHERE id = ?', id);
};

export const selectAllMilestones = async () => {
  return await db.getAllAsync<Milestone>('SELECT * FROM milestone');
};

export const insertMilestone = async (
  milestone: FormDataAddMilestone & { goalId: number }
): Promise<number> => {
  const result = await db.runAsync(
    `
  INSERT INTO milestone (title, date, goalId) 
  VALUES (?, ?, ?)`,
    milestone.title,
    milestone.date.toISOString(),
    milestone.goalId
  );

  return result.lastInsertRowId;
};

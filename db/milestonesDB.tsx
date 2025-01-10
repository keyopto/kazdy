import db from '@/constants/db';
import type { FormDataAddMilestone } from '@/types/forms/AddMilestoneForm';

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

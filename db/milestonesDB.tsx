import db from '@/constants/db';
import type MilestoneStatus from '@/enums/MilestoneStatus';
import type { FormDataAddMilestone } from '@/types/forms/AddMilestoneForm';
import { type MilestoneRedux } from '@/types/Milestone';

export const selectMilestoneFromId = async (id: number) => {
  return await db.getFirstAsync<MilestoneRedux>('SELECT * FROM milestone WHERE id = ?', id);
};

export const selectAllMilestones = async () => {
  return await db.getAllAsync<MilestoneRedux>('SELECT * FROM milestone');
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

export const updateMilestoneStatus = async (milestoneId: number, status: MilestoneStatus) => {
  await db.runAsync(
    `
  UPDATE milestone
  SET status = ?
  WHERE id = ?
  `,
    status,
    milestoneId
  );
};

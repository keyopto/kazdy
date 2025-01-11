import db from '@/constants/db';
import type { FormDataAddPepTalk } from '@/types/forms/AddPepTalkForm';
import { type PepTalkRedux } from '@/types/PepTalk';

export const selectPepTalkFromId = async (id: number) => {
  return await db.getFirstAsync<PepTalkRedux>('SELECT * FROM pep_talk WHERE id = ?', id);
};

export const selectAllPepTalks = async () => {
  return await db.getAllAsync<PepTalkRedux>('SELECT * FROM pep_talk');
};

export const insertPepTalk = async (
  milestone: FormDataAddPepTalk & { goalId: number; uri: string }
): Promise<number> => {
  const result = await db.runAsync(
    `
  INSERT INTO pep_talk (title, date, uri, goalId) 
  VALUES (?, ?, ?, ?)`,
    milestone.title,
    milestone.date.toISOString(),
    milestone.uri,
    milestone.goalId
  );

  return result.lastInsertRowId;
};

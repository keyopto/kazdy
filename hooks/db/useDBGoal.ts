import type { Goal } from '@/types/Goal';
import { useSQLiteContext } from 'expo-sqlite';

export type DBGoalType = {
  insertGoal: (goal: Goal) => Promise<void>;
};

const useDBGoal = (): DBGoalType => {
  const db = useSQLiteContext();

  const insertGoal = async (goal: Goal) => {
    await db.runAsync(
      `
  INSERT INTO goal (title, date, description) 
  VALUES (?, ?, ?)`,
      goal.title,
      goal.date.toISOString(),
      goal.description
    );
  };

  return {
    insertGoal,
  };
};

export default useDBGoal;

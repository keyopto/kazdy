import type { DatabaseMigration } from '@/types/DatabaseMigration';
import type { SQLiteDatabase } from 'expo-sqlite';

const migration1: DatabaseMigration = {
  name: 'create goal table',
  async up(db: SQLiteDatabase): Promise<void> {
    await db.execAsync(`
CREATE TABLE goal (
  id         INTEGER PRIMARY KEY,
  title       TEXT NOT NULL,
  date        TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);`);
  },
};
export default migration1;

import type { DatabaseMigration } from '@/types/DatabaseMigration';
import type { SQLiteDatabase } from 'expo-sqlite';

const migration5: DatabaseMigration = {
  name: 'create pep_talk table',
  async up(db: SQLiteDatabase): Promise<void> {
    await db.execAsync(`
    CREATE TABLE pep_talk (
      id         INTEGER PRIMARY KEY,
      title       TEXT,
      uri         TEXT NOT NULL,
      date        TEXT NOT NULL,
      goalId      INTEGER NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (goalId) REFERENCES goal(id) ON DELETE CASCADE
    );
`);
  },
};

export default migration5;

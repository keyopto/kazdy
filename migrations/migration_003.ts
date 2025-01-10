import type { DatabaseMigration } from '@/types/DatabaseMigration';
import type { SQLiteDatabase } from 'expo-sqlite';

const migration3: DatabaseMigration = {
  name: 'create milestone table',
  async up(db: SQLiteDatabase): Promise<void> {
    await db.execAsync(`
    CREATE TABLE milestone (
      id         INTEGER PRIMARY KEY,
      title       TEXT NOT NULL,
      date        TEXT NOT NULL,
      goalId      INTEGER NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (goalId) REFERENCES goal(id) ON DELETE CASCADE
    );
    `);
  },
};

export default migration3;

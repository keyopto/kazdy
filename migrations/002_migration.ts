import type { DatabaseMigration } from '@/types/DatabaseMigration';
import type { SQLiteDatabase } from 'expo-sqlite';

const migration2: DatabaseMigration = {
  name: 'add image goal table',
  async up(db: SQLiteDatabase): Promise<void> {
    await db.execAsync(`
ALTER TABLE goal ADD COLUMN
image TEXT
`);
  },
};
export default migration2;

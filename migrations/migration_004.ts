import type { DatabaseMigration } from '@/types/DatabaseMigration';
import type { SQLiteDatabase } from 'expo-sqlite';

const migration4: DatabaseMigration = {
  name: 'add status goal table',
  async up(db: SQLiteDatabase): Promise<void> {
    await db.execAsync(`
ALTER TABLE goal ADD COLUMN
status NUMBER DEFAULT 0
`);
  },
};
export default migration4;

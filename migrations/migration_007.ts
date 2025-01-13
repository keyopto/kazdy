import type { DatabaseMigration } from '@/types/DatabaseMigration';
import type { SQLiteDatabase } from 'expo-sqlite';

const migration7: DatabaseMigration = {
  name: 'add status milestone table',
  async up(db: SQLiteDatabase): Promise<void> {
    await db.execAsync(`
ALTER TABLE milestone ADD COLUMN
status NUMBER DEFAULT 0
`);
  },
};
export default migration7;

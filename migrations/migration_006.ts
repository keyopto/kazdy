import type { DatabaseMigration } from '@/types/DatabaseMigration';
import type { SQLiteDatabase } from 'expo-sqlite';

const migration6: DatabaseMigration = {
  name: 'add notificationId goal table',
  async up(db: SQLiteDatabase): Promise<void> {
    await db.execAsync(`
ALTER TABLE goal ADD COLUMN
notificationId TEXT
`);
  },
};
export default migration6;

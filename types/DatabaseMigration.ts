import type { SQLiteDatabase } from 'expo-sqlite';

export type DatabaseMigration = {
  name: string;
  up: (db: SQLiteDatabase) => Promise<void>;
};

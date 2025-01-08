import type { SQLiteDatabase } from 'expo-sqlite';
import migration1 from './001_migration';

const MIGRATIONS = [migration1];

const getVersion = async (db: SQLiteDatabase): Promise<number> => {
  try {
    const result = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
    return result?.user_version || 0;
  } catch (e) {
    throw new Error('Cannot get user version', { cause: e });
  }
};

const runMigrations = (db: SQLiteDatabase, userVersion: number) => {
  return MIGRATIONS.slice(userVersion).reduce(async (previousPromise, currentMigration, index) => {
    const previousVersion = await previousPromise;
    if (previousVersion < userVersion + index) {
      return previousVersion; // Stop if a previous migration failed
    }
    await db.withTransactionAsync(async () => {
      try {
        await currentMigration.up(db);
      } catch (error) {
        throw new Error(`Could not execute migration ${currentMigration.name}`, { cause: error });
      }
    });
    return userVersion + index + 1;
  }, Promise.resolve(userVersion));
};

const saveVersion = async (db: SQLiteDatabase, newVersion: number) => {
  try {
    await db.execAsync(`PRAGMA user_version = ${newVersion}`);
  } catch (e) {
    throw new Error('Cannot save user version', { cause: e });
  }
};

const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
  const userVersion = await getVersion(db);
  const newVersion = await runMigrations(db, userVersion);
  await saveVersion(db, newVersion);
};

export default migrateDbIfNeeded;

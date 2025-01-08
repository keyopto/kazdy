import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('kazdy.db');

export default db;

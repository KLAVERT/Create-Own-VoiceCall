import { db } from './storageManager';
import config from '../config';

export async function testDatabaseConnection() {
    if (config.voice.saveMethod === 'database' && db) {
      try {
        await db.raw('SELECT 1+1 AS result');
        console.log("Database connection successful!");
      } catch (error) {
        console.error("Database connection failed. Check your configuration:", error);
        process.exit(1);
      }
    } else {
      console.log("Database is not used. Storage is done in JSON or skipped.");
    }
  }

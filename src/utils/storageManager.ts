import knex from 'knex';
import fs from 'fs';
import config from '../config';

export const db = config.voice.saveMethod === 'database'
  ? knex({
      client: config.database.type,
      connection: (() => {
        switch (config.database.type) {
          case 'sqlite':
            return { filename: config.database.sqlitePath };
          case 'mysql':
            return {
              host: config.database.mysql.host,
              port: config.database.mysql.port,
              user: config.database.mysql.username,
              password: config.database.mysql.password,
              database: config.database.mysql.database,
            };
          case 'postgresql':
            return {
              host: config.database.postgresql.host,
              port: config.database.postgresql.port,
              user: config.database.postgresql.username,
              password: config.database.postgresql.password,
              database: config.database.postgresql.database,
            };
          default:
            throw new Error(`Unsupported database type: ${config.database.type}`);
        }
      })(),
      useNullAsDefault: config.database.type === 'sqlite',
    })
  : null;

if (db && config.voice.saveMethod === 'database') {
  db.schema.hasTable('voice_names').then((exists) => {
    if (!exists) {
      return db.schema.createTable('voice_names', (table) => {
        table.string('user_id').primary();
        table.string('channel_name').notNullable();
      });
    }
  });
}

export async function saveChannelName(userId: string, channelName: string) {
  if (config.voice.saveMethod === 'database' && db) {
    await db('voice_names').insert({ user_id: userId, channel_name: channelName }).onConflict('user_id').merge();
  } else if (config.voice.saveMethod === 'json') {
    const data = JSON.parse(fs.readFileSync(config.voice.jsonFilePath, 'utf8'));
    data[userId] = channelName;
    fs.writeFileSync(config.voice.jsonFilePath, JSON.stringify(data, null, 2));
  }
}

export async function getChannelName(userId: string): Promise<string | null> {
  if (config.voice.saveMethod === 'database' && db) {
    const result = await db('voice_names').where('user_id', userId).first();
    return result?.channel_name || null;
  } else if (config.voice.saveMethod === 'json') {
    const data = JSON.parse(fs.readFileSync(config.voice.jsonFilePath, 'utf8'));
    return data[userId] || null;
  }
  return null;
}

export async function clearStorage(userId: string) {
  if (config.voice.saveMethod === 'database' && db) {
    await db('voice_names').where('user_id', userId).del();
  } else if (config.voice.saveMethod === 'json') {
    const data = JSON.parse(fs.readFileSync(config.voice.jsonFilePath, 'utf8'));
    delete data[userId];
    fs.writeFileSync(config.voice.jsonFilePath, JSON.stringify(data, null, 2));
  }
}

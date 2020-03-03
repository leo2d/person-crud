import { createConnection } from 'typeorm';

import Person from '../../../domain/person/person';

export async function getDbConnection() {
  const DATABASE_HOST = 'localhost';
  const DATABASE_USER = 'postgres';
  const DATABASE_PORT = 5432;
  const DATABASE_PASSWORD = 'postgres';
  const DATABASE_DB = 'crud-person';

  const entities = [Person];

  const migrations = ['../migrations/**/*.ts'];

  const conn = await createConnection({
    type: 'postgres',
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_DB,
    entities: entities,
    synchronize: true,
    migrations: migrations,
  });

  return conn;
}

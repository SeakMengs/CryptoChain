import { migrate } from 'drizzle-orm/postgres-js/migrator';
import {  connection, db } from './db.server';

// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: 'src/drizzle/migrations' });

await connection.end();
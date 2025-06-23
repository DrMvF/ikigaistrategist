import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { schema } from '@/drizzle/schema';

const connectionPromise = mysql.createConnection({
  uri: process.env.DATABASE_URL!,
  ssl: {
    rejectUnauthorized: true,
  },
});

export const db = drizzle(await connectionPromise, { schema });

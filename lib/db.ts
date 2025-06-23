import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { reflections } from '@/drizzle/schema';

const connection = await mysql.createConnection({
  uri: process.env.DATABASE_URL!,
  ssl: {
    rejectUnauthorized: true,
  },
});

export const db = drizzle(connection, {
  schema: { reflections },
  mode: 'default', // ← Pflichtfeld ab drizzle-orm v0.30
});

import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config(); // <- Stelle sicher, dass .env.local geladen wird

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.DATABASE_HOST!,
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
  },
});

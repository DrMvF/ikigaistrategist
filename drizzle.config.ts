import type { Config } from "drizzle-kit";

export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.DATABASE_HOST ?? "aws.connect.psdb.cloud",
    port: 3306,
    user: process.env.DATABASE_USER ?? "722l94iuw42ah7wt7w4d",
    password: process.env.DATABASE_PASSWORD ?? "pscale_pw_6SYhkT02Uuhek9mVtHEvIG8q51PMkVBcFEXs7GcmM6M",
    database: process.env.DATABASE_NAME ?? "ikigaistrategist",
    ssl: {
      rejectUnauthorized: true,
    },
  },
} satisfies Config;

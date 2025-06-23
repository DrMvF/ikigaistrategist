import { mysqlTable, varchar, text, timestamp } from "drizzle-orm/mysql-core";

export const reflections = mysqlTable("reflections", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  inputText: text("input_text").notNull(),
  reflectionText: text("reflection_text").notNull(),
  environment: varchar("environment", { length: 20 }).default("dev"),
  createdAt: timestamp("created_at").defaultNow()
});

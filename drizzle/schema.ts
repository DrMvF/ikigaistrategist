// drizzle/schema.ts

import { mysqlTable, varchar, text, timestamp, int } from "drizzle-orm/mysql-core";

// Definition der Tabelle "reflections"
export const reflections = mysqlTable("reflections", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  inputText: text("input_text").notNull(),
  reflectionText: text("reflection_text").notNull(),
  environment: varchar("environment", { length: 20 }).default("dev"),
  createdAt: timestamp("created_at").defaultNow(),

  // Neue Felder für Ikigai-Bewertung (Skala 1–10)
  loveScore: int("love_score"),
  skillScore: int("skill_score"),
  worldScore: int("world_score"),
  financeScore: int("finance_score"),
});

export const schema = {
  reflections
};

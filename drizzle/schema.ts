// drizzle/schema.ts

import { mysqlTable, varchar, text, timestamp, int, serial } from "drizzle-orm/mysql-core";

// Bestehende Tabelle
export const reflections = mysqlTable("reflections", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  inputText: text("input_text").notNull(),
  reflectionText: text("reflection_text").notNull(),
  environment: varchar("environment", { length: 20 }).default("dev"),
  createdAt: timestamp("created_at").defaultNow(),
  loveScore: int("love_score"),
  skillScore: int("skill_score"),
  worldScore: int("world_score"),
  financeScore: int("finance_score"),
});

// ✨ Neue Tabelle: cycle_entries
export const cycleEntries = mysqlTable("cycle_entries", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  cycleDay: int("cycle_day").notNull(),
  cyclePhase: varchar("cycle_phase", { length: 20 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schema exportieren
export const schema = {
  reflections,
  cycleEntries
};

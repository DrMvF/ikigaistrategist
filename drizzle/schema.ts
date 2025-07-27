import { mysqlTable, varchar, text, timestamp, int, serial } from "drizzle-orm/mysql-core";

// Aktualisierte Tabelle: reflections
export const reflections = mysqlTable("reflections", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  inputText: text("input_text").notNull(),
  reflectionText: text("reflection_text").notNull(),
  environment: varchar("environment", { length: 20 }).default("dev"),
  createdAt: timestamp("created_at").defaultNow(),
  goalsScore: int("goals_score"),
  energyScore: int("energy_score"),
  communicationScore: int("communication_score"),
  trustScore: int("trust_score"),
  teamId: varchar("team_id", { length: 64 }), // optional
});

// Tabelle: cycle_entries
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
  cycleEntries,
};

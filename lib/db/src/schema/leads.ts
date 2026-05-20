import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const leadsTable = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  name: text("name").notNull(),
  company: text("company").notNull(),
  email: text("email").notNull(),
  attendees: integer("attendees").notNull(),
  message: text("message"),
  sourceIp: text("source_ip"),
  userAgent: text("user_agent"),
});

export const insertLeadSchema = createInsertSchema(leadsTable, {
  name: (s) => s.min(1).max(200),
  company: (s) => s.min(1).max(200),
  email: (s) => s.email().max(320),
  attendees: (s) => s.int().min(1).max(10000),
  message: (s) => s.max(5000),
}).pick({
  name: true,
  company: true,
  email: true,
  attendees: true,
  message: true,
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leadsTable.$inferSelect;

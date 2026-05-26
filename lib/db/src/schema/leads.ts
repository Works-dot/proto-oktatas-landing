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

// Wire payload schema = real fields + honeypot. The `website` field is a
// hidden trap: humans never fill it, bots usually do. When set, the server
// silently accepts the request but does NOT persist anything. Defined
// standalone (not via insertLeadSchema.extend) because drizzle-zod returns a
// schema that may not be on the same Zod runtime as our local `z` import.
export const submitLeadSchema = z.object({
  name: z.string().min(1).max(200),
  company: z.string().min(1).max(200),
  email: z.string().email().max(320),
  attendees: z.number().int().min(1).max(10000),
  message: z.string().max(5000).optional(),
  website: z.string().max(500).optional(),
});

export type InsertLead = typeof leadsTable.$inferInsert;
export type SubmitLead = z.infer<typeof submitLeadSchema>;
export type Lead = typeof leadsTable.$inferSelect;

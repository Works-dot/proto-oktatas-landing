import { Router, type IRouter } from "express";
import { desc } from "drizzle-orm";
import { db, leadsTable, insertLeadSchema } from "@workspace/db";
import { requireAdminToken } from "../lib/admin-auth";
import { rateLimitOnePerWindow, getClientIp } from "../lib/rate-limit";
import { logger } from "../lib/logger";

const router: IRouter = Router();

router.post("/leads", rateLimitOnePerWindow, async (req, res) => {
  const parsed = insertLeadSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: "Érvénytelen adatok",
      details: parsed.error.flatten(),
    });
    return;
  }
  try {
    const ua = req.header("user-agent") ?? null;
    const ip = getClientIp(req);
    await db.insert(leadsTable).values({
      ...parsed.data,
      sourceIp: ip,
      userAgent: ua,
    });
    res.status(201).json({ ok: true });
  } catch (err) {
    logger.error({ err }, "Failed to insert lead");
    res.status(500).json({ error: "Mentés sikertelen — próbáld újra." });
  }
});

router.get("/leads.json", requireAdminToken, async (_req, res) => {
  try {
    const rows = await db
      .select()
      .from(leadsTable)
      .orderBy(desc(leadsTable.createdAt));
    res.json({ count: rows.length, leads: rows });
  } catch (err) {
    logger.error({ err }, "Failed to fetch leads");
    res.status(500).json({ error: "Lekérdezés sikertelen" });
  }
});

router.get("/leads.csv", requireAdminToken, async (_req, res) => {
  try {
    const rows = await db
      .select()
      .from(leadsTable)
      .orderBy(desc(leadsTable.createdAt));
    const headers = [
      "created_at",
      "name",
      "company",
      "email",
      "attendees",
      "message",
      "source_ip",
      "user_agent",
      "id",
    ];
    const escape = (v: unknown): string => {
      if (v === null || v === undefined) return "";
      let s = v instanceof Date ? v.toISOString() : String(v);
      // Neutralize spreadsheet formula injection (CWE-1236): a leading
      // =, +, -, @, tab, or CR causes Excel/Sheets to evaluate the cell.
      // Prefix with a single quote which Excel strips on display.
      if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
      if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
      return s;
    };
    const lines = [headers.join(",")];
    for (const r of rows) {
      lines.push(
        [
          escape(r.createdAt),
          escape(r.name),
          escape(r.company),
          escape(r.email),
          escape(r.attendees),
          escape(r.message),
          escape(r.sourceIp),
          escape(r.userAgent),
          escape(r.id),
        ].join(","),
      );
    }
    const csv = "\uFEFF" + lines.join("\r\n") + "\r\n";
    const today = new Date().toISOString().slice(0, 10);
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="leads-${today}.csv"`,
    );
    res.send(csv);
  } catch (err) {
    logger.error({ err }, "Failed to export leads CSV");
    res.status(500).json({ error: "Export sikertelen" });
  }
});

export default router;

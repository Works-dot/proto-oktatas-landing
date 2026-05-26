import { Router, type IRouter, type Request, type Response } from "express";
import { desc } from "drizzle-orm";
import { db, leadsTable } from "@workspace/db";
import {
  clearSessionCookie,
  hasValidSession,
  issueSessionCookie,
  requireAdminSession,
  verifyAdminToken,
} from "../lib/admin-session";
import { rateLimitLogin, resetLoginAttempts } from "../lib/login-rate-limit";
import { getClientIp } from "../lib/rate-limit";
import { logger } from "../lib/logger";

const router: IRouter = Router();

router.post("/submissions/login", rateLimitLogin, (req: Request, res: Response) => {
  if (!process.env.ADMIN_TOKEN) {
    res.status(503).json({ error: "Admin endpoint not configured" });
    return;
  }
  const body = (req.body ?? {}) as { token?: unknown };
  const provided = typeof body.token === "string" ? body.token.trim() : "";
  if (!verifyAdminToken(provided)) {
    res.status(401).json({ error: "Hibás belépési kulcs." });
    return;
  }
  if (!issueSessionCookie(res)) {
    res.status(503).json({ error: "Admin endpoint not configured" });
    return;
  }
  resetLoginAttempts(getClientIp(req));
  res.json({ ok: true });
});

router.post("/submissions/logout", (_req, res) => {
  clearSessionCookie(res);
  res.json({ ok: true });
});

router.get("/submissions/me", (req, res) => {
  if (!hasValidSession(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  res.json({ ok: true });
});

router.get("/submissions", requireAdminSession, async (_req, res) => {
  try {
    const rows = await db
      .select()
      .from(leadsTable)
      .orderBy(desc(leadsTable.createdAt));
    res.json({ count: rows.length, leads: rows });
  } catch (err) {
    logger.error({ err }, "Failed to fetch admin leads");
    res.status(500).json({ error: "Lekérdezés sikertelen" });
  }
});

function escapeCsv(v: unknown): string {
  if (v === null || v === undefined) return "";
  let s = v instanceof Date ? v.toISOString() : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

router.get("/submissions.csv", requireAdminSession, async (_req, res) => {
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
    const lines = [headers.join(",")];
    for (const r of rows) {
      lines.push(
        [
          escapeCsv(r.createdAt),
          escapeCsv(r.name),
          escapeCsv(r.company),
          escapeCsv(r.email),
          escapeCsv(r.attendees),
          escapeCsv(r.message),
          escapeCsv(r.sourceIp),
          escapeCsv(r.userAgent),
          escapeCsv(r.id),
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
    logger.error({ err }, "Failed to export admin leads CSV");
    res.status(500).json({ error: "Export sikertelen" });
  }
});

export default router;

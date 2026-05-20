import type { Request, Response, NextFunction } from "express";

const WINDOW_MS = 30_000;
const lastHitByIp = new Map<string, number>();

setInterval(() => {
  const cutoff = Date.now() - WINDOW_MS * 4;
  for (const [ip, ts] of lastHitByIp) {
    if (ts < cutoff) lastHitByIp.delete(ip);
  }
}, 60_000).unref?.();

export function getClientIp(req: Request): string {
  // Relies on `app.set('trust proxy', 1)` so Express has already resolved the
  // real client IP from a single trusted proxy hop (Railway). Never parse
  // `x-forwarded-for` ourselves — spoofable.
  return req.ip ?? req.socket.remoteAddress ?? "unknown";
}

export function rateLimitOnePerWindow(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const ip = getClientIp(req);
  const now = Date.now();
  const last = lastHitByIp.get(ip) ?? 0;
  if (now - last < WINDOW_MS) {
    res
      .status(429)
      .json({ error: "Túl gyakori próbálkozás — próbáld pár másodperc múlva." });
    return;
  }
  lastHitByIp.set(ip, now);
  next();
}

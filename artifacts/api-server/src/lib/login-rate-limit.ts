import type { Request, Response, NextFunction } from "express";
import { getClientIp } from "./rate-limit";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

interface Entry {
  count: number;
  resetAt: number;
}

const attemptsByIp = new Map<string, Entry>();

setInterval(() => {
  const now = Date.now();
  for (const [ip, e] of attemptsByIp) {
    if (e.resetAt < now) attemptsByIp.delete(ip);
  }
}, 60_000).unref?.();

export function rateLimitLogin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const ip = getClientIp(req);
  const now = Date.now();
  const e = attemptsByIp.get(ip);
  if (!e || e.resetAt < now) {
    attemptsByIp.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    next();
    return;
  }
  if (e.count >= MAX_ATTEMPTS) {
    const retryAfter = Math.ceil((e.resetAt - now) / 1000);
    res.setHeader("Retry-After", String(retryAfter));
    res
      .status(429)
      .json({ error: "Túl sok próbálkozás. Próbáld újra 15 perc múlva." });
    return;
  }
  e.count += 1;
  next();
}

export function resetLoginAttempts(ip: string) {
  attemptsByIp.delete(ip);
}

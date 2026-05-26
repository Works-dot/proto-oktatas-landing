import {
  createHmac,
  hkdfSync,
  randomBytes,
  timingSafeEqual as nodeTimingSafeEqual,
} from "node:crypto";
import type { Request, Response, NextFunction } from "express";

const COOKIE_NAME = "admin_session";
const TTL_MS = 4 * 60 * 60 * 1000;
const SALT = Buffer.from("works-admin-session-v1");
const INFO = Buffer.from("cookie-signing-key");

function getSigningKey(): Buffer | null {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return null;
  const derived = hkdfSync("sha256", Buffer.from(token), SALT, INFO, 32);
  return Buffer.from(derived);
}

function b64url(buf: Buffer): string {
  return buf
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function b64urlDecode(s: string): Buffer {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  return Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64");
}

function timingSafeEqualStr(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return nodeTimingSafeEqual(aBuf, bBuf);
}

export function verifyAdminToken(provided: string): boolean {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected || !provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return nodeTimingSafeEqual(a, b);
}

interface Payload {
  iat: number;
  exp: number;
  nonce: string;
}

export function issueSessionCookie(res: Response): boolean {
  const key = getSigningKey();
  if (!key) return false;
  const now = Date.now();
  const payload: Payload = {
    iat: now,
    exp: now + TTL_MS,
    nonce: b64url(randomBytes(12)),
  };
  const payloadB64 = b64url(Buffer.from(JSON.stringify(payload)));
  const sig = b64url(createHmac("sha256", key).update(payloadB64).digest());
  const value = `${payloadB64}.${sig}`;
  const secure = process.env.NODE_ENV === "production";
  res.cookie(COOKIE_NAME, value, {
    httpOnly: true,
    secure,
    sameSite: "strict",
    path: "/",
    maxAge: TTL_MS,
  });
  return true;
}

export function clearSessionCookie(res: Response) {
  const secure = process.env.NODE_ENV === "production";
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure,
    sameSite: "strict",
    path: "/",
  });
}

function verifyCookie(value: string): boolean {
  const key = getSigningKey();
  if (!key) return false;
  const idx = value.lastIndexOf(".");
  if (idx <= 0) return false;
  const payloadB64 = value.slice(0, idx);
  const sig = value.slice(idx + 1);
  const expected = b64url(createHmac("sha256", key).update(payloadB64).digest());
  if (!timingSafeEqualStr(sig, expected)) return false;
  try {
    const payload = JSON.parse(b64urlDecode(payloadB64).toString("utf8")) as Payload;
    if (typeof payload.exp !== "number") return false;
    if (Date.now() > payload.exp) return false;
    return true;
  } catch {
    return false;
  }
}

export function hasValidSession(req: Request): boolean {
  const cookies = (req as Request & { cookies?: Record<string, string> }).cookies;
  const raw = cookies?.[COOKIE_NAME];
  if (!raw) return false;
  return verifyCookie(raw);
}

export function requireAdminSession(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!process.env.ADMIN_TOKEN) {
    res.status(503).json({ error: "Admin endpoint not configured" });
    return;
  }
  if (!hasValidSession(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

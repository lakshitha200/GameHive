import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";

const SECRET = process.env.AUTH_SECRET ?? "dev-only-secret-change-me";

export type SessionUser = { id: number; name: string; email: string };

const b64 = (s: string) => Buffer.from(s).toString("base64url");
const sig = (payload: string) => createHmac("sha256", SECRET).update(payload).digest("base64url");

export function signSession(user: SessionUser) {
  const payload = b64(JSON.stringify(user));
  return `${payload}.${sig(payload)}`;
}

export function readSession(token: string | undefined): SessionUser | null {
  if (!token) return null;
  const [payload, mac] = token.split(".");
  if (!payload || !mac) return null;
  const expected = Buffer.from(sig(payload));
  const given = Buffer.from(mac);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString());
  } catch {
    return null;
  }
}

export const hashPassword = (pw: string) => {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(pw, salt, 32).toString("hex")}`;
};

export const verifyPassword = (pw: string, stored: string) => {
  const [salt, hash] = stored.split(":");
  const a = Buffer.from(hash, "hex");
  const b = scryptSync(pw, salt, 32);
  return a.length === b.length && timingSafeEqual(a, b);
};

export const SESSION_COOKIE = "session";
export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 60 * 60 * 24,
  path: "/",
};

/* Demo "database": lives in server memory, resets on restart. */
type StoredUser = SessionUser & { passwordHash: string };
const g = globalThis as unknown as { __users?: Map<string, StoredUser> };
export const users = (g.__users ??= new Map<string, StoredUser>([
  ["lakshithaf20@gmail.com", { id: 1, name: "John Doe", email: "lakshithaf20@gmail.com", passwordHash: hashPassword("Online12@") }],
]));

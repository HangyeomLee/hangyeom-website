import "server-only";
import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "admin_session";

const SESSION_DAYS = 7;

function hmac(value: string) {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is not set");
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

export function createSessionToken() {
  const exp = String(Date.now() + SESSION_DAYS * 86_400_000);
  return `${exp}.${hmac(exp)}`;
}

export function verifySessionToken(token?: string) {
  if (!token || !process.env.AUTH_SECRET) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const expected = Buffer.from(hmac(exp));
  const got = Buffer.from(sig);
  return got.length === expected.length && crypto.timingSafeEqual(got, expected);
}

export async function isAdmin() {
  const store = await cookies();
  return verifySessionToken(store.get(ADMIN_COOKIE)?.value);
}

export function checkPassword(input: string) {
  if (!process.env.ADMIN_PASSWORD || !input) return false;
  // Hash both sides so lengths match and timingSafeEqual never throws.
  const a = crypto.createHash("sha256").update(input).digest();
  const b = crypto.createHash("sha256").update(process.env.ADMIN_PASSWORD).digest();
  return crypto.timingSafeEqual(a, b);
}

export const SESSION_MAX_AGE = SESSION_DAYS * 86_400;

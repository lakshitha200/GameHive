import { NextResponse } from "next/server";
import { SESSION_COOKIE, cookieOptions } from "@/lib/server/session";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, "", { ...cookieOptions, maxAge: 0 });
  return res;
}

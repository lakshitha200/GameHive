import { NextResponse } from "next/server";
import { validateLogin } from "@/lib/validation";
import { SESSION_COOKIE, cookieOptions, signSession, users, verifyPassword } from "@/lib/server/session";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = String(body?.email ?? "").trim().toLowerCase();
  const password = String(body?.password ?? "");

  const errors = validateLogin({ email, password });
  if (Object.keys(errors).length) {
    return NextResponse.json({ message: Object.values(errors)[0], errors }, { status: 400 });
  }

  const found = users.get(email);
  if (!found || !verifyPassword(password, found.passwordHash)) {
    return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
  }

  const user = { id: found.id, name: found.name, email: found.email };
  const res = NextResponse.json({ success: true, user });
  res.cookies.set(SESSION_COOKIE, signSession(user), cookieOptions);
  return res;
}

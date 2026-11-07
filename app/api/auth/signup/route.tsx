import { NextResponse } from "next/server";
import { validateSignup } from "@/lib/validation";
import { hashPassword, users } from "@/lib/server/session";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim().toLowerCase();
  const password = String(body?.password ?? "");

  const errors = validateSignup({ name, email, password, confirm: password });
  if (Object.keys(errors).length) {
    return NextResponse.json({ message: Object.values(errors)[0], errors }, { status: 400 });
  }
  if (users.has(email)) {
    return NextResponse.json(
      { message: "An account with this email already exists", errors: { email: "Email already registered" } },
      { status: 409 },
    );
  }

  users.set(email, { id: users.size + 1, name, email, passwordHash: hashPassword(password) });
  return NextResponse.json({ success: true, message: "User created" }, { status: 201 });
}

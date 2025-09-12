import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  // Normally store in DB
  return NextResponse.json({ success: true, message: "User created" });
}

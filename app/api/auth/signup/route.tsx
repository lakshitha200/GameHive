import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Normally store in DB
  return NextResponse.json({ success: true, message: "User created" });
}

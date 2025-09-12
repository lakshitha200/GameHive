import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (email === "lakshithaf20@gmail.com" && password === "Online12@") {

    const user = { id: 1, name: "John Doe", email };

    const cookie = serialize(
      "session",
      JSON.stringify(user), // save user info (or just session id)
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      }
    );
    const res = NextResponse.json({ success: true, user });
    res.headers.set("Set-Cookie", cookie); // ✅ attach cookie
    return res;
  }
  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}

import { cookies } from "next/headers";
import { SESSION_COOKIE, readSession } from "@/lib/server/session";

export async function GET() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return Response.json({ user: readSession(token) });
}

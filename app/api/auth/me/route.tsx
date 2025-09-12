import { cookies } from "next/headers";

export async function GET(req: Request) {
    const session = (await cookies()).get("session")?.value;
    if (!session) {
        return Response.json({ user: null });
    }
    const user = JSON.parse(session);
    return Response.json({ user });
}
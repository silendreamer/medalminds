import { NextResponse } from "next/server";
import { getBuzzerRoom, roleForLoadedRoom, serializeBuzzerRoom } from "@/lib/buzzerRooms";

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  // Prefer the x-organizer-password header; fall back to ?password= query param (deprecated — use header instead)
  const organizerPassword =
    request.headers.get("x-organizer-password") ?? new URL(request.url).searchParams.get("password");
  const room = await getBuzzerRoom(code);

  if (!room) {
    return NextResponse.json({ error: "Room not found or expired." }, { status: 404 });
  }

  const role = roleForLoadedRoom(room, organizerPassword);
  return NextResponse.json({ room: await serializeBuzzerRoom(room, role) });
}

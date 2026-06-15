import { NextResponse } from "next/server";
import { getBuzzerRoom, roleForRoom, serializeBuzzerRoom } from "@/lib/buzzerRooms";

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const url = new URL(request.url);
  const organizerPassword = url.searchParams.get("password");
  const room = await getBuzzerRoom(code);

  if (!room) {
    return NextResponse.json({ error: "Room not found or expired." }, { status: 404 });
  }

  const role = await roleForRoom(code, organizerPassword);
  return NextResponse.json({ room: serializeBuzzerRoom(room, role) });
}

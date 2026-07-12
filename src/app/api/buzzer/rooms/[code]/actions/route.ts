import { NextResponse } from "next/server";
import { applyBuzzerAction, roleForLoadedRoom, serializeBuzzerRoom, type BuzzerRoomAction } from "@/lib/buzzerRooms";

export const dynamic = "force-dynamic";

export async function POST(request: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;

  try {
    const action = (await request.json()) as BuzzerRoomAction;
    const room = await applyBuzzerAction(code, action);
    const organizerPassword =
      "organizerPassword" in action && typeof action.organizerPassword === "string" ? action.organizerPassword : null;
    const role = roleForLoadedRoom(room, organizerPassword);

    return NextResponse.json({ room: await serializeBuzzerRoom(room, role) });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to apply buzzer action." },
      { status: 400 }
    );
  }
}

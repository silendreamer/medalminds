import { NextResponse } from "next/server";
import { createBuzzerRoom, serializeBuzzerRoom } from "@/lib/buzzerRooms";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const room = await createBuzzerRoom({
      teamAName: body?.teamAName,
      teamBName: body?.teamBName,
      totalRounds: body?.totalRounds,
      timerMinutes: body?.timerMinutes
    });
    const url = new URL(request.url);
    const shareUrl = `${url.origin}/science-bowl/buzzer?room=${room.code}`;

    return NextResponse.json({
      code: room.code,
      organizerPassword: room.organizerPassword,
      shareUrl,
      room: serializeBuzzerRoom(room, "organizer")
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create buzzer room." },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import {
  getRandomQuestionByCompetition,
  isCompetitionSlug,
  type SchoolLevelFilter,
} from "@/lib/data";
import { parseSchoolLevel } from "@/lib/levels";

// Randomness lives here so the practice *pages* can be a static shell served from
// the CDN. The shell (PracticeSession) fetches its first question from this route
// on mount and again on every Next/Skip — replacing the old full-page navigation
// that forced every practice page to be server-rendered on demand.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const competition = searchParams.get("competition") ?? "";
  const subject = searchParams.get("subject");
  const level = searchParams.get("level") ?? "";
  const exclude = searchParams.get("exclude");

  if (!isCompetitionSlug(competition)) {
    return NextResponse.json({ error: "Unknown competition." }, { status: 400 });
  }

  const schoolLevel: SchoolLevelFilter | undefined = parseSchoolLevel(level);

  // Draw a question, retrying a few times to avoid handing back the one the
  // client just answered (best-effort — a tiny pool may only have one match).
  let question = await getRandomQuestionByCompetition(competition, subject, schoolLevel);
  if (question && exclude && question.id === exclude) {
    for (let attempt = 0; attempt < 4; attempt++) {
      const next = await getRandomQuestionByCompetition(competition, subject, schoolLevel);
      if (next && next.id !== exclude) {
        question = next;
        break;
      }
    }
  }

  if (!question) {
    return NextResponse.json({ question: null }, { status: 200 });
  }

  return NextResponse.json({ question });
}

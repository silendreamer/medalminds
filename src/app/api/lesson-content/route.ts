import { NextRequest, NextResponse } from "next/server";
import { getLessonBySlug } from "@/lib/data";
import type { CompetitionSlug } from "@/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const competition = (searchParams.get("competition") ?? "science-bowl") as CompetitionSlug;

  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  const lesson = await getLessonBySlug(competition, slug);
  if (!lesson) {
    return NextResponse.json({ error: "lesson not found" }, { status: 404 });
  }

  return NextResponse.json({
    title: lesson.title,
    summary: lesson.summary,
    keyConcepts: lesson.keyConcepts,
    contentSections: lesson.contentSections,
    reviewQuestions: lesson.reviewQuestions,
  });
}

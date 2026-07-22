import { notFound, redirect } from "next/navigation";
import { getLessonBySlug, isCompetitionSlug } from "@/lib/data";
import { subjectCoursePath } from "@/lib/routes";
import { slugifySubject } from "@/lib/subjects";

// The standalone lesson view has been retired in favor of the two-pane course
// view (…/learning/subject/[subjectSlug]?lesson=slug), which is the single
// canonical lesson experience. This route now permanently redirects any
// remaining direct/indexed links there so no lesson URL 404s.
export default async function LessonDetailPage({
  params
}: {
  params: Promise<{ competitionSlug: string; level: string; lessonId: string }>;
}) {
  const { competitionSlug, level, lessonId } = await params;
  if (!isCompetitionSlug(competitionSlug)) notFound();

  const levelDisplay =
    level === "middle-school" ? "Middle School" : level === "high-school" ? "High School" : undefined;
  const lesson = await getLessonBySlug(competitionSlug, lessonId, levelDisplay);
  if (!lesson) notFound();

  const subjectSlug = slugifySubject(lesson.subject);
  redirect(`${subjectCoursePath(competitionSlug, level, subjectSlug)}?lesson=${encodeURIComponent(lessonId)}`);
}

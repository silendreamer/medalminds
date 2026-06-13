import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SimplePracticeQuestion } from "@/components/SimplePracticeQuestion";
import { buildStudyBreadcrumbs } from "@/lib/breadcrumbs";
import {
  getCompetitionBySlug,
  getLessonsByCompetition,
  getQuestionById,
  getRandomQuestionByCompetition,
  isCompetitionSlug,
  type SchoolLevelFilter
} from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function PracticePage({
  params,
  searchParams
}: {
  params: Promise<{ competitionSlug: string }>;
  searchParams: Promise<{ subject?: string; level?: string; q?: string }>;
}) {
  const { competitionSlug } = await params;
  const { subject, level, q } = await searchParams;
  if (!isCompetitionSlug(competitionSlug)) notFound();
  const competition = await getCompetitionBySlug(competitionSlug);
  if (!competition) notFound();
  const schoolLevel: SchoolLevelFilter | undefined =
    competitionSlug === "science-bowl" && level === "middle-school"
      ? "MIDDLE_SCHOOL"
      : competitionSlug === "science-bowl" && level === "high-school"
        ? "HIGH_SCHOOL"
        : undefined;
  const question = q
    ? await getQuestionById(competitionSlug, q, subject, schoolLevel)
    : await getRandomQuestionByCompetition(competitionSlug, subject, schoolLevel);
  const lessons = await getLessonsByCompetition(competitionSlug, subject, schoolLevel);

  return (
    <section className="section">
      <div className="container stack">
        <Breadcrumbs
          items={buildStudyBreadcrumbs({
            competitionSlug,
            competitionName: competition.name,
            level,
            subject,
            current: "Practice"
          })}
        />
        <div className="section-heading">
          <div>
            <span className="eyebrow">{competition.name}</span>
            <h1>{subject ?? "Practice"} Questions</h1>
          </div>
        </div>
        {question ? <SimplePracticeQuestion question={question} lesson={lessons[0]} /> : <div className="empty">No questions are available yet.</div>}
      </div>
    </section>
  );
}

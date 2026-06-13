import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SimplePracticeQuestion } from "@/components/SimplePracticeQuestion";
import { getCompetitionBySlug, getLessonsByCompetition, getRandomQuestionByCompetition, isCompetitionSlug, type SchoolLevelFilter } from "@/lib/data";
import { competitionPath } from "@/lib/routes";

export const dynamic = "force-dynamic";

export default async function PracticePage({
  params,
  searchParams
}: {
  params: Promise<{ competitionSlug: string }>;
  searchParams: Promise<{ subject?: string; level?: string }>;
}) {
  const { competitionSlug } = await params;
  const { subject, level } = await searchParams;
  if (!isCompetitionSlug(competitionSlug)) notFound();
  const competition = await getCompetitionBySlug(competitionSlug);
  if (!competition) notFound();
  const schoolLevel: SchoolLevelFilter | undefined =
    competitionSlug === "science-bowl" && level === "middle-school"
      ? "MIDDLE_SCHOOL"
      : competitionSlug === "science-bowl" && level === "high-school"
        ? "HIGH_SCHOOL"
        : undefined;
  const levelQuery = level ? `level=${level}` : "";
  const subjectQuery = subject ? `subject=${encodeURIComponent(subject)}` : "";
  const parentQuery = [levelQuery, subjectQuery].filter(Boolean).join("&");
  const question = await getRandomQuestionByCompetition(competitionSlug, subject, schoolLevel);
  const lessons = await getLessonsByCompetition(competitionSlug, subject);

  return (
    <section className="section">
      <div className="container stack">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: competition.name, href: `${competitionPath(competitionSlug)}${parentQuery ? `?${parentQuery}` : ""}` },
            { label: "Practice" }
          ]}
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

import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LessonCard } from "@/components/LessonCard";
import { buildStudyBreadcrumbs } from "@/lib/breadcrumbs";
import { getCompetitionBySlug, getLessonsByCompetition, isCompetitionSlug, type SchoolLevelFilter } from "@/lib/data";

export default async function LearningPage({
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
  const lessons = await getLessonsByCompetition(competitionSlug, subject, schoolLevel);

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs
          items={buildStudyBreadcrumbs({
            competitionSlug,
            competitionName: competition.name,
            level,
            action: "Learning",
            subject,
            current: subject ? undefined : "Learning"
          })}
        />
        <div className="section-heading">
          <div>
            <span className="eyebrow">{competition.name}</span>
            <h1>{subject ?? "Learning"} Lessons</h1>
          </div>
        </div>
        {lessons.length ? (
          <div className="grid two">
            {lessons.map((lesson) => (
              <LessonCard lesson={lesson} key={lesson.id} />
            ))}
          </div>
        ) : (
          <div className="empty">No lessons are available yet.</div>
        )}
      </div>
    </section>
  );
}

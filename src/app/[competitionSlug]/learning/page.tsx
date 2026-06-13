import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LessonCard } from "@/components/LessonCard";
import { getCompetitionBySlug, getLessonsByCompetition, isCompetitionSlug } from "@/lib/data";
import { competitionPath } from "@/lib/routes";

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
  const lessons = await getLessonsByCompetition(competitionSlug, subject);
  const parentQuery = [level ? `level=${level}` : "", subject ? `subject=${encodeURIComponent(subject)}` : ""].filter(Boolean).join("&");

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: competition.name, href: `${competitionPath(competitionSlug)}${parentQuery ? `?${parentQuery}` : ""}` },
            { label: "Learning" }
          ]}
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

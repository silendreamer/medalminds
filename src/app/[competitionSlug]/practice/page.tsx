import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SimplePracticeQuestion } from "@/components/SimplePracticeQuestion";
import { getCompetitionBySlug, getLessonsByCompetition, getRandomQuestionByCompetition, isCompetitionSlug } from "@/lib/data";
import { competitionPath } from "@/lib/routes";

export const dynamic = "force-dynamic";

export default async function PracticePage({
  params,
  searchParams
}: {
  params: Promise<{ competitionSlug: string }>;
  searchParams: Promise<{ subject?: string }>;
}) {
  const { competitionSlug } = await params;
  const { subject } = await searchParams;
  if (!isCompetitionSlug(competitionSlug)) notFound();
  const competition = await getCompetitionBySlug(competitionSlug);
  if (!competition) notFound();
  const question = await getRandomQuestionByCompetition(competitionSlug, subject);
  const lessons = await getLessonsByCompetition(competitionSlug, subject);

  return (
    <section className="section">
      <div className="container stack">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: competition.name, href: `${competitionPath(competitionSlug)}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}` },
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

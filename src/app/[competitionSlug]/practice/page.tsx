import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PracticeQuestionCard } from "@/components/PracticeQuestionCard";
import { getCompetitionBySlug, getQuestionsByCompetition, isCompetitionSlug } from "@/lib/data";
import { competitionPath } from "@/lib/routes";

export default async function PracticePage({ params }: { params: Promise<{ competitionSlug: string }> }) {
  const { competitionSlug } = await params;
  if (!isCompetitionSlug(competitionSlug)) notFound();
  const competition = getCompetitionBySlug(competitionSlug);
  if (!competition) notFound();

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: competition.name, href: competitionPath(competitionSlug) },
            { label: "Practice" }
          ]}
        />
        <div className="section-heading">
          <div>
            <span className="eyebrow">{competition.name}</span>
            <h1>Practice Questions</h1>
          </div>
        </div>
        <PracticeQuestionCard questions={getQuestionsByCompetition(competitionSlug)} />
      </div>
    </section>
  );
}

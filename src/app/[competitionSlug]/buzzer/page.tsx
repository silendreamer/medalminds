import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BuzzerArena } from "@/components/BuzzerArena";
import { getBuzzerQuestions, getCompetitionBySlug } from "@/lib/data";
import { competitionPath } from "@/lib/routes";

export default async function BuzzerPage({ params }: { params: Promise<{ competitionSlug: string }> }) {
  const { competitionSlug } = await params;

  if (competitionSlug !== "science-bowl") {
    notFound();
  }

  const competition = await getCompetitionBySlug(competitionSlug);
  if (!competition) notFound();
  const buzzerQuestions = await getBuzzerQuestions();

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: competition.name, href: competitionPath("science-bowl") },
            { label: "Buzzer Arena" }
          ]}
        />
        <div className="section-heading">
          <div>
            <span className="eyebrow">Science Bowl</span>
            <h1>Science Bowl Buzzer Arena</h1>
            <p className="subtitle">
              Simulate toss-up timing, local buzz-ins, moderator scoring, and bonus conversion with original sample questions.
            </p>
          </div>
        </div>
        <BuzzerArena questions={buzzerQuestions} />
      </div>
    </section>
  );
}

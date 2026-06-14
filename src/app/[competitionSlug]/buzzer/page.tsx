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
    <section className="section buzzer-page">
      <div className="container stack">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: competition.name, href: competitionPath("science-bowl") },
            { label: "Buzzer Arena" }
          ]}
        />
        <BuzzerArena questions={buzzerQuestions} />
      </div>
    </section>
  );
}

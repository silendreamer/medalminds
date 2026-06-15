import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BuzzerArena } from "@/components/BuzzerArena";
import { getCompetitionBySlug, getRandomMultipleChoiceQuestions } from "@/lib/data";
import { competitionPath } from "@/lib/routes";

export const dynamic = "force-dynamic";

export default async function BuzzerPage({ params }: { params: Promise<{ competitionSlug: string }> }) {
  const { competitionSlug } = await params;

  if (competitionSlug !== "science-bowl") {
    notFound();
  }

  const competition = await getCompetitionBySlug(competitionSlug);
  if (!competition) notFound();
  const buzzerQuestions = await getRandomMultipleChoiceQuestions("science-bowl", null, 25);

  return (
    <section className="section buzzer-page">
      <div className="container stack">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: competition.name, href: competitionPath("science-bowl") },
            { label: "Buzzer Practice" }
          ]}
        />
        <BuzzerArena questions={buzzerQuestions} />
      </div>
    </section>
  );
}

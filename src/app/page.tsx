import { CompetitionCard } from "@/components/CompetitionCard";
import { competitions, getContentCounts } from "@/lib/data";

export default async function HomePage() {
  const competitionCounts = await Promise.all(
    competitions.map(async (competition) => ({
      slug: competition.slug,
      counts: await getContentCounts(competition.slug)
    }))
  );
  const countsBySlug = new Map(competitionCounts.map((item) => [item.slug, item.counts]));

  return (
    <section className="section">
      <div className="container stack">
        <div className="simple-heading">
          <span className="eyebrow">MedalMinds</span>
          <h1>Choose a competition</h1>
          <p className="subtitle">Pick where you want to train. We will keep everything else out of the way.</p>
        </div>

        <div className="grid">
          {competitions.map((competition) => (
            <CompetitionCard
              competition={competition}
              counts={countsBySlug.get(competition.slug) ?? { questions: 0, lessons: 0, tests: 0 }}
              key={competition.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

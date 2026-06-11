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
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">MedalMinds</span>
            <h1>Practice, Learn, and Test Across Academic Competitions</h1>
            <p className="subtitle">
              Students can prepare for Science Bowl, Science Olympiad, and Math Olympiad from focused mini-sites
              with local practice questions, lessons, and tests.
            </p>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="visual-row">
              <strong>Practice</strong>
              <span className="badge">30 questions</span>
            </div>
            <div className="visual-row">
              <strong>Learning</strong>
              <span className="badge">30 lessons</span>
            </div>
            <div className="visual-row">
              <strong>Tests</strong>
              <span className="badge">30 sets</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Choose a vertical</span>
              <h2>Competition mini-sites</h2>
            </div>
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
    </>
  );
}

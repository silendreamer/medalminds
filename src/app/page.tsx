import Link from "next/link";
import { BookOpen, Brain, ChartNoAxesColumnIncreasing, Route, ShieldCheck } from "lucide-react";
import { CompetitionCard } from "@/components/CompetitionCard";
import { competitions, getContentCounts } from "@/lib/data";
import { formatApproximateCount } from "@/lib/format";
import { competitionPath } from "@/lib/routes";

const features = [
  {
    title: "Focused practice",
    description: "Move quickly from topic selection to questions that match the competition format.",
    icon: Brain
  },
  {
    title: "Competition-specific prep",
    description: "Science Bowl, Science Olympiad, and Math Olympiad each keep their own training path.",
    icon: Route
  },
  {
    title: "Lessons + questions together",
    description: "Review the concept behind a missed question without leaving the page.",
    icon: BookOpen
  },
  {
    title: "Built for steady improvement",
    description: "Short sessions, quick tests, and clear review loops make progress easier to sustain.",
    icon: ChartNoAxesColumnIncreasing
  }
];

export default async function HomePage() {
  const competitionCounts = await Promise.all(
    competitions.map(async (competition) => ({
      slug: competition.slug,
      counts: await getContentCounts(competition.slug)
    }))
  );
  const countsBySlug = new Map(competitionCounts.map((item) => [item.slug, item.counts]));
  const scienceBowlCounts = countsBySlug.get("science-bowl") ?? { questions: 20000, lessons: 10 };

  return (
    <>
      <section className="home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Premium competition prep</span>
            <h1>Train smarter for academic competitions</h1>
            <p className="subtitle">
              Practice Science Bowl, Science Olympiad, and Math Olympiad with focused lessons, question banks, and
              competition-specific prep paths.
            </p>
            <div className="hero-actions">
              <Link className="button button-lg" href={competitionPath("science-bowl")}>
                Start with Science Bowl
              </Link>
              <Link className="ghost-button button-lg" href="#competitions">
                Explore competitions
              </Link>
            </div>
            <div className="trust-strip" aria-label="Platform highlights">
              <span>{formatApproximateCount(scienceBowlCounts.questions)} practice questions</span>
              <span>Competition-specific lessons</span>
              <span>Built for focused prep</span>
            </div>
          </div>
          <div className="hero-panel" aria-hidden="true">
            <div className="hero-panel-topline">
              <div className="hero-panel-top">
                <ShieldCheck size={20} />
                <span>Focused study path</span>
              </div>
              <div className="hero-panel-dots">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="hero-preview-shell">
              <div className="hero-preview-header">
                <div>
                  <span className="eyebrow">Science Bowl</span>
                  <strong>{formatApproximateCount(scienceBowlCounts.questions)} questions</strong>
                </div>
                <div className="hero-preview-badge">Active track</div>
              </div>

              <div className="hero-preview-progress">
                <div className="hero-preview-progress-bar">
                  <span />
                </div>
                <div className="hero-preview-progress-labels">
                  <span>Middle School and High School</span>
                  <span>Level-specific practice flow</span>
                </div>
              </div>

              <div className="hero-panel-list">
                <div className="hero-panel-row">
                  <strong>Lessons, practice, and buzzer prep</strong>
                  <span>One place to study and review</span>
                </div>
                <div className="hero-panel-row compact">
                  <div className="hero-panel-subject">
                    <span className="hero-panel-subject-dot science" />
                    <strong>Science Bowl</strong>
                  </div>
                  <span>Focused study path</span>
                </div>
              </div>

              <div className="hero-preview-stack">
                <div className="hero-preview-card soft">
                  <span>Practice path</span>
                  <strong>Middle School and High School</strong>
                </div>
                <div className="hero-preview-card">
                  <span>Study loop</span>
                  <strong>Lessons, practice, and buzzer prep</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="competitions">
        <div className="container stack">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Prep tracks</span>
              <h2>Choose your competition</h2>
              <p>Pick a track and start training with the right questions, lessons, and review flow.</p>
            </div>
          </div>
          <div className="grid competition-grid">
            {competitions.map((competition) => (
              <CompetitionCard
                competition={competition}
                counts={countsBySlug.get(competition.slug) ?? { questions: 0, lessons: 0 }}
                key={competition.slug}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container stack">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Why Medal Minds</span>
              <h2>Designed for serious prep</h2>
            </div>
          </div>
          <div className="grid four">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article className="feature-card" key={feature.title}>
                  <span className="feature-icon">
                    <Icon size={22} />
                  </span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

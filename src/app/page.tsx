import Link from "next/link";
import { BookOpen, Brain, ChartNoAxesColumnIncreasing, Route, ShieldCheck } from "lucide-react";
import { CompetitionCard } from "@/components/CompetitionCard";
import { competitions, getContentCounts } from "@/lib/data";
import { formatApproximateCount } from "@/lib/format";
import { competitionPath } from "@/lib/routes";

const heroTrustPills = [
  "Built from 20,000+ questions",
  "High-yield topic paths",
  "Buzzer practice included"
];

const learningPathItems = [
  { label: "Cells & Organelles", status: "Mastered" },
  { label: "Genetics", status: "In Progress" },
  { label: "Astronomy", status: "Up Next" },
  { label: "Electricity", status: "Locked" },
  { label: "Energy", status: "Locked" }
];

const learningPathStats = [
  { label: "Questions solved", value: "827" },
  { label: "Weak topics found", value: "3" }
];

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
            <span className="eyebrow">High-yield competition prep</span>
            <h1>Stop studying everything. Study what actually gets asked.</h1>
            <p className="subtitle">
              Medal Minds turns {formatApproximateCount(scienceBowlCounts.questions)} competition questions into focused
              lessons, high-yield practice, and buzzer drills for Science Bowl, Science Olympiad, and Math competitions.
            </p>
            <div className="hero-actions">
              <Link className="button button-lg" href={competitionPath("science-bowl")}>
                Start Science Bowl Prep
              </Link>
              <Link className="ghost-button button-lg" href="#competitions">
                See How It Works
              </Link>
            </div>
            <div className="trust-strip" aria-label="Platform highlights">
              {heroTrustPills.map((pill) => (
                <span key={pill}>{pill}</span>
              ))}
            </div>
          </div>
          <div className="hero-panel" aria-hidden="true">
            <div className="hero-panel-topline">
              <div className="hero-panel-top">
                <ShieldCheck size={20} />
                <span>Personalized study path</span>
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
                  <strong>Learning Path</strong>
                </div>
                <div className="hero-preview-badge">43% complete</div>
              </div>

              <div className="hero-preview-progress">
                <div className="hero-preview-progress-bar">
                  <span style={{ width: "43%" }} />
                </div>
                <div className="hero-preview-progress-labels">
                  <span>Science Bowl Learning Path</span>
                  <span>43% complete</span>
                </div>
              </div>

              <div className="hero-panel-list">
                {learningPathItems.map((item) => (
                  <div className="hero-panel-row compact" key={item.label}>
                    <div className="hero-panel-subject">
                      <span className="hero-panel-subject-dot science" />
                      <strong>{item.label}</strong>
                    </div>
                    <span>{item.status}</span>
                  </div>
                ))}
              </div>

              <div className="hero-preview-stack">
                <div className="hero-preview-card soft">
                  <span>Questions solved</span>
                  <strong>827</strong>
                  <span>Weak topics found</span>
                  <strong>3</strong>
                </div>
                <div className="hero-preview-card">
                  <span>Next drill</span>
                  <strong>Genetics buzzer set</strong>
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

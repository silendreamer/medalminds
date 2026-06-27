import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen, Zap, Clock, Users } from "lucide-react";
import { CompetitionCard } from "@/components/CompetitionCard";
import { competitions, getContentCounts } from "@/lib/data";
import { competitionPath } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Medal Minds | National Science Bowl, Science Bowl & Olympiad Prep",
  description:
    "Prepare for the National Science Bowl, Science Bowl, NSB, Science Olympiad, and Math Olympiad with practice questions, lessons, buzzer drills, and high-yield study paths.",
  path: "/",
  keywords: ["National Science Bowl practice", "NSB prep", "olympiad practice"]
});

const heroStats = [
  { value: "20K+", label: "Questions" },
  { value: "3", label: "Competitions" },
  { value: "Free", label: "Practice" }
];

const features = [
  {
    title: "Focused Lessons",
    description: "Lessons built from real competition questions, not textbook chapters.",
    icon: BookOpen
  },
  {
    title: "High-Yield Practice",
    description: "Filter by subject, difficulty, and topic. Practice what you need.",
    icon: Zap
  },
  {
    title: "Timed Tests",
    description: "Simulate real competition conditions with time pressure.",
    icon: Clock
  },
  {
    title: "Buzzer Arena",
    description: "Live multiplayer buzzer rounds for Science Bowl teams.",
    icon: Users
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

  return (
    <>
      <section className="home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">High-yield competition prep</span>
            <h1>Stop studying everything. Study what actually gets asked.</h1>
            <p className="subtitle">
              Medal Minds turns 20,000+ competition questions into focused lessons, practice sets, and buzzer drills for
              Science Bowl, Science Olympiad, and Math competitions.
            </p>
            <div className="hero-actions">
              <Link className="button button-lg" href={competitionPath("science-bowl")}>
                Start Science Bowl Prep
              </Link>
              <Link className="ghost-button button-lg" href="#competitions">
                See How It Works
              </Link>
            </div>
          </div>
          <div className="hero-panel-wrapper" aria-hidden="true">
            <div className="hero-stat-panel">
              {heroStats.map((stat) => (
                <div className="hero-stat-item" key={stat.label}>
                  <strong className="hero-stat-value">{stat.value}</strong>
                  <span className="hero-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="competitions">
        <div className="container stack">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Choose Your Path</span>
              <h2>Pick your competition</h2>
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
              <h2>Why Medal Minds</h2>
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

      <section className="section cta-band">
        <div className="container stack" style={{ textAlign: "center", alignItems: "center" }}>
          <span className="eyebrow">Ready to compete?</span>
          <h2>Start preparing today — it&apos;s free.</h2>
          <Link className="button button-lg" href="/science-bowl">
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
}

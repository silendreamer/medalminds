import Link from "next/link";
import type { Metadata } from "next";
import { CompetitionCard } from "@/components/CompetitionCard";
import { competitions, getContentCounts } from "@/lib/data";
import { formatApproximateCount } from "@/lib/format";
import { competitionPath } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Medal Minds | National Science Bowl, Science Bowl & Olympiad Prep",
  description:
    "Prepare for the National Science Bowl, Science Bowl, NSB, Science Olympiad, and Math Olympiad with practice questions, lessons, buzzer drills, and high-yield study paths.",
  path: "/",
  keywords: ["National Science Bowl practice", "NSB prep", "olympiad practice"]
});

const heroTrustPills = [
  "Built from 20,000+ questions",
  "High-yield topic paths",
  "Buzzer practice included"
];


const features = [
  {
    title: "Real Questions",
    description: "Every question comes from past competitions. Learn exactly what gets asked.",
    emoji: "📚"
  },
  {
    title: "Instant Feedback",
    description: "Get explanations for every answer. Understand the \"why\" behind each concept.",
    emoji: "💡"
  },
  {
    title: "Personalized Path",
    description: "Track weak areas. Practice what matters most. Focus your study time.",
    emoji: "🎯"
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
                Start Learning Free
              </Link>
            </div>
            <p className="hero-note">No sign-up required to start.</p>
            <div className="mobile-hero-stats" aria-hidden="true">
              <span><strong>{formatApproximateCount(scienceBowlCounts.questions)}+</strong> questions</span>
              <span>·</span>
              <span><strong>6</strong> subjects</span>
              <span>·</span>
              <span><strong>Free</strong> to start</span>
            </div>
            <div className="trust-strip" aria-label="Platform highlights">
              {heroTrustPills.map((pill) => (
                <span key={pill}>{pill}</span>
              ))}
            </div>
          </div>
          <div className="hero-panel-wrapper" aria-hidden="true">
            <div className="dashboard-mockup">
              <div className="dashboard-mockup-header">
                <span className="dashboard-mockup-title">Your Learning Dashboard</span>
                <span className="dashboard-mockup-badge">Free</span>
              </div>
              <div className="dashboard-progress-cards">
                <div className="dashboard-progress-card">
                  <div className="dashboard-progress-card-top">
                    <span className="dashboard-progress-label">Science Bowl</span>
                    <span className="dashboard-progress-pct">68%</span>
                  </div>
                  <div className="dashboard-progress-bar">
                    <div className="dashboard-progress-fill" style={{ width: "68%" }} />
                  </div>
                </div>
                <div className="dashboard-progress-card">
                  <div className="dashboard-progress-card-top">
                    <span className="dashboard-progress-label">Science Olympiad</span>
                    <span className="dashboard-progress-pct">34%</span>
                  </div>
                  <div className="dashboard-progress-bar">
                    <div className="dashboard-progress-fill" style={{ width: "34%" }} />
                  </div>
                </div>
                <div className="dashboard-progress-card">
                  <div className="dashboard-progress-card-top">
                    <span className="dashboard-progress-label">Math Olympiad</span>
                    <span className="dashboard-progress-pct">12%</span>
                  </div>
                  <div className="dashboard-progress-bar">
                    <div className="dashboard-progress-fill" style={{ width: "12%" }} />
                  </div>
                </div>
              </div>
              <div className="dashboard-stats-row">
                <div className="dashboard-stat">
                  <strong>1,240</strong>
                  <span>Questions Answered</span>
                </div>
                <div className="dashboard-stat">
                  <strong>82%</strong>
                  <span>Accuracy</span>
                </div>
                <div className="dashboard-stat">
                  <strong>14</strong>
                  <span>Day Streak</span>
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
              <span className="eyebrow">Choose your competition</span>
              <h2>What you can prepare for</h2>
            </div>
          </div>
          <div className="grid competition-grid">
            {competitions.map((competition) => (
              <CompetitionCard
                competition={competition}
                counts={countsBySlug.get(competition.slug) ?? { questions: 0, lessons: 0 }}
                comingSoon={competition.slug !== "science-bowl"}
                key={competition.slug}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section features-section">
        <div className="container stack">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Why Medal Minds</span>
              <h2>Built for competitive success</h2>
            </div>
          </div>
          <div className="grid three">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <span className="feature-icon">
                  {feature.emoji}
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container stack" style={{ textAlign: "center", alignItems: "center" }}>
          <h2>Ready to compete at your best?</h2>
          <p className="cta-description">
            No sign-up required to start. Sign in anytime to save your progress and unlock personalized recommendations.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link className="button button-lg" href={competitionPath("science-bowl")}>
              Start Learning Free
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

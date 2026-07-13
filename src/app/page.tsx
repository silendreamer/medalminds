import Link from "next/link";
import type { Metadata } from "next";
import { competitions, getContentCounts, getTopicYieldStats } from "@/lib/data";
import type { NsbTopicYieldStats } from "@/data/nsbQuestions";
import { competitionPath, scienceBowlInfoPath } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { competitionEmoji, subjectEmoji } from "@/lib/subjects";

export const metadata: Metadata = buildMetadata({
  title: "Medal Minds | National Science Bowl, Science Bowl & Olympiad Prep",
  description:
    "High-yield National Science Bowl prep built from 25,000+ real questions. 80% of questions come from a fraction of topics — Medal Minds teaches those first, with lessons, practice, and buzzer drills.",
  path: "/",
  keywords: ["National Science Bowl practice", "NSB prep", "olympiad practice"]
});

/** Display order for the per-subject yield strip. */
const SUBJECT_ORDER = ["Biology", "Chemistry", "Physics", "Earth and Space", "Energy", "Math"];

/** Fallback figures (from the 2026-07 question bank) if stats can't be computed. */
const FALLBACK_STATS: NsbTopicYieldStats = {
  totalQuestions: 25234,
  totalTopics: 642,
  headTopics: 192,
  headSharePct: 80,
  curve: [],
  headBuckets: 18,
  perSubject: []
};

/**
 * The signature hero figure: every topic ranked by how often it's asked,
 * high-yield head in gold, long tail in slate. Rendered from real data.
 */
function YieldChart({ stats }: { stats: NsbTopicYieldStats }) {
  const width = 640;
  const height = 316;
  const baseline = 264;
  const barTop = 64;
  const maxBarHeight = baseline - barTop;

  const n = stats.curve.length;
  if (n === 0) return null;

  const slot = width / n;
  const barWidth = Math.max(3, slot - 2);
  const headEndX = stats.headBuckets * slot - 2;
  const tailCenterX = headEndX + (width - headEndX) / 2;
  const tailTopics = stats.totalTopics - stats.headTopics;
  const tailSharePct = 100 - stats.headSharePct;

  return (
    <figure className="yield-figure">
      <svg
        className="yield-chart"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`Chart: ${stats.headTopics} of ${stats.totalTopics} topics account for ${stats.headSharePct}% of all Science Bowl questions ever asked.`}
      >
        {/* head annotation: bracket + two-line label */}
        <text className="yield-label-strong" x="0" y="18">
          {stats.headTopics} topics
        </text>
        <text className="yield-label" x="0" y="38">
          {stats.headSharePct}% of all questions
        </text>
        <path
          className="yield-bracket"
          d={`M 0.5 46 v 6 H ${headEndX} v -6`}
          fill="none"
        />
        {/* cut line where the head ends */}
        <line className="yield-cut" x1={headEndX} y1="52" x2={headEndX} y2={baseline} />

        {/* tail label */}
        <text className="yield-label-muted" x={tailCenterX} y="38" textAnchor="middle">
          the other {tailTopics} topics — {tailSharePct}%
        </text>

        {/* bars: ranked topic frequency, head in gold, tail in slate */}
        {stats.curve.map((value, i) => {
          const barHeight = Math.max(2, value * maxBarHeight);
          return (
            <rect
              key={i}
              className={`yield-bar ${i < stats.headBuckets ? "yield-bar-head" : "yield-bar-tail"}`}
              x={i * slot}
              y={baseline - barHeight}
              width={barWidth}
              height={barHeight}
              rx="2"
              style={{ animationDelay: `${i * 12}ms` }}
            />
          );
        })}

        {/* baseline */}
        <line className="yield-baseline" x1="0" y1={baseline} x2={width} y2={baseline} />

        {/* axis caption */}
        <text className="yield-axis" x="0" y={height - 6}>
          ← asked most often
        </text>
        <text className="yield-axis" x={width} y={height - 6} textAnchor="end">
          asked rarely →
        </text>
      </svg>
      <figcaption className="yield-caption">
        All {stats.totalTopics} Science Bowl topics, ranked by how often they appear in past
        questions.
      </figcaption>
    </figure>
  );
}

export default async function HomePage() {
  const [scienceBowlCounts, yieldStats] = await Promise.all([
    getContentCounts("science-bowl"),
    getTopicYieldStats("science-bowl")
  ]);
  const stats = yieldStats ?? FALLBACK_STATS;
  const headTopicsPct = Math.round((100 * stats.headTopics) / stats.totalTopics);
  const perSubject = [...stats.perSubject].sort(
    (a, b) => SUBJECT_ORDER.indexOf(a.subject) - SUBJECT_ORDER.indexOf(b.subject)
  );
  const scienceBowl = competitions.find((c) => c.slug === "science-bowl");
  const comingSoon = competitions.filter((c) => c.slug !== "science-bowl");

  return (
    <>
      <section className="yield-hero">
        <div className="container yield-hero-grid">
          <div className="yield-hero-copy">
            <span className="yield-eyebrow">The 80/20 of Science Bowl</span>
            <h1>
              {stats.headSharePct}% of questions come from{" "}
              <span className="yield-mark">{headTopicsPct}% of topics.</span>
            </h1>
            <p className="yield-subtitle">
              We ranked all {stats.totalTopics} topics by how often they show up across{" "}
              {scienceBowlCounts.questions.toLocaleString("en-US")} real questions from past
              National Science Bowl rounds. Medal Minds starts your prep at the top of that curve —
              and works down.
            </p>
            <div className="hero-actions">
              <Link className="button button-lg yield-cta" href={competitionPath("science-bowl")}>
                Start with the high-yield topics
              </Link>
              <a className="yield-ghost-link" href="#method">
                See the method
              </a>
            </div>
            <Link className="yield-new-here-link" href={scienceBowlInfoPath()}>
              New to Science Bowl? Read the team guide →
            </Link>
            <div className="yield-hero-stats">
              <span>
                <strong>{scienceBowlCounts.questions.toLocaleString("en-US")}</strong> real
                questions
              </span>
              <span>
                <strong>{stats.totalTopics}</strong> topics ranked
              </span>
              <span>
                <strong>Free</strong> · no sign-up to start
              </span>
            </div>
          </div>
          <div className="yield-hero-chart">
            <YieldChart stats={stats} />
          </div>
        </div>
      </section>

      <section className="section" id="method">
        <div className="container stack">
          <div className="section-heading">
            <div>
              <span className="eyebrow">The method</span>
              <h2>Prep in yield order</h2>
            </div>
          </div>
          <ol className="method-steps">
            <li className="method-step">
              <span className="method-step-number" aria-hidden="true">1</span>
              <h3>Rank every topic</h3>
              <p>
                Every past question is tagged to one of {stats.totalTopics} topics, and topics are
                ranked by how often they actually get asked. No guessing what matters.
              </p>
            </li>
            <li className="method-step">
              <span className="method-step-number" aria-hidden="true">2</span>
              <h3>Learn the top first</h3>
              <p>
                Lessons are written to the questions behind them — you learn Layers of the Earth
                the way Science Bowl asks it, and you learn it first because it&apos;s asked most.
              </p>
            </li>
            <li className="method-step">
              <span className="method-step-number" aria-hidden="true">3</span>
              <h3>Drill your way down</h3>
              <p>
                Practice sets, timed tests, and the Buzzer Arena show you when a topic is solid, so
                you keep moving down the curve instead of re-studying what you already know.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {perSubject.length > 0 && (
        <section className="section subject-yield-section">
          <div className="container stack">
            <div className="section-heading">
              <div>
                <span className="eyebrow">It holds in every subject</span>
                <h2>A short list carries half the points</h2>
              </div>
            </div>
            <div className="subject-yield-grid">
              {perSubject.map(({ subject, halfTopics, totalTopics }) => (
                <Link
                  className="subject-yield-card"
                  href={competitionPath("science-bowl")}
                  key={subject}
                >
                  <span className="subject-yield-emoji" aria-hidden="true">
                    {subjectEmoji(subject)}
                  </span>
                  <h3>{subject}</h3>
                  <p>
                    <strong>
                      {halfTopics} of {totalTopics}
                    </strong>{" "}
                    topics account for half of every {subject} question ever asked.
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section" id="competitions">
        <div className="container stack">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Competitions</span>
              <h2>Science Bowl is live today</h2>
            </div>
          </div>
          {scienceBowl && (
            <div className="live-competition-card">
              <div className="live-competition-main">
                <span className="live-competition-emoji" aria-hidden="true">
                  {competitionEmoji(scienceBowl.slug)}
                </span>
                <div>
                  <h3>{scienceBowl.name}</h3>
                  <p>{scienceBowl.shortDescription}</p>
                </div>
              </div>
              <div className="live-competition-side">
                <div className="live-competition-stats">
                  <span>
                    <strong>{scienceBowlCounts.questions.toLocaleString("en-US")}</strong> questions
                  </span>
                  <span>
                    <strong>{scienceBowlCounts.lessons.toLocaleString("en-US")}</strong> lessons
                  </span>
                </div>
                <Link className="button" href={competitionPath("science-bowl")}>
                  Start free
                </Link>
              </div>
            </div>
          )}
          <div className="coming-soon-row">
            {comingSoon.map((competition) => (
              <div className="coming-soon-tile" key={competition.slug}>
                <span aria-hidden="true">{competitionEmoji(competition.slug)}</span>
                <h3>{competition.name}</h3>
                <span className="coming-soon-badge">In the works</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container stack cta-band-content">
          <h2>Study what actually gets asked.</h2>
          <p className="cta-description">
            The high-yield topics are ranked and the lessons are written. Pick your division and
            start at the top of the curve — free, no sign-up.
          </p>
          <Link className="button button-lg" href={competitionPath("science-bowl")}>
            Start with the high-yield topics
          </Link>
        </div>
      </section>
    </>
  );
}

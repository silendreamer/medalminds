import Link from "next/link";
import type { Competition } from "@/types";
import { competitionPath } from "@/lib/routes";
import { formatApproximateCount } from "@/lib/format";

export function CompetitionCard({
  competition,
  counts,
  comingSoon = false
}: {
  competition: Competition;
  counts: { questions: number; lessons: number };
  comingSoon?: boolean;
}) {
  const isScienceBowl = !comingSoon && competition.slug === "science-bowl";
  const accentClass =
    competition.slug === "science-bowl"
      ? "science-bowl"
      : competition.slug === "science-olympiad"
        ? "science-olympiad"
        : "math-olympiad";
  const emojiIcon =
    competition.slug === "science-bowl"
      ? "🧪"
      : competition.slug === "science-olympiad"
        ? "🔬"
        : "∑";

  return (
    <article className={`competition-card ${accentClass}${!isScienceBowl ? " coming-soon" : ""}`}>
      <div className="competition-card-content">
        <div className="competition-card-icon">
          {emojiIcon}
        </div>
        <h3>{competition.name}</h3>
        <p className="card-copy">{competition.shortDescription}</p>
        {isScienceBowl ? (
          <div className="competition-card-stats">
            <div className="competition-card-stat">
              <span className="competition-card-stat-value">{formatApproximateCount(counts.questions)}</span>
              <span className="competition-card-stat-label">Questions</span>
            </div>
            <div className="competition-card-stat">
              <span className="competition-card-stat-value">{formatApproximateCount(counts.lessons)}</span>
              <span className="competition-card-stat-label">Lessons</span>
            </div>
          </div>
        ) : (
          <div className="competition-card-stats">
            <div className="competition-card-stat-placeholder">
              <span className="competition-card-stat-value-placeholder">Coming Soon</span>
            </div>
          </div>
        )}
        {isScienceBowl ? (
          <Link className="button" href={competitionPath(competition.slug)}>
            Start Free
          </Link>
        ) : (
          <button
            className="button button-disabled"
            disabled
            style={{
              opacity: 0.5,
              cursor: "not-allowed",
              pointerEvents: "none"
            }}
          >
            Coming Soon
          </button>
        )}
      </div>
    </article>
  );
}

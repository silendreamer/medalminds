import Link from "next/link";
import type { Competition } from "@/types";
import { competitionPath } from "@/lib/routes";
import { formatApproximateCount } from "@/lib/format";

export function CompetitionCard({
  competition,
  counts
}: {
  competition: Competition;
  counts: { questions: number; lessons: number };
}) {
  const isScienceBowl = competition.slug === "science-bowl";
  const questionValue = isScienceBowl ? formatApproximateCount(counts.questions) : "Soon";
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
    <article className={`competition-card ${accentClass}`}>
      <div className="competition-card-content">
        <div className="competition-card-icon">
          {emojiIcon}
        </div>
        <h3>{competition.name}</h3>
        <p className="card-copy">{competition.shortDescription}</p>
        <div className="competition-card-stats">
          <div className="competition-card-stat">
            <span className="competition-card-stat-value">{questionValue}+</span>
            <span className="competition-card-stat-label">Questions</span>
          </div>
          <div className="competition-card-stat">
            <span className="competition-card-stat-value">{formatApproximateCount(counts.lessons)}+</span>
            <span className="competition-card-stat-label">Lessons</span>
          </div>
        </div>
        <Link className="button" href={competitionPath(competition.slug)}>
          Start Free
        </Link>
      </div>
    </article>
  );
}

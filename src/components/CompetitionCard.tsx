import Link from "next/link";
import { Atom, FlaskConical, Sigma } from "lucide-react";
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
  const questionLabel = isScienceBowl ? "Practice questions" : "Question bank";
  const accentClass =
    competition.slug === "science-bowl"
      ? "science-bowl"
      : competition.slug === "science-olympiad"
        ? "science-olympiad"
        : "math-olympiad";
  const Icon =
    competition.slug === "science-bowl"
      ? Atom
      : competition.slug === "science-olympiad"
        ? FlaskConical
        : Sigma;

  return (
    <article className={`competition-card ${accentClass}`}>
      <div className="competition-card-content">
        <div className="stack compact competition-card-header">
          <span className="competition-card-icon">
            <Icon size={18} />
          </span>
          <h2>{competition.name}</h2>
        </div>
        <p className="card-copy">{competition.shortDescription}</p>
        <div className="mini-stat-list">
          <span>
            <strong>{questionValue}</strong>
            <small>{questionLabel}</small>
          </span>
          <span>
            <strong>{formatApproximateCount(counts.lessons)}</strong>
            <small>Lessons</small>
          </span>
        </div>
        <Link className="button" href={competitionPath(competition.slug)}>
          Enter {competition.name}
        </Link>
      </div>
    </article>
  );
}

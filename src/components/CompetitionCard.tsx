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
        <div className="competition-card-icon">
          <Icon size={20} />
        </div>
        <h3>{competition.name}</h3>
        <p className="card-copy">{competition.shortDescription}</p>
        <div className="competition-card-stats">
          <span>{questionValue}+ Questions</span>
          <span>{formatApproximateCount(counts.lessons)}+ Lessons</span>
        </div>
        <Link className="button" href={competitionPath(competition.slug)}>
          Start Practicing
        </Link>
      </div>
    </article>
  );
}

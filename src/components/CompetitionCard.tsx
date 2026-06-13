import Link from "next/link";
import type { Competition } from "@/types";
import { competitionPath } from "@/lib/routes";

export function CompetitionCard({
  competition,
  counts
}: {
  competition: Competition;
  counts: { questions: number; lessons: number };
}) {
  const isScienceBowl = competition.slug === "science-bowl";
  const questionStat = isScienceBowl ? `${counts.questions.toLocaleString()} practice questions` : "Coming soon";

  return (
    <article className="competition-card">
      <div className="competition-card-content">
        <div>
          <span className="eyebrow">{competition.subdomain}.medalminds.com</span>
          <h2>{competition.name}</h2>
        </div>
        <p>{competition.shortDescription}</p>
        <div className="mini-stat-list">
          <span>{questionStat}</span>
          <span>{counts.lessons.toLocaleString()} lessons</span>
        </div>
        <Link className="button" href={competitionPath(competition.slug)}>
          Enter {competition.name}
        </Link>
      </div>
    </article>
  );
}

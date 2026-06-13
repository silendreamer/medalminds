import Link from "next/link";
import type { Competition } from "@/types";
import { competitionPath } from "@/lib/routes";
import { StatsCard } from "./StatsCard";

export function CompetitionCard({
  competition,
  counts
}: {
  competition: Competition;
  counts: { questions: number; lessons: number };
}) {
  return (
    <article className="card spacious">
      <div className="stack">
        <div>
          <span className="eyebrow">{competition.subdomain}.medalminds.com ready</span>
          <h3>{competition.name}</h3>
        </div>
        <p>{competition.shortDescription}</p>
        <StatsCard {...counts} />
        <Link className="button" href={competitionPath(competition.slug)}>
          Enter {competition.name}
        </Link>
      </div>
    </article>
  );
}

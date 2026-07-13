import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCompetitionBySlug,
  getContentCountsBySchoolLevel,
  getContentCountsForSubject,
  isCompetitionSlug,
} from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { parseSchoolLevel } from "@/lib/levels";
import { ScienceBowlHub } from "@/components/ScienceBowlHub";

// Only science-bowl/{middle-school,high-school} exist today — prerender both
// at build time so navigation is a static file, not a per-click render.
export function generateStaticParams() {
  return [
    { competitionSlug: "science-bowl", level: "middle-school" },
    { competitionSlug: "science-bowl", level: "high-school" }
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ competitionSlug: string; level: string }>;
}): Promise<Metadata> {
  const { competitionSlug, level } = await params;
  if (!isCompetitionSlug(competitionSlug)) return {};
  const competition = await getCompetitionBySlug(competitionSlug);
  if (!competition) return {};
  const levelLabel = level === "middle-school" ? "Middle School" : level === "high-school" ? "High School" : "";
  return buildMetadata({
    title: `${competition.name} ${levelLabel} Prep | Medal Minds`,
    description: `Practice ${competition.name} ${levelLabel.toLowerCase()} questions, lessons, and timed tests.`,
    path: `/${competitionSlug}/${level}`,
  });
}

export default async function CompetitionLevelPage({
  params,
}: {
  params: Promise<{ competitionSlug: string; level: string }>;
}) {
  const { competitionSlug, level } = await params;
  if (!isCompetitionSlug(competitionSlug)) notFound();
  const competition = await getCompetitionBySlug(competitionSlug);
  if (!competition) notFound();

  const isScienceBowl = competitionSlug === "science-bowl";
  if (!isScienceBowl) notFound();

  const schoolLevel = parseSchoolLevel(level);
  if (!schoolLevel) notFound();

  const levelCounts = await getContentCountsBySchoolLevel(competitionSlug, schoolLevel);
  const displayedSubjects = competition.subjects;

  const subjectCounts = await Promise.all(
    displayedSubjects.map(async (subject) => ({
      subject,
      counts: await getContentCountsForSubject(competitionSlug, subject, schoolLevel)
    }))
  );
  const countsBySubject = new Map(subjectCounts.map((item) => [item.subject, item.counts]));

  return (
    <ScienceBowlHub
      competitionSlug={competitionSlug}
      level={level as "middle-school" | "high-school"}
      subjects={displayedSubjects}
      levelCounts={levelCounts}
      countsBySubject={countsBySubject}
    />
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  getCompetitionBySlug,
  getContentCountsBySchoolLevel,
  getContentCountsForSubject,
  isCompetitionSlug
} from "@/lib/data";
import { buzzerPath } from "@/lib/routes";
import { buildMetadata, getCompetitionSeo } from "@/lib/seo";
import { parseSchoolLevel } from "@/lib/levels";
import { ScienceBowlHub } from "@/components/ScienceBowlHub";

export async function generateMetadata({
  params
}: {
  params: Promise<{ competitionSlug: string }>;
}): Promise<Metadata> {
  const { competitionSlug } = await params;
  if (!isCompetitionSlug(competitionSlug)) {
    return {};
  }

  const seo = getCompetitionSeo(competitionSlug);
  if (!seo) {
    return {};
  }

  return buildMetadata({
    ...seo,
    path: `/${competitionSlug}`
  });
}

export default async function CompetitionPage({
  params,
  searchParams
}: {
  params: Promise<{ competitionSlug: string }>;
  searchParams: Promise<{ level?: string; action?: string }>;
}) {
  const { competitionSlug } = await params;
  const { level, action } = await searchParams;
  if (!isCompetitionSlug(competitionSlug)) notFound();

  const competition = await getCompetitionBySlug(competitionSlug);
  if (!competition) notFound();

  const isScienceBowl = competitionSlug === "science-bowl";

  // Handle ?action=buzzer redirect for Science Bowl — before any data fetching
  if (isScienceBowl && action === "buzzer") {
    redirect(buzzerPath());
  }

  // For Science Bowl, default to middle-school if no level specified
  const selectedLevel = isScienceBowl && (level === "middle-school" || level === "high-school")
    ? level
    : isScienceBowl ? "middle-school" : undefined;

  const selectedSchoolLevel = selectedLevel ? parseSchoolLevel(selectedLevel) : undefined;

  // Get counts for the selected level (Science Bowl only)
  const scienceBowlLevelCounts = isScienceBowl
    ? {
        middleSchool: await getContentCountsBySchoolLevel(competitionSlug, "MIDDLE_SCHOOL"),
        highSchool: await getContentCountsBySchoolLevel(competitionSlug, "HIGH_SCHOOL")
      }
    : undefined;

  const displayedSubjects = competition.subjects;
  const subjectCounts = isScienceBowl
    ? await Promise.all(
        displayedSubjects.map(async (subject) => ({
          subject,
          counts: await getContentCountsForSubject(competitionSlug, subject, selectedSchoolLevel)
        }))
      )
    : [];
  const countsBySubject = new Map(subjectCounts.map((item) => [item.subject, item.counts]));

  // Science Bowl hub: render shared hub component
  if (isScienceBowl) {
    const levelKey = selectedLevel === "high-school" ? "highSchool" : "middleSchool";
    const levelCounts = scienceBowlLevelCounts![levelKey];
    return (
      <ScienceBowlHub
        competitionSlug={competitionSlug}
        level={selectedLevel as "middle-school" | "high-school"}
        subjects={displayedSubjects}
        levelCounts={levelCounts}
        countsBySubject={countsBySubject}
        showInfoSessionLink={false}
      />
    );
  }

  // Non-Science Bowl: coming-soon page
  return (
    <section className="section">
      <div className="container stack">
        <div className="simple-heading competition-intro">
          <span className="eyebrow">{competition.subdomain}.medalminds.com</span>
          <h1>{competition.name}</h1>
          <p className="subtitle">{competition.description}</p>
          <p>
            Content for {competition.name} is coming soon. In the meantime, explore Science Bowl.
          </p>
          <div className="actions">
            <Link className="button" href="/science-bowl">
              Explore Science Bowl
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

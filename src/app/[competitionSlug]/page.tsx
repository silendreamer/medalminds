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

  // For Science Bowl, a division is only "selected" via ?level= (e.g. from
  // breadcrumbs) — otherwise the hub renders the division picker.
  const selectedLevel =
    isScienceBowl && (level === "middle-school" || level === "high-school") ? level : undefined;

  const selectedSchoolLevel = selectedLevel ? parseSchoolLevel(selectedLevel) : undefined;

  // Science Bowl hub: render shared hub component
  if (isScienceBowl) {
    const displayedSubjects = competition.subjects;

    if (!selectedLevel) {
      // No division chosen yet — show the picker with per-division counts.
      const divisionCounts = {
        middleSchool: await getContentCountsBySchoolLevel(competitionSlug, "MIDDLE_SCHOOL"),
        highSchool: await getContentCountsBySchoolLevel(competitionSlug, "HIGH_SCHOOL")
      };
      return (
        <ScienceBowlHub
          competitionSlug={competitionSlug}
          subjects={displayedSubjects}
          divisionCounts={divisionCounts}
        />
      );
    }

    const levelCounts = await getContentCountsBySchoolLevel(
      competitionSlug,
      selectedLevel === "high-school" ? "HIGH_SCHOOL" : "MIDDLE_SCHOOL"
    );
    const subjectCounts = await Promise.all(
      displayedSubjects.map(async (subject) => ({
        subject,
        counts: await getContentCountsForSubject(competitionSlug, subject, selectedSchoolLevel)
      }))
    );
    const countsBySubject = new Map(subjectCounts.map((item) => [item.subject, item.counts]));

    return (
      <ScienceBowlHub
        competitionSlug={competitionSlug}
        level={selectedLevel}
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

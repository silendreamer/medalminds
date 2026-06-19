import Link from "next/link";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { scienceBowlMiddleSchoolSubjects } from "@/data/scienceBowlMiddleSchoolCurriculum";
import { StatsCard } from "@/components/StatsCard";
import { buildStudyBreadcrumbs } from "@/lib/breadcrumbs";
import {
  getCompetitionBySlug,
  getContentCounts,
  getContentCountsBySchoolLevel,
  getContentCountsForSubject,
  isCompetitionSlug
} from "@/lib/data";
import { buzzerPath, learningPath, practicePath, scienceBowlInfoPath, testsPath } from "@/lib/routes";
import { buildMetadata, getCompetitionSeo } from "@/lib/seo";

type CompetitionAction = "learning" | "practice" | "tests" | "buzzer";

const actionLabelMap: Record<CompetitionAction, string> = {
  learning: "Learning",
  practice: "Practice Questions",
  tests: "Quizzes / Tests",
  buzzer: "Buzzer Practice"
};

function buildQuery(params: Array<[string, string | undefined]>) {
  const query = params
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `${key}=${encodeURIComponent(value ?? "")}`)
    .join("&");
  return query ? `?${query}` : "";
}

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
  searchParams: Promise<{ subject?: string; level?: string; action?: string }>;
}) {
  const { competitionSlug } = await params;
  const { subject, level, action } = await searchParams;
  if (!isCompetitionSlug(competitionSlug)) notFound();

  const competition = await getCompetitionBySlug(competitionSlug);
  if (!competition) notFound();

  const isScienceBowl = competitionSlug === "science-bowl";
  const counts = isScienceBowl ? undefined : await getContentCounts(competitionSlug);
  const scienceBowlLevelCounts = isScienceBowl
    ? {
        middleSchool: await getContentCountsBySchoolLevel(competitionSlug, "MIDDLE_SCHOOL"),
        highSchool: await getContentCountsBySchoolLevel(competitionSlug, "HIGH_SCHOOL")
      }
    : undefined;
  const selectedLevel = isScienceBowl && (level === "middle-school" || level === "high-school") ? level : undefined;
  const selectedLevelLabel = selectedLevel === "middle-school" ? "Middle School" : selectedLevel === "high-school" ? "High School" : undefined;
  const selectedSchoolLevel =
    selectedLevel === "middle-school" ? "MIDDLE_SCHOOL" : selectedLevel === "high-school" ? "HIGH_SCHOOL" : undefined;
  const selectedAction = action && action in actionLabelMap ? (action as CompetitionAction) : undefined;
  if (selectedAction === "buzzer") {
    redirect(buzzerPath());
  }
  const scienceBowlMiddleSchoolSubjectNames = scienceBowlMiddleSchoolSubjects.map((subject) => subject.name);
  const displayedSubjects =
    competitionSlug === "science-bowl" && selectedLevel === "middle-school"
      ? scienceBowlMiddleSchoolSubjectNames
      : competition.categories;
  const subjectCounts = await Promise.all(
    displayedSubjects.map(async (category) => ({
      category,
      counts: await getContentCountsForSubject(competitionSlug, category, selectedSchoolLevel)
    }))
  );
  const countsBySubject = new Map(subjectCounts.map((item) => [item.category, item.counts]));
  const buildStageQuery = (...pairs: Array<[string, string | undefined]>) => buildQuery([["level", selectedLevel], ...pairs]);
  const showLevelSelection = isScienceBowl && !selectedLevel;
  const showActionSelection = !showLevelSelection && !selectedAction;
  const showSubjectSelection = !showLevelSelection && !showActionSelection;

  return (
    <section className="section">
      <div className="container stack">
        <Breadcrumbs
          items={buildStudyBreadcrumbs({
            competitionSlug,
            competitionName: competition.name,
            level: selectedLevel,
            action: selectedAction ? actionLabelMap[selectedAction] : undefined
          })}
        />
        <div className="simple-heading competition-intro">
          <span className="eyebrow">{competition.subdomain}.medalminds.com</span>
          <h1>{competition.name}</h1>
          <p className="subtitle">{competition.description}</p>
          {counts && <StatsCard {...counts} />}
          {isScienceBowl && (
            <div className="actions">
              <Link className="ghost-button" href={scienceBowlInfoPath()}>
                Read the info session guide
              </Link>
            </div>
          )}
        </div>

        {showLevelSelection ? (
          <div>
            <div className="section-heading selection-heading">
              <h2>Choose your level</h2>
            </div>
            <div className="grid two competition-level-grid">
              <Link className="card spacious stack competition-stage-card competition-level-card" href={`/${competitionSlug}?level=middle-school`}>
                <span className="eyebrow">Science Bowl</span>
                <h2>Middle School</h2>
                <p>Grades 6-8 practice questions, quick tests, and lessons.</p>
                <StatsCard {...(scienceBowlLevelCounts?.middleSchool ?? { questions: 0, lessons: 0 })} />
              </Link>
              <Link className="card spacious stack competition-stage-card competition-level-card" href={`/${competitionSlug}?level=high-school`}>
                <span className="eyebrow">Science Bowl</span>
                <h2>High School</h2>
                <p>Grades 9-12 practice questions, quick tests, and lessons.</p>
                <StatsCard {...(scienceBowlLevelCounts?.highSchool ?? { questions: 0, lessons: 0 })} />
              </Link>
            </div>
          </div>
        ) : showActionSelection ? (
          <div>
            <div className="section-heading selection-heading">
              <div>
                {selectedLevelLabel && <span className="eyebrow">{selectedLevelLabel}</span>}
                <h2>Choose what you want to do</h2>
                <p>Pick a learning mode first, then choose a subject.</p>
              </div>
              {selectedLevel && (
                <Link className="ghost-button" href={`/${competitionSlug}`}>
                  Change level
                </Link>
              )}
            </div>
            <div className={`grid ${isScienceBowl ? "four" : "three"} competition-action-grid`}>
              <Link className="card spacious stack competition-stage-card" href={`/${competitionSlug}?${buildStageQuery(["action", "learning"])}`}>
                <span className="eyebrow">Learning</span>
                <h2>Learning</h2>
                <p>Read lessons and study the concept before you try questions.</p>
              </Link>
              <Link className="card spacious stack competition-stage-card" href={`/${competitionSlug}?${buildStageQuery(["action", "practice"])}`}>
                <span className="eyebrow">Practice</span>
                <h2>Practice Questions</h2>
                <p>Get one random question, answer it, then review the explanation.</p>
              </Link>
              <Link className="card spacious stack competition-stage-card" href={`/${competitionSlug}?${buildStageQuery(["action", "tests"])}`}>
                <span className="eyebrow">Tests</span>
                <h2>Quizzes / Tests</h2>
                <p>Choose a question set and work through it in test mode.</p>
              </Link>
              {isScienceBowl && (
                <Link className="card spacious stack competition-stage-card competition-stage-card-accent" href={buzzerPath()}>
                  <span className="eyebrow">Buzzer</span>
                  <h2>Buzzer Practice</h2>
                  <p>Create or join a live room for team buzzer practice.</p>
                </Link>
              )}
            </div>
          </div>
        ) : showSubjectSelection ? (
          <div>
            <div className="section-heading">
              <div>
                {selectedLevelLabel && <span className="eyebrow">{selectedLevelLabel}</span>}
                <h2>Choose a subject for {selectedAction ? actionLabelMap[selectedAction] : "your next step"}</h2>
              </div>
              <div className="action-row">
                {selectedLevel && (
                  <Link className="ghost-button" href={`/${competitionSlug}`}>
                    Change level
                  </Link>
                )}
                <Link className="ghost-button" href={`/${competitionSlug}?${buildQuery([["level", selectedLevel], ["action", selectedAction]])}`}>
                  Change action
                </Link>
              </div>
            </div>
            <div className="grid competition-subject-grid">
              {displayedSubjects.map((category) => (
                <Link
                  className="card spacious stack competition-stage-card competition-subject-card"
                  href={
                    selectedAction === "learning"
                      ? `${learningPath(competitionSlug)}${buildQuery([["level", selectedLevel], ["subject", category]])}`
                      : selectedAction === "practice"
                        ? `${practicePath(competitionSlug)}${buildQuery([["level", selectedLevel], ["subject", category]])}`
                        : `${testsPath(competitionSlug)}${buildQuery([["level", selectedLevel], ["subject", category]])}`
                  }
                  key={category}
                >
                  <span className="eyebrow">Subject</span>
                  <h2>{category}</h2>
                  <p>
                    {selectedAction === "learning"
                      ? "Open the lesson library for this topic."
                      : selectedAction === "practice"
                        ? "Get one random question from this topic."
                        : "Run a multiple-choice quiz for this topic."}
                  </p>
                  <StatsCard {...(countsBySubject.get(category) ?? { questions: 0, lessons: 0 })} />
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="section-heading selected-context">
            <div>
              <span className="eyebrow">{selectedLevelLabel ?? competition.name}</span>
              <h2>Pick an action first</h2>
              <p>Choose Learning, Practice, or Tests before you pick a subject.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

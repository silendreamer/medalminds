import Link from "next/link";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StatsCard } from "@/components/StatsCard";
import { buildStudyBreadcrumbs } from "@/lib/breadcrumbs";
import {
  getCompetitionBySlug,
  getContentCounts,
  getContentCountsBySchoolLevel,
  getContentCountsForSubject,
  getScienceBowlMiddleSchoolCurriculumSubjects,
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

  // For Science Bowl, default to middle-school if no level specified
  const selectedLevel = isScienceBowl && (level === "middle-school" || level === "high-school")
    ? level
    : isScienceBowl ? "middle-school" : undefined;

  const selectedLevelLabel = selectedLevel === "middle-school" ? "Middle School" : selectedLevel === "high-school" ? "High School" : undefined;
  const selectedSchoolLevel =
    selectedLevel === "middle-school" ? "MIDDLE_SCHOOL" : selectedLevel === "high-school" ? "HIGH_SCHOOL" : undefined;

  // Get counts for both levels
  const scienceBowlLevelCounts = isScienceBowl
    ? {
        middleSchool: await getContentCountsBySchoolLevel(competitionSlug, "MIDDLE_SCHOOL"),
        highSchool: await getContentCountsBySchoolLevel(competitionSlug, "HIGH_SCHOOL")
      }
    : undefined;

  // Get subjects for the hub display
  const useMiddleSchoolSubjects = competitionSlug === "science-bowl" && selectedLevel === "middle-school";
  const displayedSubjects = useMiddleSchoolSubjects
    ? (await getScienceBowlMiddleSchoolCurriculumSubjects()).map((subject) => subject.name)
    : competition.categories;
  const subjectCounts = await Promise.all(
    displayedSubjects.map(async (category) => ({
      category,
      counts: await getContentCountsForSubject(competitionSlug, category, selectedSchoolLevel)
    }))
  );
  const countsBySubject = new Map(subjectCounts.map((item) => [item.category, item.counts]));

  // For non-Science Bowl competitions, show legacy multi-step flow
  const showLegacyFlow = !isScienceBowl;
  const selectedAction = action && action in actionLabelMap ? (action as CompetitionAction) : undefined;
  if (selectedAction === "buzzer") {
    redirect(buzzerPath());
  }
  const buildStageQuery = (...pairs: Array<[string, string | undefined]>) => buildQuery([["level", selectedLevel], ...pairs]);
  const showLevelSelection = false; // Never show level selection for Science Bowl, always use toggle
  const showActionSelection = showLegacyFlow && !selectedAction;
  const showSubjectSelection = showLegacyFlow && !showActionSelection;

  // Science Bowl hub: show directly with level toggle (no multi-step)
  if (isScienceBowl && !showLegacyFlow) {
    return (
      <section className="section science-bowl-hub">
        <div className="container stack">
          <div className="hub-header">
            <div>
              <span className="eyebrow">National Science Bowl</span>
              <h1>Science Bowl prep, built around real toss-ups.</h1>
              <p className="subtitle">Learn the science, drill 2,540 authentic questions, and sharpen your buzz time across all five subjects — middle and high school divisions.</p>
            </div>
            <div className="level-toggle-wrapper">
              <span className="level-toggle-label">Division</span>
              <div className="level-toggle">
                <Link
                  href={`/${competitionSlug}?level=middle-school`}
                  className={`level-toggle-btn ${selectedLevel === "middle-school" ? "active" : ""}`}
                >
                  Middle School
                </Link>
                <Link
                  href={`/${competitionSlug}?level=high-school`}
                  className={`level-toggle-btn ${selectedLevel === "high-school" ? "active" : ""}`}
                >
                  High School
                </Link>
              </div>
            </div>
          </div>

          {/* Hub cards: Learn, Practice, Tests */}
          <div className="grid hub-card-grid">
            <Link className="hub-card" href={`${learningPath(competitionSlug)}?level=${selectedLevel}`}>
              <div className="hub-card-icon">📚</div>
              <h3>Learn</h3>
              <p>Structured lessons across all five subjects, written to the questions that actually get asked.</p>
              <div className="hub-card-footer">
                <span className="hub-card-chip">42 lessons</span>
                <span className="hub-card-arrow">Browse →</span>
              </div>
            </Link>
            <Link className="hub-card" href={`${practicePath(competitionSlug)}?level=${selectedLevel}`}>
              <div className="hub-card-icon">🎯</div>
              <h3>Practice</h3>
              <p>Drill real toss-up and bonus questions by subject with instant explanations.</p>
              <div className="hub-card-footer">
                <span className="hub-card-chip">2,540 questions</span>
                <span className="hub-card-arrow">Start →</span>
              </div>
            </Link>
            <Link className="hub-card" href={`${testsPath(competitionSlug)}?level=${selectedLevel}`}>
              <div className="hub-card-icon">⏱️</div>
              <h3>Tests</h3>
              <p>Timed mock rounds that mirror the real format, scored like a live match.</p>
              <div className="hub-card-footer">
                <span className="hub-card-chip">Timed rounds</span>
                <span className="hub-card-arrow">Take →</span>
              </div>
            </Link>
          </div>

          {/* Buzzer section */}
          <div className="buzzer-band">
            <div className="buzzer-band-content">
              <div className="buzzer-band-left">
                <div className="buzzer-icon">⚡</div>
                <div>
                  <h3>Buzzer Arena</h3>
                  <p>Train reaction time head-to-head. Buzz in before the question finishes.</p>
                </div>
              </div>
              <Link className="buzzer-btn" href={buzzerPath()}>
                Enter the Arena
              </Link>
            </div>
          </div>

          {/* Subjects section */}
          <div className="subjects-section">
            <div className="section-heading">
              <span className="eyebrow">Five subjects</span>
              <h2>Pick where to focus</h2>
            </div>
            <div className="grid subjects-grid">
              {displayedSubjects.map((category, idx) => {
                const emojiMap: Record<string, string> = {
                  "Life Science": "🧬",
                  "Physical Science": "⚛️",
                  "Earth & Space": "🌍",
                  "Energy": "⚡",
                  "Math": "∑"
                };
                const emoji = emojiMap[category] || "📚";
                const counts = countsBySubject.get(category) ?? { questions: 0, lessons: 0 };
                return (
                  <Link
                    key={category}
                    className="subject-card"
                    href={`${practicePath(competitionSlug)}?level=${selectedLevel}&subject=${category}`}
                  >
                    <div className="subject-card-icon">{emoji}</div>
                    <h4>{category}</h4>
                    <span className="subject-card-count">{countsBySubject.get(category)?.questions ?? 0} questions</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Non-Science Bowl or legacy flow
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

        {showActionSelection ? (
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
              <Link className="card spacious stack competition-stage-card" href={`${learningPath(competitionSlug)}${selectedLevel ? `?level=${selectedLevel}` : ""}`}>
                <span className="eyebrow">Learning</span>
                <h2>Learning</h2>
                <p>Read lessons and study the concept before you try questions.</p>
              </Link>
              <Link className="card spacious stack competition-stage-card" href={`${practicePath(competitionSlug)}${selectedLevel ? `?level=${selectedLevel}` : ""}`}>
                <span className="eyebrow">Practice</span>
                <h2>Practice Questions</h2>
                <p>Get one random question, answer it, then review the explanation.</p>
              </Link>
              <Link className="card spacious stack competition-stage-card" href={`${testsPath(competitionSlug)}${selectedLevel ? `?level=${selectedLevel}` : ""}`}>
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
                      ? `${learningPath(competitionSlug)}/subject/${category.toLowerCase().replace(/\s+/g, "-")}`
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

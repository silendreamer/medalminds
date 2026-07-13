import Link from "next/link";
import type { CompetitionSlug } from "@/types";
import { subjectEmoji } from "@/lib/subjects";
import {
  buzzerPath,
  competitionLevelPath,
  learningPath,
  practicePath,
  practiceSubjectPath,
  scienceBowlInfoPath,
  testsPath,
} from "@/lib/routes";

interface ContentCounts {
  questions: number;
  lessons: number;
}

interface ScienceBowlHubProps {
  competitionSlug: CompetitionSlug;
  /**
   * The currently-selected level. When undefined the hub renders the division
   * picker instead of the Learn/Practice/Tests cards and subjects grid.
   */
  level?: "middle-school" | "high-school";
  /** competition.subjects */
  subjects: string[];
  /** Counts for the selected level — used for Learn/Practice chip approximations. */
  levelCounts?: ContentCounts;
  /** Per-subject counts for the subjects grid. */
  countsBySubject?: Map<string, ContentCounts>;
  /** Per-division counts shown on the division picker cards (no-level state). */
  divisionCounts?: { middleSchool: ContentCounts; highSchool: ContentCounts };
}

function roundedChip(count: number, step: number, unit: string) {
  return `${Math.round(count / step) * step}+ ${unit}`;
}

/**
 * Shared Science Bowl hub layout used by both
 *   /science-bowl  (competitionSlug/page.tsx — division picker until one is chosen)
 *   /science-bowl/{level}  (competitionSlug/[level]/page.tsx)
 *
 * Server component — no "use client".
 */
export function ScienceBowlHub({
  competitionSlug,
  level,
  subjects,
  levelCounts,
  countsBySubject,
  divisionCounts,
}: ScienceBowlHubProps) {
  return (
    <section className="section science-bowl-hub">
      <div className="container stack">
        <div className="hub-header">
          <div>
            <span className="eyebrow">National Science Bowl</span>
            <h1>Science Bowl prep, built around real toss-ups.</h1>
            <p className="subtitle">
              Learn the science, answer authentic questions, and sharpen your buzz time across all
              five subjects — middle and high school divisions.
            </p>
            {level && (
              <div className="level-toggle-wrapper">
                <span className="level-toggle-label">Division</span>
                <div className="level-toggle">
                  <Link
                    href={competitionLevelPath(competitionSlug, "middle-school")}
                    className={`level-toggle-btn ${level === "middle-school" ? "active" : ""}`}
                  >
                    Middle School
                  </Link>
                  <Link
                    href={competitionLevelPath(competitionSlug, "high-school")}
                    className={`level-toggle-btn ${level === "high-school" ? "active" : ""}`}
                  >
                    High School
                  </Link>
                </div>
              </div>
            )}
            <Link className="new-here-link" href={scienceBowlInfoPath()}>
              New to Science Bowl? Read the team guide →
            </Link>
          </div>
        </div>

        {!level ? (
          /* Division picker: shown until a division is chosen */
          <div className="division-picker">
            <div className="section-heading">
              <span className="eyebrow">Pick your division</span>
              <h2>Which division do you compete in?</h2>
            </div>
            <div className="division-picker-grid">
              <Link
                className="division-card"
                href={competitionLevelPath(competitionSlug, "middle-school")}
              >
                <div className="hub-card-icon">🏫</div>
                <h3>Middle School</h3>
                <p>Grades 6–8. Lessons, practice questions, and timed rounds for the MS division.</p>
                <div className="hub-card-footer">
                  <span className="hub-card-chip">
                    {divisionCounts
                      ? roundedChip(divisionCounts.middleSchool.questions, 100, "questions")
                      : "Real toss-ups"}
                  </span>
                  <span className="hub-card-arrow">Start prepping →</span>
                </div>
              </Link>
              <Link
                className="division-card"
                href={competitionLevelPath(competitionSlug, "high-school")}
              >
                <div className="hub-card-icon">🎓</div>
                <h3>High School</h3>
                <p>Grades 9–12. Lessons, practice questions, and timed rounds for the HS division.</p>
                <div className="hub-card-footer">
                  <span className="hub-card-chip">
                    {divisionCounts
                      ? roundedChip(divisionCounts.highSchool.questions, 100, "questions")
                      : "Real toss-ups"}
                  </span>
                  <span className="hub-card-arrow">Start prepping →</span>
                </div>
              </Link>
            </div>
          </div>
        ) : (
          /* Hub cards: Learn, Practice, Tests */
          <div className="grid hub-card-grid">
            <Link className="hub-card" href={learningPath(competitionSlug, level)}>
              <div className="hub-card-icon">📚</div>
              <h3>Learn</h3>
              <p>
                Structured lessons across all five subjects, written to the questions that actually
                get asked.
              </p>
              <div className="hub-card-footer">
                <span className="hub-card-chip">
                  {roundedChip(levelCounts?.lessons ?? 0, 10, "lessons")}
                </span>
                <span className="hub-card-arrow">Browse →</span>
              </div>
            </Link>
            <Link className="hub-card" href={practicePath(competitionSlug, level)}>
              <div className="hub-card-icon">🎯</div>
              <h3>Practice</h3>
              <p>Drill real toss-up and bonus questions by subject with instant explanations.</p>
              <div className="hub-card-footer">
                <span className="hub-card-chip">
                  {roundedChip(levelCounts?.questions ?? 0, 100, "questions")}
                </span>
                <span className="hub-card-arrow">Start →</span>
              </div>
            </Link>
            <Link className="hub-card" href={testsPath(competitionSlug, level)}>
              <div className="hub-card-icon">⏱️</div>
              <h3>Tests</h3>
              <p>Timed mock rounds that mirror the real format, scored like a live match.</p>
              <div className="hub-card-footer">
                <span className="hub-card-chip">Timed rounds</span>
                <span className="hub-card-arrow">Take →</span>
              </div>
            </Link>
          </div>
        )}

        {/* Buzzer section — division-agnostic, always visible */}
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
        {level && (
          <div className="subjects-section">
            <div className="section-heading">
              <span className="eyebrow">{subjects.length} subjects</span>
              <h2>Pick where to focus</h2>
            </div>
            <div className="grid subjects-grid">
              {subjects.map((category) => {
                const emoji = subjectEmoji(category);
                return (
                  <Link
                    key={category}
                    className="subject-card"
                    href={practiceSubjectPath(competitionSlug, level, category)}
                  >
                    <div className="subject-card-icon">{emoji}</div>
                    <h4>{category}</h4>
                    <span className="subject-card-count">
                      {countsBySubject?.get(category)?.questions ?? 0} questions
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

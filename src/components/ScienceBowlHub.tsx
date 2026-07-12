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

interface ScienceBowlHubProps {
  competitionSlug: CompetitionSlug;
  /** The currently-selected level (drives toggle highlight and card hrefs). */
  level: "middle-school" | "high-school";
  /** competition.subjects */
  subjects: string[];
  /** Counts for the selected level — used for Learn/Practice chip approximations. */
  levelCounts: { questions: number; lessons: number };
  /** Per-subject counts for the subjects grid. */
  countsBySubject: Map<string, { questions: number; lessons: number }>;
  /**
   * Whether to render the "Read the info session guide" ghost-button at the bottom.
   * /science-bowl/{level} shows it (true); /science-bowl does NOT show it (false/omitted).
   */
  showInfoSessionLink?: boolean;
}

/**
 * Shared Science Bowl hub layout used by both
 *   /science-bowl  (competitionSlug/page.tsx)
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
  showInfoSessionLink = false,
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
          </div>
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
        </div>

        {/* Hub cards: Learn, Practice, Tests */}
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
                {Math.round((levelCounts.lessons ?? 0) / 10) * 10}+ lessons
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
                {Math.round((levelCounts.questions ?? 0) / 100) * 100}+ questions
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
                    {countsBySubject.get(category)?.questions ?? 0} questions
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {showInfoSessionLink && (
          <div className="actions">
            <Link className="ghost-button" href={scienceBowlInfoPath()}>
              Read the info session guide
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

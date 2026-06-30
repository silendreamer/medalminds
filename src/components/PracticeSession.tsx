"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { Lesson, PracticeQuestion } from "@/types";
import { SimplePracticeQuestion } from "./SimplePracticeQuestion";

interface PracticeSessionProps {
  initialQuestion: PracticeQuestion;
  subtopicLessons?: Lesson[];
  competitionSlug: string;
  level: string;
  subject?: string;
  subjectNames: string[];
}

const SESSION_KEY = "practice-session-stats";

function loadStats() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return { correct: 0, incorrect: 0, streak: 0 };
    return JSON.parse(raw) as { correct: number; incorrect: number; streak: number };
  } catch {
    return { correct: 0, incorrect: 0, streak: 0 };
  }
}

function saveStats(stats: { correct: number; incorrect: number; streak: number }) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(stats));
  } catch {}
}

export function PracticeSession({
  initialQuestion,
  subtopicLessons,
  competitionSlug,
  level,
  subject,
  subjectNames,
}: PracticeSessionProps) {
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [streak, setStreak] = useState(0);

  // Rehydrate stats from sessionStorage on mount
  useEffect(() => {
    const stats = loadStats();
    setCorrect(stats.correct);
    setIncorrect(stats.incorrect);
    setStreak(stats.streak);
  }, []);

  const handleNext = useCallback((wasCorrect: boolean) => {
    const stats = loadStats();
    const next = wasCorrect
      ? { correct: stats.correct + 1, incorrect: stats.incorrect, streak: stats.streak + 1 }
      : { correct: stats.correct, incorrect: stats.incorrect + 1, streak: 0 };
    saveStats(next);
    // Navigate to a new random question
    const base = `/${competitionSlug}/${level}/practice`;
    const params = subject ? `?subject=${encodeURIComponent(subject)}` : "";
    window.location.href = base + params;
  }, [competitionSlug, level, subject]);

  const handleSkip = useCallback(() => {
    const base = `/${competitionSlug}/${level}/practice`;
    const params = subject ? `?subject=${encodeURIComponent(subject)}` : "";
    window.location.href = base + params;
  }, [competitionSlug, level, subject]);

  const answered = correct + incorrect;
  const progressPct = answered === 0 ? 0 : Math.round((correct / answered) * 100);

  return (
    <div className="practice-layout">
      {/* Main question */}
      <main className="practice-main">
        {subjectNames.length > 0 && (
          <div className="subject-filter-bar">
            <span className="filter-label">Subject:</span>
            <div className="subject-chips">
              {subjectNames.map((subj) => (
                <Link
                  key={subj}
                  href={`/${competitionSlug}/${level}/practice?subject=${encodeURIComponent(subj)}`}
                  className={`subject-chip ${subject === subj ? "selected" : ""}`}
                >
                  {subj}
                </Link>
              ))}
              <Link
                href={`/${competitionSlug}/${level}/practice`}
                className={`subject-chip ${!subject ? "selected" : ""}`}
              >
                All
              </Link>
            </div>
          </div>
        )}
        <SimplePracticeQuestion
          question={initialQuestion}
          subtopicLessons={subtopicLessons}
          onNext={handleNext}
          onSkip={handleSkip}
        />
      </main>

      {/* Sidebar */}
      <aside className="practice-sidebar">
        <div className="pq-stats-card">
          <div className="pq-stats-header">
            <h3 className="pq-stats-title">This session</h3>
            <button
              className="pq-stats-reset"
              onClick={() => { saveStats({ correct: 0, incorrect: 0, streak: 0 }); setCorrect(0); setIncorrect(0); setStreak(0); }}
            >
              Reset
            </button>
          </div>
          <div className="pq-stats-rows">
            <div className="pq-stats-row">
              <span className="pq-stats-label">Correct</span>
              <span className="pq-stats-value pq-stats-value--correct">{correct}</span>
            </div>
            <div className="pq-stats-row">
              <span className="pq-stats-label">Incorrect</span>
              <span className="pq-stats-value pq-stats-value--incorrect">{incorrect}</span>
            </div>
            <div className="pq-stats-row">
              <span className="pq-stats-label">Current streak</span>
              <span className="pq-stats-value pq-stats-streak">
                {streak}{streak >= 3 ? " 🔥" : ""}
              </span>
            </div>
            <div className="pq-stats-row pq-stats-row--progress">
              <div className="pq-stats-progress-header">
                <span className="pq-stats-label">Progress</span>
                <span className="pq-stats-progress-count">{answered} answered</span>
              </div>
              <div className="pq-progress-bar">
                <div className="pq-progress-fill" style={{ width: `${progressPct}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="pq-buzzer-card">
          <h4>Buzzer mode</h4>
          <p>Race the clock — answers hide until you buzz in.</p>
          <Link href={`/${competitionSlug}/buzzer`} className="button pq-buzzer-btn">
            Switch to buzzer
          </Link>
        </div>
      </aside>
    </div>
  );
}

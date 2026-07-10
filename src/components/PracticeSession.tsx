"use client";

import { useCallback, useEffect, useState } from "react";
import type { PracticeQuestion } from "@/types";
import { SimplePracticeQuestion } from "./SimplePracticeQuestion";

interface PracticeSessionProps {
  initialQuestion: PracticeQuestion;
  competitionSlug: string;
  level: string;
  subjectSlug?: string;
  subject?: string;
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
  competitionSlug,
  level,
  subjectSlug,
  subject,
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
    const base = subjectSlug
      ? `/${competitionSlug}/${level}/practice/${subjectSlug}`
      : `/${competitionSlug}/${level}/practice`;
    window.location.href = base;
  }, [competitionSlug, level, subjectSlug]);

  const handleSkip = useCallback(() => {
    const base = subjectSlug
      ? `/${competitionSlug}/${level}/practice/${subjectSlug}`
      : `/${competitionSlug}/${level}/practice`;
    window.location.href = base;
  }, [competitionSlug, level, subjectSlug]);

  const answered = correct + incorrect;
  const progressPct = answered === 0 ? 0 : Math.round((correct / answered) * 100);

  return (
    <div className="practice-layout">
      {/* Main question */}
      <main className="practice-main">
        <SimplePracticeQuestion
          question={initialQuestion}
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
      </aside>
    </div>
  );
}

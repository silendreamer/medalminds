"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PracticeQuestion } from "@/types";
import { SimplePracticeQuestion } from "./SimplePracticeQuestion";

interface PracticeSessionProps {
  /**
   * Optional server-provided first question. When omitted, the page is a fully
   * static shell and the session fetches its first question client-side from
   * /api/practice/random.
   */
  initialQuestion?: PracticeQuestion;
  competitionSlug: string;
  level: string;
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
  subject,
}: PracticeSessionProps) {
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [streak, setStreak] = useState(0);

  const [question, setQuestion] = useState<PracticeQuestion | null>(initialQuestion ?? null);
  const [loading, setLoading] = useState(!initialQuestion);
  const [error, setError] = useState(false);
  // Remount SimplePracticeQuestion on each new question so its internal
  // answer/checked state resets cleanly.
  const [round, setRound] = useState(0);

  // Rehydrate stats from sessionStorage on mount
  useEffect(() => {
    const stats = loadStats();
    setCorrect(stats.correct);
    setIncorrect(stats.incorrect);
    setStreak(stats.streak);
  }, []);

  const fetchNext = useCallback(async (excludeId?: string) => {
    setLoading(true);
    setError(false);
    try {
      const params = new URLSearchParams({ competition: competitionSlug, level });
      if (subject) params.set("subject", subject);
      if (excludeId) params.set("exclude", excludeId);
      const res = await fetch(`/api/practice/random?${params.toString()}`);
      if (!res.ok) throw new Error("bad response");
      const data = (await res.json()) as { question: PracticeQuestion | null };
      setQuestion(data.question);
      setRound((r) => r + 1);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [competitionSlug, level, subject]);

  // If no question was provided by the server (static shell), fetch the first one.
  const fetchedInitial = useRef(false);
  useEffect(() => {
    if (!initialQuestion && !fetchedInitial.current) {
      fetchedInitial.current = true;
      void fetchNext();
    }
  }, [initialQuestion, fetchNext]);

  const handleNext = useCallback((wasCorrect: boolean) => {
    const stats = loadStats();
    const next = wasCorrect
      ? { correct: stats.correct + 1, incorrect: stats.incorrect, streak: stats.streak + 1 }
      : { correct: stats.correct, incorrect: stats.incorrect + 1, streak: 0 };
    saveStats(next);
    setCorrect(next.correct);
    setIncorrect(next.incorrect);
    setStreak(next.streak);
    void fetchNext(question?.id);
  }, [fetchNext, question?.id]);

  const handleSkip = useCallback(() => {
    void fetchNext(question?.id);
  }, [fetchNext, question?.id]);

  const answered = correct + incorrect;
  const progressPct = answered === 0 ? 0 : Math.round((correct / answered) * 100);

  return (
    <div className="practice-layout">
      {/* Main question */}
      <main className="practice-main">
        {question ? (
          <SimplePracticeQuestion
            key={round}
            question={question}
            onNext={handleNext}
            onSkip={handleSkip}
          />
        ) : loading ? (
          <div className="pq-card pq-card--loading" aria-busy="true">
            Loading question…
          </div>
        ) : error ? (
          <div className="pq-card">
            <p>Couldn’t load a question.</p>
            <button className="button" onClick={() => { void fetchNext(); }}>Try again</button>
          </div>
        ) : (
          <div className="empty">No questions are available yet.</div>
        )}
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

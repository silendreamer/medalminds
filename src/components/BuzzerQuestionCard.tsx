"use client";

import type { BuzzerQuestion } from "@/data/buzzerQuestions";
import type { BuzzerMode, BuzzerPhase, BuzzerTeam } from "@/lib/buzzerEngine";

export function BuzzerQuestionCard({
  question,
  questionNumber,
  total,
  mode,
  phase,
  soloBuzzed,
  soloAnswer,
  soloResult,
  buzzedTeam,
  tossupMarked,
  bonusMarked
}: {
  question: BuzzerQuestion;
  questionNumber: number;
  total: number;
  mode: BuzzerMode;
  phase: BuzzerPhase;
  soloBuzzed: boolean;
  soloAnswer: string;
  soloResult: "correct" | "incorrect" | null;
  buzzedTeam: BuzzerTeam | null;
  tossupMarked: "correct" | "incorrect" | null;
  bonusMarked: "correct" | "incorrect" | null;
}) {
  const showAnswer = soloResult !== null || tossupMarked !== null;
  const showBonus = mode === "teams" && tossupMarked === "correct";
  const showBonusAnswer = bonusMarked !== null;
  const statusLabel =
    phase === "idle"
      ? "Ready"
      : phase === "question"
        ? "Question live"
        : phase === "buzzed"
          ? "Buzzed"
          : phase === "judging"
            ? "Moderator judging"
            : phase === "bonus"
              ? "Bonus live"
              : "Round complete";

  return (
    <article className="card spacious buzzer-question-card">
      <div className="card-header">
        <div>
          <span className="eyebrow">
            Toss-up {questionNumber} of {total}
          </span>
          <h2>{question.category}</h2>
        </div>
        <div className="badge-list">
          <span className="badge neutral">{question.difficulty}</span>
          <span className="badge">{statusLabel}</span>
        </div>
      </div>

      <div className={`buzzer-prompt ${phase === "idle" ? "muted" : ""}`}>
        {phase === "idle"
          ? "Question hidden. Start the question to reveal the toss-up and begin the clock."
          : question.tossupPrompt}
      </div>

      {mode === "solo" && soloBuzzed && !showAnswer && (
        <div className="feedback">
          <strong>Solo mode</strong>
          <p>Enter your answer once you buzz in. The timer is stopped until you submit.</p>
        </div>
      )}

      {showAnswer && (
        <div className={soloResult === "correct" || tossupMarked === "correct" ? "feedback good" : "feedback bad"}>
          <strong>Toss-up answer: {question.tossupAnswer}</strong>
          <p>{question.tossupExplanation}</p>
          {mode === "solo" && soloAnswer && <p>Your answer: {soloAnswer}</p>}
          {buzzedTeam && <p>Team {buzzedTeam} answered first.</p>}
        </div>
      )}

      {showBonus && (
        <div className="buzzer-bonus">
          <span className="eyebrow">Bonus</span>
          <p>{question.bonusPrompt}</p>
          {showBonusAnswer && (
            <div className="feedback">
              <strong>Bonus answer: {question.bonusAnswer}</strong>
              <p>{question.bonusExplanation}</p>
            </div>
          )}
        </div>
      )}
    </article>
  );
}


"use client";

import type { BuzzerQuestion } from "@/data/buzzerQuestions";

export function BuzzerQuestionCard({
  question,
  questionNumber,
  total,
  started,
  showBonus,
  showTossupExplanation,
  showBonusExplanation
}: {
  question: BuzzerQuestion;
  questionNumber: number;
  total: number;
  started: boolean;
  showBonus: boolean;
  showTossupExplanation: boolean;
  showBonusExplanation: boolean;
}) {
  return (
    <article className="card spacious buzzer-question-card">
      <div className="card-header">
        <div>
          <span className="eyebrow">
            Toss-up {questionNumber} of {total}
          </span>
          <h2>{question.category}</h2>
        </div>
        <span className="badge neutral">{question.difficulty}</span>
      </div>

      <div className={`buzzer-prompt ${started ? "" : "muted"}`}>
        {started ? question.tossupPrompt : "Question hidden. Start the question to begin the timer and reveal the toss-up."}
      </div>

      {showTossupExplanation && (
        <div className="feedback good">
          <strong>Toss-up answer: {question.tossupAnswer}</strong>
          <p>{question.tossupExplanation}</p>
        </div>
      )}

      {showBonus && (
        <div className="buzzer-bonus">
          <span className="eyebrow">Bonus</span>
          <p>{question.bonusPrompt}</p>
          {showBonusExplanation && (
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

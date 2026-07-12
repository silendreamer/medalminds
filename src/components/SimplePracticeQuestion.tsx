"use client";

import { useState } from "react";
import type { PracticeQuestion } from "@/types";
import { QuestionText } from "@/components/QuestionText";
import { normalizeAnswer, isAnswerCorrect } from "@/lib/grading";

const LABELS = ["W", "X", "Y", "Z"];

export function SimplePracticeQuestion({
  question,
  questionNumber,
  totalQuestions,
  onNext,
  onSkip,
}: {
  question: PracticeQuestion;
  questionNumber?: number;
  totalQuestions?: number;
  onNext?: (wasCorrect: boolean) => void;
  onSkip?: () => void;
}) {
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const correct = checked && isAnswerCorrect(question, answer);

  function handleChoice(choice: string) {
    if (checked) return;
    setAnswer(choice);
    setChecked(true);
  }

  function handleTextCheck() {
    if (!answer) return;
    setChecked(true);
  }

  function handleNext() {
    if (onNext) {
      onNext(checked ? correct : false);
    } else {
      window.location.reload();
    }
  }

  function handleSkip() {
    if (onSkip) {
      onSkip();
    } else {
      window.location.reload();
    }
  }

  const categoryLabel = question.subject ?? "";

  return (
    <article className="pq-card">
      {/* Header */}
      <div className="pq-header">
        {categoryLabel && (
          <span className="pq-badge">
            {categoryLabel}
          </span>
        )}
        {questionNumber != null && totalQuestions != null && (
          <span className="pq-counter">Question {questionNumber} of {totalQuestions}</span>
        )}
      </div>

      {/* Question */}
      <p className="question-prompt"><QuestionText html={question.prompt} /></p>

      {/* Choices or text input */}
      {question.type === "multiple_choice" ? (
        <div className="pq-choices">
          {question.choices?.map((choice, index) => {
            const label = LABELS[index] ?? String(index + 1);
            let state: "idle" | "selected" | "correct" | "incorrect" | "missed" = "idle";
            if (checked) {
              if (normalizeAnswer(choice) === normalizeAnswer(question.correctAnswer)) {
                state = "correct";
              } else if (answer === choice) {
                state = "incorrect";
              } else {
                state = "missed";
              }
            } else if (answer === choice) {
              state = "selected";
            }

            return (
              <button
                key={choice}
                className={`pq-choice pq-choice--${state}`}
                onClick={() => handleChoice(choice)}
                disabled={checked}
              >
                <span className="pq-choice-label">{label}</span>
                <span className="pq-choice-text"><QuestionText html={choice} /></span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="pq-text-input-row">
          <input
            className="input"
            value={answer}
            onChange={(e) => { setAnswer(e.target.value); }}
            onKeyDown={(e) => { if (e.key === "Enter") handleTextCheck(); }}
            placeholder="Type your answer"
            disabled={checked}
          />
          {!checked && (
            <button className="button" disabled={!answer} onClick={handleTextCheck}>
              Check
            </button>
          )}
        </div>
      )}

      {checked && question.explainAnswer && question.explainAnswer.length > 0 && (
        <div className="ai-explanation">
          <div className="ai-explain-card">
            <div className="ai-explain-card-header">
              <span className="ai-explain-card-title">Explanation</span>
            </div>
            {question.explainAnswer.length > 1 ? (
              <ol className="ai-explain-steps">
                {question.explainAnswer.map((step, i) => (
                  <li key={i} className="ai-explain-step">
                    <span className="ai-explain-step-number">{i + 1}</span>
                    <span className="ai-explain-step-text">{step}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="ai-explain-card-body">{question.explainAnswer[0]}</p>
            )}
          </div>
        </div>
      )}

      {/* Footer actions */}
      <div className="pq-footer">
        <button className="ghost-button" onClick={handleSkip}>Skip</button>
        <button className="button" onClick={handleNext}>
          Next question →
        </button>
      </div>
    </article>
  );
}

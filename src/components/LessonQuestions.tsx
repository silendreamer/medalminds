"use client";

import { useState } from "react";
import type { PracticeQuestion } from "@/types";
import { QuestionText } from "@/components/QuestionText";

type Props = {
  questions: PracticeQuestion[];
  /** Subject-color accent to match the surrounding course view. */
  accentColor?: string;
};

/**
 * Steps through the practice questions linked to a lesson, one at a time:
 * show the prompt (with multiple-choice options if present), reveal the answer
 * + explanation, then advance with Next. Resets reveal state on each step.
 */
export function LessonQuestions({ questions, accentColor = "#1a2745" }: Props) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  if (questions.length === 0) return null;

  const question = questions[index];
  const isLast = index === questions.length - 1;

  function goNext() {
    if (isLast) return;
    setIndex((i) => i + 1);
    setRevealed(false);
  }

  return (
    <div className="lesson-practice-questions">
      <div className="lesson-practice-header">
        <h2 className="lesson-section-heading">Practice questions for this lesson</h2>
        <span className="lesson-practice-progress">
          {index + 1} of {questions.length}
        </span>
      </div>

      <div className="lesson-practice-question" key={question.id}>
        <p className="question-prompt">
          <QuestionText html={question.prompt} />
        </p>

        {question.choices && question.choices.length > 0 && (
          <ul className="lesson-practice-choices">
            {question.choices.map((choice, i) => (
              <li key={i} className="lesson-practice-choice">
                <span className="lesson-practice-choice-letter">
                  {String.fromCharCode(65 + i)}
                </span>
                <QuestionText html={choice} />
              </li>
            ))}
          </ul>
        )}

        {!revealed ? (
          <button
            type="button"
            className="lesson-nav-btn lesson-nav-btn--primary lesson-practice-reveal"
            style={{ background: accentColor }}
            onClick={() => setRevealed(true)}
          >
            Show answer
          </button>
        ) : (
          <div className="lesson-practice-reveal-body">
            <p className="lesson-practice-answer">
              Answer: <QuestionText html={question.correctAnswer} />
            </p>

            {question.explainAnswer && question.explainAnswer.length > 0 && (
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
          </div>
        )}
      </div>

      <div className="lesson-practice-nav">
        {!isLast ? (
          <button
            type="button"
            className="lesson-nav-btn lesson-nav-btn--primary"
            style={{ background: accentColor }}
            onClick={goNext}
          >
            Next question →
          </button>
        ) : (
          revealed && <span className="lesson-practice-done">You&apos;ve reached the last question.</span>
        )}
      </div>
    </div>
  );
}

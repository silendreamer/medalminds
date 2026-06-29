"use client";

import { useMemo, useState } from "react";
import type { PracticeQuestion } from "@/types";

const multipleChoiceLabels = ["W", "X", "Y", "Z"];

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function isCorrect(question: PracticeQuestion, answer: string) {
  return normalize(question.correctAnswer) === normalize(answer);
}

export function QuickTestRunner({ questions }: { questions: PracticeQuestion[] }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const question = questions[current];
  const score = useMemo(
    () => questions.filter((item) => isCorrect(item, answers[item.id] ?? "")).length,
    [answers, questions]
  );

  if (!questions.length) {
    return <div className="empty">No multiple-choice questions are available for this selection.</div>;
  }

  if (submitted) {
    return (
      <div className="card spacious stack practice-card">
        <div>
          <span className="eyebrow">Score</span>
          <h2>
            {score} / {questions.length}
          </h2>
        </div>
        <div className="stack">
          {questions.map((item, index) => {
            const userAnswer = answers[item.id] ?? "";
            const correct = isCorrect(item, userAnswer);
            return (
              <div className={`feedback ${correct ? "good" : "bad"}`} key={item.id}>
                <strong>
                  {index + 1}. {correct ? "Correct" : "Missed"}
                </strong>
                <p>{item.prompt}</p>
                <p>Your answer: {userAnswer || "No answer"}</p>
                <p>Correct answer: {item.correctAnswer}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <article className="card spacious stack practice-card">
      <div className="card-header">
        <div>
          <span className="eyebrow">
            Question {current + 1} of {questions.length}
          </span>
          <h2>{question.subject}</h2>
        </div>
        <span className="badge neutral">Multiple choice</span>
      </div>
      <p className="question-prompt">{question.prompt}</p>
      <div className="stack">
        {question.choices?.map((choice, index) => (
          <button
            className={`choice ${answers[question.id] === choice ? "selected" : ""}`}
            key={choice}
            onClick={() => setAnswers((previous) => ({ ...previous, [question.id]: choice }))}
          >
            {multipleChoiceLabels[index] ? `${multipleChoiceLabels[index]}) ${choice}` : choice}
          </button>
        ))}
      </div>
      <div className="actions">
        <button className="ghost-button" disabled={current === 0} onClick={() => setCurrent(current - 1)}>
          Previous
        </button>
        {current === questions.length - 1 ? (
          <button className="button" onClick={() => setSubmitted(true)}>
            Finish test
          </button>
        ) : (
          <button className="button" onClick={() => setCurrent(current + 1)}>
            Next
          </button>
        )}
      </div>
    </article>
  );
}

"use client";

import { useMemo, useState } from "react";
import type { PracticeQuestion, Test } from "@/types";

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function isCorrect(question: PracticeQuestion, answer: string) {
  const accepted = [question.correctAnswer, ...(question.alternateAnswers ?? [])].map(normalize);
  return accepted.includes(normalize(answer));
}

export function TestRunner({ test, questions }: { test: Test; questions: PracticeQuestion[] }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(
    () => questions.filter((question) => isCorrect(question, answers[question.id] ?? "")).length,
    [answers, questions]
  );

  const question = questions[current];

  function setAnswer(value: string) {
    setAnswers((previous) => ({ ...previous, [question.id]: value }));
  }

  return (
    <div className="test-layout">
      <aside className="card side-panel stack">
        <h3>{test.title}</h3>
        <p>{test.timeLimitMinutes} minute limit</p>
        <div className="question-nav">
          {questions.map((item, index) => (
            <button
              className={index === current ? "active" : ""}
              key={item.id}
              onClick={() => setCurrent(index)}
              aria-label={`Go to question ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button className="button" onClick={() => setSubmitted(true)}>
          Submit test
        </button>
      </aside>

      <section className="card spacious stack">
        {submitted ? (
          <>
            <div>
              <span className="eyebrow">Score</span>
              <h2>
                {score} / {questions.length}
              </h2>
              <p>Review each answer below, then jump back to any question for another look.</p>
            </div>
            <div className="stack">
              {questions.map((item, index) => {
                const userAnswer = answers[item.id] ?? "";
                const correct = isCorrect(item, userAnswer);
                return (
                  <div className={`feedback ${correct ? "good" : "bad"}`} key={item.id}>
                    <strong>
                      Question {index + 1}: {correct ? "Correct" : "Needs review"}
                    </strong>
                    <p>{item.prompt}</p>
                    <p>Your answer: {userAnswer || "No answer"}</p>
                    <p>Correct answer: {item.correctAnswer}</p>
                    <p>{item.explanation}</p>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="card-header">
              <div>
                <span className="eyebrow">
                  Question {current + 1} of {questions.length}
                </span>
                <h2>{question.category}</h2>
              </div>
              <span className="badge neutral">{question.difficulty}</span>
            </div>
            <p>{question.prompt}</p>
            {question.type === "multiple_choice" ? (
              <div className="stack">
                {question.choices?.map((choice) => (
                  <button
                    className={`choice ${answers[question.id] === choice ? "selected" : ""}`}
                    key={choice}
                    onClick={() => setAnswer(choice)}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            ) : (
              <input
                className="input"
                value={answers[question.id] ?? ""}
                onChange={(event) => setAnswer(event.target.value)}
                placeholder="Type your answer"
              />
            )}
            <div className="actions">
              <button className="ghost-button" disabled={current === 0} onClick={() => setCurrent(current - 1)}>
                Previous
              </button>
              <button
                className="button"
                disabled={current === questions.length - 1}
                onClick={() => setCurrent(current + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

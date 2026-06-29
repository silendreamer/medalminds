"use client";

import { useMemo, useState } from "react";
import type { PracticeQuestion } from "@/types";

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function isCorrect(question: PracticeQuestion, answer: string) {
  const accepted = [question.correctAnswer, ...(question.alternateAnswers ?? [])].map(normalize);
  return accepted.includes(normalize(answer));
}

const multipleChoiceLabels = ["W", "X", "Y", "Z"];

export function PracticeQuestionCard({ questions }: { questions: PracticeQuestion[] }) {
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [type, setType] = useState("All");
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const categories = useMemo(() => ["All", ...Array.from(new Set(questions.map((q) => q.subject)))], [questions]);
  const difficulties = useMemo(() => ["All", ...Array.from(new Set(questions.map((q) => q.difficulty)))], [questions]);
  const types = ["All", "multiple_choice", "short_answer"];

  const filtered = questions.filter(
    (question) =>
      (category === "All" || question.subject === category) &&
      (difficulty === "All" || question.difficulty === difficulty) &&
      (type === "All" || question.type === type)
  );

  const activeIndex = Math.min(index, Math.max(filtered.length - 1, 0));
  const question = filtered[activeIndex];
  const correct = question ? isCorrect(question, answer) : false;

  function resetQuestion(nextIndex = 0) {
    setIndex(nextIndex);
    setAnswer("");
    setChecked(false);
  }

  function updateFilter(setter: (value: string) => void, value: string) {
    setter(value);
    resetQuestion(0);
  }

  if (!questions.length) {
    return <div className="empty">No practice questions are available yet.</div>;
  }

  return (
    <div className="practice-layout">
      {/* Mobile filter toggle */}
      <button className="practice-filters-toggle" style={{ display: "none" }} onClick={() => setSidebarOpen(true)}>
        ⚙ Filters
      </button>

      {/* Mobile scrim */}
      <div className={`practice-sidebar-scrim${sidebarOpen ? " open" : ""}`} onClick={() => setSidebarOpen(false)} />

      <aside className={`card side-panel stack practice-sidebar${sidebarOpen ? " sidebar-open" : ""}`}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ margin: 0 }}>Filters</h3>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#667085", padding: "4px", lineHeight: 1 }}
            aria-label="Close filters"
          >×</button>
        </div>
        <select className="select" value={category} onChange={(event) => updateFilter(setCategory, event.target.value)}>
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select
          className="select"
          value={difficulty}
          onChange={(event) => updateFilter(setDifficulty, event.target.value)}
        >
          {difficulties.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select className="select" value={type} onChange={(event) => updateFilter(setType, event.target.value)}>
          {types.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All types" : item.replace("_", " ")}
            </option>
          ))}
        </select>
        <p>
          Showing {filtered.length} of {questions.length} questions.
        </p>
      </aside>

      {!question ? (
        <div className="empty">No questions match these filters.</div>
      ) : (
        <article className="card spacious stack">
          <div className="card-header">
            <div>
              <span className="eyebrow">
                Question {activeIndex + 1} of {filtered.length}
              </span>
              <h2>{question.subject}</h2>
            </div>
            <div className="badge-list">
              <span className="badge neutral">{question.difficulty}</span>
              <span className="badge neutral">{question.type.replace("_", " ")}</span>
            </div>
          </div>
          <p>{question.prompt}</p>

          {question.type === "multiple_choice" ? (
            <div className="stack">
              {question.choices?.map((choice, choiceIndex) => {
                const selected = answer === choice;
                const state = checked && selected ? (correct ? "correct" : "incorrect") : "";
                return (
                  <button
                    className={`choice ${selected ? "selected" : ""} ${state}`}
                    key={choice}
                    onClick={() => {
                      setAnswer(choice);
                      setChecked(false);
                    }}
                  >
                    {multipleChoiceLabels[choiceIndex] ? `${multipleChoiceLabels[choiceIndex]}) ${choice}` : choice}
                  </button>
                );
              })}
            </div>
          ) : (
            <input
              className="input"
              value={answer}
              onChange={(event) => {
                setAnswer(event.target.value);
                setChecked(false);
              }}
              placeholder="Type your answer"
            />
          )}

          <div className="answer-actions">
            <button className="button" disabled={!answer} onClick={() => setChecked(true)}>
              Check answer
            </button>
            <button
              className="ghost-button"
              onClick={() => resetQuestion(activeIndex + 1 >= filtered.length ? 0 : activeIndex + 1)}
            >
              Next question
            </button>
          </div>

          {checked && (
            <div className={`feedback ${correct ? "good" : "bad"}`}>
              <strong>{correct ? "Correct" : "Incorrect"}</strong>
              <p>
                Correct answer: <strong>{question.correctAnswer}</strong>
              </p>
              <p>{question.explanation}</p>
            </div>
          )}
        </article>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import type { Lesson, PracticeQuestion } from "@/types";
import { lessonPath } from "@/lib/routes";

function normalizeLevel(level: string): string {
  const l = level.toLowerCase();
  if (l.includes("middle")) return "middle-school";
  if (l.includes("high")) return "high-school";
  return l.replace(/\s+/g, "-");
}

const LABELS = ["W", "X", "Y", "Z"];

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function isCorrect(question: PracticeQuestion, answer: string) {
  const accepted = [question.correctAnswer, ...(question.alternateAnswers ?? [])].map(normalize);
  return accepted.includes(normalize(answer));
}

export function SimplePracticeQuestion({
  question,
  lesson,
  linkedLessons,
  questionNumber,
  totalQuestions,
  onNext,
  onSkip,
}: {
  question: PracticeQuestion;
  lesson?: Lesson;
  linkedLessons?: Lesson[];
  questionNumber?: number;
  totalQuestions?: number;
  onNext?: (wasCorrect: boolean) => void;
  onSkip?: () => void;
}) {
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [lessonOpen, setLessonOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | undefined>(lesson ?? linkedLessons?.[0]);
  const correct = checked && isCorrect(question, answer);

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

  const typeLabel = question.type === "multiple_choice" ? "Multiple choice" : "Short answer";
  const categoryLabel = question.category ?? "";

  return (
    <>
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
        <p className="question-prompt">{question.prompt}</p>

        {/* Choices or text input */}
        {question.type === "multiple_choice" ? (
          <div className="pq-choices">
            {question.choices?.map((choice, index) => {
              const label = LABELS[index] ?? String(index + 1);
              let state: "idle" | "selected" | "correct" | "incorrect" | "missed" = "idle";
              if (checked) {
                if (normalize(choice) === normalize(question.correctAnswer)) {
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
                  <span className="pq-choice-text">{choice}</span>
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

        {/* Feedback */}
        {checked && (
          <div className={`pq-feedback ${correct ? "pq-feedback--correct" : "pq-feedback--incorrect"}`}>
            <p className="pq-feedback-verdict">
              {correct ? "✓ Correct" : "✗ Incorrect"}{" "}
              <span>— {question.correctAnswer}</span>
            </p>
            {question.explanation && (
              <p className="pq-feedback-explanation">{question.explanation}</p>
            )}
            {(linkedLessons && linkedLessons.length > 1) && (
              <div style={{ marginTop: "10px" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#667085" }}>Related topic:</label>
                <select
                  value={selectedLesson?.id ?? ""}
                  onChange={(e) => setSelectedLesson(linkedLessons.find((l) => l.id === e.target.value))}
                  style={{ marginLeft: "8px", padding: "4px 8px", borderRadius: "6px", fontSize: "0.85rem" }}
                >
                  {linkedLessons.map((l) => (
                    <option key={l.id} value={l.id}>{l.title}</option>
                  ))}
                </select>
              </div>
            )}
            {selectedLesson && (
              <button className="pq-learn-link" onClick={() => setLessonOpen(true)}>
                Learn this topic →
              </button>
            )}
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

      {lessonOpen && selectedLesson && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={selectedLesson.title}>
          <div className="modal-card stack">
            <div className="card-header">
              <div>
                <span className="eyebrow">{selectedLesson.category}</span>
                <h2>{selectedLesson.title}</h2>
              </div>
              <button className="ghost-button" onClick={() => setLessonOpen(false)}>Close</button>
            </div>
            <p className="card-copy">{selectedLesson.summary}</p>
            <div className="content-section stack">
              <h3>Key concepts</h3>
              <div className="badge-list">
                {selectedLesson.keyConcepts.map((concept) => (
                  <span className="badge neutral" key={concept}>{concept}</span>
                ))}
              </div>
            </div>
            {selectedLesson.contentSections.slice(0, 1).map((section) => (
              <div className="content-section" key={section.heading}>
                <h3>{section.heading}</h3>
                <p>{section.body}</p>
              </div>
            ))}
            <Link className="button" href={lessonPath(selectedLesson.competitionSlug, normalizeLevel(selectedLesson.level), selectedLesson.slug)}>
              Open full lesson
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

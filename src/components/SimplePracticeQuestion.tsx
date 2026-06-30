"use client";

import { useState } from "react";
import type { Lesson, PracticeQuestion } from "@/types";
import { QuestionText } from "@/components/QuestionText";

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

interface ContentSection {
  heading: string;
  body: string;
}

export function SimplePracticeQuestion({
  question,
  subtopicLessons,
  questionNumber,
  totalQuestions,
  onNext,
  onSkip,
}: {
  question: PracticeQuestion;
  subtopicLessons?: Lesson[];
  questionNumber?: number;
  totalQuestions?: number;
  onNext?: (wasCorrect: boolean) => void;
  onSkip?: () => void;
}) {
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeLessonContent, setActiveLessonContent] = useState<ContentSection[] | null>(null);
  const [contentLoading, setContentLoading] = useState(false);
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

  async function openLesson(lesson: Lesson) {
    setActiveLesson(lesson);
    setActiveLessonContent(null);
    setLessonModalOpen(true);
    setContentLoading(true);
    try {
      const res = await fetch(`/api/lesson-content?slug=${lesson.slug}&competition=${lesson.competitionSlug}`);
      const data = await res.json();
      setActiveLessonContent(data.contentSections ?? []);
    } catch {
      setActiveLessonContent([]);
    } finally {
      setContentLoading(false);
    }
  }

  function closeModal() {
    setLessonModalOpen(false);
    setActiveLesson(null);
    setActiveLessonContent(null);
  }

  const categoryLabel = question.subject ?? "";

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
        <p className="question-prompt"><QuestionText html={question.prompt} /></p>

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

        {/* Feedback */}
        {checked && (
          <div className={`pq-feedback ${correct ? "pq-feedback--correct" : "pq-feedback--incorrect"}`}>
            <p className="pq-feedback-verdict">
              {correct ? "✓ Correct" : "✗ Incorrect"}{" "}
              <span>— <QuestionText html={question.correctAnswer} /></span>
            </p>
            {question.explanation && (
              <p className="pq-feedback-explanation"><QuestionText html={question.explanation} /></p>
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

      {/* Subtopic study panel — appears below card after answering */}
      {checked && subtopicLessons && subtopicLessons.length > 0 && (
        <div className="subtopic-panel">
          <div className="subtopic-panel-header">
            <span className="eyebrow">Study</span>
            <h3 className="subtopic-panel-title">{question.subtopic}</h3>
          </div>
          <ul className="subtopic-lesson-list">
            {subtopicLessons.map((lesson) => (
              <li key={lesson.id}>
                <button className="subtopic-lesson-btn" onClick={() => openLesson(lesson)}>
                  <span className="subtopic-lesson-title">{lesson.title}</span>
                  <span className="subtopic-lesson-meta">{lesson.estimatedMinutes} min</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Full lesson modal */}
      {lessonModalOpen && activeLesson && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={activeLesson.title}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="modal-card stack">
            <div className="card-header">
              <div>
                <span className="eyebrow">{activeLesson.subject} · {activeLesson.subtopic}</span>
                <h2>{activeLesson.title}</h2>
              </div>
              <button className="ghost-button" onClick={closeModal}>Close</button>
            </div>
            {contentLoading ? (
              <p className="card-copy">Loading…</p>
            ) : activeLessonContent && activeLessonContent.length > 0 ? (
              activeLessonContent.map((section) => (
                <div className="content-section" key={section.heading}>
                  <h3>{section.heading}</h3>
                  <p>{section.body}</p>
                </div>
              ))
            ) : (
              <p className="card-copy">No content available.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

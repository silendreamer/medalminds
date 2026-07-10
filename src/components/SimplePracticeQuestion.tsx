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

interface LessonContentResponse {
  title: string;
  summary: string;
  keyConcepts: string[];
  contentSections: ContentSection[];
  reviewQuestions: string[];
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
  const [activeLessonContent, setActiveLessonContent] = useState<LessonContentResponse | null>(null);
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
      setActiveLessonContent({
        title: data.title ?? lesson.title,
        summary: data.summary ?? "",
        keyConcepts: data.keyConcepts ?? [],
        contentSections: data.contentSections ?? [],
        reviewQuestions: data.reviewQuestions ?? [],
      });
    } catch {
      setActiveLessonContent({ title: lesson.title, summary: "", keyConcepts: [], contentSections: [], reviewQuestions: [] });
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
          <div className="modal-card lesson-modal-card">
            <div className="card-header">
              <div>
                <span className="eyebrow">{activeLesson.subject} · {activeLesson.subtopic}</span>
                <h2>{activeLesson.title}</h2>
              </div>
              <button className="ghost-button" onClick={closeModal}>Close</button>
            </div>
            {contentLoading ? (
              <p className="card-copy">Loading…</p>
            ) : activeLessonContent ? (
              <article className="lesson-article lesson-article--modal">
                {activeLessonContent.summary && <p className="lesson-summary">{activeLessonContent.summary}</p>}

                {activeLessonContent.keyConcepts.length > 0 && (
                  <div className="lesson-concepts-box">
                    <h3 className="lesson-concepts-heading">Key concepts</h3>
                    <ul className="lesson-concepts-list">
                      {activeLessonContent.keyConcepts.map((concept) => (
                        <li key={concept}>{concept}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeLessonContent.contentSections.map((section) => {
                  const isReview = /review questions?/i.test(section.heading);
                  const isTossUp = /toss.?up|clue/i.test(section.heading);
                  const lines = section.body
                    .replace(/\n?---\s*$/, "")
                    .trim()
                    .split("\n")
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .map((l) => l.replace(/^\d+\.\s*/, ""));
                  return (
                    <div className={`lesson-section${isTossUp ? " lesson-section--no-border" : ""}`} key={section.heading}>
                      {!isTossUp && <h2 className="lesson-section-heading">{section.heading}</h2>}
                      {isTossUp ? (
                        <div style={{ display: "grid", gap: "10px" }}>
                          {lines.map((clue, i) => (
                            <div className="lesson-buzz-fact" key={i}>
                              <div className="lesson-buzz-fact-heading">⚡ Science Bowl Clue</div>
                              <p className="lesson-buzz-fact-body">{clue}</p>
                            </div>
                          ))}
                        </div>
                      ) : isReview ? (
                        <ol className="lesson-review-list">
                          {(lines.length > 1 ? lines : [section.body.replace(/\n?---\s*$/, "").trim()]).map((q, i) => (
                            <li key={i}>{q}</li>
                          ))}
                        </ol>
                      ) : (
                        <p className="lesson-section-body">{section.body}</p>
                      )}
                    </div>
                  );
                })}

                {activeLessonContent.reviewQuestions.length > 0 && (
                  <div className="lesson-buzz-fact">
                    <div className="lesson-buzz-fact-heading">⚡ Buzz-worthy fact</div>
                    <p className="lesson-buzz-fact-body">{activeLessonContent.reviewQuestions[0]}</p>
                  </div>
                )}

                {activeLessonContent.contentSections.length === 0 && !activeLessonContent.summary && (
                  <p className="card-copy">No content available.</p>
                )}
              </article>
            ) : (
              <p className="card-copy">No content available.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

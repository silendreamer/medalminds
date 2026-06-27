"use client";

import Link from "next/link";
import { useState } from "react";
import type { Lesson, PracticeQuestion } from "@/types";
import { lessonPath } from "@/lib/routes";

const multipleChoiceLabels = ["W", "X", "Y", "Z"];

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
  linkedLessons
}: {
  question: PracticeQuestion;
  lesson?: Lesson;
  linkedLessons?: Lesson[];
}) {
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [lessonOpen, setLessonOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | undefined>(lesson ?? linkedLessons?.[0]);
  const correct = isCorrect(question, answer);
  const hasLessons = !!selectedLesson || (linkedLessons && linkedLessons.length > 0);

  return (
    <>
      <article className="card spacious stack practice-card">
        <div className="card-header">
          <div>
            <span className="eyebrow">{question.category}</span>
            <h2>Try this question</h2>
          </div>
          <span className="badge neutral">{question.type.replace("_", " ")}</span>
        </div>
        <p className="question-prompt">{question.prompt}</p>

        {question.type === "multiple_choice" ? (
          <div className="stack">
            {question.choices?.map((choice, index) => (
              <button
                className={`choice ${answer === choice ? "selected" : ""}`}
                key={choice}
                onClick={() => {
                  setAnswer(choice);
                  setChecked(false);
                }}
              >
                {multipleChoiceLabels[index] ? `${multipleChoiceLabels[index]}) ${choice}` : choice}
              </button>
            ))}
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
          <button className="ghost-button" onClick={() => window.location.reload()}>
            New question
          </button>
        </div>

        {checked && (
          <div className={`feedback ${correct ? "good" : "bad"}`}>
            <strong>{correct ? "Correct" : "Not quite"}</strong>
            <p>
              Correct answer: <strong>{question.correctAnswer}</strong>
            </p>
            <p>{question.explanation}</p>
            {hasLessons ? (
              <>
                {linkedLessons && linkedLessons.length > 1 && (
                  <div className="stack compact" style={{ marginTop: "1rem" }}>
                    <label htmlFor="lesson-select" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                      Related topics:
                    </label>
                    <select
                      id="lesson-select"
                      value={selectedLesson?.id ?? ""}
                      onChange={(e) => {
                        const selected = linkedLessons.find((l) => l.id === e.target.value);
                        setSelectedLesson(selected);
                      }}
                      style={{ padding: "0.5rem", borderRadius: "4px" }}
                    >
                      {linkedLessons.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <button className="ghost-button" onClick={() => setLessonOpen(true)}>
                  Learn this topic
                </button>
              </>
            ) : (
              <p style={{ fontSize: "0.875rem", color: "var(--color-muted-foreground)", marginTop: "1rem" }}>
                No lessons available for this topic yet.
              </p>
            )}
          </div>
        )}
      </article>

      {lessonOpen && selectedLesson && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={selectedLesson.title}>
          <div className="modal-card stack">
            <div className="card-header">
              <div>
                <span className="eyebrow">{selectedLesson.category}</span>
                <h2>{selectedLesson.title}</h2>
              </div>
              <button className="ghost-button" onClick={() => setLessonOpen(false)}>
                Close
              </button>
            </div>
            <p className="card-copy">{selectedLesson.summary}</p>
            <div className="content-section stack">
              <h3>Key concepts</h3>
              <div className="badge-list">
                {selectedLesson.keyConcepts.map((concept) => (
                  <span className="badge neutral" key={concept}>
                    {concept}
                  </span>
                ))}
              </div>
            </div>
            {selectedLesson.contentSections.slice(0, 1).map((section) => (
              <div className="content-section" key={section.heading}>
                <h3>{section.heading}</h3>
                <p>{section.body}</p>
              </div>
            ))}
            <Link className="button" href={lessonPath(selectedLesson.competitionSlug, selectedLesson.slug)}>
              Open full lesson
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

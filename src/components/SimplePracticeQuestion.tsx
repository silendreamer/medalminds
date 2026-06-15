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
  lesson
}: {
  question: PracticeQuestion;
  lesson?: Lesson;
}) {
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [lessonOpen, setLessonOpen] = useState(false);
  const correct = isCorrect(question, answer);

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
            {lesson && (
              <button className="ghost-button" onClick={() => setLessonOpen(true)}>
                Learn this topic
              </button>
            )}
          </div>
        )}
      </article>

      {lessonOpen && lesson && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={lesson.title}>
          <div className="modal-card stack">
            <div className="card-header">
              <div>
                <span className="eyebrow">{lesson.category}</span>
                <h2>{lesson.title}</h2>
              </div>
              <button className="ghost-button" onClick={() => setLessonOpen(false)}>
                Close
              </button>
            </div>
            <p className="card-copy">{lesson.summary}</p>
            <div className="content-section stack">
              <h3>Key concepts</h3>
              <div className="badge-list">
                {lesson.keyConcepts.map((concept) => (
                  <span className="badge neutral" key={concept}>
                    {concept}
                  </span>
                ))}
              </div>
            </div>
            {lesson.contentSections.slice(0, 1).map((section) => (
              <div className="content-section" key={section.heading}>
                <h3>{section.heading}</h3>
                <p>{section.body}</p>
              </div>
            ))}
            <Link className="button" href={lessonPath(lesson.competitionSlug, lesson.slug)}>
              Open full lesson
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PracticeQuestion } from "@/types";

type BuzzerPhase = "idle" | "ticking" | "answered" | "timeout";
type ChoiceLetter = "W" | "X" | "Y" | "Z";

const STARTING_SECONDS = 5.0;
const CHOICE_LETTERS: ChoiceLetter[] = ["W", "X", "Y", "Z"];

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/^[wxyz]\)\s*/i, "").replace(/\s+/g, " ");
}

function getCorrectLetter(question: PracticeQuestion, choices: string[]) {
  const normalizedAnswer = normalize(question.correctAnswer);
  const directLetter = question.correctAnswer.trim().toUpperCase();
  if (CHOICE_LETTERS.includes(directLetter as ChoiceLetter)) return directLetter as ChoiceLetter;

  const matchIndex = choices.findIndex((choice) => normalize(choice) === normalizedAnswer);
  return matchIndex >= 0 ? CHOICE_LETTERS[matchIndex] : null;
}

export function BuzzerArena({ questions }: { questions: PracticeQuestion[] }) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [phase, setPhase] = useState<BuzzerPhase>("idle");
  const [remaining, setRemaining] = useState(STARTING_SECONDS);
  const [picked, setPicked] = useState<ChoiceLetter | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);

  const currentQuestion = questions[questionIndex];
  const choices = useMemo(() => currentQuestion?.choices?.slice(0, 4) ?? [], [currentQuestion]);
  const correctLetter = currentQuestion ? getCorrectLetter(currentQuestion, choices) : null;
  const isCorrect = Boolean(picked && correctLetter && picked === correctLetter);
  const elapsed = (STARTING_SECONDS - remaining).toFixed(1);
  const progress = (remaining / STARTING_SECONDS) * 100;

  function clearClock() {
    if (!intervalRef.current) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  function start() {
    clearClock();
    setPhase("ticking");
    setRemaining(STARTING_SECONDS);
    setPicked(null);
    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        const next = +(r - 0.1).toFixed(1);
        if (next <= 0.1) {
          clearClock();
          setPhase("timeout");
          return 0;
        }
        return next;
      });
    }, 100);
  }

  function pickChoice(letter: ChoiceLetter) {
    if (phase !== "ticking") return;
    clearClock();
    setPicked(letter);
    setPhase("answered");
  }

  function tryAnother() {
    clearClock();
    setPhase("idle");
    setRemaining(STARTING_SECONDS);
    setPicked(null);
    setQuestionIndex((index) => (questions.length ? (index + 1) % questions.length : 0));
  }

  useEffect(() => clearClock, []);

  if (!currentQuestion || choices.length < 4) {
    return <div className="empty">No multiple-choice buzzer questions are available yet.</div>;
  }

  return (
    <div className="buzzer-practice-shell">
      <div className="simple-heading buzzer-practice-heading">
        <span className="eyebrow">Science Bowl</span>
        <h1>Buzzer Practice</h1>
        <p className="subtitle">Science Bowl toss-up format. Beat the clock.</p>
      </div>

      <article className="card spacious buzzer-practice-card">
        <div className="buzzer-practice-top">
          <span className="eyebrow">Live practice round</span>
          <span className={`badge neutral buzzer-phase-${phase}`}>{phase}</span>
        </div>

        <div className="buzzer-timer-row">
          <div className="buzzer-countdown">{remaining.toFixed(1)}s</div>
          <div
            className={`buzzer-timer-track buzzer-phase-${phase} ${remaining <= 1 && phase === "ticking" ? "low" : ""} ${
              phase === "answered" ? (isCorrect ? "correct" : "incorrect") : ""
            }`}
          >
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="buzzer-meta-row">
          <span className="badge">{currentQuestion.category}</span>
          <span className="badge neutral">{currentQuestion.difficulty}</span>
          <span className="badge neutral">Question {questionIndex + 1} of {questions.length}</span>
        </div>

        <div className="buzzer-hidden-prompt">
          <h2>Question hidden for participants</h2>
          <p>The organizer reads the toss-up and choices aloud. Buzz in, then say the answer or choice out loud.</p>
        </div>

        <div className="buzzer-choice-list" aria-label="Buzzer answer choices">
          {CHOICE_LETTERS.map((letter) => {
            const isPicked = picked === letter;
            const isAnswer = correctLetter === letter;
            const showResult = phase === "answered" || phase === "timeout";
            const className = [
              "buzzer-choice-button",
              showResult && isAnswer ? "correct" : "",
              showResult && isPicked && !isAnswer ? "incorrect" : "",
              showResult && !isPicked && !isAnswer ? "muted" : ""
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <button className={className} disabled={phase !== "ticking"} key={letter} onClick={() => pickChoice(letter)}>
                <strong>{letter}</strong>
                <span>{showResult ? choices[CHOICE_LETTERS.indexOf(letter)] : `Choice ${letter}`}</span>
              </button>
            );
          })}
        </div>

        <details className="buzzer-organizer-sheet">
          <summary>Organizer question sheet</summary>
          <div className="stack">
            <p>{currentQuestion.prompt}</p>
            <div className="buzzer-organizer-choices">
              {choices.map((choice, index) => (
                <div className={CHOICE_LETTERS[index] === correctLetter ? "feedback good" : "feedback"} key={`${CHOICE_LETTERS[index]}-${choice}`}>
                  <strong>{CHOICE_LETTERS[index]}</strong> {choice}
                </div>
              ))}
            </div>
          </div>
        </details>

        <footer className="buzzer-practice-footer">
          <div>
            {phase === "idle" && <p>Tap start. Beat the buzzer.</p>}
            {phase === "ticking" && <p>Buzz in before the bar runs out.</p>}
            {phase === "answered" && isCorrect && <p className="feedback good">Correct - +10 pts ({elapsed}s)</p>}
            {phase === "answered" && !isCorrect && <p className="feedback bad">Not quite.</p>}
            {phase === "timeout" && <p className="feedback bad">Out of time. Answer was {correctLetter ? `${correctLetter}: ` : ""}{currentQuestion.correctAnswer}.</p>}
          </div>
          <div className="actions">
            {phase === "idle" || phase === "ticking" ? (
              <button className="button" disabled={phase === "ticking"} onClick={start}>
                Start
              </button>
            ) : (
              <button className="button" onClick={tryAnother}>
                Try another
              </button>
            )}
          </div>
        </footer>
      </article>
    </div>
  );
}

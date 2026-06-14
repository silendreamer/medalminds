"use client";

import { useCallback, useEffect, useMemo, useReducer } from "react";
import type { BuzzerQuestion } from "@/data/buzzerQuestions";
import {
  buzzerReducer,
  createInitialBuzzerState,
  formatBuzzerElapsed,
  getPhaseLabel,
  type BuzzerTeam
} from "@/lib/buzzerEngine";
import { BuzzerControls } from "./BuzzerControls";
import { BuzzerQuestionCard } from "./BuzzerQuestionCard";
import { BuzzerScoreboard } from "./BuzzerScoreboard";
import { BuzzerSessionLog } from "./BuzzerSessionLog";
import { BuzzerTimer } from "./BuzzerTimer";

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

const teamARoster = ["A One", "A Captain", "A Two"];
const teamBRoster = ["B One", "B Captain", "B Two"];

export function BuzzerArena({ questions }: { questions: BuzzerQuestion[] }) {
  const [state, dispatch] = useReducer(buzzerReducer, undefined, () => createInitialBuzzerState(Date.now()));
  if (!questions.length) {
    return <div className="empty">No buzzer questions are available yet.</div>;
  }

  const displayIndex = state.index % questions.length;
  const question = questions[displayIndex];
  const activeEntries = useMemo(() => state.sessionLog.slice(0, 5), [state.sessionLog]);

  const startQuestion = useCallback(() => {
    dispatch({ type: "start_question", nowMs: performance.now() });
  }, []);

  const soloBuzz = useCallback(() => {
    dispatch({ type: "solo_buzz", nowMs: performance.now() });
  }, []);

  const teamBuzz = useCallback((team: BuzzerTeam) => {
    dispatch({ type: "team_buzz", team, nowMs: performance.now() });
  }, []);

  const markSoloAnswer = useCallback(() => {
    dispatch({
      type: "submit_solo_answer",
      isCorrect: normalize(state.soloAnswer) === normalize(question.tossupAnswer),
      nowMs: performance.now()
    });
  }, [question.tossupAnswer, state.soloAnswer]);

  const markTossup = useCallback((result: "correct" | "incorrect") => {
    dispatch({ type: "mark_tossup", result, nowMs: performance.now() });
  }, []);

  const markBonus = useCallback((result: "correct" | "incorrect") => {
    dispatch({ type: "mark_bonus", result, nowMs: performance.now() });
  }, []);

  const nextQuestion = useCallback(() => {
    dispatch({ type: "next_question", nowMs: performance.now() });
  }, []);

  const resetRound = useCallback(() => {
    dispatch({ type: "reset_round", nowMs: performance.now() });
  }, []);

  const tick = useCallback((nowMs: number) => {
    dispatch({ type: "tick", nowMs });
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (state.mode === "teams" && state.phase === "question") {
        if (event.key.toLowerCase() === "a") teamBuzz("A");
        if (event.key.toLowerCase() === "l") teamBuzz("B");
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [state.mode, state.phase, teamBuzz]);

  useEffect(() => {
    if (!state.timerRunning) return;
    const interval = window.setInterval(() => {
      dispatch({ type: "tick", nowMs: performance.now() });
    }, 50);

    return () => window.clearInterval(interval);
  }, [state.timerRunning]);

  const showSoloAnswerPanel = state.mode === "solo" && state.soloBuzzed && !state.soloResult;
  const showBonusControls = state.mode === "teams" && state.tossupMarked === "correct" && !state.bonusMarked;
  const showTeamJudging = state.mode === "teams" && Boolean(state.buzzedTeam) && !state.tossupMarked;
  const bannerLabel =
    state.mode === "teams"
      ? state.buzzedTeam
        ? `Team ${state.buzzedTeam} has buzzed in`
        : "Waiting for official to classify buzz"
      : state.started
        ? "Solo practice live"
        : "Ready to start";
  const bannerSubtext =
    state.mode === "teams"
      ? state.buzzedTeam
        ? "The buzzer is locked. Judge the response and clear the round when you are done."
        : "Start the question, then let the first team lock the buzzer."
      : "Start a question, buzz in, and submit your answer locally.";

  return (
    <div className="buzzer-shell">
      <section className="buzzer-banner">
        <div>
          <span className="eyebrow">Science Bowl</span>
          <h2>Science Bowl Buzzer Arena</h2>
          <p>{bannerSubtext}</p>
        </div>
        <div className="buzzer-banner-official">
          <div className="buzzer-avatar">M</div>
          <div>
            <strong>{bannerLabel}</strong>
            <span>{getPhaseLabel(state)}</span>
          </div>
        </div>
      </section>

      {state.mode === "teams" && <BuzzerScoreboard teamA={state.teamScores.A} teamB={state.teamScores.B} />}

      {state.mode === "teams" ? (
        <section className="buzzer-roster-grid">
          <article className={`buzzer-team-card ${state.buzzedTeam === "A" ? "active" : ""}`}>
            <header>
              <div>
                <span className="eyebrow">Team A</span>
                <h3>Team A</h3>
              </div>
              <strong>{state.teamScores.A}</strong>
            </header>
            <div className="buzzer-roster">
              {teamARoster.map((name, index) => (
                <div className={`buzzer-roster-row ${state.buzzedTeam === "A" && index === 0 ? "buzzed" : ""}`} key={name}>
                  <div className="buzzer-roster-avatar">{name.slice(0, 1)}</div>
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </article>

          <article className={`buzzer-team-card ${state.buzzedTeam === "B" ? "active" : ""}`}>
            <header>
              <div>
                <span className="eyebrow">Team B</span>
                <h3>Team B</h3>
              </div>
              <strong>{state.teamScores.B}</strong>
            </header>
            <div className="buzzer-roster">
              {teamBRoster.map((name, index) => (
                <div className={`buzzer-roster-row ${state.buzzedTeam === "B" && index === 0 ? "buzzed" : ""}`} key={name}>
                  <div className="buzzer-roster-avatar">{name.slice(0, 1)}</div>
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </article>
        </section>
      ) : null}

      <section className="buzzer-stage-grid">
        <BuzzerQuestionCard
          question={question}
          questionNumber={displayIndex + 1}
          total={questions.length}
          mode={state.mode}
          phase={state.phase}
          soloBuzzed={state.soloBuzzed}
          soloAnswer={state.soloAnswer}
          soloResult={state.soloResult}
          buzzedTeam={state.buzzedTeam}
          tossupMarked={state.tossupMarked}
          bonusMarked={state.bonusMarked}
        />

        <aside className="stack">
          <div className="card buzzer-status-card">
            <span className="eyebrow">Timer</span>
            <BuzzerTimer running={state.timerRunning} elapsedMs={state.elapsedMs} onTick={tick} />
            <p>{state.started ? `Question clock is ${state.timerRunning ? "running" : "stopped"} at ${formatBuzzerElapsed(state.elapsedMs)}.` : "Start a question to begin."}</p>
            <div className="badge-list">
              <span className="badge neutral">{getPhaseLabel(state)}</span>
              <span className="badge neutral">{state.mode === "solo" ? "Solo" : `Score ${state.teamScores.A}-${state.teamScores.B}`}</span>
            </div>
          </div>

          <BuzzerControls
            mode={state.mode}
            phase={state.phase}
            buzzedTeam={state.buzzedTeam}
            soloBuzzed={state.soloBuzzed}
            onStart={startQuestion}
            onSoloBuzz={soloBuzz}
            onTeamBuzz={teamBuzz}
            onReset={resetRound}
          />

          {showTeamJudging && state.buzzedTeam && (
            <div className="buzzer-judge-stack">
              <button className="buzzer-judge-button strong" onClick={() => markTossup("correct")}>
                Interrupt
              </button>
              <button className="buzzer-judge-button muted" onClick={() => markTossup("incorrect")}>
                Not interrupt
              </button>
              <button className="buzzer-judge-button alt" onClick={resetRound}>
                Clear buzzer
              </button>
            </div>
          )}

          {showBonusControls && state.buzzedTeam && (
            <div className="card stack">
              <h3>Bonus for Team {state.buzzedTeam}</h3>
              <div className="actions">
                <button className="button" onClick={() => markBonus("correct")}>
                  Bonus Correct +10
                </button>
                <button className="ghost-button" onClick={() => markBonus("incorrect")}>
                  Bonus Incorrect
                </button>
              </div>
            </div>
          )}

          <div className="buzzer-foot-card">
            <div className="buzzer-foot-row">
              <span>Period {displayIndex + 1} of {questions.length}</span>
              <span>{formatBuzzerElapsed(state.elapsedMs)}</span>
            </div>
            <div className="buzzer-progress">
              <span style={{ width: `${Math.max(8, ((displayIndex + 1) / questions.length) * 100)}%` }} />
            </div>
          </div>

          <BuzzerSessionLog entries={activeEntries} />
        </aside>
      </section>

      {showSoloAnswerPanel && (
        <div className="card stack buzzer-solo-answer">
          <h3>Submit your toss-up answer</h3>
          <input
            className="input"
            value={state.soloAnswer}
            onChange={(event) => dispatch({ type: "set_solo_answer", answer: event.target.value })}
            placeholder="Type your answer"
          />
          <div className="actions">
            <button className="button" disabled={!state.soloAnswer} onClick={markSoloAnswer}>
              Submit Answer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


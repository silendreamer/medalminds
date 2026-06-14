"use client";

import { useCallback, useEffect, useMemo, useReducer } from "react";
import type { BuzzerQuestion } from "@/data/buzzerQuestions";
import {
  buzzerReducer,
  createInitialBuzzerState,
  formatBuzzerElapsed,
  getPhaseLabel,
  type BuzzerMode,
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

export function BuzzerArena({ questions }: { questions: BuzzerQuestion[] }) {
  const [state, dispatch] = useReducer(buzzerReducer, undefined, () => createInitialBuzzerState(Date.now()));
  if (!questions.length) {
    return <div className="empty">No buzzer questions are available yet.</div>;
  }

  const displayIndex = state.index % questions.length;
  const question = questions[displayIndex];
  const activeEntries = useMemo(() => state.sessionLog.slice(0, 6), [state.sessionLog]);

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
    dispatch({ type: "submit_solo_answer", isCorrect: normalize(state.soloAnswer) === normalize(question.tossupAnswer), nowMs: performance.now() });
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
  const showBonus = state.mode === "teams" && state.tossupMarked === "correct";
  const showBonusControls = state.mode === "teams" && state.tossupMarked === "correct" && !state.bonusMarked;
  const showTeamJudging = state.mode === "teams" && Boolean(state.buzzedTeam) && !state.tossupMarked;

  return (
    <div className="buzzer-arena">
      <div className="card buzzer-mode-panel">
        <div>
          <span className="eyebrow">Mode</span>
          <h3>{state.mode === "solo" ? "Solo Practice" : "Two-Team Local"}</h3>
          <p>{getPhaseLabel(state)}</p>
        </div>
        <div className="buzzer-mode-toggle" role="tablist" aria-label="Buzzer mode selector">
          <button
            className={state.mode === "solo" ? "active" : ""}
            onClick={() => dispatch({ type: "set_mode", mode: "solo", nowMs: performance.now() })}
          >
            Solo Practice
          </button>
          <button
            className={state.mode === "teams" ? "active" : ""}
            onClick={() => dispatch({ type: "set_mode", mode: "teams", nowMs: performance.now() })}
          >
            Two-Team Local
          </button>
        </div>
      </div>

      {state.mode === "teams" && <BuzzerScoreboard teamA={state.teamScores.A} teamB={state.teamScores.B} />}

      <div className="buzzer-layout">
        <div className="stack">
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

          {showSoloAnswerPanel && (
            <div className="card stack">
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

          {showTeamJudging && state.buzzedTeam && (
            <div className="card stack">
              <h3>Team {state.buzzedTeam} buzzed first</h3>
              <p>Moderator marks the toss-up response.</p>
              <div className="actions">
                <button className="button" onClick={() => markTossup("correct")}>
                  Correct +4
                </button>
                <button className="ghost-button" onClick={() => markTossup("incorrect")}>
                  Incorrect
                </button>
              </div>
            </div>
          )}

          {showBonusControls && state.buzzedTeam && (
            <div className="card stack">
              <h3>Bonus for Team {state.buzzedTeam}</h3>
              <p>Moderator marks the bonus response.</p>
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
        </div>

        <aside className="stack">
          <div className="card buzzer-status-card">
            <span className="eyebrow">Timer</span>
            <BuzzerTimer running={state.timerRunning} elapsedMs={state.elapsedMs} onTick={tick} />
            <p>
              {state.started ? `Question clock is ${state.timerRunning ? "running" : "stopped"} at ${formatBuzzerElapsed(state.elapsedMs)}.` : "Start a question to begin."}
            </p>
            <div className="badge-list">
              <span className="badge neutral">{getPhaseLabel(state)}</span>
              <span className="badge neutral">
                {state.mode === "solo" ? "Solo" : `Score ${state.teamScores.A}-${state.teamScores.B}`}
              </span>
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

          <div className="card stack">
            <h3>Keyboard hints</h3>
            {state.mode === "teams" ? (
              <p>
                Team A buzzes with <strong>A</strong>. Team B buzzes with <strong>L</strong>. First buzz locks the round.
              </p>
            ) : (
              <p>Solo mode uses the on-screen buzz button for this MVP.</p>
            )}
            <button className="button" onClick={nextQuestion}>
              Next Question
            </button>
          </div>

          <BuzzerSessionLog entries={activeEntries} />
        </aside>
      </div>
    </div>
  );
}

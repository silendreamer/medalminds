"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { BuzzerQuestion } from "@/data/buzzerQuestions";
import { BuzzerControls } from "./BuzzerControls";
import { BuzzerQuestionCard } from "./BuzzerQuestionCard";
import { BuzzerScoreboard } from "./BuzzerScoreboard";
import { BuzzerTimer } from "./BuzzerTimer";

type Mode = "solo" | "teams";
type Team = "A" | "B";

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function BuzzerArena({ questions }: { questions: BuzzerQuestion[] }) {
  const [mode, setMode] = useState<Mode>("solo");
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerResetKey, setTimerResetKey] = useState("0-0");
  const [soloBuzzed, setSoloBuzzed] = useState(false);
  const [soloAnswer, setSoloAnswer] = useState("");
  const [soloResult, setSoloResult] = useState<"correct" | "incorrect" | null>(null);
  const [buzzedTeam, setBuzzedTeam] = useState<Team | null>(null);
  const [teamScores, setTeamScores] = useState({ A: 0, B: 0 });
  const [tossupMarked, setTossupMarked] = useState<"correct" | "incorrect" | null>(null);
  const [bonusMarked, setBonusMarked] = useState<"correct" | "incorrect" | null>(null);
  const [elapsed, setElapsed] = useState(0);

  const question = questions[index];
  const showSoloExplanation = Boolean(soloResult);
  const showTeamExplanation = Boolean(tossupMarked);
  const showBonus = mode === "teams" && tossupMarked === "correct";
  const activeTeamLabel = buzzedTeam ? `Team ${buzzedTeam}` : "No team has buzzed";

  const resetQuestionState = useCallback(
    (nextIndex = index) => {
      setStarted(false);
      setTimerRunning(false);
      setTimerResetKey(`${nextIndex}-${Date.now()}`);
      setSoloBuzzed(false);
      setSoloAnswer("");
      setSoloResult(null);
      setBuzzedTeam(null);
      setTossupMarked(null);
      setBonusMarked(null);
      setElapsed(0);
    },
    [index]
  );

  const startQuestion = useCallback(() => {
    setStarted(true);
    setTimerRunning(true);
    setTimerResetKey(`${index}-${Date.now()}`);
    setSoloBuzzed(false);
    setSoloAnswer("");
    setSoloResult(null);
    setBuzzedTeam(null);
    setTossupMarked(null);
    setBonusMarked(null);
  }, [index]);

  const soloBuzz = useCallback(() => {
    if (!started || soloBuzzed) return;
    setSoloBuzzed(true);
    setTimerRunning(false);
  }, [soloBuzzed, started]);

  const teamBuzz = useCallback(
    (team: Team) => {
      if (mode !== "teams" || !started || buzzedTeam) return;
      setBuzzedTeam(team);
      setTimerRunning(false);
    },
    [buzzedTeam, mode, started]
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (event.key.toLowerCase() === "a") teamBuzz("A");
      if (event.key.toLowerCase() === "l") teamBuzz("B");
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [teamBuzz]);

  const answerCorrect = useMemo(
    () => normalize(soloAnswer) === normalize(question.tossupAnswer),
    [question.tossupAnswer, soloAnswer]
  );

  function submitSoloAnswer() {
    setSoloResult(answerCorrect ? "correct" : "incorrect");
  }

  function markTossup(result: "correct" | "incorrect") {
    if (!buzzedTeam) return;
    setTossupMarked(result);
    if (result === "correct") {
      setTeamScores((scores) => ({ ...scores, [buzzedTeam]: scores[buzzedTeam] + 4 }));
    }
  }

  function markBonus(result: "correct" | "incorrect") {
    if (!buzzedTeam || bonusMarked) return;
    setBonusMarked(result);
    if (result === "correct") {
      setTeamScores((scores) => ({ ...scores, [buzzedTeam]: scores[buzzedTeam] + 10 }));
    }
  }

  function nextQuestion() {
    const nextIndex = index + 1 >= questions.length ? 0 : index + 1;
    setIndex(nextIndex);
    resetQuestionState(nextIndex);
  }

  function resetRound() {
    setIndex(0);
    setTeamScores({ A: 0, B: 0 });
    resetQuestionState(0);
  }

  if (!question) {
    return <div className="empty">No buzzer questions are available yet.</div>;
  }

  return (
    <div className="buzzer-arena">
      <div className="card buzzer-mode-panel">
        <div>
          <span className="eyebrow">Mode</span>
          <h3>{mode === "solo" ? "Solo Practice" : "Two-Team Local"}</h3>
        </div>
        <div className="buzzer-mode-toggle" role="tablist" aria-label="Buzzer mode selector">
          <button
            className={mode === "solo" ? "active" : ""}
            onClick={() => {
              setMode("solo");
              resetRound();
            }}
          >
            Solo Practice
          </button>
          <button
            className={mode === "teams" ? "active" : ""}
            onClick={() => {
              setMode("teams");
              resetRound();
            }}
          >
            Two-Team Local
          </button>
        </div>
      </div>

      {mode === "teams" && <BuzzerScoreboard teamA={teamScores.A} teamB={teamScores.B} />}

      <div className="buzzer-layout">
        <div className="stack">
          <BuzzerQuestionCard
            question={question}
            questionNumber={index + 1}
            total={questions.length}
            started={started}
            showBonus={showBonus}
            showTossupExplanation={mode === "solo" ? showSoloExplanation : showTeamExplanation}
            showBonusExplanation={Boolean(bonusMarked)}
          />

          {mode === "solo" && soloBuzzed && (
            <div className="card stack">
              <h3>Submit your toss-up answer</h3>
              <input
                className="input"
                value={soloAnswer}
                onChange={(event) => setSoloAnswer(event.target.value)}
                placeholder="Type your answer"
              />
              <div className="actions">
                <button className="button" disabled={!soloAnswer || Boolean(soloResult)} onClick={submitSoloAnswer}>
                  Submit Answer
                </button>
              </div>
              {soloResult && (
                <div className={`feedback ${soloResult === "correct" ? "good" : "bad"}`}>
                  <strong>{soloResult === "correct" ? "Correct" : "Incorrect"}</strong>
                  <p>Answer: {question.tossupAnswer}</p>
                  <p>{question.tossupExplanation}</p>
                </div>
              )}
            </div>
          )}

          {mode === "teams" && buzzedTeam && !tossupMarked && (
            <div className="card stack">
              <h3>{activeTeamLabel} buzzed first</h3>
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

          {mode === "teams" && showBonus && !bonusMarked && (
            <div className="card stack">
              <h3>Bonus for {activeTeamLabel}</h3>
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
            <BuzzerTimer running={timerRunning} resetKey={timerResetKey} onTick={setElapsed} />
            <p>{started ? `Question clock is ${timerRunning ? "running" : "stopped"} at ${elapsed}s.` : "Start a question to begin."}</p>
          </div>
          <BuzzerControls
            mode={mode}
            started={started}
            buzzedTeam={buzzedTeam}
            soloBuzzed={soloBuzzed}
            onStart={startQuestion}
            onSoloBuzz={soloBuzz}
            onTeamBuzz={teamBuzz}
            onReset={resetRound}
          />
          <div className="card stack">
            <h3>Keyboard hints</h3>
            {mode === "teams" ? (
              <p>Team A buzzes with <strong>A</strong>. Team B buzzes with <strong>L</strong>. First buzz locks the round.</p>
            ) : (
              <p>Solo mode uses the on-screen buzz button for this MVP.</p>
            )}
            <button className="button" onClick={nextQuestion}>
              Next Question
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

"use client";

import type { BuzzerMode, BuzzerPhase, BuzzerTeam } from "@/lib/buzzerEngine";

export function BuzzerControls({
  mode,
  phase,
  buzzedTeam,
  soloBuzzed,
  onStart,
  onSoloBuzz,
  onTeamBuzz,
  onReset
}: {
  mode: BuzzerMode;
  phase: BuzzerPhase;
  buzzedTeam: BuzzerTeam | null;
  soloBuzzed: boolean;
  onStart: () => void;
  onSoloBuzz: () => void;
  onTeamBuzz: (team: BuzzerTeam) => void;
  onReset: () => void;
}) {
  const canStart = phase === "idle";
  const canSoloBuzz = mode === "solo" && phase === "question" && !soloBuzzed;
  const canTeamBuzz = mode === "teams" && phase === "question" && !buzzedTeam;

  return (
    <div className="card buzzer-controls">
      <div className="actions">
        <button className="button" onClick={onStart} disabled={!canStart}>
          Start Question
        </button>
        <button className="ghost-button" onClick={onReset}>
          Reset Round
        </button>
      </div>

      {mode === "solo" ? (
        <button className="buzzer-big-button" onClick={onSoloBuzz} disabled={!canSoloBuzz}>
          Buzz
        </button>
      ) : (
        <div className="buzzer-team-buttons">
          <button onClick={() => onTeamBuzz("A")} disabled={!canTeamBuzz}>
            Team A Buzz
            <span>Key A</span>
          </button>
          <button onClick={() => onTeamBuzz("B")} disabled={!canTeamBuzz}>
            Team B Buzz
            <span>Key L</span>
          </button>
        </div>
      )}
    </div>
  );
}

